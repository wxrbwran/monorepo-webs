import http from '@/services/http';

export default {
  getOrganizations(data?: any): Promise<any> {
    return http.get('admin/organizations_stats', { data });
  },
  // 获取科室列表
  getOrgMenu(data?: any): Promise<any> {
    // console.log('getOrgMenu', data);
    return http.get('admin/organization/groups', { data });
  },
  getDepartmentRoles(data?: any): Promise<any> {
    return http.get('admin/organization/staffs', { data });
  },
  addOrEditDepartment(data?: any): Promise<any> {
    return http.post('admin/organization/department', { data });
  },
  // 获取机构实体的基本信息
  fetchAdminOrgDetails(data: Store): Promise<any> {
    return http.get('admin/organization_details', { data });
  },
  // 编辑机构信息
  patchAdminOrganization(data: Store): Promise<any> {
    return http.patch('admin/organization', { data });
  },
  postAdminOrganization(data?: any): Promise<any> {
    return http.post('admin/organization', { data });
  },
  getDoctorDetail(data?: any): Promise<any> {
    return http.get(`admin/doctor_info/${data.account}`);
  },
  addDoctor(data?: any): Promise<any> {
    return http.post('admin/department/doctor', { data });
  },
  // user/settings/info/own
  editDoctor(data?: any): Promise<any> {
    return http.patch('user/settings/info/own', { data });
  },
   // 查找机构-添加 上下级机构里使用
   getSearchOrg(data?: any): Promise<any> {
    return http.get(`admin/organizations_stats`, { data });
  },
  // 查找该机构的上-下级机构
  getOrgUnionStats(data?: any): Promise<any> {
    return http.get(`management/union/stats`, { data });
  },
  // 查找该机构的所有上下级机构-医院关系图使用此接口
  getOrgUnionStatsGraph(): Promise<any> {
    return http.get(`management/union/stats/graph`);
  },
  // 绑定上-下级机构,传入待绑定机构的机构sid和待绑定的角色
  bindOrg({orgSid, roleId}: any): Promise<any> {
    return http.put(`management/union/${orgSid}/${roleId}`);
  },
  // 解绑上-下级机构,传入待解绑机构的机构sid和待解绑的角色
  unbindOrg({orgSid, roleId}: any): Promise<any> {
    return http.delete(`management/union/${orgSid}/${roleId}`);
  },
  // 查询机构信息
  getOutOfOrgInfo(): Promise<any> {
    return http.get(`outOf/organizations`);
  },
  // 待审核医生数量和已认证数量
  getCountStaff(nsId: string): Promise<any> {
    return http.get(`management/count/staff/${nsId}`);
  },
  // 查询医生详情
  getAdminDoctorInfo(account: number): Promise<any> {
    return http.get(`admin/doctor_info/${account}`);
  },
  // 查询护士详情
  getAdminNurseInfo(account: number): Promise<any> {
    return http.get(`admin/nurse_info/${account}`);
  },
  // 医生护士人员管理下添加医生
  addOrgDoctor(data: any): Promise<any> {
    return http.put(`management/organization/staffs`, { data });
  },

  // 添加医生到科室下的医生列表
  getManagementDoctor(data: any): Promise<any> {
    return http.get(`management/doctor`, { data });
  },
  // 参与院外管理的科室下添加医生
  postManagementDoctor(data: any): Promise<any> {
    return http.post('management/department/doctor', { data });
  },
  // 参与院外管理的科室下添加护士
  postManagementNurse(data: any): Promise<any> {
    return http.post('management/department/nurse', { data });
  },
   // 查询机构信息
   getOrgInfo(data: any): Promise<any> {
    return http.get(`management/organizations`, {data});
  },
   // 修改机构信息
  patchOrgInfo(data: any): Promise<any> {
    return http.patch(`management/organizations`, {data});
  },
   // 院外科室结构图
  getDepartmentTree(nsId: string): Promise<any> {
    return http.get(`management/department/${nsId}`);
  },
  // 医生移出科室
  postMoveDepartmentDoctor(data: any): Promise<any> {
    return http.post('management/move/department/doctor', { data });
  },
  // 护士移出科室
  postMoveDepartmentNurse(data: any): Promise<any> {
    return http.post('management/move/department/nurse', { data });
  },
  // 医生移出医院
  postMoveOrgDoctor(data: any): Promise<any> {
    return http.post('management/move/org/doctor', { data });
  },
  // 护士移出医院
  postMoveOrgNurse(data: any): Promise<any> {
    return http.post('management/move/org/nurse', { data });
  },
  filePrepare(data: any): Promise < any > {
    return http.get('base/file/prepare', { data });
  },
};
