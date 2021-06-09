import renderer from 'react-test-renderer';
import { Loading } from '@/Loading/index';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from 'react-dom';
import useContainer from '@/utils/useContainer';
const { getContainer, mount, unMount } = useContainer();

describe('Loading.Container', () => {
  it('loading快照', () => {
    const component = renderer.create(<Loading />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
describe('Loading.Container', () => {
  beforeEach(mount);
  afterEach(unMount);
  it('遮罩可以盖住内容', () => {
    const container = getContainer();
    act(() => {
      render(<Loading.Container loading={true} />, container);
    });
    expect(container?.querySelector('.loading-blur')).toBeTruthy();
    expect(container?.querySelector('.loading-mask')).toBeTruthy();
  });
});
