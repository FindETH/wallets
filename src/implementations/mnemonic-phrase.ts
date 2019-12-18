import { HDNode } from '@ethersproject/hdnode';
import { ALL_DERIVATION_PATHS, DerivationPath } from '../derivation-paths';
import { getFullPath } from '../utils';
import { Wallet } from '../wallet';

export class MnemonicPhrase implements Wallet {
  private readonly hdNode: HDNode;

  /**
   * Construct an instance of the mnemonic phrase wallet class.
   *
   * @param mnemonicPhrase
   * @param passphrase
   */
  constructor(mnemonicPhrase: string, passphrase?: string) {
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
}
