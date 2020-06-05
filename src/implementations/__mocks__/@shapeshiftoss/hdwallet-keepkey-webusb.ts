import { HDNode } from '@findeth/hdnode';
import { fromArray } from '../../../utils';

const HDNODE_INSTANCE = HDNode.fromMnemonicPhrase('test test test test test test test test test test test ball');

class HDWallet {
  getPublicKeys = jest.fn().mockImplementation(
    (messages: Array<{ addressNList: number[] }>): Array<{ xpub: string }> => {
      return messages.map(({ addressNList }) => {
        const derivationPath = fromArray(addressNList);
        const xpub = HDNODE_INSTANCE.derive(derivationPath).extendedPublicKey;

        return { xpub };
      });
    }
  );

  ethGetAddress = jest.fn().mockImplementation(({ addressNList }: { addressNList: number[] }) => {
    const derivationPath = fromArray(addressNList);
    return HDNODE_INSTANCE.derive(derivationPath).address;
  });
}

// tslint:disable-next-line:max-classes-per-file
export class WebUSBKeepKeyAdapter {
  static useKeyring = jest.fn().mockImplementation(() => new WebUSBKeepKeyAdapter());

  pairDevice = jest.fn().mockImplementation(() => new HDWallet());
}
