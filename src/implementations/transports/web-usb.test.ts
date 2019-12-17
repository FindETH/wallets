import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { LedgerWebUSB } from './web-usb';

jest.mock('@ledgerhq/hw-transport-webusb');

describe('LedgerWebUSB', () => {
  it('initialises the application', async () => {
    const wrapper = new LedgerWebUSB();

    await expect(wrapper.getApplication()).resolves.toBeDefined();
    expect(TransportWebUSB.request).toHaveBeenCalledTimes(1);
  });

  it('initialises the application only once', async () => {
    const wrapper = new LedgerWebUSB();

    await wrapper.getApplication();
    expect(TransportWebUSB.request).toHaveBeenCalledTimes(1);

    await wrapper.getApplication();
    expect(TransportWebUSB.request).toHaveBeenCalledTimes(1);
  });
});
