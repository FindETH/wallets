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

const getTextDecoder = (encoding: string): TextDecoder => {
  if (typeof TextDecoder === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Decoder = require('util').TextDecoder;
    return new Decoder(encoding);
  }

  return new TextDecoder(encoding);
};

/**
 * Decodes a Buffer to an ASCII string.
 *
 * @param {Buffer} buffer
 * @return {string}
 */
// eslint-disable-next-line no-restricted-globals
export const decode = (buffer: Buffer): string => {
  const decoder = getTextDecoder('utf8');
  return decoder.decode(buffer);
};

/**
 * Parse data received from `Transport.send`.
 *
 * @param {Buffer} data
 * @param {number} [index]
 * @return {[string, number]}
 */
// eslint-disable-next-line no-restricted-globals
export const parseRawData = (data: Buffer, index = 0): [string, number] => {
  const length = data[index];
  const result = decode(data.subarray(index + 1, index + length + 1));

  return [result, index + length];
};
