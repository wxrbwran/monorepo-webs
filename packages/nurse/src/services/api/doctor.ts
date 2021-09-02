import http from '@/services/http';

export default {
  // 获取医生所在的全部机构
  getNurseOrgs(data: { sid: string }): Promise<any> {
    return http.get(`nurse/organizations?data=${JSON.stringify(data)}`);
  },
  // 护士端科室下拉列表
  getNurseDeps(nsId: string): Promise<any> {
    return http.get(`nurse/department/${nsId}`);
  },
  // 获取医生的患者列表
  getNursePatients(data: CommonData): Promise<any> {
    return http.get(`nurse/work_order?data=${JSON.stringify(data)}`);
  },
  // 完成建档
  compeleteOrder(data: CommonData): Promise<any> {
    return http.patch('nurse/work_order', { data });
  },
};
