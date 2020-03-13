import { Curve } from './curve';

describe('Curve', () => {
  describe('getPoint', () => {
    it('returns a point from an x and y bigint', () => {
      const curve = new Curve();
      const point = curve.getPoint(10n, 20n);

      expect(point.x).toBe(10n);
      expect(point.y).toBe(20n);
    });

    it('returns a point from an x and y buffer', () => {
      const curve = new Curve();
      const point = curve.getPoint(Buffer.from([0x0a]), Buffer.from([0x14]));

      expect(point.x).toBe(10n);
      expect(point.y).toBe(20n);
    });
  });

  describe('getPointFromX', () => {
    it('returns a point from an even x buffer', () => {
      const curve = new Curve();
      // 0x026557fdda1d5d43d79611f784780471f086d58e8126b8c40acb82272a7712e7f2
      const point = curve.getPointFromX(
        Buffer.from('6557fdda1d5d43d79611f784780471f086d58e8126b8c40acb82272a7712e7f2', 'hex'),
        false
      );

      expect(point.x).toBe(45839065423732159571308608389485760609626691787640182990598489261067700725746n);
      expect(point.y).toBe(40544391675021047350621568820028233874386780004400816536483542442104000086524n);
    });

    it('returns a point from an odd x buffer', () => {
      const curve = new Curve();
      // 0x035a784662a4a20a65bf6aab9ae98a6c068a81c52e4b032c0fb5400c706cfccc56
      const point = curve.getPointFromX(
        Buffer.from('5a784662a4a20a65bf6aab9ae98a6c068a81c52e4b032c0fb5400c706cfccc56', 'hex'),
        true
      );

      expect(point.x).toBe(40920663801924305269653119115551778679508146584746982050198744783328810683478n);
      expect(point.y).toBe(57644217303653297295043885393981736616586573165163091864015052012599672961081n);
    });
  });

  describe('decodePoint', () => {
    it('decodes a SEC1 encoded buffer', () => {
      const curve = new Curve();
      const point = curve.decodePoint(
        Buffer.from('035a784662a4a20a65bf6aab9ae98a6c068a81c52e4b032c0fb5400c706cfccc56', 'hex')
      );

      expect(point.x).toBe(40920663801924305269653119115551778679508146584746982050198744783328810683478n);
      expect(point.y).toBe(57644217303653297295043885393981736616586573165163091864015052012599672961081n);
    });
  });
});
