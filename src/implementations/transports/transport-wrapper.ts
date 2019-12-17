import EthereumApp from '@ledgerhq/hw-app-eth';
import Transport from '@ledgerhq/hw-transport';

export abstract class TransportWrapper<Descriptor> {
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
      const transport = await this.getTransport();
      transport.on('disconnect', () => {
        this.app = undefined;
      });

      this.app = new EthereumApp<Descriptor>(transport);
    }

    return this.app;
  }

  /**
   * Get an instance of the Transport method to use. This does not cache the Transport, but returns a new instance of
   * the Transport every time this function is called.
   *
   * @return {Promise<Transport<Descriptor>>}
   * @template Descriptor
   */
  protected abstract async getTransport(): Promise<Transport<Descriptor>>;
}
