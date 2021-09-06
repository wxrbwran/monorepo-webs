// import http from '@/services/http';
import { sleep } from '@/utils/tools';

/* eslint-disable */
export default {
  async getPatients(): Promise<any> {
    await sleep(1000);
    return new Promise((resolve) =>
      resolve({
        status: 'success',
        data: 42,
      }),
    );
    // return http.get('workorder/patient/amend/count', { data });
  },
};
