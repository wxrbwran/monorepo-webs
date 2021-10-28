import http from '@/services/http';

export default {
  // 我的团队 查询待添加的医生列表, 多选医生作为好友
  fetchRelatedDoctors(data: CommonData): Promise<any> {
    return http.get('doctor/related_doctors', { data });
  },
  // 我的团队 添加好友
  putDoctorFriends(data: CommonData): Promise<any> {
    return http.put('doctor/friends', { data });
  },
  // 我的团队 查询好友列表
  fetchDoctorFriends(data: CommonData): Promise<any> {
    return http.get('doctor/friends', { data });
  },
};
