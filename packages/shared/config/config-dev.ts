const path = require('path');
const env = require('./env');
const pkg = require('../package.json');

const oriEnv = env[process.env.APP_ENV];
const defineEnv = {};

for (const key in oriEnv) {
  defineEnv[`process.env.${key}`] = oriEnv[key];
}

console.log('building ... ', pkg.name, pkg.version);
console.log("path.resolve(process.cwd(), '../src/')", path.resolve(process.cwd(), '../src/'))

const config = {
  mfsu: {},
  hash: true,
  define: defineEnv,
  favicon: '/assets/favicon.ico',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : `/${pkg.name}/`,
  outputPath: pkg.name,
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
    // '@/': path.resolve(__dirname, '../src/'),
    '@/': path.resolve(process.cwd(), './src/'),
  },
  sass: {
    prependData: '@import "assets/styles/index.scss";',
    sassOptions: {
      includePaths: [path.resolve(process.cwd(), './src')],
    },
  },
  history: { type: 'hash' },
  proxy: {
    '/api': {
      target: 'http://172.16.10.25:8000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  extraPostCSSPlugins: [require('@tailwindcss/postcss7-compat')],
  extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [],
  externals: {
    echarts: 'window.echarts',
    vis: 'vis',
  }
};

module.exports = config;
