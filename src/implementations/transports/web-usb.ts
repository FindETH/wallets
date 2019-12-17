import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { TransportWrapper } from './transport-wrapper';

const isWindows = (): boolean => {
  return navigator?.platform?.includes('Win');
};

export class LedgerWebUSB extends TransportWrapper<USBDevice> {
  static async isSupported(): Promise<boolean> {
    // Ledger still doesn't work with WebUSB on Windows, even though `isSupported()` returns true
    return !isWindows() && TransportWebUSB.isSupported();
  }

  protected async getTransport(): Promise<TransportWebUSB> {
    return TransportWebUSB.request();
  }
}
