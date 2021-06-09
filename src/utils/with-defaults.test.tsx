import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import withDefaults from '@/utils/with-defaults';
import useContainer from '@/utils/useContainer';
type Props = { text?: string; date: string };
const Component: React.FC<Props> = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
      <p>{props.date}</p>
    </>
  );
};
const { getContainer, mount, unMount } = useContainer();
describe('withDefaults 函数的测试用例', () => {
  beforeEach(mount);
  test('可以注入默认值到Props，并通过类型检测', () => {
    const container = getContainer();
    const ComponentWithProps = withDefaults(Component, {
      text: 'hi',
      date: new Date().getFullYear(),
    });
    act(() => {
      render(<ComponentWithProps />, container);
    });
    expect(container?.querySelector('h1')?.textContent).toBe('hi');
    expect(container?.querySelector('p')?.textContent).toBe(
      new Date().getFullYear().toString(),
    );
  });
  afterEach(unMount);
});
