import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { LedgerWebHID } from './web-hid';

jest.mock('@ledgerhq/hw-transport-webhid');

describe('LedgerWebHID', () => {
  it('initialises the application', async () => {
    const wrapper = new LedgerWebHID();

    await expect(wrapper.getApplication()).resolves.toBeDefined();
    expect(TransportWebHID.request).toHaveBeenCalledTimes(1);
  });

  it('initialises the application only once', async () => {
    const wrapper = new LedgerWebHID();

    await wrapper.getApplication();
    expect(TransportWebHID.request).toHaveBeenCalledTimes(1);

    await wrapper.getApplication();
    expect(TransportWebHID.request).toHaveBeenCalledTimes(1);
  });
});
