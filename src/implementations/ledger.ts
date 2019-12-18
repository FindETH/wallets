import { DerivationPath, LEDGER_DERIVATION_PATHS, LEDGER_ETH } from '../derivation-paths';
import { HardwareWallet, KeyInfo } from '../hardware-wallet';
import { getFullPath } from '../utils';
import { TransportWrapper } from './transports';

export class Ledger<Descriptor> extends HardwareWallet {
  /**
   * Initialise the Ledger wallet with a specific Transport (e.g. U2F, WebUSB or WebBluetooth).
   *
   * @param {TransportWrapper<Descriptor>} transport
   * @template Descriptor
   */
  constructor(private readonly transport: TransportWrapper<Descriptor>) {
    super();
  }

  async connect(): Promise<void> {
    // Fetch a random address to ensure the connection works
    await this.getAddress(LEDGER_ETH, 50);
  }

  getDerivationPaths(): DerivationPath[] {
    return LEDGER_DERIVATION_PATHS;
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
