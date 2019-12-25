import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { LedgerWebHID } from './web-hid';

jest.mock('@ledgerhq/hw-transport-webhid');

navigator.hid.getDevices = jest.fn(
  async () =>
    [
      {
        productId: 0x1337
      }
    ] as HIDDevice[]
);

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

  it('uses a descriptor if provided', async () => {
    const wrapper = new LedgerWebHID(0x1337);

    await wrapper.getApplication();
    expect(TransportWebHID.open).toHaveBeenCalledWith({
      productId: 0x1337
    });
  });

  it('serializes to a string', () => {
    const wrapper = new LedgerWebHID();

    expect(wrapper.toString()).toMatchSnapshot();
  });
});
