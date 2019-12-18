import { KeyInfo } from '../hardware-wallet';
import { compressPublicKey, createExtendedPublicKey, getFingerprint, getSegmentNumber, toHex } from './extended-keys';

const CHILD_KEY_INFO: KeyInfo = {
  publicKey:
    '04d54226ceac221f494aa1888252f47220e9d4cf0ddc11a651433bcad6364ee2af9862e1c78d56331267a95c660b182ea47e8dd0cedb231a2a1de59e8c3031bf22',
  chainCode: 'f34046e410a060091825436065aa12e074c6c8f348e3528578e902777789d0b5'
};

const PARENT_KEY_INFO: KeyInfo = {
  publicKey:
    '041e31e8432aab932fe18b5f9798b7252394ff0b943920b40c50a79301062df5ece2b884a45c456241e35000137e6dbd92c9119ccd5f46cc92ba9568ca661b994b',
  chainCode: 'c4d424c253ca0eab92de6d8c819a37889e15a11bbf1cb6a48ffca2faef1f4d4d'
};

describe('createExtendedPublicKey', () => {
  it('returns an extended public key from child and parent key info', () => {
    const xpub = createExtendedPublicKey(`m/44'/60'/0'`, PARENT_KEY_INFO, CHILD_KEY_INFO);
    expect(xpub).toBe(
      'xpub6BgUxAtypzvf4CzewNRULb2wN34N611PJUuWKoTCE8HTur9zwSb9nAP92mHz2MwmyvVnEpeDXNUqZC4w5sgrNPJBy2LS53T7VeFPqo9bFpp'
    );
  });
});

describe('compressPublicKey', () => {
  it('returns a compressed public key', () => {
    expect(compressPublicKey(CHILD_KEY_INFO.publicKey).toString('hex')).toBe(
      '02d54226ceac221f494aa1888252f47220e9d4cf0ddc11a651433bcad6364ee2af'
    );
  });
});

describe('getFingerprint', () => {
  it('returns the fingerprint for a public key', () => {
    const buffer = compressPublicKey(CHILD_KEY_INFO.publicKey);
    expect(getFingerprint(buffer)).toBe(737461078);
  });
});

describe('toHex', () => {
  it('returns a padded hexadecimal string', () => {
    expect(toHex(123, 4)).toBe('007b');
    expect(toHex(456, 6)).toBe('0001c8');
  });

  it('defaults to 8 characters in length', () => {
    expect(toHex(123)).toBe('0000007b');
    expect(toHex(456)).toBe('000001c8');
  });
});

describe('getSegmentNumber', () => {
  it('returns the segment number for a non-hardened segment', () => {
    expect(getSegmentNumber('10')).toBe(0xa);
    expect(getSegmentNumber('25')).toBe(0x19);
  });

  it('returns the segment number for a hardened segment', () => {
    expect(getSegmentNumber(`10'`)).toBe(0x8000000a);
    expect(getSegmentNumber(`25'`)).toBe(0x80000019);
  });

  it('throws an error if the input is not a valid segment', () => {
    expect(() => getSegmentNumber(`'10`)).toThrow();
    expect(() => getSegmentNumber(`25abc`)).toThrow();
  });
});
