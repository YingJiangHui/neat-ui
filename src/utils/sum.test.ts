import sum from '@/utils/sum';

describe('sum', () => {
  it('can add', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
