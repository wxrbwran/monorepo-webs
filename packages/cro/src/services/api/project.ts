import http from '@/services/http';

export default {
  // 创建项目
  postCroProject(data: any): Promise<any> {
    return http.post('research/project', { data });
  },
  // 获取项目列表
  getProjectList(data: any): Promise<any> {
    // return http.get(`research/all/projects?data=${JSON.stringify(data)}`);
    // return http.get(`research/all/projects?doctorId=${1381}`);
    return http.get(`research/all/projects`);
  },
  // 获取患者统计图表
  getPatientStatistic(): Promise<any> {
    return http.get(`research/patient/statistics`);
  },
  // 获取项目统计图表
  getPStatistic(): Promise<any> {
    return http.get(`research/project/statistics`);
  },
  //删除项目
  delProject(data: any): Promise<any> {
    return http.delete(`research/project/${data}`);
  },
};
