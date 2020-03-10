import BN from 'bn.js';
import { ec, eddsa } from 'elliptic';

const secp256k1 = new ec('secp256k1');

/**
 * Decode a point from a Buffer.
 *
 * @param {Buffer} point
 * @return {eddsa.Point}
 */
const decodePoint = (point: Buffer): eddsa.Point => {
  return secp256k1.curve.decodePoint(point);
};

/**
 * Derive the public key from a private key. Returns the public key in compressed form.
 *
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
export const getPublicKey = (privateKey: Buffer): Buffer => {
  const key = new BN(privateKey);
  const point = (secp256k1.g as eddsa.Point).mul(key);

  if (point.isInfinity()) {
    throw new Error('Point is infinity');
  }

  return Buffer.from(point.encode('array', true));
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
  const key = new BN(privateKey);
  const tweak = new BN(tweakBuffer);

  if (tweak.gte(secp256k1.n!)) {
    throw new Error('Resulting key is invalid: tweak is larger than n');
  }

  const newKey = key.add(tweak).umod(secp256k1.n as BN);

  if (newKey.eq(new BN(0))) {
    throw new Error('Resulting key is invalid: new key is 0');
  }

  return newKey.toArrayLike(Buffer, 'be', 32);
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
  const key = decodePoint(publicKey);
  const tweak = new BN(tweakBuffer);

  if (tweak.gte(secp256k1.n!)) {
    throw new Error('Resulting key is invalid: tweak is larger than n');
  }

  const q = (secp256k1.g as eddsa.Point).mul(tweak);
  const point = key.add(q);

  if (point.isInfinity()) {
    throw new Error('Resulting key is invalid: point is at infinity');
  }

  return Buffer.from(point.encode('array', true));
};

/**
 * Get the compressed public key from a decompressed public key. Throws if the key is invalid.
 *
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
export const compressPublicKey = (publicKey: Buffer): Buffer => {
  const key = decodePoint(publicKey);

  return Buffer.from(key.encode('array', true));
};

/**
 * Get the decompressed public key from a compressed public key. Throws if the public key is invalid.
 *
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
export const decompressPublicKey = (publicKey: Buffer): Buffer => {
  const key = decodePoint(publicKey);

  return Buffer.from(key.encode('array', false));
};
