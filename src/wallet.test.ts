import { Ledger, MnemonicPhrase, Trezor } from './implementations';
import { getWalletImplementation, WalletType } from './wallet';

describe('getWalletImplementation', () => {
  it('returns the wallet implementation for a wallet type', () => {
    expect(getWalletImplementation(WalletType.Ledger)).toBe(Ledger);
    expect(getWalletImplementation(WalletType.Trezor)).toBe(Trezor);
    expect(getWalletImplementation(WalletType.MnemonicPhrase)).toBe(MnemonicPhrase);
  });
});
