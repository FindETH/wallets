import { getWalletImplementation } from './implementation';
import { WalletType } from './types';

describe('getWalletImplementation', () => {
  it('returns the wallet implementation for a wallet type', () => {
    expect(getWalletImplementation(WalletType.Ledger).name).toBe('Ledger');
    expect(getWalletImplementation(WalletType.Trezor).name).toBe('Trezor');
    expect(getWalletImplementation(WalletType.MnemonicPhrase).name).toBe('MnemonicPhrase');
  });
});
