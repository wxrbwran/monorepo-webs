import path from 'path';
import env from './env.json';
import pkg from '../package.json'

const oriEnv = env[process.env.APP_ENV];
const defineEnv = {};

for (let key in oriEnv) {
  defineEnv[`process.env.${key}`] = oriEnv[key];
}
// const BundleAnalyzerPlugin = require("umi-webpack-bundle-analyzer").BundleAnalyzerPlugin;
// ref: https://umijs.org/config/
const config = {
  define: defineEnv,
  hash: true,
  favicon: '/clinical-cro/assets/favicon.ico',
  publicPath: '/clinical-cro/',
  outputPath: pkg.name,
  dva: {
    immer: true,
  },
  antd: {
    compact: true,
  },
  // dynamicImport: {
  //   webpackChunkName: true,
  // },
  title: '智能科研平台',
  locale: false,
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
    prependData: '@import "theme/_config.scss";',
    sassOptions: {
      includePaths: [path.resolve(__dirname, '../src/assets')],
    },
  },
  history: { type: 'hash' },
  proxy: {
    '/api': {
      target: 'http://192.168.101.30:8000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  },
  // extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
  externals: {
    echarts: 'window.echarts',
    d3: 'window.d3',
  },
};
export default config;
