import { renderHook } from '@testing-library/react-hooks';
import useButtonLogic from '@/Button/useButtonLogic';
import { getDefaultPreset } from '@/themes/themes';

const { palette } = getDefaultPreset();
describe('useButtonLogic 测试用例', () => {
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
    const { result: result2 } = renderHook(() =>
      useButtonLogic({ type: 'warning' }),
    );
    expect(result2.current.colors).toEqual({
      bg: palette.warning,
      color: '#fff',
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
    const { result: result4 } = renderHook(() =>
      useButtonLogic({ type: 'secondary' }),
    );
    expect(result4.current.colors).toEqual({
      bg: palette.foreground,
      color: palette.background,
      border: palette.foreground,
    });
  });
  test('可以修改 hover 和 focus 的状态', () => {
    // const { result: result5 } = renderHook(() =>
    //   useButtonLogic({ type: 'error-light' }),
    // );
    // expect(result5.current.colors).toEqual({
    //   bg: palette.background,
    //   color: palette.error,
    //   border: palette.error,
    // });
    // const { result: result6 } = renderHook(() =>
    //   useButtonLogic({ type: 'warning-light' }),
    // );
    // expect(result6.current.colors).toEqual({
    //   bg: palette.background,
    //   color: palette.warning,
    //   border: palette.warning,
    // });
    // const { result: result7 } = renderHook(() =>
    //   useButtonLogic({ type: 'success-light' }),
    // );
    // expect(result7.current.colors).toEqual({
    //   bg: palette.background,
    //   color: palette.success,
    //   border: palette.success,
    // });
    // const { result: result8 } = renderHook(() =>
    //   useButtonLogic({ type: 'secondary-light' }),
    // );
    // expect(result8.current.colors).toEqual({
    //   bg: palette.background,
    //   color: palette.foreground,
    //   border: palette.foreground,
    // });
  });
});
