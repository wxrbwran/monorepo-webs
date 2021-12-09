
import http from '@/services/http';

export default {
  // 获取科主任
  getManagementHeadDoctor(data?: any): Promise<any> {
    return http.get('management/head_doctor', { data });
  },
  // 指派科主任
  putManagementHeadDoctor(data?: any): Promise<any> {
    return http.put('management/head_doctor', { data });
  },
  // 取消科主任
  deleteManagementHeadDoctor(data?: any): Promise<any> {
    return http.delete('management/head_doctor', { data });
  },
};

