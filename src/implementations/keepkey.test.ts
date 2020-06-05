import { ALL_DERIVATION_PATHS, DEFAULT_ETH, LEDGER_DERIVATION_PATHS, LEDGER_LIVE_ETH } from '../derivation-paths';
import { KeepKey } from './keepkey';

jest.mock('@ledgerhq/hw-transport-webusb');

navigator.usb.requestDevice = jest.fn();

describe('KeepKey', () => {
  const wallet = new KeepKey();

  it('initializes the connection', async () => {
    await wallet.connect();
  });

  it('derives an address from a derivation path', async () => {
    await expect(wallet.getAddress(DEFAULT_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(DEFAULT_ETH, 15)).resolves.toMatchSnapshot();
  });

  it('derives an address from a hardened derivation path', async () => {
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 15)).resolves.toMatchSnapshot();
  });

  it(`doesn't support all derivation paths'`, () => {
    expect(wallet.getDerivationPaths()).not.toStrictEqual(ALL_DERIVATION_PATHS);
    expect(wallet.getDerivationPaths()).toStrictEqual(LEDGER_DERIVATION_PATHS);
  });

  it('serializes to a string', () => {
    expect(wallet.serialize()).toMatchSnapshot();
  });

  it('deserializes from a string', () => {
    expect(
      KeepKey.deserialize(
        '{"type": "KeepKey"}'
      )
    ).toMatchSnapshot();
  });
});
