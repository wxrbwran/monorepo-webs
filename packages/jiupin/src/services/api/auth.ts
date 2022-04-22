import http from '@/services/http';

export default {
  // 登录
  token(data): Promise<any> {
    return http.post('user/token', { data });
  },
};
