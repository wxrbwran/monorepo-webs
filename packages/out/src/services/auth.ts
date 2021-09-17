import { extend } from 'umi-request';

const headers: any = {
  'Content-Type': 'application/json;charset=UTF-8',
  'xzl-client-id': 'xzl-web-org',
};
export const auth = extend({
  prefix: `${process.env.BASEURL}${process.env.AUTH_NAMESPACE}`,
  timeout: 10000,
  headers,
});

export const ajax = extend({
  prefix: `${process.env.BASEURL}${process.env.NAMESPACE}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'xzl-client-id': 'xzl-web-org',
  },
});

export default auth;
