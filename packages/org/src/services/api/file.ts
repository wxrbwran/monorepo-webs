import http from '@/services/http';

export default {
  filePrepare(data: object): Promise<any> {
    return http.get('base/file/prepare', { data });
  },
  // 批量上传机构或者医生
  // /admin/file_batch
  adminBatch(data: object): Promise<any> {
    return http.put('admin/file_batch', { data });
  },
};
