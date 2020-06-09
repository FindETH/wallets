import { Keyring, supportsETH } from '@shapeshiftoss/hdwallet-core';
import { isKeepKey, KeepKeyHDWallet } from '@shapeshiftoss/hdwallet-keepkey';
import { WebUSBKeepKeyAdapter } from '@shapeshiftoss/hdwallet-keepkey-webusb';
import { ALL_DERIVATION_PATHS, DEFAULT_ETH, DerivationPath } from '../derivation-paths';
import { HardwareWallet } from '../hardware-wallet';
import { getFullPath, toArray } from '../utils';
import { WalletType } from '../wallet';

interface SerializedData {
  type?: string;
}

export class KeepKey extends HardwareWallet {
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

  private readonly keyring: Keyring = new Keyring();
  private readonly adapter: WebUSBKeepKeyAdapter = WebUSBKeepKeyAdapter.useKeyring(this.keyring);
  private wallet: KeepKeyHDWallet | null = null;

  async connect(handleUnlock?: () => Promise<string>): Promise<void> {
    const wallet = await this.adapter.pairDevice();

    // This should never be the case, but is required to get the right wallet type without having to cast it manually
    if (!isKeepKey(wallet)) {
      throw new Error('Invalid device connected');
    }

    this.wallet = wallet;

    if (!(await this.wallet.isInitialized())) {
      await this.wallet.initialize();
    }

    if (await this.isLocked()) {
      if (!handleUnlock) {
        throw new Error('Device is locked, but no callback for `handleUnlock` was passed');
      }

      const pin = await handleUnlock();
      await this.wallet.sendPin(pin);
    }

    // Fetch a random address to ensure the connection works
    await this.getAddress(DEFAULT_ETH, 50);
  }

  getDerivationPaths(): DerivationPath[] {
    // TODO: Check support for all derivation paths
    return ALL_DERIVATION_PATHS;
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.KeepKey
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

  /**
   * Check if the device is locked with a PIN. Does not support passphrases currently.
   *
   * @return {Promise<boolean>}
   */
  private async isLocked(): Promise<boolean> {
    if (!this.wallet) {
      throw new Error('Not connected');
    }

    const features = await this.wallet.getFeatures();
    return (features?.pinProtection && !features.pinCached) ?? false;
  }
}
