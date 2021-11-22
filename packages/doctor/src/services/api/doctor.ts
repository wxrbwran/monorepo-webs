import http from '@/services/http';

export default {
  // 获取医生所在的全部机构
  getDoctorOrgs(): Promise<any> {
    return http.get('doctor/organizations');
  },
  // 获取医生的患者列表
  getDoctorPatients(data: CommonData): Promise<any> {
    return http.get('doctor/patients/own', { data });
  },
  // 获取医生相关的全部机构列表
  getDoctorAllOrgs(): Promise<any> {
    return http.get('doctor/related_organizations');
  },
  // 获取上下级机构的医生列表
  getOrgDoctors(data: CommonData): Promise<any> {
    return http.get('doctor/related_doctors', { data });
  },
  // 添加上下级医生团队成员
  // addDoctors(data:[], org_ns_id: string): Promise<any> {
  //   return http.post(`doctor/team/${org_ns_id}`, { data });
  // },
  addDoctors(data): Promise<any> {
    return http.post('doctor/team/members', { data });
  },
  // 获取医生的团队列表
  getDoctors(org_ns_id: string, role_id: string): Promise<any> {
    return http.get(`doctor/teams/${org_ns_id}/${role_id}`);
  },
  // 移除上下级医生团队成员
  delDoctors(member_wc_id: string): Promise<any> {
    return http.delete(`doctor/team/${member_wc_id}`);
  },
  // 医生根据患者uuCode获取患者信息
  getUuCodePatientInfo(uuCode: number): Promise<any> {
    return http.get(`doctor/patient/${uuCode}`);
  },
  // 医生添加患者
  postPatientBind(data: any): Promise<any> {
    return http.post('doctor/patient_bind', { data });
  },
  // 帮助患者修改医生团队，获取医生的团队列表
  getDotorTeams(roleId: string): Promise<any> {
    return http.get(`doctor/teams/${roleId}`);
  },
  // 医生帮助患者换绑医生
  postChangePatientBind(data: any): Promise<any> {
    return http.post('doctor/change/patient_bind', { data });
  },
  // 修改患者级别
  postPatientLevel(data: any): Promise<any> {
    return http.post('doctor/change/patient_role', { data });
  },
  // 医生角色列表  --- 说明： 主管、医助、独立，三个角色有无患者，都会返回显示
  getDotorExistedRoles(): Promise<any> {
    return http.get('doctor/existed_roles');
  },
};
