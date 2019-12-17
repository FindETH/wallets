import { DEFAULT_ETC, DEFAULT_ETH, getFullPath, LEDGER_LIVE_ETH, TREZOR_DERIVATION_PATHS } from './derivation-paths';

describe('getFullPath', () => {
  it('returns the full derivation path for non-hardened paths', () => {
    expect(getFullPath(DEFAULT_ETH, 0)).toBe(`m/44'/60'/0'/0/0`);
    expect(getFullPath(DEFAULT_ETH, 1)).toBe(`m/44'/60'/0'/0/1`);
    expect(getFullPath(DEFAULT_ETC, 0)).toBe(`m/44'/61'/0'/0/0`);
    expect(getFullPath(DEFAULT_ETC, 1)).toBe(`m/44'/61'/0'/0/1`);
  });

  it('returns the full derivation path for hardened paths', () => {
    expect(getFullPath(LEDGER_LIVE_ETH, 0)).toBe(`m/44'/60'/0'/0/0`);
    expect(getFullPath(LEDGER_LIVE_ETH, 1)).toBe(`m/44'/60'/1'/0/0`);
  });
});

describe('TREZOR_DERIVATION_PATHS', () => {
  it('does not include hardened derivation paths', () => {
    TREZOR_DERIVATION_PATHS.forEach(derivationPath => {
      expect(derivationPath.isHardened).toBeFalsy();
    });
  });
});
