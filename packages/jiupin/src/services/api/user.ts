import http from '@/services/http';

export default {
  getUserInfo(data?: any): Promise<any> {
    return http.get('user/wcl_details', { data });
  },
  // 修改个人资料
  patchUserInfo(data: Store): Promise<any> {
    return http.patch('user/settings/info/own', { data });
  },
  // 修改密码
  patchSettingsPassword(data: Store): Promise<any> {
    return http.patch('user/settings/password', { data });
  },
  // 重置密码
  patchResetPassword(data: Store): Promise<any> {
    return http.patch('user/reset/password', { data });
  },
  // 发送验证码
  postSms(data: Store): Promise<any> {
    return http.post('user/sms', { data });
  },

  approve(data?: any): Promise<any> {
    return http.patch('user/approve', { data });
  },
  // 修改其他角色用户信息
  patchOtherUserInfo(data: CommonData): Promise<any> {
    return http.patch('user/settings/info', { data });
  },
};
