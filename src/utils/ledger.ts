import { LedgerU2F, LedgerWebHID, LedgerWebUSB } from '../implementations/transports';

/**
 * Returns an instance of a (wired) Ledger transport method. Currently, this will return the WebUSB method if it is
 * supported, with WebHID method as fallback, and U2F method as fallback for WebHID.
 *
 * If no transport method is supported, this will throw an error.
 *
 * @return {Promise<LedgerWebUSB | LedgerWebHID | LedgerU2F>}
 */
export const getLedgerTransport = async (): Promise<LedgerWebUSB | LedgerWebHID | LedgerU2F> => {
  if (await LedgerWebUSB.isSupported()) {
    return new LedgerWebUSB();
  }

  if (await LedgerWebHID.isSupported()) {
    return new LedgerWebHID();
  }

  if (await LedgerU2F.isSupported()) {
    return new LedgerU2F();
  }

  throw new Error('No supported transport method');
};
