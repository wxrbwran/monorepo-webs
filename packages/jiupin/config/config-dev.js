// https://umijs.org/config/
import path from 'path';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from '../src/routes';
import env from './env.json';
var pkg = require('../package.json');

const oriEnv = env[process.env.APP_ENV];
const defineEnv = {};

// console.log(process.env.APP_ENV);

Object.keys(oriEnv).forEach((key) => {
  defineEnv[`process.env.${key}`] = oriEnv[key];
});

export default defineConfig({
  // mfsu: {},
  define: defineEnv,
  hash: true,
  favicon: '/jiupin/assets/favicon.ico',
  antd: {},
  outputPath: pkg.name,
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    title: false,
  },
  layout: {
    ...defaultSettings,
    locale: false,
  },
  targets: {
    ie: 11,
  },
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
  extraPostCSSPlugins: [require('@tailwindcss/postcss7-compat')],
  // extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
  extraBabelPlugins: [],
  externals: {
    echarts: 'window.echarts',
    vis: 'vis',
  },
  // headScripts: ['https://revomedi.oss-cn-beijing.aliyuncs.com/static/xzl-webs/3.2.7/d3.min.js'],
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // proxy: ['bj_dev', 'dev'].includes(APP_ENV) ? proxy[APP_ENV] : {},
  proxy: {
    '/api': {
      target: 'http://172.16.10.9:8000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  base: oriEnv.publicPath,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : `/${pjson.name}/`,
});
