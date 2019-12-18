import { LEDGER_DERIVATION_PATHS, TREZOR_DERIVATION_PATHS } from './derivation-paths';

describe('TREZOR_DERIVATION_PATHS', () => {
  it('does not include hardened derivation paths', () => {
    TREZOR_DERIVATION_PATHS.forEach(derivationPath => {
      expect(derivationPath.isHardened).toBeFalsy();
    });
  });
});

describe('LEDGER_DERIVATION_PATHS', () => {
  it(`does not include derivation paths that don't start with m/44'/60' or m/44'/1'`, () => {
    LEDGER_DERIVATION_PATHS.forEach(derivationPath => {
      expect(derivationPath.path.startsWith(`m/44'/60'`) || derivationPath.path.startsWith(`m/44'/1'`)).toBeTruthy();
    });
  });
});
