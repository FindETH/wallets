/**
 * Returns a memoized version of a function.
 *
 * @param {Function} fn
 * @return {Function}
 */
export const memoize = <Argument, Result>(
  fn: (input: Argument) => Promise<Result>
): ((input: Argument) => Promise<Result>) => {
  const cache: Record<string, Result> = {};

  return async (input: Argument): Promise<Result> => {
    const identifier = JSON.stringify(input);
    if (cache[identifier]) {
      return cache[identifier];
    }

    const result = await fn(input);
    cache[identifier] = result;
    return result;
  };
};
