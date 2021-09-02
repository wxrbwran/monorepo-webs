import http from '@/services/http';

export default {
  getIMUser(data?: any): Promise<any> {
    return http.get('mock/im/users', { data });
  },
  getIMPersonGroup(patient_wc_id: string, p_sid: string): Promise<any> {
    return http.get(`ms/yx/session/group/${patient_wc_id}/${p_sid}`);
  },
  sendMsg(data: object): Promise<any> {
    return http.post('ms/yx/message', { data });
  },
  getMsg(data: object): Promise<any> {
    return http.get('ms/yx/im_messages', { data });
  },
  filePrepare(data: object): Promise<any> {
    return http.get('base/file/prepare', { data });
  },
  // 获取患者云信帐号
  getSessionGroup({ patientWcId, patientSid }: any): Promise<any> {
    return http.get(`/ms/yx/session/group/${patientWcId}/${patientSid}`);
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
};
