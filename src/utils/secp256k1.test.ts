import { compressPublicKey, decompressPublicKey, getPublicKey, privateAdd, publicAdd } from './secp256k1';

// test test test test test test test test test test test ball
const PRIVATE_KEY = Buffer.from('044ce8e536ea4e4c61b42862bc98f8c574942fb77121e27f316cb15a96d9c99a', 'hex');
const PUBLIC_KEY = Buffer.from('03e6159bb12479339ce9be03fa724f53692893e7c91de9be2c00ca8d554fca8f51', 'hex');
const UNCOMPRESSED_PUBLIC_KEY = Buffer.from(
  '04e6159bb12479339ce9be03fa724f53692893e7c91de9be2c00ca8d554fca8f518cceae20d3126e2b0895a9073a918ee4bd1f5ff82f61c5cc2f99215412865c4d',
  'hex'
);
const TWEAK = Buffer.from('04bfb2dd60fa8921c2a4085ec15507a921f49cdc839f27f0f280e9c1495d44b5', 'hex');

describe('getPublicKey', () => {
  it('returns the public key for a private key', () => {
    expect(getPublicKey(PRIVATE_KEY)).toStrictEqual(PUBLIC_KEY);
  });
});

describe('privateAdd', () => {
  it('adds a tweak to the private key', () => {
    expect(privateAdd(PRIVATE_KEY, TWEAK).toString('hex')).toBe(
      '090c9bc297e4d76e245830c17dee006e9688cc93f4c10a7023ed9b1be0370e4f'
    );
  });
});

describe('publicAdd', () => {
  it('adds a tweak to the public key', () => {
    expect(publicAdd(PUBLIC_KEY, TWEAK).toString('hex')).toBe(
      '0270cffe1a4d8e742d38d2fd9c199232907fb623f13cfabcf94d31fd41d4336ec1'
    );
  });
});

describe('compressPublicKey', () => {
  it('returns a compressed public key', () => {
    expect(compressPublicKey(UNCOMPRESSED_PUBLIC_KEY)).toStrictEqual(PUBLIC_KEY);
  });
});

describe('decompressPublicKey', () => {
  it('returns a decompressed public key', () => {
    expect(decompressPublicKey(PUBLIC_KEY)).toStrictEqual(UNCOMPRESSED_PUBLIC_KEY);
  });
});
