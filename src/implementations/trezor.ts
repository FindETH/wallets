import { ExtendedPublicKey, dehexify } from '@findeth/hdnode';
import TrezorConnect from 'trezor-connect';
import { TREZOR_MANIFEST_EMAIL, TREZOR_MANIFEST_URL } from '../constants';
import { DEFAULT_ETH, DerivationPath, TREZOR_DERIVATION_PATHS } from '../derivation-paths';
import { HardwareWallet } from '../hardware-wallet';
import { WalletType } from '../types';
import { getFullPath, getPathPrefix } from '../utils';
import { SignedMessage } from '../wallet';

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
      throw new Error('Serialized data is invalid: `type` key is not valid for this class');
    }

    return new Trezor();
  }

  cache: Record<string, ExtendedPublicKey> = {};

  async connect(): Promise<void> {
    this.cache = {};

    try {
      await TrezorConnect.init({
        manifest: {
          email: TREZOR_MANIFEST_EMAIL,
          appUrl: TREZOR_MANIFEST_URL
        }
      });
    } catch {
      // noop
    }

    try {
      // Fetch a random address to ensure the connection works
      await this.getAddress(DEFAULT_ETH, 50);
    } catch {
      // Trezor-connect doesn't return "pretty" errors
      throw new Error('Unable to connect to Trezor device.');
    }
  }

  async prefetch(derivationPaths: DerivationPath[]): Promise<Record<string, ExtendedPublicKey>> {
    const bundle = derivationPaths
      .filter((path) => !path.isHardened)
      .reduce<string[]>((paths, { path }) => {
        const childPath = getPathPrefix(path);
        const parentPath = getPathPrefix(childPath);

        return [...paths, childPath, parentPath];
      }, [])
      .map((path) => ({ path }));

    const response = await TrezorConnect.getPublicKey({ bundle });
    for (const { serializedPath, chainCode, publicKey } of response.payload) {
      this.cache[serializedPath] = { chainCode, publicKey };
    }

    return this.cache;
  }

  async signMessage(derivationPath: DerivationPath, index: number, message: string): Promise<SignedMessage> {
    const path = getFullPath(derivationPath, index);

    const { payload } = await TrezorConnect.ethereumSignMessage({ path, message });
    const signature = dehexify(payload.signature);
    return {
      message,
      address: payload.address,
      signature: {
        v: signature[65],
        r: signature.slice(0, 32),
        s: signature.slice(32, 64)
      }
    };
  }

  getDerivationPaths(): DerivationPath[] {
    return TREZOR_DERIVATION_PATHS;
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.Trezor
    });
  }

  getType(): WalletType {
    return WalletType.Trezor;
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
