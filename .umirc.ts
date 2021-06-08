import { defineConfig } from 'dumi';
import chainWebpack from './chainWebpack.config';
export default defineConfig({
  title: 'neat-ui-react',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  publicPath: '/neat-ui-react/',
  base: '/neat-ui-react/',
  extraBabelPlugins: [
    [
      'styled-jsx/babel',
      { plugins: ['@styled-jsx/plugin-sass'], optimizeForSpeed: true },
    ],
  ],
  chainWebpack,
});
