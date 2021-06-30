import { act, renderHook } from '@testing-library/react-hooks';
import useTimeout from '@/hooks/useTimeout';

jest.useFakeTimers();
describe('useTimeout', () => {
  test('开启一个定时器', () => {
    const fn = jest.fn();
    const { result: result2 } = renderHook(() => useTimeout(100, fn, []));
    act(() => {
      result2.current.trigger();
      jest.runAllTimers(); // trigger setTimeout
    });
    expect(fn).toBeCalled();
  });
  test('连续开启定时器值只执行一次', () => {
    const fn = jest.fn();
    const { result: result2 } = renderHook(() => useTimeout(100, fn, []));
    act(() => {
      result2.current.trigger();
      result2.current.trigger();
      jest.runAllTimers(); // trigger setTimeout
    });
    expect(fn.mock.calls.length).toBe(1);
  });
  test('手动关闭定时器', () => {
    const fn = jest.fn();
    const { result: result2 } = renderHook(() => useTimeout(100, fn, []));
    act(() => {
      result2.current.trigger();
    });
    result2.current.clear();
    act(() => {
      jest.runAllTimers(); // trigger setTimeout
    });
    expect(fn.mock.calls.length).toBe(0);
  });
  test('前一个定时器结束后再次触发定时器', () => {
    const fn = jest.fn();
    const { result: result2, rerender } = renderHook(
      ({ timeout, callback }: { timeout: number; callback: () => void }) => {
        return useTimeout(timeout, callback, []);
      },
    );
    rerender({ timeout: 200, callback: fn });

    act(() => {
      result2.current.trigger();
      jest.runAllTimers(); // trigger setTimeout
      result2.current.trigger();
      jest.runAllTimers(); // trigger setTimeout
    });
    expect(fn.mock.calls.length).toBe(2);
  });
  test('测试依赖更新', () => {
    // 无法测试：根据依赖更新回调函数内部的值，在测试环境中不论如何都能获取到state的最新值
  });
});
