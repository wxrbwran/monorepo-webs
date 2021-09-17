import http from '@/services/http';

export default {
  // 根据关键字查询医院列表
  fetchHospitals(data: {
    name: string;
    pageAt?: number;
    pageSize?: number;
  }): Promise<any> {
    return http.get(`organization?data=${JSON.stringify(data)}`);
  },
  // 添加机构
  addHospital(data: Store): Promise<any> {
    return http.put('organization', { data });
  },
  // 查询省市县地址
  fetchAddress(data: { id: string }): Promise<any> {
    return http.get('address', { data });
  },
  // 获取当前用户上下文
  fetchWclCurrent(data: any): Promise<any> {
    return http.get(`base/wcl/own?data=${JSON.stringify(data)}`);
  },
  // 更新用户信息
  patchUserSettinInfo(data: Store): Promise<any> {
    return http.patch('user/settings/info', { data });
  },
  // 获取所有标准科室
  fetchBaseDepartments(): Promise<any> {
    return http.get('/base/departments');
  },
};
