import { HDNode } from '@ethersproject/hdnode';
import { DerivationPath } from './derivation-paths';
import { createExtendedPublicKey, getPathPrefix } from './utils';
import { memoize } from './utils/memoize';
import { Wallet } from './wallet';

export interface KeyInfo {
  publicKey: string;
  chainCode: string;
}

export abstract class HardwareWallet implements Wallet {
  constructor() {
    this.getHDNode = memoize(this.getHDNode.bind(this));
  }

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

    const hdNode = await this.getHDNode(derivationPath);
    return hdNode.derivePath(`${index}`).address;
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
  protected abstract getKeyInfo(derivationPath: string): Promise<KeyInfo>;

  /**
   * Get an address from the device, using hardened derivation.
   *
   * @param {DerivationPath} derivationPath
   * @param {number} index
   * @return {Promise<string>}
   */
  protected abstract getHardenedAddress(derivationPath: DerivationPath, index: number): Promise<string>;

  /**
   * Get an instance of the HDNode class, based on the derivation path.
   *
   * @param {DerivationPath} derivationPath
   * @return {Promise<HDNode>}
   */
  private async getHDNode(derivationPath: DerivationPath): Promise<HDNode> {
    const childPath = getPathPrefix(derivationPath.path);
    const childInfo = await this.getKeyInfo(childPath);

    const parentPath = getPathPrefix(childPath);
    const parentInfo = await this.getKeyInfo(parentPath);

    const extendedKey = createExtendedPublicKey(childPath, parentInfo, childInfo);
    return HDNode.fromExtendedKey(extendedKey);
  }
}
