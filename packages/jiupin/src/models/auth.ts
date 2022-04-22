import { setAuthorizationToken } from '@/services/http';
import * as api from '@/services/api';
import { history, Reducer, Effect } from 'umi';
import { message } from 'antd';

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
      let data = null;
      if (payload?.accessToken) {
        data = { ...payload };
      } else {
        data = yield call(api.auth.token, payload);
      }
      data = data.data;
      console.log('dataaaa', data);

      if (data.accessToken) {
        window.$storage.setItem('access_token', data.accessToken);
        window.$storage.setItem('role', data.wcl[0].roles[0].id);
        // 4.10日讨论,取第一个wcl的sid和wcId即可。
        const { wcId } = data.wcl[0];
        window.$storage.setItem('sid', data.wcl[0].roles[0].subject.id);
        window.$storage.setItem('wcId', wcId);
        //  4.10日讨论end
        // window.$storage.setItem('sdktoken', data.yxRegister.token); // 连接IM用
        // window.$storage.setItem('uid', data.yxRegister.accid);
        window.$storage.setItem('nsId', data.wcl[0].ns.id);
        setAuthorizationToken(data.accessToken);
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });
        console.log('history23', history);
        history.push('/personnel/org-structure');
      } else {
        // message.error(data.result);
        console.log(data.result);
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
      const storages = ['access_token', 'refresh_token', 'uid', 'sid', 'jiupin_token'];
      storages.forEach((item) => window.$storage.removeItem(item));
      localStorage.removeItem('jiupin_token');
      return {
        isLogin: false,
        uid: '',
      };
    },
  },

};

export default Model;
