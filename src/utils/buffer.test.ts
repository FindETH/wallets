import { dehexify, toBuffer } from './buffer';

describe('dehexify', () => {
  it('gets a buffer from a hexadecimal string', () => {
    expect(dehexify('abcdef')).toBeInstanceOf(Buffer);
    expect(dehexify('abcdef').toString('hex')).toBe('abcdef');
  });

  it('works with and without prefixed 0x', () => {
    const withoutPrefix = dehexify('abcdef');
    const withPrefix = dehexify('0xabcdef');

    expect(withoutPrefix).toStrictEqual(withPrefix);
  });
});

describe('toBuffer', () => {
  it('writes a number to a new buffer', () => {
    expect(toBuffer(1234, 2)).toHaveLength(2);
    expect(toBuffer(1234, 4)).toHaveLength(4);
    expect(toBuffer(1234, 2).toString('hex')).toBe('04d2');
    expect(toBuffer(1234, 4).toString('hex')).toBe('000004d2');
  });
});
