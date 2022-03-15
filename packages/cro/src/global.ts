// 此文件会在入口文件的最前面被自动引入，可以在这里加载补丁，做一些初始化的操作等。
import * as api from '@/services/api';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import storage from 'xzl-web-shared/dist/utils/storage';
import { setAuthorizationToken } from '@/services/http';
import * as log from '@/utils/logReason';
import pkg from '../package.json';

window.$storage = storage(pkg.name);
window.$api = api;
window.$log = log;
const cacheToken = localStorage.getItem('xzl-web-doctor_access_token');

if (cacheToken) {
  setAuthorizationToken(cacheToken);
}
