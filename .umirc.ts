import { defineConfig } from 'dumi';
import chainWebpack from './chainWebpack.config';

export default defineConfig({
  title: 'neat ui',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b7.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b6.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  publicPath: '/neat-ui-react/',
  base: '/neat-ui-react/',
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/YingJiangHui/neat-ui-react',
    },
  ],
  // extraBabelPresets: [
  //   [
  //     'styled-jsx/babel',
  //     {
  //       'styled-jsx': {plugins: ['@styled-jsx/plugin-sass'], optimizeForSpeed: true},
  //     }
  //   ],
  // ],

  extraBabelPlugins: [
    [
      'styled-jsx/babel',
      { plugins: ['@styled-jsx/plugin-sass'], optimizeForSpeed: true },
    ],
  ],
  apiParser: {
    propFilter: {
      skipNodeModules: true,
      // skipPropsWithoutDoc: true,
    },
  },
  chainWebpack,
});
