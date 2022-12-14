import http from '@/services/http';

export default {
  getIMUser(data?: any): Promise<any> {
    return http.get('mock/im/users', { data });
  },
  sendMsg(data: object): Promise<any> {
    return http.post('v1/ms/yx/message', { data });
  },
  getMsg(data: object): Promise<any> {
    return http.get('v1/ms/yx/im_messages', { data });
  },
  filePrepare(data: object): Promise<any> {
    return http.get('base/file/prepare', { data });
  },
  getPickSessionGroup(data: object): Promise<any> {
    return http.get('v1/ms/pick/session', { data });
  },
  // 根据云信帐号获取用户信息（来电时使用）
  getYxUserInfo(accId: string): Promise<any> {
    return http.get(`/ms/yx/user/${accId}`);
  },
  // 获取用户头像和名称
  getUserInfo(data: object): Promise<any> {
    return http.get('/user/simple/info', { data });
  },
  // 查询单条消息内容
  getSingleMsg(data: object): Promise<any> {
    return http.get('ms/yx/message/content', { data });
  },
  // IM消息撤回
  msgRecall(msg_id: string): Promise<any> {
    return http.delete(`ms/yx/message/${msg_id}`);
  },
  getMsAccid(to_sid: string): Promise<any> {
    return http.get(`v1/ms/acc_id/${to_sid}`);
  },
};
