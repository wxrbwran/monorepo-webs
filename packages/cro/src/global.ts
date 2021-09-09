// 此文件会在入口文件的最前面被自动引入，可以在这里加载补丁，做一些初始化的操作等。
import * as api from '@/services/api';
import "core-js/stable";
import "regenerator-runtime/runtime";
import storage from '@/utils/storage';
import { setAuthorizationToken } from "@/services/http";

storage.init();
window.$storage = storage;
window.$api = api;
const cacheToken = localStorage.getItem('xzl-web-doctor_access_token');

if (cacheToken) {
  setAuthorizationToken(cacheToken);
}
