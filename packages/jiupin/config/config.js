// https://umijs.org/config/
import path from 'path';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from '../src/routes';
import env from './env.json';
var pjson = require('../package.json');

const oriEnv = env[process.env.APP_ENV];
const defineEnv = {};

// console.log(process.env.APP_ENV);

Object.keys(oriEnv).forEach((key) => {
  defineEnv[`process.env.${key}`] = oriEnv[key];
});

export default defineConfig({
  define: defineEnv,
  hash: true,
  favicon: '/jiupin/assets/favicon.ico',
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  base: oriEnv.publicPath,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : `/${pjson.name}/`,
  antd: {},
  outputPath: `../../${pjson.name}`,
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
  // headScripts: ['https://cdn.bootcdn.net/ajax/libs/d3/3.2.7/d3.min.js'],
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },

  chunks: ['vendors', 'umi', 'rc_base', 'lib', 'polyfill'],
  chainWebpack: (config, { webpack }) => {
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      automaticNameDelimiter: '~',
      // maxAsyncRequests: 7,
      maxInitialRequests: 7,
      cacheGroups: {
        polyfill: {
          name: 'polyfill',
          test({ resource }) {
            return /polyfill|core-js/.test(resource);
          },
          priority: 25,
          reuseExistingChunk: true,
        },
        lib: {
          name: 'lib',
          test({ resource }) {
            return /antd|moment/.test(resource);
          },
          priority: 25,
          reuseExistingChunk: true,
        },
        rc_base: {
          name: 'rc_base',
          test({ resource }) {
            return /react|react-dom|dva/.test(resource);
          },
          priority: 25,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'vendors',
          test({ resource }) {
            return /node_modules/.test(resource);
          },
          priority: 10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
        },
      },
    });
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => [/moment[/\\]locale$/, /zh-cn/]);
    // config.module
    //   .rule('xlsx')
    //   .test(/.(xlsx)$/)
    //   .use('file-loader')
    //   .loader(require.resolve('file-loader'));
    // config.plugin('umi-webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
  },
  proxy: {
    '/api': {
      target: 'http://172.16.10.16:8000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
