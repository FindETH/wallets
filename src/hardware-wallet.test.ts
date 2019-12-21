import TrezorConnect from 'trezor-connect';
import { DEFAULT_ETH } from './derivation-paths';
import { Trezor } from './implementations';

jest.mock('trezor-connect');

describe('HardwareWallet', () => {
  it('caches extended public keys', async () => {
    const implementation = new Trezor();

    await expect(implementation.getAddress(DEFAULT_ETH, 10)).resolves.toBeTruthy();
    await expect(implementation.getAddress(DEFAULT_ETH, 15)).resolves.toBeTruthy();
    await expect(implementation.getAddress(DEFAULT_ETH, 20)).resolves.toBeTruthy();

    expect(TrezorConnect.getPublicKey).toHaveBeenCalledTimes(2);
  });
});
