import { manifest } from 'trezor-connect';
import { DEFAULT_ETH, LEDGER_LIVE_ETH, TESTNET_ETH, TREZOR_DERIVATION_PATHS } from '../derivation-paths';
import { Trezor } from './trezor';

jest.mock('trezor-connect');

describe('Trezor', () => {
  it('derives an address from a derivation path', async () => {
    const wallet = new Trezor();
    await wallet.connect();

    expect(manifest).toHaveBeenCalledTimes(1);

    await expect(wallet.getAddress(DEFAULT_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(DEFAULT_ETH, 15)).resolves.toMatchSnapshot();
  });

  it('derives an address from a hardened derivation path', async () => {
    const wallet = new Trezor();
    await wallet.connect();

    expect(manifest).toHaveBeenCalledTimes(1);

    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 15)).resolves.toMatchSnapshot();
  });

  it('pre-fetches multiple addresses', async () => {
    const wallet = new Trezor();
    await wallet.connect();

    const paths = [DEFAULT_ETH, TESTNET_ETH];

    await expect(wallet.prefetch(paths)).resolves.toMatchSnapshot();
  });

  it(`doesn't support all derivation paths'`, () => {
    const wallet = new Trezor();

    expect(wallet.getDerivationPaths()).toStrictEqual(TREZOR_DERIVATION_PATHS);
  });
});
