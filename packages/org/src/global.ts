import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import storage from 'xzl-web-shared/src/utils/storage';
import { setAuthorizationToken } from '@/services/http';
import '@/assets/styles/global.scss';
import * as api from '@/services/api';
import pkg from '../package.json';


window.$api = api;
dayjs.locale('zh-cn');

window.$storage = storage(pkg.name);

const cacheToken = window.$storage.getItem('access_token');

if (cacheToken) {
  setAuthorizationToken(cacheToken);
}

// console.log(window.$storage);
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
