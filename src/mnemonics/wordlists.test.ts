import { ENGLISH_WORDLIST } from './wordlists';

describe('ENGLISH_WORDLIST', () => {
  it('has 2048 words', () => {
    expect(ENGLISH_WORDLIST).toHaveLength(2048);
  });
});
