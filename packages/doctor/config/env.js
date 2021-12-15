module.exports = {
  local: {
    BASEURL: 'http://localhost:8001/api/',
  },
  dev: {
    BASEURL: 'http://napi.xzlcorp.com/',
    // BASEURL: 'http://localhost:8000/api/',
    APP_ENV: 'dev',
    PREFIX: 'test',
  },
  test: {
    BASEURL: 'https://testapi.xinzhili.cn/',
    APP_ENV: 'test',
    PREFIX: 'test',
  },
  prod: {
    BASEURL: 'https://napi.xinzhili.cn/',
    APP_ENV: 'prod',
    PREFIX: 'prod',
  },
};
