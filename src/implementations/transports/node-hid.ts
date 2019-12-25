import { createTransportRecorder, RecordStore } from '@ledgerhq/hw-transport-mocker';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import { TransportWrapper } from './transport-wrapper';

/**
 * This transport currently exists for testing purposes only, but will likely be implemented later.
 */
export class LedgerNodeHid extends TransportWrapper<string, TransportNodeHid> {
  static async isSupported(): Promise<boolean> {
    return TransportNodeHid.isSupported();
  }

  readonly recordStore: RecordStore = new RecordStore();

  constructor(private readonly descriptor?: string) {
    super();
  }

  toString(): string {
    return JSON.stringify({
      type: 'NodeHID',
      descriptor: this.descriptor ?? this.transport?.device
    });
  }

  /**
   * Returns a decorated version of the node-hid Transport, which can be used to record ADPU exchanges.
   *
   * @return {Promise<Transport<string>>}
   */
  protected async getTransport(): Promise<TransportNodeHid> {
    const DecoratedTransport = createTransportRecorder(TransportNodeHid, this.recordStore);
    return (await DecoratedTransport.open(this.descriptor)) as TransportNodeHid;
  }
}
