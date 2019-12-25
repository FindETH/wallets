import { ALL_DERIVATION_PATHS, DEFAULT_ETH, LEDGER_LIVE_ETH } from '../derivation-paths';
import { MnemonicPhrase } from './mnemonic-phrase';

const TEST_MNEMONIC_PHRASE = 'test test test test test test test test test test test ball';

describe('MnemonicPhrase', () => {
  const wallet = new MnemonicPhrase(TEST_MNEMONIC_PHRASE);

  describe('getAddress', () => {
    it('derives addresses from a mnemonic phrase', async () => {
      await expect(wallet.getAddress(DEFAULT_ETH, 0)).resolves.toMatchSnapshot();
      await expect(wallet.getAddress(DEFAULT_ETH, 1)).resolves.toMatchSnapshot();
      await expect(wallet.getAddress(LEDGER_LIVE_ETH, 0)).resolves.toMatchSnapshot();
      await expect(wallet.getAddress(LEDGER_LIVE_ETH, 1)).resolves.toMatchSnapshot();
    });
  });

  it('supports all derivation paths', () => {
    expect(wallet.getDerivationPaths()).toStrictEqual(ALL_DERIVATION_PATHS);
  });

  it('serializes to a string', () => {
    expect(wallet.serialize()).toMatchSnapshot();
  });

  it('deserializes from a string', () => {
    expect(
      MnemonicPhrase.deserialize(
        '{"type": "MnemonicPhrase", "mnemonicPhrase": "test test test test test test test test test test test ball"}'
      )
    ).toMatchSnapshot();
  });
});
