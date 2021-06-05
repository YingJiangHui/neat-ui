import classnames from '@/shared/classnames';
describe('classnames', () => {
  test('可以用空格连接', () => {
    expect(classnames('className1', 'className2')).toEqual(
      'className1 className2',
    );
  });
  test('可以自动过滤falsy值', () => {
    expect(
      classnames('className1', false, undefined, null, 'className2'),
    ).toEqual('className1 className2');
  });
});
