import { HDNode } from '@findeth/hdnode';
import { DerivationPath, EXTENDED_KEY_CHILDREN } from '../derivation-paths';
import { HardwareWallet } from '../hardware-wallet';
import { WalletType } from '../types';
import { getFullPath } from '../utils';
import { SignedMessage, Wallet } from '../wallet';

interface SerializedData {
  type?: string;
  extendedKey?: string;
}

export class ExtendedKey implements Wallet {
  /**
   * Get a class instance from serialized data. Useful for using the class in a web worker.
   *
   * @param {string} serializedData
   * @return {ExtendedKey}
   */
  static deserialize(serializedData: string): ExtendedKey {
    const json = JSON.parse(serializedData) as SerializedData;
    if (json?.type !== WalletType.ExtendedKey || !json.extendedKey) {
      throw new Error('Invalid serialized data');
    }

    return new ExtendedKey(json.extendedKey);
  }

  private readonly hdNode: HDNode;

  /**
   * Construct an instance of the extended key wallet class.
   *
   * @param extendedKey
   */
  constructor(private readonly extendedKey: string) {
    this.hdNode = HDNode.fromExtendedKey(extendedKey);
  }

  /**
   * Get all derivation paths supported by extended keys.
   *
   * @return {DerivationPath[]}
   */
  getDerivationPaths(): DerivationPath[] {
    return [EXTENDED_KEY_CHILDREN];
  }

  /**
   * Get an address for the extended key based on the derivation path and index.
   *
   * @param derivationPath
   * @param index
   * @return {Promise<string>}
   */
  async getAddress(derivationPath: DerivationPath, index: number): Promise<string> {
    if (derivationPath.name !== EXTENDED_KEY_CHILDREN.name) {
      throw new Error('Derivation path not supported by this wallet');
    }

    const fullPath = getFullPath(derivationPath, index);
    return this.hdNode.derive(fullPath).address;
  }

  async signMessage(): Promise<SignedMessage> {
    throw new Error('Not supported');
  }

  isHardwareWallet(): this is HardwareWallet {
    return false;
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.MnemonicPhrase,
      extendedKey: this.extendedKey
    });
  }

  getType(): WalletType {
    return WalletType.ExtendedKey;
  }
}
