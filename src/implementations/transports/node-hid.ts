import Transport from '@ledgerhq/hw-transport';
import { createTransportRecorder, RecordStore } from '@ledgerhq/hw-transport-mocker';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import { TransportWrapper } from './transport-wrapper';

/**
 * This transport currently exists for testing purposes only, but will likely be implemented later.
 */
export class LedgerNodeHid extends TransportWrapper<string> {
  static async isSupported(): Promise<boolean> {
    return TransportNodeHid.isSupported();
  }
  readonly recordStore: RecordStore = new RecordStore();

  /**
   * Returns a decorated version of the node-hid Transport, which can be used to record ADPU exchanges.
   */
  protected async getTransport(): Promise<Transport<string>> {
    const DecoratedTransport = createTransportRecorder(TransportNodeHid, this.recordStore);
    return await DecoratedTransport.open();
  }
}
