/**
 * Get a hexadecimal string as Buffer.
 *
 * @param {string} data
 * @return {Buffer}
 */
export const dehexify = (data: string): Buffer => {
  if (data.startsWith('0x')) {
    data = data.slice(2);
  }

  return Buffer.from(data, 'hex');
};

/**
 * Write a number to a Buffer with arbitrary length.
 *
 * @param {number} data
 * @param {number} byteLength
 * @return {Buffer}
 */
export const toBuffer = (data: number, byteLength: number): Buffer => {
  const buffer = Buffer.alloc(byteLength);
  buffer.writeUIntBE(data, 0, byteLength);
  return buffer;
};

/**
 * Get a buffer as bigint.
 *
 * @param {Buffer} buffer
 * @return {bigint}
 */
export const bufferToBigInt = (buffer: Buffer): bigint => {
  return BigInt(`0x${buffer.toString('hex')}`);
};

/**
 * Get a bigint as Buffer. If a length (in bytes) is specified, the Buffer will be padded to this length.
 *
 * @param {bigint} bigInt
 * @param {number} [length]
 * @return {Buffer}
 */
export const bigIntToBuffer = (bigInt: bigint, length?: number): Buffer => {
  const hex = bigInt.toString(16);
  if (length) {
    return Buffer.from(hex.padStart(length * 2, '0'), 'hex');
  }

  return Buffer.from(hex, 'hex');
};
