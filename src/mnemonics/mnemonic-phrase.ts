import { randomBytes } from 'crypto';
import { pbkdf2, sha256 } from '../utils';
import { ENGLISH_WORDLIST } from './wordlists';

export type Bit = 0 | 1;

/**
 * Get the checksum for an entropy buffer.
 *
 * @param {Buffer} entropy
 * @return {Bit[]}
 */
export const getChecksum = (entropy: Buffer): Bit[] => {
  return bufferToBits(sha256(entropy)).slice(0, entropy.length / 4);
};

/**
 * Generate a mnemonic phrase from `size` bits.
 *
 * @param {number} size
 * @return string
 */
export const generateMnemonic = (size: number): string => {
  if (size < 128 || size > 256) {
    throw new Error('Size must be between 128 and 256');
  }

  if (size % 32 !== 0) {
    throw new Error('Size must be a multiple of 32');
  }

  const entropy = randomBytes(size / 8);
  return entropyToMnemonic(entropy);
};

/**
 * Get a mnemonic phrase from pre-generated entropy. Note that the entropy should be sufficiently random in order for
 * the mnemonic phrase to be secure.
 *
 * @param {Buffer} entropy
 * @return {string}
 */
export const entropyToMnemonic = (entropy: Buffer): string => {
  const checksum = getChecksum(entropy);
  const bits = [...bufferToBits(entropy), ...checksum];

  return chunk(bits, 11)
    .map(getMnemonicWord)
    .join(' ');
};

/**
 * Derive a seed from a mnemonic phrase. This does not validate if a mnemonic phrase is valid.
 *
 * @param {string} mnemonic
 * @param {string} [passphrase]
 * @return {Buffer}
 */
export const mnemonicToSeed = (mnemonic: string, passphrase?: string): Buffer => {
  const buffer = Buffer.from(normalise(mnemonic), 'utf8');
  const salt = Buffer.from(normalise('mnemonic' + (passphrase || '')), 'utf8');

  return pbkdf2(buffer, salt);
};

/**
 * Get the initial entropy from a mnemonic phrase. Throws an error if the mnemonic phrase is invalid.
 *
 * @param {string} mnemonic
 * @return {Buffer}
 */
export const mnemonicToEntropy = (mnemonic: string): Buffer => {
  const words = normalise(mnemonic).split(' ');

  if (words.length < 12 || words.length > 24 || words.length % 3 !== 0) {
    throw new Error('Invalid mnemonic phrase length');
  }

  const bits = words
    .map(word => ENGLISH_WORDLIST.indexOf(word))
    .map(index => {
      if (index === -1) {
        throw new Error('Invalid mnemonic phrase');
      }

      return index.toString(2).padStart(11, '0');
    })
    .join('')
    .split('')
    .map(bit => parseInt(bit, 2) as Bit);

  const checksumLength = bits.length % 32;
  const entropy = bits.slice(0, -checksumLength);
  const checksum = bits.slice(-checksumLength);

  const buffer = bitsToBuffer(entropy);
  const newChecksum = getChecksum(buffer);

  if (checksum.length !== newChecksum.length || !checksum.every((bit, index) => newChecksum[index] === bit)) {
    throw new Error('Invalid mnemonic phrase');
  }

  return buffer;
};

/**
 * Check if a mnemonic phrase is valid or not.
 *
 * @param {string} mnemonic
 * @return {boolean}
 */
export const isValidMnemonic = (mnemonic: string): boolean => {
  try {
    mnemonicToEntropy(mnemonic);
  } catch {
    return false;
  }

  return true;
};

/**
 * Return a mnemonic word from a sequence of 11 bits.
 *
 * @param {Bit[]} bits
 * @return {string}
 */
export const getMnemonicWord = (bits: Bit[]): string => {
  const index = parseInt(bits.join(''), 2);
  return ENGLISH_WORDLIST[index];
};

/**
 * Get a bit array from a Buffer.
 *
 * @param {Buffer} buffer
 * @return {Bit[]}
 */
export const bufferToBits = (buffer: Buffer): Bit[] => {
  const bits = Array.from(buffer)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('');

  return bits.split('').map(bit => parseInt(bit, 2) as Bit);
};

/**
 * Get a Buffer from a bit array.
 *
 * @param {Buffer} bits
 * @return {Buffer}
 */
export const bitsToBuffer = (bits: Bit[]): Buffer => {
  const bytes = chunk(bits, 8)
    .map(array => array.join(''))
    .map(array => parseInt(array, 2));

  return Buffer.from(bytes);
};

/**
 * Normalise a UTF-8 string.
 *
 * @param {string} text
 * @return {string}
 */
const normalise = (text: string): string => {
  return text.normalize('NFKD');
};

/**
 * Chunk an array to an array of arrays for every `size` items.
 *
 * @param {T[]} array
 * @param {number} size
 * @return {T[][]}
 * @template T
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from<T, T[]>({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
