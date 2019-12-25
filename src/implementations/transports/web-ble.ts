import { DescriptorEvent } from '@ledgerhq/hw-transport';
import TransportWebBLE from '@ledgerhq/hw-transport-web-ble';
import { TransportType, TransportWrapper } from './transport-wrapper';

export class LedgerWebBLE extends TransportWrapper<BluetoothDevice, TransportWebBLE> {
  static async isSupported(): Promise<boolean> {
    return TransportWebBLE.isSupported();
  }

  constructor(private readonly descriptor?: string) {
    super();
  }

  toString(): string {
    return JSON.stringify({
      type: TransportType.WebBLE,
      descriptor: this.descriptor ?? this.transport?.device?.name
    });
  }

  protected async getTransport(): Promise<TransportWebBLE> {
    if (this.descriptor) {
      // TODO: This probably does not work
      const descriptorDevice = await navigator.bluetooth.requestDevice({
        filters: [
          {
            name: this.descriptor
          }
        ]
      });

      if (descriptorDevice) {
        return TransportWebBLE.open(descriptorDevice);
      }
    }

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
