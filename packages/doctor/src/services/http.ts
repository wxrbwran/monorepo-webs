/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { history } from 'umi';
import { Base64 } from 'xzl-web-shared/dist/src/utils/base64';
import dayjs from 'dayjs';
import pkg from '../../package.json';

/**
 * 配置request请求时的默认参数s
 */
export const headers: any = {
  'xzl-client-id': pkg.name,
  'xzl-page-route': window.location.href,
  'xzl-now-day-start': +dayjs(dayjs().format('YYYY-MM-DD')),
};
export const ajax = extend({
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const http = extend({
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 10000,
  headers,
  prefix: `${process.env.BASEURL}`,
});
//  **********************非白名单get请求,参数base64处理 **********************
// 不需要进行base64编码的接口 开头结尾都不要加'/'
const whiteList: string[] = ['user/avatar'];
function formatUrl(url: string, data: Store) {
  let newUrl = url;
  if (!whiteList.includes(url)) {
    newUrl = `${url}?data=${encodeURIComponent(Base64.encode(JSON.stringify(data)))}`;
  }
  return newUrl;
}
//  **********************非白名单get请求,参数base64处理 **********************
http.interceptors.request.use((url, options) => {
  console.log('url', url);
  console.log('options.data', options.data);
  if (options.method === 'get'
    && options.data
    && Object.keys(options.data).length > 0
    && !url.includes('?data=')) {
    const { data, params, ...resOpts } = options;
    const newUrl = formatUrl(url, data);
    delete options.data;
    delete options.params;
    console.log('resOpts', resOpts);
    return {
      url: newUrl,
      options: {
        ...resOpts,
      },
    };
  } else {
    return {
      url,
      options,
    };
  }
});

http.interceptors.response.use(
  async (response: Response) => {
    const authUrl = [
      'user/verification',
      'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/',
      'https://xzl-user-avatar.oss-cn-hangzhou.aliyuncs.com/',
      'https://xzl-qc-files.oss-cn-hangzhou.aliyuncs.com/',
      'https://xzl-archive-files.oss-cn-hangzhou.aliyuncs.com',
    ];
    const isWhiteList = authUrl.some((url) => response.url.includes(url));
    if (isWhiteList) {
      return response;
    }
    if (response.status === 401) {
      history.push('/login');
      window.$storage.removeItem('access_token');
    } else if (response.status !== 200) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('接口请求失败');
    }
    const resData = await response.clone().json();
    const { status, data } = resData;
    if (status === 'fail') {
      return Promise.reject(data);
    }
    return data;
  },
  { global: false },
);

export function setAuthorizationToken(token: string | boolean) {
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    delete headers.Authorization;
  }
}
export function setXzlClientId(id: string) {
  const client = 'xzl-client-id';
  headers[client] = id;
}
export default http;
