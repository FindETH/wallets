import { DEFAULT_ETC, DEFAULT_ETH, LEDGER_LIVE_ETH } from '../derivation-paths';
import { fromArray, getFullPath, getPathPrefix, HARDENED_OFFSET, toArray } from './derivation-paths';

describe('getFullPath', () => {
  it('returns the full derivation path for non-hardened paths', () => {
    expect(getFullPath(DEFAULT_ETH, 0)).toBe(`m/44'/60'/0'/0/0`);
    expect(getFullPath(DEFAULT_ETH, 1)).toBe(`m/44'/60'/0'/0/1`);
    expect(getFullPath(DEFAULT_ETC, 0)).toBe(`m/44'/61'/0'/0/0`);
    expect(getFullPath(DEFAULT_ETC, 1)).toBe(`m/44'/61'/0'/0/1`);
  });

  it('returns the full derivation path for hardened paths', () => {
    expect(getFullPath(LEDGER_LIVE_ETH, 0)).toBe(`m/44'/60'/0'/0/0`);
    expect(getFullPath(LEDGER_LIVE_ETH, 1)).toBe(`m/44'/60'/1'/0/0`);
  });
});

describe('getPathPrefix', () => {
  it('returns the prefix segments of a derivation path', () => {
    expect(getPathPrefix(DEFAULT_ETH.path)).toBe(`m/44'/60'/0'/0`);
    expect(getPathPrefix(DEFAULT_ETC.path)).toBe(`m/44'/61'/0'/0`);
  });
});

describe('toArray', () => {
  it('returns a number array representation of a derivation path', () => {
    expect(toArray(DEFAULT_ETH, 0)).toStrictEqual([
      HARDENED_OFFSET + 44,
      HARDENED_OFFSET + 60,
      HARDENED_OFFSET + 0,
      0,
      0
    ]);

    expect(toArray(DEFAULT_ETC, 1)).toStrictEqual([
      HARDENED_OFFSET + 44,
      HARDENED_OFFSET + 61,
      HARDENED_OFFSET + 0,
      0,
      1
    ]);
  });
});

describe('fromArray', () => {
  it('returns a derivation path string from a number array', () => {
    expect(fromArray([
      HARDENED_OFFSET + 44,
      HARDENED_OFFSET + 60,
      HARDENED_OFFSET + 0,
      0,
      0
    ])).toBe(getFullPath(DEFAULT_ETH, 0));

    expect(fromArray([
      HARDENED_OFFSET + 44,
      HARDENED_OFFSET + 61,
      HARDENED_OFFSET + 0,
      0,
      1
    ])).toBe(getFullPath(DEFAULT_ETC, 1));
  });
});
