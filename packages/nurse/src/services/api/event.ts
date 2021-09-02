import http from '@/services/http';

export default {
  // 患者是否显示终点事件
  isShowEndEvent(patientSid: any): Promise < any > {
    return http.get(`research/show/end_event/${patientSid}`);
  },
  // 查询患者进行中的科研项目列表
  fetchPatientProjList(patientSid: any): Promise < any > {
    return http.get(`research/end_event/projects/${patientSid}`);
  },
  // 查看项目的终点事件详细信息
  fetchEventDetail(projectSid: any): Promise < any > {
    return http.get(`research/end_event/detail/${projectSid}`);
  },
  // 添加患者终点事件信息
  addEndEvent(data?: any): Promise<any> {
    return http.post('research/patient/end_event', { data });
  },
};
