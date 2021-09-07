/*
 * @Author: gaoxue
 * @Date: 2020-09-24 11:13:51
 */
import { Reducer } from 'redux';
import { Effect } from 'dva';
import { history } from 'umi';
import { setAuthorizationToken } from '@/services/http';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';
import config from '@/config';

export interface AuthModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    login: Effect,
    logout: Effect,
  }
  reducers: {
    saveLoginInfo: Reducer;
    clearLoginInfo: Reducer;
  };
}

export const authState: AuthModelState = {
  isLogin: false,
  wcl: [],
  yxRegister: {
    accid: '',
    token: '',
  },
};

const Model: AuthModelType = {
  namespace: 'auth',
  state: authState,
  effects: {
    * login({ payload }, { call, put }) {
      console.log(payload, call);
      let data;
      let token;
      if (process.env.NODE_ENV !== 'production') {
        data = yield call(api.auth.token, payload);
        token = JSON.stringify(data);
      } else {
        token = localStorage.getItem('xzl-web-nurse_token');
      }

      if (!token) {
        window.location.href = config.LOGIN;
      } else {
        const data = JSON.parse(token);
        window.$storage.setItem('access_token', data.accessToken);
        // 过滤出做为护士角色(12)的sid   wcid
        for (let i: number = 0; i < data.wcl.length; i++) {
          if (data.wcl[i].roles[0].id === Role.NURSE.id) {
            console.log(555, data.wcl[i].roles[0].subject.id);
            window.$storage.setItem('sid', data.wcl[i].roles[0].subject.id);
            window.$storage.setItem('wcId', data.wcl[i].wcId);
          }
          window.$storage.setItem('sdktoken', data.yxRegister.token); // 连接IM用
          window.$storage.setItem('uid', data.yxRegister.accid);
          window.$storage.setItem('roleId', Role.NURSE.id);
          window.$storage.setItem('role', 'NURSE');
          setAuthorizationToken(data.accessToken);
          yield put({
            type: 'saveLoginInfo',
            payload: data,
          });
          yield put({
            type: 'user/getUserOrganizations',
            payload: {},
          });
          history.push('/patients');
          break;
        }
        window.$storage.setItem('sdktoken', data.yxRegister.token); // 连接IM用
        window.$storage.setItem('uid', data.yxRegister.accid);
        window.$storage.setItem('roleId', Role.NURSE.id);
        window.$storage.setItem('role', 'NURSE');
        setAuthorizationToken(data.accessToken);
        yield put({
          type: 'saveLoginInfo',
          payload: data,
        });
        yield put({
          type: 'user/getUserOrganizations',
          payload: {},
        });
        history.push('/patients');
      }
    },
    * logout({ payload }, { put }) {
      console.log(payload);
      yield put({
        type: 'im/LOGUT_NIM',
      });
      yield put({
        type: 'clearLoginInfo',
      });
      // history.push('/login');
      window.location.href = config.LOGIN;
      // window.location.reload();
    },
  },
  reducers: {
    saveLoginInfo(state, action) {
      console.log(state);
      return {
        isLogin: true,
        wcl: action.payload.wcl,
        yxRegister: action.payload.yxRegister,
      };
    },
    clearLoginInfo() {
      setAuthorizationToken(false);
      window.$storage.clear();
      // [
      //   'access_token',
      //   'role',
      //   'wcId',
      //   'uid',
      //   'patientWcId',
      //   'patientSid',
      //   'persist:doctor',
      //   'sid',
      //   'currRoleId',
      //   'currOrgNsId',
      //   'fromWcId',
      //   'toWcIds',
      //   'toSessionId',
      //   'rtcSupport',
      //   'sdktoken',
      //   'roleId',
      //   'webrtc',
      // ]
      //   .forEach((item) => {
      //     window.$storage.removeItem(item);
      //   });
      ['alone', 'lower', 'upper', 'doCalling', 'xzl-web-nurse_token'].forEach((item) => {
        sessionStorage.removeItem(item);
      });
      return authState;
    },
  },
};

export default Model;
