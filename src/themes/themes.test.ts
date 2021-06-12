import { Themes } from '@/themes/themes';

describe('themes.createTheme', () => {
  test('可以将用户定义的主题内容和基本的静态的主题结合', () => {
    // TODO
  });
  test('定义已经存在的主题时报错', () => {
    expect(() => {
      Themes.createTheme(Themes.getDefaultPreset(), { type: 'light' });
    }).toThrowError();
  });
});
