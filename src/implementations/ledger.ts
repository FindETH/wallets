import { ExtendedPublicKey, dehexify } from '@findeth/hdnode';
import { Network } from '@findeth/networks';
import Transport from '@ledgerhq/hw-transport';
import { ALL_DERIVATION_PATHS } from '../../typings';
import { LEDGER_ETH_RECOVERY_NAME } from '../constants';
import { DerivationPath, getDerivationPaths, LEDGER_DERIVATION_PATHS, LEDGER_ETH } from '../derivation-paths';
import { HardwareWallet } from '../hardware-wallet';
import { WalletType } from '../types';
import { getFullPath, getTransportImplementation, isTransportType, parseRawData } from '../utils';
import { SignedMessage } from '../wallet';
import { TransportWrapper } from './transports';

interface SerializedData {
  type: string;
  transport: string;
}

interface AppMetadata {
  name: string;
  version: string;
}

export class Ledger<Descriptor> extends HardwareWallet {
  /**
   * Get a class instance from serialized data. Useful for using the class in a web worker.
   *
   * @param {string} serializedData
   * @return {Ledger}
   */
  static deserialize(serializedData: string): Ledger<unknown> {
    const json = JSON.parse(serializedData) as SerializedData;
    if (json?.type !== WalletType.Ledger || !json.transport) {
      throw new Error('Serialized data is invalid: `type` key is not valid for this class, or missing `transport` key');
    }

    const transport = JSON.parse(json.transport);
    if (!isTransportType(transport.type)) {
      throw new Error('Serialized data is invalid: `type` is not a valid type of TransportType');
    }

    const TransportImplementation = getTransportImplementation(transport.type);
    return new Ledger(new TransportImplementation(transport.descriptor));
  }

  /**
   * Initialise the Ledger wallet with a specific Transport (e.g. U2F, WebUSB, WebHID or WebBluetooth).
   *
   * @param {TransportWrapper<Descriptor>} transport
   * @template Descriptor
   */
  constructor(private readonly transport: TransportWrapper<Descriptor, Transport<unknown>>) {
    super();
  }

  async connect(): Promise<void> {
    // Fetch a random address to ensure the connection works
    await this.getAddress(LEDGER_ETH, 50);
  }

  async signMessage(derivationPath: DerivationPath, index: number, message: string): Promise<SignedMessage> {
    const app = await this.transport.getApplication();
    const path = getFullPath(derivationPath, index);

    const { address } = await app.getAddress(path);
    const { v, r, s } = await app.signPersonalMessage(path, message);
    return {
      message,
      address,
      signature: {
        v: Number(v),
        r: dehexify(r),
        s: dehexify(s)
      }
    };
  }

  async getDerivationPaths(network: Network): Promise<DerivationPath[]> {
    // The ETH Recovery app supports all derivation paths
    const { name } = await this.getMetadata();
    if (name === LEDGER_ETH_RECOVERY_NAME) {
      return ALL_DERIVATION_PATHS;
    }

    // Ledger limits the available derivation paths based on the application that is open
    if (network.chainId === 1) {
      return LEDGER_DERIVATION_PATHS;
    }

    // Ethereum Classic also supports the Ethereum derivation paths
    if (network.chainId === 61) {
      return [...LEDGER_DERIVATION_PATHS, ...getDerivationPaths(network)];
    }

    return getDerivationPaths(network);
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.Ledger,
      transport: this.transport.toString()
    });
  }

  protected async getExtendedKey(derivationPath: string): Promise<ExtendedPublicKey> {
    const app = await this.transport.getApplication();

    const { publicKey, chainCode } = await app.getAddress(derivationPath, false, true);
    return {
      publicKey,
      chainCode
    };
  }

  protected async getHardenedAddress(derivationPath: DerivationPath, index: number): Promise<string> {
    const app = await this.transport.getApplication();

    const { address } = await app.getAddress(getFullPath(derivationPath, index));
    return address;
  }

  getType(): WalletType {
    return WalletType.Ledger;
  }

  /**
   * Get the app name and version from the device.
   *
   * Adapted from:
   * https://github.com/LedgerHQ/ledger-live-common/blob/79d5ddbdb277bc65536d66121c89cae0d639bad6/src/hw/getAppAndVersion.js
   *
   * @return {Promise<AppMetadata>}
   */
  private async getMetadata(): Promise<AppMetadata> {
    const result = await this.transport.send(0xb0, 0x01, 0x00, 0x00);
    const format = result[0];

    if (format !== 1) {
      throw new Error('Cannot get metadata from device: Format not supported');
    }

    const [name, nameLength] = parseRawData(result, 1);
    const [version] = parseRawData(result, 1 + nameLength);

    return { name, version };
  }
}
