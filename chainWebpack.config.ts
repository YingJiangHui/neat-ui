import { BaseIConfig } from 'dumi';
const path = require('path');
const chainWebpack: BaseIConfig['chainWebpack'] = (memo) => {
  memo.module.rules.delete('svg'); // 删除默认处理的svg

  // “/src/icon” 中的svg使用 svg-sprite-loader svg方式引入
  // memo.module
  //   .rule('svg-sprite-loader')
  //   .test(/\.svg$/)
  //   .include.add(path.resolve(__dirname, './src/icons'))
  //   .end()
  //   .use('svg-sprite-loader')
  //   .loader('svg-sprite-loader')
  //   .options({ extract: false, symbolId: 'icon-[name]' })
  //   .end();
  // “/src/icon” 之外的使用 file-loader 可以直接使用图片方式引入

  // 报错暂时先用file-loader
  // Module build failed (from ./node_modules/svg-sprite-loader/lib/loader.js):
  // Error: Cannot find module 'webpack/lib/rules/BasicEffectRulePlugin'
  memo.module
    .rule('extra-svg')
    .test(/\.svg$/)
    // .exclude.add(path.resolve(__dirname, './src/icons'))
    // .end()
    .use('extra-svg')
    .loader('@umijs/deps/compiled/file-loader/cjs.js')
    .end();
};

export default chainWebpack;
