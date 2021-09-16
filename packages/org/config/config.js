import path from 'path';
import env from './env';
import pkg from '../package.json';

console.log(process.env.APP_ENV);

const oriEnv = env[process.env.APP_ENV] || {};
const defineEnv = {};

Object.keys(oriEnv).forEach((key) => {
  defineEnv[`process.env.${key}`] = oriEnv[key];
});


const config = {
  mfsu: {},
  hash: true,
  favicon: 'favicon.ico',
  define: defineEnv,
  outputPath: pkg.name,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : `/${pkg.name}/`,
  dva: {
    immer: true,
  },
  antd: {},
  locale: {
    default: 'zh-CN',
    title: false,
  },
  ignoreMomentLocale: true,
  targets: {
    ie: 10,
  },
  metas: [
    {
      charset: 'utf-8',
    },
  ],
  alias: {
    '@/': path.resolve(__dirname, '../src/'),
  },
  history: { type: 'hash' },
  sass: {
    prependData: '@import "assets/styles/index.scss";',
    sassOptions: {
      includePaths: [path.resolve(__dirname, '../src')],
    },
  },
  extraPostCSSPlugins: [require('tailwindcss')],
  extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
  externals: {
    echarts: 'window.echarts',
  },
  chainWebpack: (config, { webpack }) => {
    // 使用 dayjs 替换 moment.js
    // config.plugin('antd-dayjs').use(AntdDayjsWebpackPlugin);
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => [/moment[/\\]locale$/, /zh-cn/]);
    config.module
      .rule('xlsx')
      .test(/.(xlsx)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'));
  },
};
export default config;
