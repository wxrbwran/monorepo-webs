import { extend } from 'umi-request';

export const auth = extend({
  prefix: `${process.env.BASEURL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'xzl-client-id': 'xzl-web-doctor',
  },
});

export const ajax = extend({
  prefix: `${process.env.BASEURL}${process.env.NAMESPACE}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export default auth;
