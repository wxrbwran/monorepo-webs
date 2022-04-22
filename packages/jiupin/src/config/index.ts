import * as devConfig from './dev';
import * as testConfig from './prerelease';
import * as prodConfig from './prod';

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
