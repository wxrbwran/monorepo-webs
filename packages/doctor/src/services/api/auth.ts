import http from '@/services/http';
// import { extend } from 'umi-request';
// import dayjs from 'dayjs';

export default {
  // 登录
  token(formData: CommonData): Promise<any> {
    // const headers: any = {
    //   'xzl-client-id': formData.clientId || 'xzl-web-doctor',
    //   'xzl-page-route': window.location.href,
    //   'xzl-now-day-start': +dayjs(dayjs().format('YYYY-MM-DD')),
    // };
    // const https = extend({
    //   credentials: 'include', // 默认请求是否带上cookie
    //   timeout: 10000,
    //   headers,
    //   prefix: `${process.env.BASEURL}`,
    // });
    return http.post('user/token', {
      data: formData,
    });
  },
  // 生成uuid
  createUuid(): Promise<any> {
    return http.get('scan/uuid');
  },
  // 根据uuid查询登录信息
  fetchLoginInfo(data: CommonData): Promise<any> {
    return http.get('scan/token', { data });
  },
  // 登录成功后签收
  loginSign(data: CommonData): Promise<any> {
    return http.post('scan/token/sign', { data });
  },
  // web切换登录方式后主动失效此uuid
  uuidInvalid(data: CommonData): Promise<any> {
    return http.post('scan/token/invalid', { data });
  },

  // 更新用户登录次数
  postUserOperationLog(behavior: string): Promise<any> {
    return http.post(`user/operation/log/${behavior}`);
  },
};
