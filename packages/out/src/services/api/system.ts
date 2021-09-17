import http from '@/services/http';

export default {
  getCount(): Promise<any> {
    return http.get('system/role_count');
  },
  // /admin/organization
};
