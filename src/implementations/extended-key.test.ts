import { EXTENDED_KEY_CHILDREN } from '../derivation-paths';
import { ExtendedKey } from './extended-key';

/**
 * Extended public and private key for `test test test test test test test test test test test ball`, with derivation
 * path `m/44'/60'/0'/0` (parent of the default Ethereum derivation path).
 */
const TEST_EXTENDED_PUBLIC_KEY =
  'xpub6DreGKvTo5gf1tXu5N86sz922cFfACvEj8oUrL1nJAbngaMriFQDYk3vA1vpXXGyD5MtH2tbQ8JJScFki5TNSJtRF9T2Qq6ZNLSDhRk2bqc';
const TEST_EXTENDED_PRIVATE_KEY =
  'xprv9zsHrpPZxi8MoQTRyLb6WrCHUaRAkkCPMust3wcAjq4oon2iAi5xzwjSJjTZPjnZ3dqVRni3hhnmwxUrRsj4JCwyYdvqbAdPSJLdN1AFwsN';

describe('ExtendedKey', () => {
  const publicWallet = new ExtendedKey(TEST_EXTENDED_PUBLIC_KEY);
  const privateWallet = new ExtendedKey(TEST_EXTENDED_PRIVATE_KEY);

  describe('getAddress', () => {
    it('derives addresses from an extended public key', async () => {
      await expect(publicWallet.getAddress(EXTENDED_KEY_CHILDREN, 0)).resolves.toBe(
        '0xc6D5a3c98EC9073B54FA0969957Bd582e8D874bf'
      );
      await expect(publicWallet.getAddress(EXTENDED_KEY_CHILDREN, 1)).resolves.toBe(
        '0x59A897A2dbd55D20bCC9B52d5eaA14E2859Dc467'
      );

      await expect(privateWallet.getAddress(EXTENDED_KEY_CHILDREN, 0)).resolves.toBe(
        '0xc6D5a3c98EC9073B54FA0969957Bd582e8D874bf'
      );
      await expect(privateWallet.getAddress(EXTENDED_KEY_CHILDREN, 1)).resolves.toBe(
        '0x59A897A2dbd55D20bCC9B52d5eaA14E2859Dc467'
      );
    });
  });

  it('supports only the EXTENDED_KEY_CHILDREN derivation path', () => {
    expect(publicWallet.getDerivationPaths()).toStrictEqual([EXTENDED_KEY_CHILDREN]);
  });

  it('serializes to a string', () => {
    expect(publicWallet.serialize()).toMatchSnapshot();
  });

  it('deserializes from a string', async () => {
    const deserialised = ExtendedKey.deserialize(
      `{"type": "ExtendedKey", "extendedKey": "${TEST_EXTENDED_PUBLIC_KEY}"}`
    );

    expect(deserialised).toBeInstanceOf(ExtendedKey);
    await expect(deserialised.getAddress(EXTENDED_KEY_CHILDREN, 0)).resolves.toBe(
      '0xc6D5a3c98EC9073B54FA0969957Bd582e8D874bf'
    );
  });
});
