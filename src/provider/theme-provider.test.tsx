import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import useContainer from '../../tests/utils/useContainer';
import ThemeProvider from '@/provider/theme-provider';
import { useTheme } from '@/hooks/use-theme';

const { mount, unMount, getContainer } = useContainer();
const Child = () => {
  const theme = useTheme();
  return <div>{theme.type}</div>;
};
describe('ThemeProvider unit test', () => {
  beforeEach(mount);
  afterEach(unMount);
  it('可以更换主题', () => {
    const container = getContainer();
    act(() => {
      render(
        <ThemeProvider>
          <Child />
        </ThemeProvider>,
        container,
      );
    });
    expect(container?.textContent).toBe('light');
    act(() => {
      render(
        <ThemeProvider themeType="dark">
          <Child />
        </ThemeProvider>,
        container,
      );
    });
    expect(container?.textContent).toBe('dark');
  });
  it('可以自定义主题', () => {
    const container = getContainer();
    act(() => {
      render(
        <ThemeProvider
          themes={[{ type: 'myCustomTheme' }]}
          themeType="myCustomTheme"
        >
          <Child />
        </ThemeProvider>,
        container,
      );
    });
    expect(container?.textContent).toBe('myCustomTheme');
  });
});
