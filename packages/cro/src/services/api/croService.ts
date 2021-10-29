import http from '@/services/http';
import { CommonData } from 'typings/global';

export default {
  // 我的团队 查询待添加的医生列表, 多选医生作为好友
  fetchBaseRoles(data: CommonData): Promise<any> {
    return http.get('base/roles', { data });
  },

  // 我的团队 查询好友列表
  fetchDoctorFriends(data: CommonData): Promise<any> {
    return http.get('doctor/friends', { data });
  },

  // 我的团队 查询好友列表
  putTeamMembers(data: CommonData): Promise<any> {
    return http.put('doctor/team/members', { data });
  },

  // 我的团队 查询好友列表
  getTeams(data: CommonData): Promise<any> {
    return http.get(`doctor/teams?data=${JSON.stringify(data)}`);
  },




};