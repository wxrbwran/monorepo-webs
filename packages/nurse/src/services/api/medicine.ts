import http from '@/services/http';

export default {
  // 查询药品
  fetchMedicines(data:object): Promise<any> {
    return http.get(`medicine/name?data=${JSON.stringify(data)}`);
  },
  // 添加服药计划
  // addPlans(data:object): Promise<any> {
  //   return http.post('medicine_plans', { data });
  // },
  // 获取服药计划
  getPlans(data:string): Promise<any> {
    return http.get(`medicine_plans?data=${data}`);
  },
  // 修改服药计划
  updatePlans(data:object): Promise<any> {
    return http.patch('medicine_plans', { data });
  },
  // 删除服药计划
  delPlans(data:object): Promise<any> {
    return http.delete('medicine_plans', { data });
  },
  // 药品说明书
  getManual(data:string): Promise<any> {
    return http.get(`medicine/manual?data=${data}`);
  },
  // 统计全月服药状态
  getTimeLineStatus(data:string): Promise<any> {
    return http.get(`medicine_plans/months_stat?data=${data}`);
  },
  // 获取服药趋势图数据
  getTimeLineOverview(data:string): Promise<any> {
    return http.get(`medicine_plans/timeline_aggregate_stat?data=${data}`);
  },
  // 获取生活达标信息
  getLifeStatus(data: { sid: string, wcId: string }): Promise < any > {
    return http.get(`life/status?data=${JSON.stringify(data)}`);
  },
};
