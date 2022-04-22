import http from '@/services/http';

export default {
  // 查询省市县地址
  fetchAddress(data: { id: number }): Promise<any> {
    return http.get('address', { data });
  },
  // 获取当前用户上下文
  fetchWclCurrent(data: any): Promise<any> {
    return http.get('base/wcl/own', { data });
  },
  // 获取当前用户相关的所有上下文
  getCurrUserRole(wcId: string, sid: string): Promise<any> {
    return http.get(`base/all/wcl/own/${wcId}/${sid}`);
  },
};
