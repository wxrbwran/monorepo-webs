import http from '@/services/http';

export default {
  filePrepare(data: object): Promise<any> {
    return http.get('base/file/prepare', { data });
  },
  // 创建随访小组
  addGroup(data: object): Promise<any> {
    return http.post('doctor/contact/group', { data });
  },
  // 查询小组列表
  getGroupList(orgId: any): Promise<any> {
    return http.get(`doctor/contact/group/${orgId}`);
  },
  // 修改随访小组名
  modifyGroup(data: object): Promise<any> {
    return http.patch('/doctor/contact/group', { data });
  },
  // 为患者分配小组
  postGroupPatient(data: any): Promise<any> {
    return http.post('doctor/contact/group/patient', { data });
  },
  // 获取小组下患者列表
  getGroupPatientList(data: any): Promise<any> {
    return http.get('doctor/contact/group/patient', { data });
  },
  // 获取列表logId
  getLogId(data: any): Promise<any> {
    return http.post('contact/patient/rule', { data });
  },
  // 获取全部患者列表
  getPatientsList(data: any): Promise<any> {
    return http.get('contact/patient', { data });
  },
  // 新增视频-文件-文章-图片
  addPublicize(data: any): Promise<any> {
    return http.post('publicize', { data });
  },
  // 修改文章
  patchPublicize(data: any): Promise<any> {
    return http.patch('publicize', { data });
  },
  // 获取视频-文件-文章-图片
  getPublicizeList(data: any): Promise<any> {
    return http.get('publicize/list', { data });
  },
  // 动态获取节点
  fetchNodeEl(url: string, data: any): Promise<any> {
    url = url
      .split('/')
      .filter((a) => !!a)
      .join('/');
    return http.get(`${url}`, { data });
  },
  // 新增随访表
  addPublicizeScale(data: any): Promise<any> {
    return http.post('publicize/scale', { data });
  },
  // 查询随访表
  getPublicizeScale(data: any): Promise<any> {
    return http.get('publicize/scale/list', { data });
  },
  fetchDiagnosis(data: any): Promise<any> {
    return http.get('disease', { data });
  },
  fetchTreatment(data: any): Promise<any> {
    return http.get('treatment', { data });
  },
  // 查看随访表所有回复情况
  getScaleReplyList(data?: any): Promise<any> {
    return http.get('out/reply/count', { data });
  },
  // 查询列表回复和未回复列表
  getScalePatientReply(data?: any): Promise<any> {
    return http.get('reply/list', { data });
  },
  // 查看随访回复详情
  getScaleDetail(id: any): Promise<any> {
    return http.get(`reply/follow/${id}`);
  },
  // 提醒回复量表
  replyDoctorReminder(data?: any): Promise<any> {
    return http.post('research/send_remind', { data });
  },
  // 量表类型查看回复内容
  fetchReplyDetail(data: any): Promise<any> {
    return http.get(`research/scale_patient/${data}`);
  },
  // 预览文件
  getFileInfo(fileId: any): Promise<any> {
    return http.get(`research/project/file/info/${fileId}`);
  },
  // 获取规则
  getRules(source_type: string): Promise<any> {
    return http.get(`template/${source_type}`);
  },
  // 发送计划
  // sendPlan(data?: any): Promise<any> {
  //   return http.post('rules', { data });
  // },
  // 获取已发送内容
  getAllRules(data?: any): Promise<any> {
    return http.get('publicize/rules', { data });
  },

  patchGroupName(data?: any): Promise<any> {
    return http.patch('publicize/group', { data });
  },
  // 获取已发送内容
  getEducationSendContents(data?: any): Promise<any> {
    return http.get('publicizes', { data });
  },
  // 获取已发送内容
  getScalesSendContents(data?: any): Promise<any> {
    return http.get('publicize/scales', { data });
  },


  // 查询诊断处理
  fetchKvScope(data: any): Promise<any> {
    return http.get('kv/scope', { data });
  },
  // 删除宣教：视频-文件-文章
  delPublicize(id: string): Promise<any> {
    return http.delete(`publicize/${id}`);
  },
  // 删除随访表
  delPublicizeScale(id: string, type: string): Promise<any> {
    return http.delete(`publicize/scale/${type}/${id}`);
  },
  // 修改随访表
  patchPublicizeScale(data: any): Promise<any> {
    return http.patch('publicize/scale', { data });
  },
  // 发送计划后，批量更改各个涉及的宣教类型状态
  postPublicizeBatchStatus(data?: any): Promise<any> {
    return http.post('publicize/batch/status', { data });
  },
  // 记录随访当前机构位置
  postContactLocation(data?: any): Promise<any> {
    return http.post('doctor/contact/location', { data });
  },
  // 获取随访当前机构位置
  getContactLocation(data?: any): Promise<any> {
    return http.get('doctor/contact/location', { data });
  },
  // 获取宣教、随访、CRF规则小组 "type": 1 //0：随访表 1：CRF量表 2:宣教
  getPublicizeGroup(data?: any): Promise<any> {
    return http.get('publicize/group', { data });
  },
  // 新建宣教随访crf
  addPublicizeRules(data?: any): Promise<any> {
    return http.post('publicize/rules', { data });
  },

  // 新建宣教随访crf
  editRules(data?: any): Promise<any> {
    return http.patch('rules', { data });
  },
  // 新建宣教随访crf
  appendRules(data?: any): Promise<any> {
    return http.post('rules', { data });
  },
  // 统计发送日历
  getPublicizSendCount(data?: any): Promise<any> {
    return http.get('out/send/count', { data });
  },
  // 统计发送日历--发送详情
  getPublicizSendInfo(data?: any): Promise<any> {
    return http.get('out/send/info', { data });
  },
  // 删除宣教、随访、crf量表
  delPublicizRule(ruleId: string): Promise<any> {
    return http.patch(`rules/state/${ruleId}`);
  },


};
