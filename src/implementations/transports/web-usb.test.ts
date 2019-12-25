import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { LedgerWebUSB } from './web-usb';

jest.mock('@ledgerhq/hw-transport-webusb');

navigator.usb.getDevices = jest.fn(
  async () =>
    [
      {
        serialNumber: 'foo bar'
      }
    ] as USBDevice[]
);

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

  it('uses a descriptor if provided', async () => {
    const wrapper = new LedgerWebUSB('foo bar');

    await wrapper.getApplication();
    expect(TransportWebUSB.open).toHaveBeenCalledWith({
      serialNumber: 'foo bar'
    });
  });

  it('serializes to a string', () => {
    const wrapper = new LedgerWebUSB();

    expect(wrapper.toString()).toMatchSnapshot();
  });
});
