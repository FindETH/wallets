import TransportWebHID, { HIDDevice } from '@ledgerhq/hw-transport-webhid';
import { TransportWrapper } from './transport-wrapper';

export class LedgerWebHID extends TransportWrapper<HIDDevice> {
  static async isSupported(): Promise<boolean> {
    return TransportWebHID.isSupported();
  }

  protected async getTransport(): Promise<TransportWebHID> {
    return TransportWebHID.request();
  }
}
