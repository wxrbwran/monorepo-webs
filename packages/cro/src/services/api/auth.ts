import { auth } from '@/services/auth';

export default {
  // 登录
  token(data): Promise<any> {
    return auth.post('user/token', { data });
  },
};
