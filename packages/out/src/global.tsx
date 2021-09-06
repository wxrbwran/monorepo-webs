import '@/assets/styles/global.scss';
import '@/assets/styles/antd.scss';

import * as api from '@/services/api';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import storage from '@/utils/storage';
import { setAuthorizationToken } from '@/services/http';

if (window.location.href.includes('openSub')) {
  sessionStorage.setItem('openSub', 'YES'); // 防止url丢失openSub参数
}

storage.init();
window.$storage = storage;
window.$api = api;
dayjs.locale('zh-cn');
const cacheToken = window.$storage.getItem('access_token');

if (cacheToken) {
  setAuthorizationToken(cacheToken);
}
/* eslint-disable */
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value(callback: any, types?: string, quality?: number) {
      const canvas = this;
      setTimeout(() => {
        const binStr = atob(canvas.toDataURL(types, quality).split(',')[1]);
        const len = binStr.length;
        const arr = new Uint8Array(len);

        for (let i = 0; i < len; i += 1) {
          arr[i] = binStr.charCodeAt(i);
        }
        callback(new Blob([arr], { type: types || 'image/png' }));
      });
    },
  });
}
