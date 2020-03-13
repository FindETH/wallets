import { bigIntToBuffer, bufferToBigInt } from '../utils';
import { Curve } from './curve';
import { divide, mod, multiply, subtract } from './mod';

export class Point {
  constructor(readonly curve: Curve, readonly x: bigint, readonly y: bigint) {}

  /**
   * Add another point to this point.
   *
   * @param {Point} right
   * @return {Point}
   */
  add(right: Point): Point {
    if (this.equals(right)) {
      return this.double();
    }

    const ys = subtract(this.curve, right.y, this.y);
    const xs = subtract(this.curve, right.x, this.x);
    const s = divide(this.curve, ys, xs);

    const x = subtract(this.curve, subtract(this.curve, multiply(this.curve, s, s), this.x), right.x);
    const y = subtract(this.curve, multiply(this.curve, s, subtract(this.curve, this.x, x)), this.y);

    return new Point(this.curve, x, y);
  }

  /**
   * Double the point.
   *
   * @return {Point}
   */
  double(): Point {
    const sn = this.x ** 2n * 3n + this.curve.a;
    const sd = 2n * this.y;
    const s = divide(this.curve, sn, sd);

    const x = mod(this.curve, s ** 2n - this.x * 2n);
    const y = mod(this.curve, s * (this.x - x) - this.y);

    return new Point(this.curve, x, y);
  }

  /**
   * Multiply the point by a bigint or Buffer. If the value is `1`, the same point will be returned.
   *
   * @param {Buffer | bigint} value
   * @return {Point}
   */
  multiply(value: Buffer | bigint): Point {
    if (typeof value !== 'bigint') {
      value = bufferToBigInt(value);
    }

    if (value === 1n) {
      return this;
    }

    const s = value.toString(2);
    const binaryLength = s.length - 1;

    const addings: Point[] = [];
    let n: Point = this;
    for (let i = binaryLength; i >= 0; i--) {
      const char = s[i];
      if (char === '1') {
        addings.push(n);
      }

      n = n.double();
    }

    let point = addings[0];
    addings.shift();
    while (addings[0]) {
      point = point.add(addings[0]);
      addings.shift();
    }

    return point;
  }

  /**
   * Get the point as a SEC1 encoded Buffer.
   *
   * @param {boolean} compact
   * @return {Buffer}
   */
  toBuffer(compact: boolean = false): Buffer {
    const length = Buffer.from(this.curve.p.toString(16), 'hex').byteLength;
    const x = bigIntToBuffer(this.x, length);

    if (compact) {
      const isEven = this.y % 2n === 0n;
      return Buffer.concat([Buffer.from([isEven ? 0x02 : 0x03]), x]);
    }

    const y = bigIntToBuffer(this.y, length);

    return Buffer.concat([Buffer.from([0x04]), x, y]);
  }

  /**
   * Check if the point is equal to another point.
   *
   * @param {Point} point
   * @return {boolean}
   */
  private equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }
}
