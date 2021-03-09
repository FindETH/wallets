import { Ledger, MnemonicPhrase, Trezor, ExtendedKey } from './implementations';
import { WalletType } from './types';

const SUPPORTED_WALLETS = {
  [WalletType.ExtendedKey]: ExtendedKey,
  [WalletType.Ledger]: Ledger,
  [WalletType.MnemonicPhrase]: MnemonicPhrase,
  [WalletType.Trezor]: Trezor
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
