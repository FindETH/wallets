import { HARDENED_OFFSET } from '../constants';
import { DerivationPath } from '../derivation-paths';

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
 * Get the index from a derivation path level.
 *
 * @param {string} level
 * @return {number}
 */
export const getIndex = (level: string): number => {
  const result = /^(\d+)('?)$/.exec(level);
  if (!result) {
    throw new Error('Invalid derivation path');
  }

  const item = parseInt(result[1], 10);
  if (result[2] === `'`) {
    return item + HARDENED_OFFSET;
  }

  return item;
};
