import path from 'path';
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import env from './env.json';

const pkg = require('../package.json');
// const { BundleAnalyzerPlugin } = require('umi-webpack-bundle-analyzer');

const oriEnv = env[process.env.APP_ENV];
const defineEnv = {};

for (const key in oriEnv) {
  defineEnv[`process.env.${key}`] = oriEnv[key];
}

console.log('building ... ', pkg.name, pkg.version);

const config = {
  // mfsu: {},
  hash: true,
  define: defineEnv,
  outputPath: pkg.name,
  favicon: '/assets/favicon.ico',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : `/${pkg.name}/`,
  ignoreMomentLocale: true,
  dva: {
    immer: false,
  },
  antd: {
    compact: true,
  },
  title: '心之力',
  locale: {
    default: 'zh-CN',
    title: false,
  },
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
  sass: {
    prependData: '@import "assets/styles/index.scss";',
    sassOptions: {
      includePaths: [path.resolve(__dirname, '../src')],
    },
  },

  proxy: {
    '/api': {
      target: 'http://172.16.10.25:8000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  history: { type: 'hash' },
  extraPostCSSPlugins: [require('@tailwindcss/postcss7-compat')],
  extraBabelPlugins:
    process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
  externals: {
    echarts: 'window.echarts',
    vis: 'vis',
  },
};
export default config;
