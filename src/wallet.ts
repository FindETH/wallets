import { DerivationPath } from './derivation-paths';
import { Ledger, MnemonicPhrase, Trezor } from './implementations';

export interface Wallet {
  /**
   * Get all derivation paths supported by the wallet.
   *
   * @return {DerivationPath[]}
   */
  getDerivationPaths(): DerivationPath[];

  /**
   * Get an address from the wallet, based on the derivation path and index.
   *
   * @param {DerivationPath} derivationPath
   * @param {number} index
   * @return {number}
   */
  getAddress(derivationPath: DerivationPath, index: number): Promise<string>;

  /**
   * Optional function to prefetch necessary info from a device, if applicable. Can optionally return the pre-fetched
   * data, which may be useful for testing purposes.
   *
   * @param {DerivationPath[]} derivationPaths
   * @return {Promise<T>}
   * @template T
   */
  prefetch?(derivationPaths: DerivationPath[]): Promise<unknown>;
}

export enum WalletType {
  KeepKey = 'KeepKey',
  Ledger = 'Ledger',
  MnemonicPhrase = 'MnemonicPhrase',
  Trezor = 'Trezor'
}

const SUPPORTED_WALLETS = {
  [WalletType.Ledger]: Ledger,
  [WalletType.MnemonicPhrase]: MnemonicPhrase,
  [WalletType.Trezor]: Trezor
};

/**
 * Checks if a string is a valid type of WalletType.
 *
 * @param {string} type
 * @return {boolean}
 */
export const isWalletType = (type: string): type is WalletType => {
  return Object.values(WalletType).includes(type as WalletType);
};

/**
 * Get the wallet implemention class for a specific wallet type.
 *
 * @param {Type} type
 * @return {new (...args: unknown[]): Type}
 * @template Type
 */
export const getWalletImplementation = <Type extends WalletType>(type: Type): typeof SUPPORTED_WALLETS[Type] => {
  return SUPPORTED_WALLETS[type];
};

/**
 * Deserialize a wallet implementation from a string.
 *
 * @param {string} serializedData
 * @return {Ledger<*> | Trezor | MnemonicPhrase>}
 */
export const deserialize = (serializedData: string): Ledger<unknown> | Trezor | MnemonicPhrase => {
  const json = JSON.parse(serializedData);
  if (!json.type) {
    throw new Error('Serialized data is invalid: missing `type` key');
  }

  const type = json.type;
  if (!isWalletType(type)) {
    throw new Error('Serialized data is invalid: `type` is not a valid type of WalletType');
  }

  const implementation = getWalletImplementation(type);
  return implementation.deserialize(serializedData);
};
