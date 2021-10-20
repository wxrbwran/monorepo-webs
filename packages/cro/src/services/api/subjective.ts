import http from '@/services/http';

export default {
  // 获取量表列表
  getScaleGroup(data?: any): Promise<any> {
    return http.get(`research/scale_group?data=${JSON.stringify(data)}`);
  },
  // 添加主观量表-新
  addSubjectiveScale(data?: any): Promise<any> {
    console.log('=============== addSubjectiveScale', JSON.stringify(data));
    return http.post('research/scale', { data });
  },
  // 获取主观量表详情-新
  getSubjectiveScaleDetail(groupId?: any): Promise<any> {
    return http.get(`research/scale/${groupId}`);
  },
  //更新计划-新
  //删除主观量表里的计划-新
  deleteScaleRule(data?: any): Promise<any> {
    return http.delete(`/rules/${data}`);
  },
  //新增主观量表里的计划-新
  addScaleRule(data?: any): Promise<any> {
    return http.post('rules', { data });
  },
  // 修改主观量表
  patchSubjectiveScale(data?: any): Promise<any> {
    return http.patch('research/scale', { data });
  },


  // 创建主观量表
  postSubjectiveScale(data?: any): Promise<any> {
    console.log('=============== postSubjectiveScale', JSON.stringify(data));
    return http.post('research/subjective/scale', { data });
  },


  // 创建CRF量表
  postCrfScale(data?: any): Promise<any> {
    return http.post('research/crf/scale', { data });
  },
  // 获取主观量表详情
  getSubjectiveScale(groupId?: any): Promise<any> {
    return http.get(`research/subjective/scale/${groupId}`);
  },
  // 获取CRF量表详情
  getCrfScale(groupId?: any): Promise<any> {
    return http.get(`research/crf/scale/${groupId}`);
  },
  //添加客观量表
  addObjectiveScale(data?: any): Promise<any> {
    return http.post('research/objective/scale', { data });
  },
  updateObjectiveScale(data?: any): Promise<any> {
    return http.patch('objective/scale', { data });
  },
  //获取客观量表详情
  getObjectiveScale(groupId?: any): Promise<any> {
    return http.get(`research/objective/scale/${groupId}`);
  },
  // 客观检查计划回复详情
  getReplyDetail(data?: any): Promise<any> {
    // return http.get('research/objective/examination/info',{ data });
    return http.get(`research/objective/examination/info?data=${JSON.stringify(data)}`);
  },
  // 获取量表回复详情
  getPatientScale(data?: any): Promise<any> {
    return http.get('patient/scale', { data });
  },
  //更新计划
  updateScalePlan(data?: any): Promise<any> {
    return http.patch('research/scale_plan', { data });
  },
  // 创建量表模板
  postScaleTemplate(data?: any): Promise<any> {
    return http.post('scale/template', { data });
  },
  // 查询量表模板列表
  getScaleTemplate(): Promise<any> {
    return http.get('all/scale/template');
  },
  // 删除量表模板
  delScaleTemplate(data?: any): Promise<any> {
    return http.delete(`scale/template/${data}`);
  },
  // 量表模板详情
  scaleTemplateDtail(data?: any): Promise<any> {
    return http.get(`scale/template/${data}`);
  },
  // 修改量表模板
  scaleTemplateModify(data?: any): Promise<any> {
    return http.patch('scale/template', { data });
  },
  //添加常用题
  postCommonQuestion(data?: any): Promise<any> {
    return http.post('common/question', { data });
  },
  //获取常用题
  getCommonQuestion(): Promise<any> {
    return http.get('all/common/question');
  },
  //删除常用题
  delCommonQuestion(data?: any): Promise<any> {
    return http.delete(`common/question/${data}`);
  },
  //查看主观量表所有回复情况
  getScaleReplyList(data?: any): Promise<any> {
    return http.get(`research/scale_reply?data=${JSON.stringify(data)}`);
  },
  //查看crf量表所有回复情况
  getCrfScaleReplyList(data?: any): Promise<any> {
    return http.get(`research/crf/scale_reply?data=${JSON.stringify(data)}`);
  },
  //查询列表回复和未回复列表
  getScalePatientReply(data?: any): Promise<any> {
    return http.get(`research/scale/patient_reply?data=${JSON.stringify(data)}`);
  },
  //提醒回复量表
  replyDoctorReminder(data?: any): Promise<any> {
    return http.post('research/send_remind', { data });
  },
  // 删除量表
  delScale(data?: any): Promise<any> {
    return http.delete('research/scale', { data });
  },
};
