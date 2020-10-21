import { ExtendedPublicKey, dehexify } from '@findeth/hdnode';
import { Network } from '@findeth/networks';
import Transport from '@ledgerhq/hw-transport';
import { DerivationPath, getDerivationPaths, LEDGER_DERIVATION_PATHS, LEDGER_ETH } from '../derivation-paths';
import { HardwareWallet } from '../hardware-wallet';
import { WalletType } from '../types';
import { getFullPath, getTransportImplementation, isTransportType } from '../utils';
import { SignedMessage } from '../wallet';
import { TransportWrapper } from './transports';

interface SerializedData {
  type: string;
  transport: string;
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

  getDerivationPaths(network: Network): DerivationPath[] {
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
}
