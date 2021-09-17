import http from '@/services/http';

export default {
  getOrganizations(data?: any): Promise<any> {
    return http.get('admin/organizations_stats', { data });
  },
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
};
