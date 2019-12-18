import { ripemd160, sha256 } from './crypto';

describe('ripemd160', () => {
  it('creates a ripemd160 hash from a buffer', () => {
    const buffer = Buffer.from('foo bar', 'utf8');
    expect(ripemd160(buffer).toString('hex')).toBe('daba326b8e276af34297f879f6234bcef2528efa');
  });
});

describe('sha256', () => {
  it('creates a sha256 hash from a buffer', () => {
    const buffer = Buffer.from('foo bar', 'utf8');
    expect(sha256(buffer).toString('hex')).toBe('fbc1a9f858ea9e177916964bd88c3d37b91a1e84412765e29950777f265c4b75');
  });
});
