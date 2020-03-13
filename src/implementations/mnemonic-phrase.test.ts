import { ALL_DERIVATION_PATHS, DEFAULT_ETH, LEDGER_LIVE_ETH } from '../derivation-paths';
import { MnemonicPhrase } from './mnemonic-phrase';

const TEST_MNEMONIC_PHRASE = 'test test test test test test test test test test test ball';

describe('MnemonicPhrase', () => {
  const wallet = new MnemonicPhrase(TEST_MNEMONIC_PHRASE);

  describe('getAddress', () => {
    it('derives addresses from a mnemonic phrase', async () => {
      await expect(wallet.getAddress(DEFAULT_ETH, 0)).resolves.toBe('0xc6D5a3c98EC9073B54FA0969957Bd582e8D874bf');
      await expect(wallet.getAddress(DEFAULT_ETH, 1)).resolves.toBe('0x59A897A2dbd55D20bCC9B52d5eaA14E2859Dc467');
      await expect(wallet.getAddress(LEDGER_LIVE_ETH, 0)).resolves.toBe('0xc6D5a3c98EC9073B54FA0969957Bd582e8D874bf');
      await expect(wallet.getAddress(LEDGER_LIVE_ETH, 1)).resolves.toBe('0x3FE703a2035CB3590C865a09F556eDda02b2Cf12');
    });
  });

  it('supports all derivation paths', () => {
    expect(wallet.getDerivationPaths()).toStrictEqual(ALL_DERIVATION_PATHS);
  });

  it('serializes to a string', () => {
    expect(wallet.serialize()).toMatchSnapshot();
  });

  it('deserializes from a string', async () => {
    const deserialised = MnemonicPhrase.deserialize(
      `{"type": "MnemonicPhrase", "mnemonicPhrase": "${TEST_MNEMONIC_PHRASE}"}`
    );

    expect(deserialised).toBeInstanceOf(MnemonicPhrase);
    await expect(deserialised.getAddress(DEFAULT_ETH, 0)).resolves.toBe('0xc6D5a3c98EC9073B54FA0969957Bd582e8D874bf');
  });
});
