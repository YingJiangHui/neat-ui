import renderer from 'react-test-renderer';
import { Loading } from '@/Loading/index';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

let container: null | HTMLDivElement = null;

describe('Loading.Container', () => {
  it('loading快照', () => {
    const component = renderer.create(<Loading />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
describe('Loading.Container', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    // 退出时进行清理
    unmountComponentAtNode(container as HTMLDivElement);
    container!.remove();
    container = null;
  });
  it('遮罩可以盖住内容', () => {
    act(() => {
      render(<Loading.Container loading={true} />, container);
    });
    expect(container?.querySelector('.loading-blur')).toBeTruthy();
  });
});
