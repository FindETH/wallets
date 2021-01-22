import EthereumApp from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';

export enum TransportType {
  U2F = 'U2F',
  WebBLE = 'WebBLE',
  WebHID = 'WebHID',
  WebUSB = 'WebUSB'
}

export abstract class TransportWrapper<Descriptor, TransportImplementation extends Transport<Descriptor>> {
  protected transport?: TransportImplementation;
  private app?: EthereumApp<Descriptor>;

  /**
   * Get the Ethereum application, using the implemented Transport. This will cache an instance of the EthereumApp, and
   * only re-initialise if the Transport disconnects.
   *
   * @return {Promise<EthereumApp<Descriptor>>}
   * @template Descriptor
   */
  async getApplication(): Promise<EthereumApp<Descriptor>> {
    if (!this.app) {
      const transport = (this.transport = await this.getTransport());
      transport.on('disconnect', () => {
        this.app = undefined;
      });

      this.app = new EthereumApp<Descriptor>(transport);
    }

    return this.app;
  }

  // eslint-disable-next-line no-restricted-globals
  async send(cla: number, ins: number, p1: number, p2: number): Promise<Buffer> {
    if (!this.transport) {
      throw new Error('Transport not initialised');
    }

    return this.transport.send(cla, ins, p1, p2);
  }

  /**
   * Returns a string representation of the current transport.
   *
   * @return {string}
   */
  abstract toString(): string;

  /**
   * Get an instance of the Transport method to use. This does not cache the Transport, but returns a new instance of
   * the Transport every time this function is called.
   *
   * @return {Promise<Transport<Descriptor>>}
   * @template Descriptor
   */
  protected abstract async getTransport(): Promise<TransportImplementation>;
}
