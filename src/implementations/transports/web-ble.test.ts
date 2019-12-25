import TransportWebBLE from '@ledgerhq/hw-transport-web-ble';
import { LedgerWebBLE } from './web-ble';

jest.mock('@ledgerhq/hw-transport-web-ble');

describe('LedgerWebBLE', () => {
  it('initialises the application', async () => {
    const wrapper = new LedgerWebBLE();

    await expect(wrapper.getApplication()).resolves.toBeDefined();
    expect(TransportWebBLE.open).toHaveBeenCalledTimes(1);
  });

  it('initialises the application only once', async () => {
    const wrapper = new LedgerWebBLE();

    await wrapper.getApplication();
    expect(TransportWebBLE.open).toHaveBeenCalledTimes(1);

    await wrapper.getApplication();
    expect(TransportWebBLE.open).toHaveBeenCalledTimes(1);
  });

  it('uses a descriptor if provided', async () => {
    // TODO
  });

  it('serializes to a string', () => {
    const wrapper = new LedgerWebBLE();

    expect(wrapper.toString()).toMatchSnapshot();
  });
});
