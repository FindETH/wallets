import { ALL_DERIVATION_PATHS, DEFAULT_ETH, LEDGER_DERIVATION_PATHS, LEDGER_LIVE_ETH } from '../derivation-paths';
import { Ledger } from './ledger';
import { LedgerWebUSB } from './transports';

jest.mock('@ledgerhq/hw-transport-webusb');

describe('Ledger', () => {
  const wallet = new Ledger(new LedgerWebUSB());

  it('initializes the connection', async () => {
    await wallet.connect();
  });

  it('generates an address from a derivation path', async () => {
    await expect(wallet.getAddress(DEFAULT_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(DEFAULT_ETH, 15)).resolves.toMatchSnapshot();
  });

  it('generates an address from a hardened derivation path', async () => {
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 15)).resolves.toMatchSnapshot();
  });

  it(`doesn't support all derivation paths'`, () => {
    expect(wallet.getDerivationPaths()).not.toStrictEqual(ALL_DERIVATION_PATHS);
    expect(wallet.getDerivationPaths()).toStrictEqual(LEDGER_DERIVATION_PATHS);
  });
});
