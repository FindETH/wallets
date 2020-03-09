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
