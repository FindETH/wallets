import { memoize } from './memoize';

describe('memoize', () => {
  it('decorates an existing function', async () => {
    const fn = jest.fn(async (input: string) => input.toUpperCase());
    const memoized = memoize(fn);

    await expect(memoized('foo')).resolves.toBe('FOO');
    await expect(memoized('bar')).resolves.toBe('BAR');

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, 'foo');
    expect(fn).toHaveBeenNthCalledWith(2, 'bar');
  });

  it('memoizes the returned value from the function', async () => {
    const fn = jest.fn(async (input: string) => input.toUpperCase());
    const memoized = memoize(fn);

    await expect(memoized('foo')).resolves.toBe('FOO');
    await expect(memoized('foo')).resolves.toBe('FOO');

    await expect(memoized('bar')).resolves.toBe('BAR');
    await expect(memoized('bar')).resolves.toBe('BAR');

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('memoizes objects', async () => {
    const fn = jest.fn(async (input: { foo: string }) => ({ bar: input.foo }));
    const memoized = memoize(fn);

    await expect(memoized({ foo: 'abc' })).resolves.toStrictEqual({ bar: 'abc' });
    await expect(memoized({ foo: 'abc' })).resolves.toStrictEqual({ bar: 'abc' });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('memoizes objects based on a identifier function', async () => {
    const fn = jest.fn(async (input: { foo: string }) => ({ bar: input.foo }));
    const memoized = memoize(fn, (input) => input.foo);

    await expect(memoized({ foo: 'abc' })).resolves.toStrictEqual({ bar: 'abc' });
    await expect(memoized({ foo: 'abc' })).resolves.toStrictEqual({ bar: 'abc' });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
