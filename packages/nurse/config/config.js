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

const targetUrl = {
  target: 'http://napi.xzlcorp.com/',
};

const config = {
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
    // config.plugin('antd-dayjs-webpack-plugin').use(AntdDayjsWebpackPlugin);
    // config.plugin('antd-dayjs').use(AntdDayjsWebpackPlugin);
    // config.plugin('umi-webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
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
