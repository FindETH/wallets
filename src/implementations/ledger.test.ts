import { getDefaultNetwork } from '@findeth/networks';
import { ALL_DERIVATION_PATHS, DEFAULT_ETH, LEDGER_DERIVATION_PATHS, LEDGER_LIVE_ETH } from '../derivation-paths';
import { Ledger } from './ledger';
import { LedgerWebUSB } from './transports';

jest.mock('@ledgerhq/hw-transport-webusb');

navigator.usb.requestDevice = jest.fn();

describe('Ledger', () => {
  const wallet = new Ledger(new LedgerWebUSB());

  it('initializes the connection', async () => {
    await expect(wallet.connect()).resolves.not.toThrow();
  });

  it('derives an address from a derivation path', async () => {
    await expect(wallet.getAddress(DEFAULT_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(DEFAULT_ETH, 15)).resolves.toMatchSnapshot();
  });

  it('derives an address from a hardened derivation path', async () => {
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 10)).resolves.toMatchSnapshot();
    await expect(wallet.getAddress(LEDGER_LIVE_ETH, 15)).resolves.toMatchSnapshot();
  });

  it('supports all derivation paths', async () => {
    await expect(wallet.getDerivationPaths(getDefaultNetwork())).resolves.toStrictEqual(ALL_DERIVATION_PATHS);
  });

  it('only supports Ethereum paths', async () => {
    await expect(wallet.getDerivationPaths(getDefaultNetwork())).resolves.toStrictEqual(LEDGER_DERIVATION_PATHS);
  });

  it('serializes to a string', () => {
    expect(wallet.serialize()).toMatchSnapshot();
  });

  it('deserializes from a string', () => {
    expect(
      Ledger.deserialize(
        '{"type": "Ledger", "transport": "{\\"type\\": \\"WebUSB\\", \\"descriptor\\": \\"foobar\\"}"}'
      )
    ).toMatchSnapshot();
  });
});
