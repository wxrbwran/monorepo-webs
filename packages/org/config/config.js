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
  chunks: ['vendors', 'umi', 'rc_base', 'lib', 'polyfill'],
  chainWebpack: (config, { webpack }) => {
    // 使用 dayjs 替换 moment.js
    // config.plugin('antd-dayjs').use(AntdDayjsWebpackPlugin);
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
            return /antd|dayjs/.test(resource);
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
    config.module
      .rule('xlsx')
      .test(/.(xlsx)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'));
  },
};
export default config;
