import TransportU2F from '@ledgerhq/hw-transport-u2f';
import { LedgerU2F } from './u2f';

jest.mock('@ledgerhq/hw-transport-u2f');

describe('LedgerU2F', () => {
  it('initialises the application', async () => {
    const wrapper = new LedgerU2F();

    await expect(wrapper.getApplication()).resolves.toBeDefined();
    expect(TransportU2F.open).toHaveBeenCalledTimes(1);
  });

  it('initialises the application only once', async () => {
    const wrapper = new LedgerU2F();

    await wrapper.getApplication();
    expect(TransportU2F.open).toHaveBeenCalledTimes(1);

    await wrapper.getApplication();
    expect(TransportU2F.open).toHaveBeenCalledTimes(1);
  });
});
