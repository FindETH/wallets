import { toUtf8 } from '@findeth/hdnode';
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

  // TODO: U2F is deprecated
  if (await LedgerU2F.isSupported()) {
    return new LedgerU2F();
  }

  throw new Error('No supported transport method');
};

/**
 * Parse data received from `Transport.send`.
 *
 * @param {Uint8Array} data
 * @param {number} [index]
 * @return {[string, number]}
 */
export const parseRawData = (data: Uint8Array, index = 0): [string, number] => {
  const length = data[index];
  const result = toUtf8(data.slice(index + 1, index + length + 1));

  return [result, index + length];
};
