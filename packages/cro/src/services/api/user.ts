import http from '@/services/http';

export default {
  getUserInfo(data?: any): Promise<any> {
    return http.get(`user/wcl_details?data=${JSON.stringify(data)}`);
  },
  // 获取医生所在的全部机构
  getDoctorOrgs(): Promise<any> {
    return http.get('doctor/organizations');
  },
};
