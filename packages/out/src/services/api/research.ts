import http from '@/services/http';

export default {
  //  获取患者进行中的科研项目
  getPatientProjects(pid: string): Promise<any> {
    return http.get(`research/patient_projects/${pid}`);
  },
};
