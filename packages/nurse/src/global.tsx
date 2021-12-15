// import { NIM } from '@/lib/NIM/NIM_Web_SDK_v8.0.1';
import * as api from '@/services/api';
import storage from 'xzl-web-shared/dist/src/utils/storage';
import pkg from '../package.json';
// 此文件会在入口文件的最前面被自动引入，可以在这里加载补丁，做一些初始化的操作等。
import 'antd/lib/table/style/index.css';
import 'antd/lib/pagination/style/index.css';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { setAuthorizationToken } from '@/services/http';

window.$storage = storage(pkg.name);
// window.NIM = NIM;
window.$api = api;

const cacheToken = window.$storage.getItem('access_token');

if (cacheToken) {
  setAuthorizationToken(cacheToken);
}
