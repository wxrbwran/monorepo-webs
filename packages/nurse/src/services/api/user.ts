import http from '@/services/http';

export default {
  getUserInfo(data?: any): Promise<any> {
    return http.get(`user/wcl_details?data=${JSON.stringify(data)}`);
  },
  // 修改个人资料
  patchUserInfo(data: CommonData): Promise<any> {
    return http.patch('user/settings/info/doctor', { data });
  },
  // 修改密码
  patchSettingsPassword(data: CommonData): Promise<any> {
    return http.patch('user/settings/password', { data });
  },
  // 重置密码
  patchResetPassword(data: CommonData): Promise<any> {
    return http.patch('user/reset/password', { data });
  },
  // 发送验证码
  postSms(data: CommonData): Promise<any> {
    return http.post('user/sms', { data });
  },
  //  读取消息事件
  delReadMsg({ from_sid, event_type }:{from_sid: string, event_type: number}): Promise<any> {
    return http.delete(`user/events/read_msg/${from_sid}/${event_type}`);
  },
};
