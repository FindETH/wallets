import { DescriptorEvent } from '@ledgerhq/hw-transport';
import TransportWebBLE from '@ledgerhq/hw-transport-web-ble';
import { TransportWrapper } from './transport-wrapper';

export class LedgerWebBLE extends TransportWrapper<BluetoothDevice> {
  static async isSupported(): Promise<boolean> {
    return TransportWebBLE.isSupported();
  }

  protected async getTransport(): Promise<TransportWebBLE> {
    const device = await this.getDevice();
    return TransportWebBLE.open(device);
  }

  /**
   * `@ledgerhq/hw-transport-web-ble` does not support the `request()` function to open a connection. Instead, the
   * `listen()` method must be used. This function wraps the Observer returned by the `listen()` method with a Promise,
   * and returns the first device found.
   *
   * @return {Promise<BluetoothDevice>}
   */
  private getDevice(): Promise<BluetoothDevice> {
    return new Promise((resolve, reject) => {
      const subscription = TransportWebBLE.listen({
        next(event: DescriptorEvent<BluetoothDevice>): void {
          if (event.type === 'add') {
            subscription.unsubscribe();
            resolve(event.descriptor);
          }
        },
        error(error: Error): void {
          reject(error);
        },
        complete(): void {
          // noop
        }
      });
    });
  }
}
