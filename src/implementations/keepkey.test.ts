import { ALL_DERIVATION_PATHS, DEFAULT_ETH, LEDGER_LIVE_ETH } from '../derivation-paths';
import { KeepKey } from './keepkey';

jest.mock('@shapeshiftoss/hdwallet-keepkey-webusb');
jest.mock('@shapeshiftoss/hdwallet-keepkey');
jest.mock('@shapeshiftoss/hdwallet-core');

navigator.usb.requestDevice = jest.fn();

describe('KeepKey', () => {
  const wallet = new KeepKey();

  it('initializes the connection', async () => {
    await expect(wallet.connect(async () => '12345')).resolves.not.toThrow();
  });

  it('derives an address from a derivation path', async () => {
    await expect(wallet.getAddress(DEFAULT_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(DEFAULT_ETH, 15)).resolves.toMatchSnapshot();
  });

  it('derives an address from a hardened derivation path', async () => {
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 15)).resolves.toMatchSnapshot();
  });

  it("supports all derivation paths'", () => {
    expect(wallet.getDerivationPaths()).toStrictEqual(ALL_DERIVATION_PATHS);
  });

  it('serializes to a string', () => {
    expect(wallet.serialize()).toMatchSnapshot();
  });

  it('deserializes from a string', () => {
    expect(KeepKey.deserialize('{"type": "KeepKey"}')).toMatchSnapshot();
  });
});
