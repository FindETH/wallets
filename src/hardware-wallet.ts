import { computeAddress } from '@ethersproject/transactions';
import HDKey from 'hdkey';
import { DerivationPath } from './derivation-paths';
import { Wallet } from './wallet';

export interface KeyInfo {
  publicKey: string;
  chainCode: string;
}

export abstract class HardwareWallet implements Wallet {
  private cachedDerivationPath?: DerivationPath;
  private cachedKeyInfo?: KeyInfo;

  /**
   * Get an address from the device.
   *
   * @param {DerivationPath} derivationPath
   * @param {number} index
   * @return {Promise<string>}
   */
  async getAddress(derivationPath: DerivationPath, index: number): Promise<string> {
    if (derivationPath.isHardened) {
      return this.getHardenedAddress(derivationPath, index);
    }

    const hdKey = await this.getHDKey(derivationPath);
    const publicKey = hdKey.derive(`m/${index}`).publicKey;

    return computeAddress(publicKey);
  }

  /**
   * Connect to the device.
   *
   * @return {Promise<void>}
   */
  abstract connect(): Promise<void>;

  /**
   * Get all derivation paths supported by the device.
   *
   * @return {DerivationPath[]}
   */
  abstract getDerivationPaths(): DerivationPath[];

  /**
   * Get the chain code and public key from the device, based on the derivation path.
   *
   * @param {DerivationPath} derivationPath
   * @return {Promise<KeyInfo>}
   */
  protected abstract getKeyInfo(derivationPath: DerivationPath): Promise<KeyInfo>;

  /**
   * Get an address from the device, using hardened derivation.
   *
   * @param {DerivationPath} derivationPath
   * @param {number} index
   * @return {Promise<string>}
   */
  protected abstract getHardenedAddress(derivationPath: DerivationPath, index: number): Promise<string>;

  /**
   * Get an instance of the HDKey class, based on the derivation path.
   *
   * @param {DerivationPath} derivationPath
   * @return {Promise<any>}
   */
  private async getHDKey(derivationPath: DerivationPath): Promise<HDKey> {
    if (derivationPath !== this.cachedDerivationPath || !this.cachedKeyInfo) {
      this.cachedKeyInfo = await this.getKeyInfo(derivationPath);
    }
    this.cachedDerivationPath = derivationPath;

    const keyInfo = this.cachedKeyInfo;
    const hdKey = new HDKey();
    hdKey.publicKey = Buffer.from(keyInfo.publicKey, 'hex');
    hdKey.chainCode = Buffer.from(keyInfo.chainCode, 'hex');

    return hdKey;
  }
}
