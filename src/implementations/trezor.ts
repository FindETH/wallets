import { ExtendedPublicKey } from '@findeth/hdnode';
import TrezorConnect from 'trezor-connect';
import { TREZOR_MANIFEST_EMAIL, TREZOR_MANIFEST_URL } from '../constants';
import { DEFAULT_ETH, DerivationPath, TREZOR_DERIVATION_PATHS } from '../derivation-paths';
import { HardwareWallet } from '../hardware-wallet';
import { getFullPath } from '../utils';
import { WalletType } from '../wallet';

interface SerializedData {
  type?: string;
}

export class Trezor extends HardwareWallet {
  /**
   * Get a class instance from serialized data. Useful for using the class in a web worker.
   *
   * @param {string} serializedData
   * @return {Trezor}
   */
  static deserialize(serializedData: string): Trezor {
    const json = JSON.parse(serializedData) as SerializedData;
    if (json?.type !== WalletType.Trezor) {
      throw new Error('Invalid serialized data');
    }

    return new Trezor();
  }

  private cache: Record<string, ExtendedPublicKey> = {};

  async connect(): Promise<void> {
    this.cache = {};

    await TrezorConnect.init({
      // TODO: Figure out how to get WebUSB to work
      // webusb: true,
      // popup: false,
      manifest: {
        email: TREZOR_MANIFEST_EMAIL,
        appUrl: TREZOR_MANIFEST_URL
      }
    });

    // Fetch a random address to ensure the connection works
    await this.getAddress(DEFAULT_ETH, 50);
  }

  async prefetch(derivationPaths: DerivationPath[]): Promise<Record<string, ExtendedPublicKey>> {
    const bundle = derivationPaths.filter(path => !path.isHardened).map(path => ({ path: path.path }));

    const response = await TrezorConnect.getPublicKey({ bundle });
    for (const { serializedPath, chainCode, publicKey } of response.payload) {
      this.cache[serializedPath] = { chainCode, publicKey };
    }

    return this.cache;
  }

  getDerivationPaths(): DerivationPath[] {
    return TREZOR_DERIVATION_PATHS;
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.Trezor
    });
  }

  protected async getExtendedKey(derivationPath: string): Promise<ExtendedPublicKey> {
    if (this.cache[derivationPath]) {
      return this.cache[derivationPath];
    }

    const response = await TrezorConnect.getPublicKey({ path: derivationPath });

    return {
      publicKey: response.payload.publicKey,
      chainCode: response.payload.chainCode
    };
  }

  protected async getHardenedAddress(derivationPath: DerivationPath, index: number): Promise<string> {
    const response = await TrezorConnect.ethereumGetAddress({ path: getFullPath(derivationPath, index) });

    return response.payload.address;
  }
}
