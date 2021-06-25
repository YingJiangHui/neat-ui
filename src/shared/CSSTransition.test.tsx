import CSSTransition from '@/shared/CSSTransition';
import { render } from 'react-dom';
import useElementContainer from '../../tests/utils/useContainer';
import { act } from 'react-dom/test-utils';
import React from 'react';
const { unMount, mount, getContainer } = useElementContainer();
jest.useFakeTimers();
describe('CSSTransition', () => {
  beforeEach(() => {
    mount();
  });
  afterEach(() => {
    // 退出时进行清理
    unMount();
  });

  it('进入的时候添加 name-enter 类,并在60毫秒之后添加 name-enter-active 类', () => {
    const container = getContainer();
    act(() => {
      render(
        <CSSTransition name="box" visible={true}>
          <div />
        </CSSTransition>,
        getContainer(),
      );
    });
    expect(container?.querySelector('.box-enter')).toBeTruthy();
    expect(container?.querySelector('.box-enter-active')).toBeFalsy();
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(container?.querySelector('.box-enter-active')).toBeTruthy();
  });
  it('离开前添加 name-leave 类,并在60毫秒之后添加 name-leave-active 类', () => {
    const container = getContainer();
    act(() => {
      render(
        <CSSTransition name="box" timeout={1000} visible={true}>
          <div className="box" />
        </CSSTransition>,
        getContainer(),
      );
    });
    act(() => {
      render(
        <CSSTransition name="box" timeout={1000} visible={false}>
          <div className="box" />
        </CSSTransition>,
        getContainer(),
      );
    });
    expect(container?.querySelector('.box-leave')).toBeTruthy();
    expect(container?.querySelector('.box-leave-active')).toBeFalsy();
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(container?.querySelector('.box-leave-active')).toBeTruthy();
    // 1000ms后div已经不在dom树上
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(container?.querySelector('.box')).toBeFalsy();
  });
});
