import { DerivationPath } from '../derivation-paths';

export const HARDENED_OFFSET = 0x80000000;

/**
 * Get a full derivation path as string.
 *
 * @param {string} derivationPath
 * @param {number} index
 * @return {string}
 */
export const getFullPath = (derivationPath: DerivationPath, index: number): string => {
  return derivationPath.path.replace('<account>', index.toString(10));
};

/**
 * Get the prefix segments from a (non-hardened) derivation path.
 *
 * @param {string} derivationPath
 * @return {string}
 */
export const getPathPrefix = (derivationPath: string): string => {
  const segments = derivationPath.split('/').slice(0, -1);

  return segments.join('/');
};

/**
 * Get the full derivation path as a number array.
 *
 * @param {DerivationPath} derivationPath
 * @return {number[]}
 */
export const toArray = (derivationPath: string): number[] => {
  const segments = derivationPath.split('/').slice(1);

  return segments.map((segment) => {
    const isHardened = segment.endsWith("'");
    const index = parseInt(segment, 10);

    if (isHardened) {
      return HARDENED_OFFSET + index;
    }

    return index;
  });
};

/**
 * Get a full derivation path from a number array.
 *
 * @param {number[]} derivationPath
 * @return {string}
 */
export const fromArray = (derivationPath: number[]): string => {
  return [
    'm',
    ...derivationPath.map((index) => {
      const isHardened = index >= HARDENED_OFFSET;

      if (isHardened) {
        return `${index - HARDENED_OFFSET}'`;
      }

      return index;
    })
  ].join('/');
};
