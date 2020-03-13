import { bigIntToBuffer, bufferToBigInt } from '../utils';
import { add, power, squareRoots } from './mod';
import { Point } from './point';

/**
 * Minimal secp256k1 elliptic curve implementation. Thanks to the following projects:
 *  - https://github.com/Azero123/simple-js-ec-math
 *  - https://github.com/indutny/elliptic
 */
export class Curve {
  readonly g: Point = this.getPoint(
    BigInt('0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'),
    BigInt('0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8')
  );
  readonly a: bigint = 0n;
  readonly b: bigint = 7n;
  readonly n: bigint = BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
  readonly p: bigint = BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');

  /**
   * Get a point from an x and y.
   *
   * @param {Buffer | bigint} x
   * @param {Buffer | bigint} y
   * @return {Point}
   */
  getPoint(x: Buffer | bigint, y: Buffer | bigint): Point {
    return new Point(
      this,
      typeof x === 'bigint' ? x : bufferToBigInt(x),
      typeof y === 'bigint' ? y : bufferToBigInt(y)
    );
  }

  /**
   * Get a point from an x.
   *
   * @param {Buffer} xBuffer
   * @param {boolean} isOdd
   * @return {Point}
   */
  getPointFromX(xBuffer: Buffer, isOdd: boolean): Point {
    const x = bufferToBigInt(xBuffer);

    const y2 = add(this, power(this, x, 3n), this.b);
    const ys = squareRoots(this, y2);

    let y = ys[1];
    if ((isOdd && y % 2n === 0n) || (!isOdd && y % 2n !== 0n)) {
      y = ys[0];
    }

    return this.getPoint(x, y);
  }

  /**
   * Decode a point from a SEC1 encoded Buffer.
   *
   * @param {Buffer} bytes
   * @return {Point}
   */
  decodePoint(bytes: Buffer): Point {
    const length = bigIntToBuffer(this.p).byteLength;

    if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) && bytes.length - 1 === length * 2) {
      if (bytes[0] === 0x06 && bytes[bytes.length - 1] % 2 !== 0) {
        throw new Error('Unable to decode point: invalid format');
      }

      if (bytes[0] === 0x07 && bytes[bytes.length - 1] % 2 !== 1) {
        throw new Error('Unable to decode point: invalid format');
      }

      return this.getPoint(bytes.slice(1, length + 1), bytes.slice(length + 1, length * 2 + 1));
    }

    if ((bytes[0] === 0x02 || bytes[0] === 0x03) && bytes.length - 1 === length) {
      return this.getPointFromX(bytes.slice(1, length + 1), bytes[0] === 0x03);
    }

    throw new Error('Unable to decode point: unknown format');
  }
}
