import { renderHook } from '@testing-library/react-hooks';
import useButtonLogic from '@/Button/useButtonLogic';
import { getDefaultPreset } from '@/themes/themes';
import hexToRgba from 'hex-to-rgba';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import React from 'react';
import { Button } from '@/Button/index';
import useContainer from '../../tests/utils/useContainer';

const { unMount, mount, getContainer } = useContainer();
const { palette } = getDefaultPreset();
describe('useButtonLogic 测试用例', () => {
  beforeEach(mount);
  afterEach(unMount);
  test('可以展示基础的Button样式', () => {
    const { result } = renderHook(() => useButtonLogic({}));
    expect(result.current.colors).toEqual({
      bg: palette.background,
      color: palette.grayscale_5,
      border: palette.border,
    });
  });
  test('可以修改 type 属性展示不同的样式', () => {
    const { result: result1 } = renderHook(() =>
      useButtonLogic({ type: 'error' }),
    );
    expect(result1.current.colors).toEqual({
      bg: palette.error,
      color: '#fff',
      border: palette.error,
    });
    expect(result1.current.reaction).toEqual({
      bg: palette.background,
      color: palette.error,
      border: palette.error,
    });
    const { result: result2 } = renderHook(() =>
      useButtonLogic({ type: 'warning' }),
    );
    expect(result2.current.colors).toEqual({
      bg: palette.warning,
      color: '#fff',
      border: palette.warning,
    });
    expect(result2.current.reaction).toEqual({
      bg: palette.background,
      color: palette.warning,
      border: palette.warning,
    });
    const { result: result3 } = renderHook(() =>
      useButtonLogic({ type: 'success' }),
    );
    expect(result3.current.colors).toEqual({
      bg: palette.success,
      color: '#fff',
      border: palette.success,
    });
    expect(result3.current.reaction).toEqual({
      bg: palette.background,
      color: palette.success,
      border: palette.success,
    });
    const { result: result4 } = renderHook(() =>
      useButtonLogic({ type: 'secondary' }),
    );
    expect(result4.current.colors).toEqual({
      bg: palette.foreground,
      color: palette.background,
      border: palette.foreground,
    });
    expect(result4.current.reaction).toEqual({
      bg: palette.background,
      color: palette.foreground,
      border: palette.foreground,
    });

    const { result: result5 } = renderHook(() =>
      useButtonLogic({ type: 'secondary-light' }),
    );
    expect(result5.current.reaction).toEqual({
      bg: hexToRgba(palette.foreground, 0.8),
      color: palette.background,
      border: 'transparent',
    });
    const { result: result6 } = renderHook(() =>
      useButtonLogic({ type: 'error-light' }),
    );
    expect(result6.current.reaction).toEqual({
      bg: hexToRgba(palette.error, 0.8),
      color: '#fff',
      border: 'transparent',
    });
    const { result: result7 } = renderHook(() =>
      useButtonLogic({ type: 'warning-light' }),
    );
    expect(result7.current.reaction).toEqual({
      bg: hexToRgba(palette.warning, 0.8),
      color: '#fff',
      border: 'transparent',
    });
    const { result: result8 } = renderHook(() =>
      useButtonLogic({ type: 'success-light' }),
    );
    expect(result8.current.reaction).toEqual({
      bg: hexToRgba(palette.success, 0.8),
      color: '#fff',
      border: 'transparent',
    });
  });

  test('它支持不同的状态', () => {
    const { result: result1 } = renderHook(() =>
      useButtonLogic({ disabled: true }),
    );
    expect(result1.current.cursors).toEqual({
      cursor: 'not-allowed',
      pointerEvents: 'auto',
    });
    expect(result1.current.colors).toEqual({
      bg: palette.grayscale_1,
      color: palette.grayscale_3,
      border: palette.border,
    });
    const { result: result2 } = renderHook(() =>
      useButtonLogic({ loading: true }),
    );
    expect(result2.current.cursors).toEqual({
      cursor: 'default',
      pointerEvents: 'none',
    });
    const fn = jest.fn();
    const container = getContainer();
    act(() => {
      render(<Button disabled={true} onClick={fn} />, container);
    });
    (container?.querySelector('.button') as HTMLButtonElement)!.click();
    expect(fn.mock.calls.length).toBe(0);
  });
});
