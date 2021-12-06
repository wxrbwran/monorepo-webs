
import http from '@/services/http';

export default {
  // 统计院外昨日新增-累计患者-目前医生、患者、护士人数
  getPersonCount(orgNsId: string): Promise<any> {
    return http.get(`management/all/person/count/${orgNsId}`);
  },
  // 院外各科室医生数
  getDepDoctorCount(orgNsId: string): Promise<any> {
    return http.get(`/management/dep/doctor/count/${orgNsId}`);
  },
  // 院外各科室患者数据
  getDepPatientCount(orgNsId: string): Promise<any> {
    return http.get(`management/dep/patient/count/${orgNsId}`);
  },
  // 前一天24小时内未回复消息的医生，不包含当天
  getNoReplyDoctor(data: object): Promise<any> {
    return http.get('management/no_reply/doctor', { data });
  },
  // 医生回复率折线图数据
  getDoctorReplyRatio(data: object): Promise<any> {
    return http.get('management/doctor/reply/ratio', { data });
  },
  // 医生平均回复率，随访回复列表
  getDoctorMsgSfList(data: object): Promise<any> {
    return http.get('management/doctor/msg_sf/list', { data });
  },
  // 患者的调药数据和服药计划数据
  getPatientAdjustAndPlan(data: object): Promise<any> {
    return http.get('management/patient/adjust_and_plan/count', { data });
  },
  // 院外医生下患者列表： 业务数据，调药，服药计划，血压血糖，心率
  getPatientOperationData(data: object): Promise<any> {
    return http.get('management/patient/operation/data', { data });
  },
  // 搜索查询院外机构下所有医生
  getStatisticDoctor(orgNsId: string): Promise<any> {
    return http.get(`management/statistic/doctor/${orgNsId}`);
  },
};
