import type { Reducer, Effect } from 'umi';
import { setAuthorizationToken } from '@/services/http';
// import * as api from '@/services/api';
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

const localUid = window.$storage?.getItem('uid') || '';

export const authState = {
  isLogin: false,
  uid: localUid,
  wcl: [],
};

const Model: AuthModelType = {
  namespace: 'auth',
  state: authState,
  effects: {
    *login({ payload }, { call, put }) {
      console.log('login', payload, call);
      window.$storage.clear();
      // const { data } = yield call(api.auth.token, payload);
      const token = localStorage.getItem('xzl-web-out-org_token') || '';
      if (!token) {
        // window.location.href = config.LOGIN;
      } else {
        const data = JSON.parse(token);
        console.log('dataaaaaa', data);
        setAuthorizationToken(data.accessToken);
        window.$storage.setItem('access_token', data.accessToken);
        window.$storage.setItem('sid', data.wcl[0].roles[0].subject.id);
        window.$storage.setItem('nsId', data.wcl[0].ns.id);
        window.$storage.setItem('wcId', data.wcl[0].wcId);
        window.$storage.setItem('roleId', data.wcl[0].roles[0].id);
        window.$storage.setItem('sdktoken', data.yxRegister.token); // 连接IM用
        window.$storage.setItem('uid', data.yxRegister.accid);

        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        // 获取当前登录者信息
        yield put({
          type: 'user/fetchCurrent',
          payload: { wcIds: [data.wcl[0].wcId] },
        });
        // 获取科室列表
        yield put({
          type: 'org/getOrgMenu',
          payload: {
            nsId: window.$storage.getItem('nsId'),
            sid: window.$storage.getItem('sid'),
          },
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        isLogin: true,
        uid: payload.yxRegister.accid,
        wcl: payload.wcl,
      };
    },
    logout() {
      setAuthorizationToken(false);
      const storages = ['access_token', 'refresh_token', 'uid', 'sid', 'xzl-web-out-org_token'];
      storages.forEach((item) => window.$storage.removeItem(item));
      localStorage.removeItem('xzl-web-out-org_token');
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
