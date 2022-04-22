import http from '@/services/http';

export default {
  // 获取角色列表
  getRoleList(data?: any): Promise<any> {
    return http.get('nine_live/role/tag', { data });
  },
  // 查询服务人员和会员列表
  getPersonnel(data?: any): Promise<any> {
    return http.get('nine_live/personnel', { data });
  },
  // 新增服务人员
  putTeamWorker(data: Store): Promise<any> {
    return http.put('nine_live/team/worker', { data });
  },
  // 修改服务人员详情
  postTeamWorker(data: Store): Promise<any> {
    return http.post('/nine_live/team/worker', { data });
  },
};
