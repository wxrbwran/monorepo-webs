/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
// import { history } from 'umi';
import { Base64 } from 'xzl-web-shared/src/utils/base64';
import dayjs from 'dayjs';
import pkg from '../../package.json';

const codeMessage: any = {
  400: '请求参数错误',
  450: '业务处理失败',
  500: '服务异常',
  550: '服务暂不可用',
  2001: '没找到用户',
  2002: '该手机号已被注册',
  2003: '医生存在绑定患者，不能被删除',
  2004: '不合法的绑定关系',
  2005: '当前用户无权发送采集表',
  2006: '重置用户密码失败',
  2007: '新密码必须和原密码不同',
  2008: '密码错误',
  2009: '密码格式错误',
  2010: '用户状态异常',
  2011: '更新用户信息失败',
  2101: '没有找到医院',
  2102: '无法添加部门',
  2103: '科室名称已经存在',
  18001: '发送短信过于频繁',
  18002: '验证码不正确',
  18003: '发送验证码失败',
  2015: '当前医助没有关联的患者',
  2211: '获取药品关联禁忌症失败',
  2300: '医生不能修改医嘱',
};

/**
 * 异常处理程序
 */
interface IError {
  response: Response;
  result: string;
  message: string;
}
const errorHandler = (error: IError): Response => {
  const { response, result, message } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    throw result;
  } else if (!response) {
    if (result || message) {
      notification.error({
        description: result || message,
        message: '请求错误',
      });
    }
    throw result;
  }
  return response;
};

/**
 * 配置request请求时的默认参数s
 */
const headers: any = {
  'xzl-client-id': pkg.name,
  'xzl-page-route': window.location.href,
  'xzl-now-day-start': +dayjs(dayjs().format('YYYY-MM-DD')),
};
export const ajax = extend({
  errorHandler,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const http = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 10000,
  headers,
  prefix: `${process.env.BASEURL}`,
});
//  **********************非白名单get请求,参数base64处理 **********************
// 不需要进行base64编码的接口 开头结尾都不要加'/'
const whiteList: string[] = ['user/avatar'];
function formatUrl(url: string) {
  let newUrl = url;
  const urlRouter = url.replace(`${process.env.BASEURL}`, ''); // api路径和params
  const mark = urlRouter.indexOf('?');
  const pathname = urlRouter.substr(0, mark); // api路径
  if (pathname && !whiteList.includes(pathname)) {
    const params = urlRouter.substr(mark + 6); // params进行base64
    newUrl = `${process.env.BASEURL}${pathname}?data=${encodeURIComponent(Base64.encode(params))}`;
  }
  return newUrl;
}
//  **********************非白名单get请求,参数base64处理 **********************
http.interceptors.request.use((url, options) => {
  // console.log('url', url);
  // console.log('options', options);
  if (options.method === 'get') {
    return {
      url: formatUrl(url),
      options: {
        ...options,
        params: options.data,
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
      // history.push('/login');
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

export default http;
