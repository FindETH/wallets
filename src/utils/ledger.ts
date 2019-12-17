/**
 * Returns an instance of a (wired) Ledger transport method. Currently, this will return the WebUSB method if it is
 * supported, or the U2F method as a fallback.
 *
 * If no transport method is supported, this will throw an error.
 *
 * @return {Promise<LedgerWebUSB | LedgerU2F>}
 */
import { LedgerU2F, LedgerWebUSB } from '../implementations/transports';

export const getLedgerTransport = async (): Promise<LedgerWebUSB | LedgerU2F> => {
  if (await LedgerWebUSB.isSupported()) {
    return new LedgerWebUSB();
  }

  if (await LedgerU2F.isSupported()) {
    return new LedgerU2F();
  }

  throw new Error('No supported transport method');
};
