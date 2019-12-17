import TransportU2F from '@ledgerhq/hw-transport-u2f';
import { TransportWrapper } from './transport-wrapper';

export class LedgerU2F extends TransportWrapper<null> {
  static async isSupported(): Promise<boolean> {
    return TransportU2F.isSupported();
  }

  protected async getTransport(): Promise<TransportU2F> {
    return await TransportU2F.open();
  }
}
