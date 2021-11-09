import http from '@/services/http';

export default {
  // 获取项目列表
  getProjectList(orgNsId: string): Promise<any> {
    return http.get(`management/org/projects/${orgNsId}`);
  },
  // 查询机构中科研项目的数据统计信息
  getProjectStatistics(orgNsId: string): Promise<any> {
    return http.get(`management/project/statistics/${orgNsId}`);
  },
  // 查询科室下所有科研项目
  getDepartmentProject(departmentNsId: string): Promise<any> {
    return http.get(`management/department/projects/${departmentNsId}`);
  },

  // 获取患者统计图表
  getPatientStatistic(): Promise<any> {
    return http.get('research/patient/statistics');
  },
  // 获取项目统计图表
  getPStatistic(): Promise<any> {
    return http.get('research/project/statistics');
  },
  // 获取量表列表
  getScaleGroup(data?: any): Promise<any> {
    return http.get('research/scale_group', { data });
  },
  // 查看量表所有回复情况
  getScaleReplyList(data?: any): Promise<any> {
    return http.get('out/subjective/reply', { data });
  },
  // 查询列表回复和未回复列表
  getScalePatientReply(data?: any): Promise<any> {
    return http.get('research/scale/patient_reply', { data });
  },
};

