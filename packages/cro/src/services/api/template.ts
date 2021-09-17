import http from '@/services/http';

export default {
  // 获取模板列表
  getScaleGroup(data?: any): Promise<any> {
    return http.get('scale/group', { data });
  },
};
