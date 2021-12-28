module.exports = {
  local: {
    BASEURL: 'http://localhost:8001/api/',
  },
  dev: {
    // BASEURL: process.env.NODE_ENV === 'development'
    //   ? 'http://localhost:8001/api/'
    //   :  'http://napi.xzlcorp.com/',
    BASEURL: 'http://napi.xzlcorp.com/',
    APP_ENV: 'dev',
    PREFIX: 'test',
  },
  test: {
    BASEURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8001/api/'
        : 'https://testapi.xinzhili.cn/',
    // BASEURL: 'https://testapi.xinzhili.cn/',
    APP_ENV: 'test',
    PREFIX: 'test',
  },
  prod: {
    BASEURL: 'https://napi.xinzhili.cn/',
    APP_ENV: 'prod',
    PREFIX: 'prod',
  },
};
