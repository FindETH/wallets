import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { LedgerU2F, LedgerWebHID, LedgerWebUSB } from '../implementations/transports';
import { getLedgerTransport } from './ledger';

jest.mock('@ledgerhq/hw-transport-webusb', () => ({
  isSupported: jest.fn()
}));

jest.mock('@ledgerhq/hw-transport-webhid', () => ({
  isSupported: jest.fn()
}));

jest.mock('@ledgerhq/hw-transport-u2f', () => ({
  isSupported: jest.fn()
}));

describe('getLedgerTransport', () => {
  it('returns the supported transport method', async () => {
    (TransportWebUSB.isSupported as jest.MockedFunction<typeof TransportWebUSB.isSupported>).mockImplementation(
      async () => true
    );

    await expect(getLedgerTransport()).resolves.toBeInstanceOf(LedgerWebUSB);
  });

  it('returns the WebHID method if WebUSB is not supported', async () => {
    (TransportWebUSB.isSupported as jest.MockedFunction<typeof TransportWebUSB.isSupported>).mockImplementation(
      async () => false
    );

    (TransportWebHID.isSupported as jest.MockedFunction<typeof TransportWebHID.isSupported>).mockImplementation(
      async () => true
    );

    await expect(getLedgerTransport()).resolves.toBeInstanceOf(LedgerWebHID);
  });

  it('returns the U2F method if WebUSB and WebHID is not supported', async () => {
    (TransportWebUSB.isSupported as jest.MockedFunction<typeof TransportWebUSB.isSupported>).mockImplementation(
      async () => false
    );

    (TransportWebHID.isSupported as jest.MockedFunction<typeof TransportWebHID.isSupported>).mockImplementation(
      async () => false
    );

    (TransportU2F.isSupported as jest.MockedFunction<typeof TransportU2F.isSupported>).mockImplementation(
      async () => true
    );

    await expect(getLedgerTransport()).resolves.toBeInstanceOf(LedgerU2F);
  });

  it('throws an error if neither method is available', async () => {
    (TransportWebUSB.isSupported as jest.MockedFunction<typeof TransportWebUSB.isSupported>).mockImplementation(
      async () => false
    );

    (TransportWebHID.isSupported as jest.MockedFunction<typeof TransportWebHID.isSupported>).mockImplementation(
      async () => false
    );

    (TransportU2F.isSupported as jest.MockedFunction<typeof TransportU2F.isSupported>).mockImplementation(
      async () => false
    );

    await expect(getLedgerTransport()).rejects.toThrow();
  });
});
