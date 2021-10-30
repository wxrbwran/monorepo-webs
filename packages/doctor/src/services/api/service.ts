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
  // 创建套餐   添加服务包
  putDoctorTeamMembers(data: CommonData): Promise<any> {
    return http.put('doctor/team/members', { data });
  },
  // 编辑套餐（团队）、科研服务包
  patchDoctorTeamMembers(data: CommonData): Promise<any> {
    return http.patch('doctor/team/members', { data });
  },
  // 查询医生套餐（团队）列表、科研服务包
  fetchDoctorTeams(data: CommonData): Promise<any> {
    return http.get('doctor/teams', { data });
  },
  // 解散医生团队/套餐
  deleteDoctorTeam(data: CommonData): Promise<any> {
    return http.delete('doctor/team', { data });
  },
  // 为患者加入团队/科研服务包
  putDoctorTeamMembersPatient(data: CommonData): Promise<any> {
    return http.put('doctor/team/members/patient', { data });
  },
};
