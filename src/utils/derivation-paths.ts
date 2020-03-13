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
