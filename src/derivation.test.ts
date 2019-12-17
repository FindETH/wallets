import { getAddresses } from './derivation';
import { DEFAULT_ETH } from './derivation-paths';
import { MnemonicPhrase } from './implementations';

const TEST_MNEMONIC_PHRASE = 'test test test test test test test test test test test ball';

describe('getAddresses', () => {
  it('yields all addresses for a wallet', async () => {
    const wallet = new MnemonicPhrase(TEST_MNEMONIC_PHRASE);

    for await (const address of getAddresses(wallet, [DEFAULT_ETH], 3)) {
      expect(address).toMatchSnapshot();
    }
  });
});
