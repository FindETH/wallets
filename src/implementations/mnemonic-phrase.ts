import { HDNode } from '@ethersproject/hdnode';
import { ALL_DERIVATION_PATHS, DerivationPath } from '../derivation-paths';
import { getFullPath } from '../utils';
import { Wallet, WalletType } from '../wallet';

interface SerializedData {
  type?: string;
  mnemonicPhrase?: string;
  passphrase?: string;
}

export class MnemonicPhrase implements Wallet {
  /**
   * Get a class instance from serialized data. Useful for using the class in a web worker.
   *
   * @param {string} serializedData
   * @return {MnemonicPhrase}
   */
  static deserialize(serializedData: string): MnemonicPhrase {
    const json = JSON.parse(serializedData) as SerializedData;
    if (json?.type !== WalletType.MnemonicPhrase || !json.mnemonicPhrase) {
      throw new Error('Invalid serialized data');
    }

    return new MnemonicPhrase(json.mnemonicPhrase, json.passphrase);
  }

  private readonly mnemonicPhrase: string;
  private readonly passphrase?: string;
  private readonly hdNode: HDNode;

  /**
   * Construct an instance of the mnemonic phrase wallet class.
   *
   * @param mnemonicPhrase
   * @param passphrase
   */
  constructor(mnemonicPhrase: string, passphrase?: string) {
    this.mnemonicPhrase = mnemonicPhrase;
    this.passphrase = passphrase;
    this.hdNode = HDNode.fromMnemonic(mnemonicPhrase, passphrase);
  }

  /**
   * Get all derivation paths supported by mnemonic phrases.
   *
   * @return {DerivationPath[]}
   */
  getDerivationPaths(): DerivationPath[] {
    return ALL_DERIVATION_PATHS;
  }

  /**
   * Get an address for the mnemonic phrase based on the derivation path and index.
   *
   * @param derivationPath
   * @param index
   * @return {Promise<string>}
   */
  async getAddress(derivationPath: DerivationPath, index: number): Promise<string> {
    const fullPath = getFullPath(derivationPath, index);
    return this.hdNode.derivePath(fullPath).address;
  }

  serialize(): string {
    return JSON.stringify({
      type: WalletType.MnemonicPhrase,
      mnemonicPhrase: this.mnemonicPhrase,
      passphrase: this.passphrase
    });
  }
}
