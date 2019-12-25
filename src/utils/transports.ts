import { LedgerU2F, LedgerWebBLE, LedgerWebHID, LedgerWebUSB, TransportType } from '../implementations/transports';

const SUPPORTED_TRANSPORTS = {
  [TransportType.U2F]: LedgerU2F,
  [TransportType.WebBLE]: LedgerWebBLE,
  [TransportType.WebHID]: LedgerWebHID,
  [TransportType.WebUSB]: LedgerWebUSB
};

/**
 * Checks if a string is a valid type of TransportType.
 *
 * @param {string} type
 * @return {boolean}
 */
export const isTransportType = (type: string): type is TransportType => {
  return Object.values(TransportType).includes(type as TransportType);
};

/**
 * Get the transport implementation class for a specific transport type.
 *
 * @param {Type} type
 * @return {new (...args: unknown[]): Type}
 * @template Type
 */
export const getTransportImplementation = <Type extends TransportType>(
  type: Type
): typeof SUPPORTED_TRANSPORTS[Type] => {
  return SUPPORTED_TRANSPORTS[type];
};
