import http from '@/services/http';

export default {
  getUserInfo(data?: any): Promise<any> {
    return http.get('user/wcl_details', { data });
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
    return http.post('user/reset/sms', { data });
  },
  //  读取消息事件
  delReadMsg({ from_sid, event_type }: { from_sid: string; event_type: number }): Promise<any> {
    return http.delete(`user/events/read_msg/${from_sid}/${event_type}`);
  },
  //  获取价格列表
  getPrice(data: CommonData): Promise<any> {
    return http.get('goods', { data });
  },
  savePrice(data: CommonData): Promise<any> {
    return http.post('goods', { data });
  },

  // 检查科研医生第一执业医院信息
  patchCheckInfo(): Promise<any> {
    return http.patch('research/lazy/check/info');
  },
};
