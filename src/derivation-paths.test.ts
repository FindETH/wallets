import { getSupportedNetworks } from '@findeth/networks';
import { getDerivationPaths, LEDGER_DERIVATION_PATHS, TREZOR_DERIVATION_PATHS } from './derivation-paths';

describe('TREZOR_DERIVATION_PATHS', () => {
  it('does not include hardened derivation paths', () => {
    TREZOR_DERIVATION_PATHS.forEach(derivationPath => {
      expect(derivationPath.isHardened).toBeFalsy();
    });
  });
});

describe('LEDGER_DERIVATION_PATHS', () => {
  it("does not include derivation paths that don't start with m/44'/60' or m/44'/1'", () => {
    LEDGER_DERIVATION_PATHS.forEach(derivationPath => {
      expect(derivationPath.path.startsWith("m/44'/60'") || derivationPath.path.startsWith("m/44'/1'")).toBeTruthy();
    });
  });
});

describe('getDerivationPaths', () => {
  it('returns derivation paths based on a network', () => {
    const networks = getSupportedNetworks();

    expect(getDerivationPaths(networks[0])).toStrictEqual([
      {
        name: 'Default (ETH)',
        path: "m/44'/60'/0'/0/<account>"
      },
      {
        name: 'Ledger Live (ETH)',
        path: "m/44'/60'/<account>'/0/0",
        isHardened: true
      }
    ]);

    expect(getDerivationPaths(networks[1])).toStrictEqual([
      {
        name: 'Default (XDAI)',
        path: "m/44'/700'/0'/0/<account>"
      },
      {
        name: 'Ledger Live (XDAI)',
        path: "m/44'/700'/<account>'/0/0",
        isHardened: true
      }
    ]);
  });
});
