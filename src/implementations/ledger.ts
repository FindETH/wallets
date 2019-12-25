import Transport from '@ledgerhq/hw-transport';
import { DerivationPath, LEDGER_DERIVATION_PATHS, LEDGER_ETH } from '../derivation-paths';
import { HardwareWallet, KeyInfo } from '../hardware-wallet';
import { getFullPath, getTransportImplementation, isTransportType } from '../utils';
import { WalletType } from '../wallet';
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

  getDerivationPaths(): DerivationPath[] {
    return LEDGER_DERIVATION_PATHS;
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.Ledger,
      transport: this.transport.toString()
    });
  }

  protected async getKeyInfo(derivationPath: string): Promise<KeyInfo> {
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
}
