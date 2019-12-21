import TrezorConnect from 'trezor-connect';
import { TREZOR_MANIFEST_EMAIL, TREZOR_MANIFEST_URL } from '../constants';
import { DEFAULT_ETH, DerivationPath, TREZOR_DERIVATION_PATHS } from '../derivation-paths';
import { HardwareWallet, KeyInfo } from '../hardware-wallet';
import { getFullPath } from '../utils';

export class Trezor extends HardwareWallet {
  private cache: Record<string, KeyInfo> = {};

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

  async prefetch(derivationPaths: DerivationPath[]): Promise<Record<string, KeyInfo>> {
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

  protected async getKeyInfo(derivationPath: string): Promise<KeyInfo> {
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
