import TransportU2F from '@ledgerhq/hw-transport-u2f';
import { TransportType, TransportWrapper } from './transport-wrapper';

export class LedgerU2F extends TransportWrapper<null, TransportU2F> {
  static async isSupported(): Promise<boolean> {
    return TransportU2F.isSupported();
  }

  toString(): string {
    return JSON.stringify({
      type: TransportType.U2F
    });
  }

  protected async getTransport(): Promise<TransportU2F> {
    // U2F does not support descriptors
    return await TransportU2F.open();
  }
}
