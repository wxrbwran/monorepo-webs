import * as devConfig from './dev';
import * as testConfig from './prerelease';
import * as prodConfig from './prod';

// console.log('process.env', process.env.APP_ENV);
// console.log('process.env.APP_ENV devConfig', devConfig);
// console.log('process.env.APP_ENV debugConfig', debugConfig);
// console.log('process.env.APP_ENV debugConfig', debugConfig);

// eslint-disable-next-line import/no-mutable-exports
let config: CommonData;

switch (process.env.APP_ENV) {
  case 'dev':
    config = devConfig;
    break;
  case 'test':
    config = { ...testConfig };
    break;
  case 'prod':
    config = prodConfig;
    break;
  default:
    config = devConfig;
}
export default config;
