import { DerivationPath } from './derivation-paths';
import { HDNode } from './hdnode';
import { getPathPrefix, memoize } from './utils';
import { Wallet } from './wallet';

export interface ExtendedKey {
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
    return hdNode.derive(`m/${index}`).address;
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
   * @return {Promise<ExtendedKey>}
   */
  protected abstract getExtendedKey(derivationPath: string): Promise<ExtendedKey>;

  /**
   * Get an address from the device, using derivation at a hardened level.
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
    const childKey = await this.getExtendedKey(childPath);

    const parentPath = getPathPrefix(childPath);
    const parentKey = await this.getExtendedKey(parentPath);

    return HDNode.fromParentChildKey(childPath, parentKey, childKey);
  }
}
