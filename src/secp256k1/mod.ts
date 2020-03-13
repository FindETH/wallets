import { Curve } from './curve';

/**
 * Get the modular result of an operation.
 *
 * @param {Curve} curve
 * @param {bigint} n
 * @return {bigint}
 */
export const mod = (curve: Curve, n: bigint): bigint => {
  return ((n % curve.p) + curve.p) % curve.p;
};

/**
 * a + b
 *
 * @param {Curve} curve
 * @param {bigint} a
 * @param {bigint} b
 * @return {bigint}
 */
export const add = (curve: Curve, a: bigint, b: bigint): bigint => {
  return mod(curve, a + b);
};

/**
 * a - b
 *
 * @param {Curve} curve
 * @param {bigint} a
 * @param {bigint} b
 * @return {bigint}
 */
export const subtract = (curve: Curve, a: bigint, b: bigint): bigint => {
  return mod(curve, a - b);
};

/**
 * a * b
 *
 * @param {Curve} curve
 * @param {bigint} a
 * @param {bigint} b
 * @return {bigint}
 */
export const multiply = (curve: Curve, a: bigint, b: bigint): bigint => {
  return mod(curve, a * b);
};

/**
 * a / b
 *
 * @param {Curve} curve
 * @param {bigint} a
 * @param {bigint} b
 * @return {bigint}
 */
export const divide = (curve: Curve, a: bigint, b: bigint): bigint => {
  const ap = power(curve, b, curve.p - 2n);
  return mod(curve, multiply(curve, a, ap));
};

/**
 * a ^ b
 *
 * @param {Curve} curve
 * @param {bigint} a
 * @param {bigint} b
 * @return {bigint}
 */
export const power = (curve: Curve, a: bigint, b: bigint): bigint => {
  let x = 1n;
  while (b > 0n) {
    if (a === 0n) {
      return 0n;
    }

    if (b % 2n === 1n) {
      x = multiply(curve, x, a);
    }

    b = b / 2n;
    a = multiply(curve, a, a);
  }

  return x;
};

/**
 * Get the square roots from a y² value on the curve.
 *
 * @param {Curve} curve
 * @param {bigint} value
 * @return {[bigint, bigint]}
 */
export const squareRoots = (curve: Curve, value: bigint): [bigint, bigint] => {
  const p1 = (curve.p - 1n) / 2n;
  const p2 = (curve.p + 1n) / 4n;

  if (power(curve, value, p1) !== 1n) {
    throw new Error('Square root is not an integer');
  }

  const root = power(curve, value, p2);
  const negativeRoot = curve.p - root;

  return [root, negativeRoot];
};
