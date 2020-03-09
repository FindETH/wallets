import { decodeBase58, encodeBase58 } from './base58';

describe('encode', () => {
  it('encodes a buffer with checksum', () => {
    const payload = Buffer.from('foo bar', 'utf8');
    expect(encodeBase58(payload)).toBe('SQHFQMRT97ajZaP');
    expect(decodeBase58(encodeBase58(payload))).toEqual(payload);
  });
});

describe('decode', () => {
  it('decodes a base58 string with checksum', () => {
    expect(decodeBase58('SQHFQMRT97ajZaP').toString('utf8')).toBe('foo bar');
  });

  it('throws if the checksum is invalid', () => {
    expect(() => decodeBase58('SQHFQMRT97ajfoo')).toThrow();
  });
});
