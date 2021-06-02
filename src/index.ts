// 暂时解决 _JSXStyle 自动未导入问题
// 存在的问题： 污染了全局变量
import _JSXStyle from 'styled-jsx/style';

if (typeof window !== 'undefined') {
  Object.assign(window, { _JSXStyle });
}

export { default as Loading } from '@/Loading';
