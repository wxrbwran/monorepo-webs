/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
// import { history } from 'umi';
import { Base64 } from 'xzl-web-shared/dist/utils/base64';
// import pkg from '../../package.json';

const codeMessage: any = {
  400: '请求参数错误',
  450: '业务处理失败',
  500: '服务异常',
  550: '服务暂不可用',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: Store): Response => {
  const { response, result, message } = error;
  console.log('errorHandler', error);
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    throw result;
  } else if (!response) {
    notification.error({
      description: result || message,
      message: '异常',
    });
    throw result;
  }
  return response;
};

/**
 * 配置request请求时的默认参数s
 */
const dateString = new Date().toLocaleDateString();
const headers: any = {
  'Content-Type': 'application/json;charset=UTF-8',
  'xzl-client-id': 'xzl-web-out-org',
  'xzl-page-route': window.location.href,
  'xzl-now-day-start': new Date(dateString).getTime(),
};

const http = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 10000,
  headers,
  prefix: `${process.env.BASEURL}`,
});
//  **********************非白名单get请求,参数base64处理 **********************
// 不需要进行base64编码的接口 开头结尾都不要加'/'
const whiteList: string[] = [];
function formatUrl(url: string, data: Store) {
  let newUrl = url;
  if (!whiteList.includes(url) && data) {
    newUrl = `${url}?data=${encodeURIComponent(Base64.encode(JSON.stringify(data)))}`;
  }
  return newUrl;
}

http.interceptors.request.use((url, options) => {
  if (options.method === 'get') {
    return {
      url: formatUrl(url, options.data),
      options: {
        ...options,
      },
    };
  }
  return {
    url,
    options,
  };
});

http.interceptors.response.use(
  async (response: Response) => {
    const authUrl = ['user/password', 'user/verification', 'token'];
    const isWhiteList = authUrl.some((url) => response.url.includes(url));
    if (response.status === 401) {
      localStorage.removeItem('access_token');
      // UI阶段暂时注释掉，后面接了接口需要放开
      // history.push('/user/login');
      return false;
    }
    const resData = await response.clone().json();
    const { status, data } = resData;
    if (status === 'fail') {
      return Promise.reject(data);
    }
    if (isWhiteList) {
      return response;
    }
    return data;
  },
  { global: false },
);

export function setAuthorizationToken(token: string | boolean) {
  // console.log('setAuthorizationToken', token);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    delete headers.Authorization;
  }
}

export default http;
