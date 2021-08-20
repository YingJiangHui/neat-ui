// 暂时解决 _JSXStyle 自动未导入问题
// 存在的问题： 污染了全局变量
// @ts-ignore
import _JSXStyle from 'styled-jsx/style';
if (typeof window !== 'undefined') {
  Object.assign(window, { _JSXStyle });
}

export { Loading } from '@/Loading';
export { NeatProvider } from '@/provider';
export { useTheme, ThemeContext } from '@/hooks/use-theme';
export { Button } from '@/Button';
export { Switch } from '@/Switch';

export { Tree } from '@/Tree';
export { Icon } from '@/Icon';
export { Space } from '@/Space';
