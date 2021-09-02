import http from '@/services/http';

export default {
  // 根据关键字查询医院列表
  fetchHospitals(data: { name: string, pageAt?: number, pageSize?: number }): Promise<any> {
    return http.get(`organization?data=${JSON.stringify(data)}`);
  },
  // 添加机构
  addHospital(data: CommonData): Promise<any> {
    return http.put('organization', { data });
  },
  // 查询省市县地址
  fetchAddress(data: { id: number }): Promise<any> {
    return http.get(`address?data=${JSON.stringify(data)}`);
  },
  // 获取当前用户上下文
  fetchWclCurrent(data: any): Promise<any> {
    return http.get(`base/wcl/own?data=${JSON.stringify(data)}`);
  },
  // 修改其他角色用户信息
  patchOtherInfo(data: CommonData): Promise<any> {
    return http.patch('user/settings/info', { data });
  },
  // 查询科室
  fetchDepartments(): Promise<any> {
    return http.get('base/departments');
  },
};
