import { DerivationPath } from './derivation-paths';
import { getFullPath } from './utils';
import { Wallet } from './wallet';

export interface DerivationResult {
  address: string;
  derivationPath: string;
}

/**
 * Get all addresses from a wallet, based on the derivation paths and depth specified, using a generator.
 *
 * @param {Wallet} wallet
 * @param {DerivationPath[]} derivationPaths
 * @param {number} depth
 * @return {AsyncGenerator<DerivationResult>}
 */
export async function* getAddresses(
  wallet: Wallet,
  derivationPaths: DerivationPath[],
  depth: number
): AsyncGenerator<DerivationResult> {
  for (const derivationPath of derivationPaths) {
    for (let index = 0; index < depth; index++) {
      const address = await wallet.getAddress(derivationPath, index);
      yield { address, derivationPath: getFullPath(derivationPath, index) };
    }
  }
}
