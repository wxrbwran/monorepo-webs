import http from '@/services/http';

export default {
  filePrepare(data: object): Promise<any> {
    return http.get('base/file/prepare', { data });
  },
};
