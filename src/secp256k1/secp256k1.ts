import { bigIntToBuffer, bufferToBigInt } from '../utils';
import { Curve } from './index';

const curve = new Curve();

/**
 * Derive the public key from a private key. Returns the public key in compressed form.
 *
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
export const getPublicKey = (privateKey: Buffer): Buffer => {
  const point = curve.g.multiply(privateKey);

  // TODO
  /*if (point.infinite) {
    throw new Error('Point is infinite');
  }*/

  return point.toBuffer(true);
};

/**
 * Add a tweak to the private key. Will throw an error if the resulting key is invalid, e.g. when the tweak is larger
 * than n, or if Ki = 0.
 *
 * @param {Buffer} privateKey
 * @param {Buffer} tweakBuffer
 * @return {Buffer}
 */
export const privateAdd = (privateKey: Buffer, tweakBuffer: Buffer): Buffer => {
  const key = bufferToBigInt(privateKey);
  const tweak = bufferToBigInt(tweakBuffer);

  if (tweak >= curve.n) {
    throw new Error('Resulting key is invalid: tweak is larger than n');
  }

  const newKey = (key + tweak) % curve.n;
  if (newKey === 0n) {
    throw new Error('Resulting key is invalid: new key is 0');
  }

  return bigIntToBuffer(newKey, 32);
};

/**
 * Add a tweak to the public key. Will throw an error if the resulting key is invalid, e.g. when the tweak is larger
 * than n, or if Ki is the point at infinity.
 *
 * @param {Buffer} publicKey
 * @param {Buffer} tweakBuffer
 * @return {Buffer}
 */
export const publicAdd = (publicKey: Buffer, tweakBuffer: Buffer): Buffer => {
  const key = curve.decodePoint(publicKey);
  const tweak = bufferToBigInt(tweakBuffer);

  if (tweak >= curve.n) {
    throw new Error('Resulting key is invalid: tweak is larger than n');
  }

  const q = curve.g.multiply(tweak);
  const point = key.add(q);

  // TODO
  /*if (point.infinite) {
    throw new Error('Resulting key is invalid: point is at infinity');
  }*/

  return point.toBuffer(true);
};

/**
 * Get the compressed public key from a decompressed public key. Throws if the key is invalid.
 *
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
export const compressPublicKey = (publicKey: Buffer): Buffer => {
  const key = curve.decodePoint(publicKey);

  return key.toBuffer(true);
};

/**
 * Get the decompressed public key from a compressed public key. Throws if the public key is invalid.
 *
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
export const decompressPublicKey = (publicKey: Buffer): Buffer => {
  const key = curve.decodePoint(publicKey);

  return key.toBuffer(false);
};
