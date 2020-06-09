import { KeepKeyHDWallet } from './hdwallet-keepkey';

export class WebUSBKeepKeyAdapter {
  static useKeyring = jest.fn().mockImplementation(() => new WebUSBKeepKeyAdapter());

  pairDevice = jest.fn().mockImplementation(() => new KeepKeyHDWallet());
}
