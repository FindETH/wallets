import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { TransportType, TransportWrapper } from './transport-wrapper';

const isWindows = (): boolean => {
  return navigator?.platform?.includes('Win');
};

export class LedgerWebUSB extends TransportWrapper<USBDevice, TransportWebUSB> {
  static async isSupported(): Promise<boolean> {
    // Ledger still doesn't work with WebUSB on Windows, even though `isSupported()` returns true
    return !isWindows() && TransportWebUSB.isSupported();
  }

  constructor(private readonly descriptor?: string) {
    super();
  }

  toString(): string {
    return JSON.stringify({
      type: TransportType.WebUSB,
      descriptor: this.descriptor ?? this.transport?.device?.serialNumber
    });
  }

  protected async getTransport(): Promise<TransportWebUSB> {
    if (this.descriptor) {
      const devices = await navigator.usb.getDevices();
      const descriptorDevice = devices.find((device) => device.serialNumber === this.descriptor);

      if (descriptorDevice) {
        return TransportWebUSB.open(descriptorDevice);
      }
    }

    return TransportWebUSB.request();
  }
}
