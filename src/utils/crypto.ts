import { createHash } from 'crypto';

export const ripemd160 = (input: Buffer): Buffer => {
  return createHash('rmd160')
    .update(input)
    .digest();
};

export const sha256 = (input: Buffer): Buffer => {
  return createHash('sha256')
    .update(input)
    .digest();
};
