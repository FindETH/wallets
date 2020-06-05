import { ALL_DERIVATION_PATHS, DEFAULT_ETH, DerivationPath } from '../derivation-paths';
import { HardwareWallet } from '../hardware-wallet';
import { WalletType } from '../wallet';
import { WebUSBKeepKeyAdapter } from '@shapeshiftoss/hdwallet-keepkey-webusb';
import { HDWallet, Keyring, supportsETH } from '@shapeshiftoss/hdwallet-core';
import { getFullPath, toArray } from '../utils';

interface SerializedData {
  type?: string;
}

export class KeepKey extends HardwareWallet {
  private readonly keyring: Keyring = new Keyring();
  private readonly adapter: WebUSBKeepKeyAdapter = WebUSBKeepKeyAdapter.useKeyring(this.keyring);
  private wallet: HDWallet | null = null;

  /**
   * Get a class instance from serialized data. Useful for using the class in a web worker.
   *
   * @param {string} serializedData
   * @return {KeepKey}
   */
  static deserialize(serializedData: string): KeepKey {
    const json = JSON.parse(serializedData) as SerializedData;
    if (json?.type !== WalletType.KeepKey) {
      throw new Error('Serialized data is invalid: `type` key is not valid for this class');
    }

    return new KeepKey();
  }

  async connect(): Promise<void> {
    this.wallet = await this.adapter.pairDevice();

    // Fetch a random address to ensure the connection works
    await this.getAddress(DEFAULT_ETH, 50);
  }

  getDerivationPaths(): DerivationPath[] {
    // TODO: Check support for all derivation paths
    return ALL_DERIVATION_PATHS;
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.Trezor
    });
  }

  protected async getExtendedKey(derivationPath: string): Promise<string> {
    if (!this.wallet) {
      throw new Error('Not connected');
    }

    const pathList = toArray(derivationPath);
    const publicKeys = await this.wallet.getPublicKeys([{ addressNList: pathList, curve: 'secp256k1' }]);
    if (publicKeys.length < 0 || !publicKeys[0]) {
      throw new Error('Could not fetch public key from device');
    }

    return publicKeys[0].xpub;
  }

  protected async getHardenedAddress(derivationPath: DerivationPath, index: number): Promise<string> {
    if (!this.wallet) {
      throw new Error('Not connected');
    }

    const pathList = toArray(getFullPath(derivationPath, index));
    if (supportsETH(this.wallet)) {
      return this.wallet.ethGetAddress({ addressNList: pathList });
    }

    throw new Error('ETH not supported');
  }
}
