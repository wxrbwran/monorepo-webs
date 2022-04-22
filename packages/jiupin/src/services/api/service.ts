import http from '@/services/http';

export default {
  // 增加服务
  putGoods(data: Store): Promise<any> {
    return http.put('base/goods', { data });
  },
  // 修改服务
  postGoods(data: Store): Promise<any> {
    return http.post('base/good', { data });
  },
  // 获取服务
  getGoods(data: Store): Promise<any> {
    return http.get('goods', { data });
  },
  // 删除服务
  deleteGood(id: string): Promise<any> {
    return http.delete(`base/good/${id}`);
  },
};
