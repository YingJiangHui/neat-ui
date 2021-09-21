import useContainer from '../../tests/utils/useContainer';
import { act } from 'react-dom/test-utils';
import Checkbox from '@/Checkbox/checkbox';
import { render } from 'react-dom';
import React, { useState } from 'react';
import { renderHook, act as actHook } from '@testing-library/react-hooks';

const { unMount, mount, getContainer } = useContainer();

describe('checkbox unit test', () => {
  beforeEach(mount);
  afterEach(unMount);
  it('可以选中和取消（非受控）', () => {
    const container = getContainer();
    act(() => {
      render(<Checkbox />, container);
    });
    const input = container?.querySelector<HTMLInputElement>('.checkbox');
    expect(input?.checked).toBeFalsy();
    input?.click();
    expect(input?.checked).toBeTruthy();
    input?.click();
    expect(input?.checked).toBeFalsy();
  });

  it('可以设置默认是否选中（非受控）', () => {
    const container = getContainer();
    act(() => {
      render(<Checkbox defaultChecked={true} />, container);
    });
    const input = container?.querySelector<HTMLInputElement>('.checkbox');
    expect(input?.checked).toBeTruthy();
    input?.click();
    expect(input?.checked).toBeFalsy();
    input?.click();
    expect(input?.checked).toBeTruthy();
  });
  it('使用state控制是否选中（受控）', () => {
    const container = getContainer();
    let checked = false;
    act(() => {
      render(
        <Checkbox
          checked={checked}
          onChange={(e) => {
            console.log(e.target.checked);
          }}
        />,
        container,
      );
    });
    const input = container?.querySelector<HTMLInputElement>('.checkbox');
    expect(input?.checked).toBeFalsy();
    input?.click();
    expect(input?.checked).toBeFalsy();

    act(() => {
      render(
        <Checkbox
          checked={checked}
          onChange={(e) => {
            checked = e.target?.checked;
          }}
        />,
        container,
      );
    });
    input?.click();
    expect(checked).toBeTruthy();
  });
});
