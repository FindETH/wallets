import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import { LedgerNodeHid } from './node-hid';

jest.mock('@ledgerhq/hw-transport-u2f');

describe('LedgerNodeHid', () => {
  it('initialises the application', async () => {
    const wrapper = new LedgerNodeHid();

    await expect(wrapper.getApplication()).resolves.toBeDefined();
    expect(TransportNodeHid.open).toHaveBeenCalledTimes(1);
  });

  it('initialises the application only once', async () => {
    const wrapper = new LedgerNodeHid();

    await wrapper.getApplication();
    expect(TransportNodeHid.open).toHaveBeenCalledTimes(1);

    await wrapper.getApplication();
    expect(TransportNodeHid.open).toHaveBeenCalledTimes(1);
  });

  it('checks if the transport is supported', async () => {
    await expect(LedgerNodeHid.isSupported()).resolves.toBeTruthy();
    expect(TransportNodeHid.isSupported).toHaveBeenCalledTimes(1);
  });
});
