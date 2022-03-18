import path from 'path';
import env from './env.json';
import pkg from '../package.json';

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
  outputPath: `../../${pkg.name}`,
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
      // target: 'http://172.16.10.10:8000/',
      target: 'http://172.16.10.34:8000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  extraPostCSSPlugins: [require('@tailwindcss/postcss7-compat')],
  // extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
  externals: {
    echarts: 'window.echarts',
    d3: 'window.d3',
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
    // config
    //   .plugin("umi-webpack-bundle-analyzer")
    //   .use(new BundleAnalyzerPlugin());
  },
};
export default config;
