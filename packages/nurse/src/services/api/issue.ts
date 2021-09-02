import http from '@/services/http';

export default {
  // 查询待审核问题
  fetchIssue(data: { fromSid: string, objectId: string }): Promise<any> {
    return http.get(`issue?data=${JSON.stringify(data)}`);
  },
  // 调整用药
  sendMedication(data:object): Promise<any> {
    return http.post('issue/medication', { data });
  },
  // 调整用药 和 达标值《大病历类型》
  postIssueStandard(data:object): Promise<any> {
    return http.post('issue/standard', { data });
  },
  // 取消调整
  cancelAdjust(data:object): Promise<any> {
    return http.patch('issue', { data });
  },
  // 医生提醒
  postDoctorRemind(data:object): Promise<any> {
    return http.post('issue/doctor_remind', { data });
  },
  // 获取小铃铛消息列表
  fetchSysMessage(data:object): Promise<any> {
    return http.get(`sys/message?data=${JSON.stringify(data)}`);
  },
  //  // 获取小铃铛消息列表
  //  fetchSysMessage(data:object): Promise<any> {
  //   return http.get(`sys/web_message?data=${JSON.stringify(data)}`);
  // },
  // 更新web端小铃铛提醒状态
  patchSysState(data:object): Promise<any> {
    return http.patch('sys/state', { data });
  },
  // 更新已读消息状态
  patchSysReadAt(): Promise<any> {
    return http.patch('sys/read_at');
  },
};
