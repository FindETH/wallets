import { hmacSHA512, keccak256, pbkdf2, ripemd160, sha256, toChecksumAddress } from './hash';

const TEST_STRING = Buffer.from('foo bar', 'utf8');
const TEST_SALT = Buffer.from('baz qux', 'utf8');

describe('hmacSHA512', () => {
  it('hashes a buffer with HMAC-SHA512', () => {
    expect(hmacSHA512(TEST_SALT, TEST_STRING).toString('hex')).toBe(
      'fde337f939e07ce6c37530eb0a0bb767b144a9bb0de39a594b838dc22b74c57f1e076e5ab5a5db421a83eba88285564d2fc04239216c68ce5a6a9918c3b74712'
    );
  });
});

describe('sha256', () => {
  it('hashes a buffer with SHA256', () => {
    expect(sha256(TEST_STRING).toString('hex')).toBe(
      'fbc1a9f858ea9e177916964bd88c3d37b91a1e84412765e29950777f265c4b75'
    );
  });
});

describe('ripemd160', () => {
  it('hashes a buffer with RIPEMD160', () => {
    expect(ripemd160(TEST_STRING).toString('hex')).toBe('36297e108170a41b2e60a8b5897f2148ef39787a');
  });
});

describe('keccak256', () => {
  it('hashes a buffer with KECCAK256', () => {
    expect(keccak256(TEST_STRING).toString('hex')).toBe(
      '737fe0cb366697912e27136f93dfb531c58bab1b09c40842d999110387c86b54'
    );
  });
});

describe('pbkdf2', () => {
  it('derives a key from a buffer and salt', () => {
    expect(pbkdf2(TEST_STRING, TEST_STRING).toString('hex')).toBe(
      '9b06ad712c999c6219f002257eb4288d7de90ab375e61cfbc8953ad679d7dfeab93d1dccae4bf01e83b94c00591377259d67b06554e32f3e8b99de39bd4349e6'
    );
  });
});

describe('toChecksumAddress', () => {
  it('returns the checksummed version of an address', () => {
    expect(toChecksumAddress('6b175474e89094c44da98b954eedeac495271d0f')).toBe(
      '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    );
    expect(toChecksumAddress('a74476443119a942de498590fe1f2454d7d4ac0d')).toBe(
      '0xa74476443119A942dE498590Fe1f2454d7D4aC0d'
    );
  });
});
