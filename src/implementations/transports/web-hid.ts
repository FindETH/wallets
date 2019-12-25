import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import { TransportType, TransportWrapper } from './transport-wrapper';

export class LedgerWebHID extends TransportWrapper<HIDDevice, TransportWebHID> {
  static async isSupported(): Promise<boolean> {
    return TransportWebHID.isSupported();
  }

  constructor(private readonly descriptor?: number) {
    super();
  }

  toString(): string {
    return JSON.stringify({
      type: TransportType.WebHID,
      descriptor: this.descriptor ?? this.transport?.device.productId
    });
  }

  protected async getTransport(): Promise<TransportWebHID> {
    if (this.descriptor) {
      // HIDDevices don't have a unique ID (?), so instead we use the productID
      const devices = await navigator.hid.getDevices();
      const descriptorDevice = devices.find(device => device.productId === this.descriptor);

      if (descriptorDevice) {
        return TransportWebHID.open(descriptorDevice);
      }
    }

    return TransportWebHID.request();
  }
}
