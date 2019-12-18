/* tslint:disable no-bitwise */

import { encode } from 'bs58';
import { ETHEREUM_P2PKH } from '../constants';
import { KeyInfo } from '../hardware-wallet';
import { ripemd160, sha256 } from './crypto';

const HARDENED_SEGMENT = 0x80000000;

/**
 * Create an extended public key from a derivation path, and parent and child public key and chain code.
 *
 * @param {string} childDerivationPath
 * @param {KeyInfo} parent
 * @param {KeyInfo} child
 * @return {string}
 */
export const createExtendedPublicKey = (childDerivationPath: string, parent: KeyInfo, child: KeyInfo): string => {
  const pathSegments = childDerivationPath.substring(2).split('/');
  const parentPublicKey = compressPublicKey(parent.publicKey);
  const fingerprint = getFingerprint(parentPublicKey);

  return encodeBase58Check(
    toHex(ETHEREUM_P2PKH) +
      toHex(pathSegments.length, 2) +
      toHex(fingerprint) +
      toHex(getSegmentNumber(pathSegments[pathSegments.length - 1])) +
      child.chainCode +
      compressPublicKey(child.publicKey).toString('hex')
  );
};

/**
 * Compress a public key string.
 *
 * @param {string} publicKey
 * @return {Buffer}
 */
export const compressPublicKey = (publicKey: string): Buffer => {
  const publicKeyBuffer = Buffer.from(publicKey, 'hex');
  const prefix = Buffer.alloc(1);
  prefix[0] = (publicKeyBuffer[64] & 1) !== 0 ? 0x03 : 0x02;

  return Buffer.concat([prefix, publicKeyBuffer.slice(1, 1 + 32)]);
};

/**
 * Get the fingerprint from a public key buffer.
 *
 * @param {Buffer} publicKey
 * @return {number}
 */
export const getFingerprint = (publicKey: Buffer): number => {
  const buffer = ripemd160(sha256(publicKey));

  return ((buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3]) >>> 0;
};

/**
 * Add the Base58 checksum to the xpub key.
 *
 * @param {string} input
 * @return {string}
 */
export const encodeBase58Check = (input: string): string => {
  const buffer = Buffer.from(input, 'hex');
  const checksum = sha256(sha256(buffer)).slice(0, 4);

  const hash = Buffer.concat([buffer, checksum]);
  return encode(Buffer.from(hash));
};

/**
 * Convert a number to a hexadecimal string with padded zeroes if applicable.
 *
 * @param {number} num
 * @param {number} maxLength
 * @return {string}
 */
export const toHex = (num: number, maxLength: number = 8): string => {
  return num.toString(16).padStart(maxLength, '0');
};

/**
 * Get the segment number from a derivation path segment.
 *
 * @param {string} segment
 * @return {number}
 */
export const getSegmentNumber = (segment: string): number => {
  const result = /^(\d+)('?)$/.exec(segment);
  if (!result) {
    throw new Error('Invalid derivation path');
  }

  const item = parseInt(result[1], 10);
  if (result[2] === `'`) {
    return item + HARDENED_SEGMENT;
  }

  return item;
};
