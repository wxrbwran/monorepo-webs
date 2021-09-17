const env = {
  mock: {
    BASEURL: 'http://127.0.0.1:8018/api/',
    PUB_PATH: '/',
  },
  dev: {
    BASEURL: 'http://napi.xzlcorp.com/',
    NAMESPACE: '',
    AUTH_NAMESPACE: '',
    APP_ENV: 'dev',
  },
  test: {
    BASEURL: 'https://testapi.xinzhili.cn/',
    NAMESPACE: '',
    AUTH_NAMESPACE: '',
    APP_ENV: 'test',
  },
  prod: {
    BASEURL: 'https://napi.xinzhili.cn/',
    NAMESPACE: '',
    AUTH_NAMESPACE: '',
    APP_ENV: 'prod',
  },
};

export default env;
