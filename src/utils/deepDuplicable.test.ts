import deepDuplicable from '@/utils/deepDuplicable';
describe('deepDuplicable', () => {
  test('可以对简单类型的值进行覆盖', () => {
    const source = { name: 'x', age: 10 };
    const target = { name: 'x', age: 11 };
    const result = { name: 'x', age: 11 };
    expect(deepDuplicable(source, target)).toEqual(result);
  });
  test('可以对发杂类型的值进行合并', () => {
    const source = {
      name: 'y',
      friends: ['a', 'b'],
      friend_a: { name: 'a', friends: ['x', 'y'] },
    };
    const target = {
      name: 'x',
      friends: ['c', 'd'],
      friend_a: { name: 'x', friends: ['x', 'x'] },
    };
    const result = {
      name: 'x',
      friends: ['a', 'b', 'c', 'd'],
      friend_a: { name: 'x', friends: ['x', 'y'] },
    };
    expect(deepDuplicable(source, target)).toEqual(result);
  });

  test('可以对不同的对属性进行并集', () => {
    // 功能待定
  });
  test('可以实现无限层级的合成拷贝', () => {
    const source = { a: { b: { c: { d: { n: 11, arr: [1, 2] } } } } };
    const target = { a: { b: { c: { d: { n: 10, arr: [3] } } } } };
    const result = { a: { b: { c: { d: { n: 10, arr: [1, 2, 3] } } } } };
    expect(deepDuplicable(source, target)).toEqual(result);
  });
});
