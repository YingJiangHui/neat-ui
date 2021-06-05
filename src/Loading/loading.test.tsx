import renderer from 'react-test-renderer';
import { Loading } from '@/Loading/index';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from 'react-dom';

import { mountElement, unmountElement } from '@/utils/nativeElementAction';
let container: null | HTMLDivElement = null;

describe('Loading.Container', () => {
  it('loading快照', () => {
    const component = renderer.create(<Loading />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe('Loading.Container', () => {
  beforeEach(() => {
    container = mountElement();
    console.log(container);
  });
  afterEach(unmountElement.bind(null, container));
  it('可以遮罩盖住内容', () => {
    act(() => {
      render(<Loading.Container loading={true} />, container as HTMLElement);
    });
    expect(container?.querySelector('.loading-blur')).toBeTruthy();
  });
});
