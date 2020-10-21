/**
 * Returns a memoized version of a function.
 *
 * @param {Function} fn
 * @param {string} getIdentifier
 * @return {Function}
 */
export const memoize = <Argument, Result>(
  fn: (input: Argument) => Promise<Result>,
  getIdentifier: (input: Argument) => string = (input) => JSON.stringify(input)
): ((input: Argument) => Promise<Result>) => {
  const cache: Record<string, Result> = {};

  return async (input: Argument): Promise<Result> => {
    const identifier = getIdentifier(input);
    if (cache[identifier]) {
      return cache[identifier];
    }

    const result = await fn(input);
    cache[identifier] = result;
    return result;
  };
};
