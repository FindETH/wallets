import { deserialize, isWalletType } from './wallet';

describe('isWalletType', () => {
  it('returns true if a string is a valid wallet type', () => {
    expect(isWalletType('Ledger')).toBeTruthy();
    expect(isWalletType('Trezor')).toBeTruthy();
    expect(isWalletType('MnemonicPhrase')).toBeTruthy();
  });

  it('returns false if a string is not a valid wallet type', () => {
    expect(isWalletType('Foo')).toBeFalsy();
    expect(isWalletType('Bar')).toBeFalsy();
  });
});

describe('deserialize', () => {
  it('deserializes a wallet from a string', () => {
    expect(deserialize('{"type": "Trezor"}')).toMatchSnapshot();
    expect(deserialize('{"type": "Ledger", "transport": "{\\"type\\": \\"U2F\\"}"}')).toMatchSnapshot();
    expect(
      deserialize('{"type": "Ledger", "transport": "{\\"type\\": \\"WebUSB\\", \\"descriptor\\": \\"foobar\\"}"}')
    ).toMatchSnapshot();
    expect(
      deserialize(
        '{"type": "MnemonicPhrase", "mnemonicPhrase": "test test test test test test test test test test test ball"}'
      )
    ).toMatchSnapshot();
  });

  it('throws an error if deserialized data is invalid', () => {
    expect(() => deserialize('foo bar')).toThrow();
    expect(() => deserialize('{}')).toThrow();
    expect(() => deserialize('{"type": "Foo Bar"}')).toThrow();
    expect(() => deserialize('{"type": "Ledger"}')).toThrow();
    expect(() => deserialize('{"type": "Ledger", "transport": "{\\"type\\": \\"Foo Bar\\"}"}')).toThrow();
    expect(() => deserialize('{"type": "MnemonicPhrase"}')).toThrow();
    expect(() => deserialize('{"type": "MnemonicPhrase", "mnemonicPhrase": "foo bar"}')).toThrow();
  });
});
