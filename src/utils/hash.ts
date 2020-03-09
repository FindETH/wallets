import { createHash, createHmac, pbkdf2Sync } from 'crypto';
import createKeccakHash from 'keccak';

/**
 * Hash a buffer with provided key using HMAC-SHA512.
 *
 * @param key
 * @param buffer
 * @return {Buffer}
 */
export const hmacSHA512 = (key: Buffer, buffer: Buffer): Buffer => {
  return createHmac('sha512', key)
    .update(buffer)
    .digest();
};

/**
 * Hash a buffer using SHA256.
 *
 * @param {Buffer} buffer
 * @return {Buffer}
 */
export const sha256 = (buffer: Buffer) => {
  return createHash('sha256')
    .update(buffer)
    .digest();
};

/**
 * Hash a buffer using RIPEMD160.
 *
 * @param {Buffer} buffer
 * @return {Buffer}
 */
export const ripemd160 = (buffer: Buffer): Buffer => {
  return createHash('ripemd160')
    .update(
      createHash('sha256')
        .update(buffer)
        .digest()
    )
    .digest();
};

/**
 * Hash a buffer using KECCAK256.
 *
 * @param {Buffer} buffer
 * @return {Buffer}
 */
export const keccak256 = (buffer: Buffer): Buffer => {
  return createKeccakHash('keccak256')
    .update(buffer)
    .digest();
};

/**
 * Derive a key from a buffer and salt. Defaults to 2048 iterations, 64 byte key length and SHA512 as digest.
 *
 * @param {Buffer} buffer
 * @param {Buffer} salt
 * @param {number} [iterations]
 * @param {number} [length]
 * @param {string} [digest]
 * @return {Buffer}
 */
export const pbkdf2 = (
  buffer: Buffer,
  salt: Buffer,
  iterations: number = 2048,
  length: number = 64,
  digest: string = 'sha512'
): Buffer => {
  return pbkdf2Sync(buffer, salt, iterations, length, digest);
};

/**
 * Get the checksummed version of an address.
 *
 * @param {string} address
 * @return {string}
 */
export const toChecksumAddress = (address: string): string => {
  const hash = keccak256(Buffer.from(address, 'utf8')).toString('hex');

  return address.split('').reduce<string>((addressWithChecksum, character, index) => {
    if (parseInt(hash[index], 16) >= 8) {
      return addressWithChecksum + character.toUpperCase();
    }

    return addressWithChecksum + character;
  }, '0x');
};
