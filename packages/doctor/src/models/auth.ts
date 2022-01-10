/*
 * @Author: gaoxue
 * @Date: 2020-09-24 11:13:51
 */
import { Reducer } from 'redux';
import { Effect } from 'dva';
import { history } from 'umi';
import { message } from 'antd';
import { setAuthorizationToken } from '@/services/http';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/dist/utils/role';
import config from '@/config';

export interface AuthModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    login: Effect;
    logout: Effect;
    updateLoginOperationLog: Effect;
  };
  reducers: {
    saveLoginInfo: Reducer;
    clearLoginInfo: Reducer;
  };
}

export const authState: AuthModelState = {
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
    *login({ payload }, { call, put }) {
      let data = null;
      if (payload?.accessToken) {
        data = { ...payload };
      } else {
        data = yield call(api.auth.token, payload);
      }
      // const data = yield call(api.auth.token, payload);
      console.log('login', payload.clientId);
      if (data.accessToken) {
        if (payload.clientId === 'xzl-web-doctor') {
          window.$storage.setItem('access_token', data.accessToken);
          // 4.10日讨论,取第一个wcl的sid和wcId即可。
          const { wcId } = data.wcl[0];
          window.$storage.setItem('sid', data.wcl[0].roles[0].subject.id);
          window.$storage.setItem('wcId', wcId);
          //  4.10日讨论end
          window.$storage.setItem('sdktoken', data.yxRegister.token); // 连接IM用
          window.$storage.setItem('uid', data.yxRegister.accid);
          window.$storage.setItem('currRoleId', Role.ALONE_DOCTOR.id);
          window.$storage.setItem('nsId', data.wcl[0].ns.id);
          setAuthorizationToken(data.accessToken);
          yield put({
            type: 'saveLoginInfo',
            payload: data,
          });
          yield put({
            type: 'user/getUserOrganizations',
            payload: {},
          });
          yield put({
            type: 'auth/updateLoginOperationLog',
            payload: 'LOGIN',
          });
          history.push('/doctor/patients/alone_doctor');
        }
        if (payload.clientId === 'xzl-web-out-org') {
          localStorage.setItem('xzl-web-out-org_token', JSON.stringify(data));
          // (document.getElementById('go_out_hospital') as HTMLElement).click();
          window.location.href = config.OUT_HOSPITAL_PATIENT;
        }
        if (payload.clientId === 'xzl-web-nurse') {
          localStorage.setItem('xzl-web-nurse_token', JSON.stringify(data));
          // (document.getElementById('xzl_web_nurse') as HTMLElement).click();
          window.location.href = config.XZL_WEB_NURSE;
        }
      } else {
        message.error(data.result);
      }
    },
    *updateLoginOperationLog({ payload }, { call, put }) {
      const { count } = yield call(api.auth.postUserOperationLog, payload);
      // 更新登录次数
      yield put({
        type: 'user/updateUserOperationLog',
        payload: count,
      });
    },
    *logout(_, { put }) {
      yield put({
        type: 'im/LOGUT_NIM',
      });
      yield put({
        type: 'clearLoginInfo',
      });
      history.push('/login');
      window.location.reload();
    },
  },
  reducers: {
    saveLoginInfo(state, action) {
      console.log(state);
      return {
        wcl: action.payload.wcl,
        yxRegister: action.payload.yxRegister,
      };
    },
    clearLoginInfo() {
      setAuthorizationToken(false);
      window.$storage.clear();
      window.sessionStorage.clear();
      ['alone', 'lower', 'upper', 'doCalling'].forEach((item) => {
        window.$storage.removeItem(item);
      });
      return authState;
    },
  },
};

export default Model;
