import { HDNode } from '@findeth/hdnode';
import { fromArray } from '../../../utils';

export const isKeepKey = jest.fn().mockImplementation(() => true);

const HDNODE_INSTANCE = HDNode.fromMnemonicPhrase('test test test test test test test test test test test ball');

export class KeepKeyHDWallet {
  isInitialized = jest.fn().mockImplementation(async () => false);

  initialize = jest.fn();

  sendPin = jest.fn();

  getFeatures = jest.fn().mockImplementation(async () => ({
    pinProtection: true,
    pinCached: false
  }));

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
