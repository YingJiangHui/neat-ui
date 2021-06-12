import { isObject } from '@/utils/utils';

describe('isObject', () => {
  test('除了对象类型返回true，其他的都返回false', () => {
    expect(isObject({})).toBeTruthy();
    const a = [1, '2', NaN, null, undefined, Symbol(), [], () => {}]
      .map(isObject)
      .filter((type) => type);
    expect(a.length).toBe(0);
  });
});
