import { auth, ajax } from '@/services/auth';
import qs from 'qs';

export default {
  // 登录
  token(formData: CommonData): Promise<any> {
    return auth.post('token', {
      data: qs.stringify(formData)
    });
  },
};
