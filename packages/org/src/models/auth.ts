import { Reducer, Effect } from 'umi';
import { setAuthorizationToken } from '@/services/http';
import * as api from '@/services/api';

export interface AuthModelType {
  namespace: string;
  state: AuthModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<AuthModelState>;
    logout: Reducer<AuthModelState>;
  };
  // subscriptions: { setup: Subscription };
}

export const authState = {
  isLogin: false,
  uid: '',
};

const Model: AuthModelType = {
  namespace: 'auth',
  state: authState,
  effects: {
    *login({ payload }, { call, put }) {
      // console.log('login', payload);
      localStorage.clear();
      const { data } = yield call(api.auth.token, payload);
      // console.log('data', data);
      window.$storage.setItem('access_token', data.accessToken);
      window.$storage.setItem('sid', data.wcl[0].roles[0].subject.id); // 回头注释
      // 连接IM用
      window.$storage.setItem('uid', data.yxRegister.accid);
      setAuthorizationToken(data.accessToken);
      yield put({
        type: 'changeLoginStatus',
        payload: data,
      });
      //
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        isLogin: true,
        uid: payload.yxRegister.accid,
      };
    },
    logout() {
      setAuthorizationToken(false);
      window.$storage.clear();
      return {
        isLogin: false,
        uid: '',
      };
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen((route) => {});
  //   },
  // },
};

export default Model;
