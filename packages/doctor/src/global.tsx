// import { NIM } from '@/lib/NIM/NIM_Web_SDK_v8.0.1';
// 此文件会在入口文件的最前面被自动引入，可以在这里加载补丁，做一些初始化的操作等。

import * as api from '@/services/api';
import storage from 'xzl-web-shared/dist/utils/storage';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { setAuthorizationToken } from '@/services/http';
import pkg from '../package.json';
import './global.scss';
import 'antd/lib/table/style/index.css';

window.$storage = storage(pkg.name);

window.$api = api;

const cacheToken = window.$storage.getItem('access_token');

if (cacheToken) {
  setAuthorizationToken(cacheToken);
}
