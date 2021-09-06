import type { Effect, Reducer } from 'umi';
// import { initialOrg, localRole } from 'xzl-web-shared/src/utils/consts';
import user from '@/services/api/user';

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
}

export const userState = {
  wcl: []
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: userState,

  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(user.getUserInfo, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        ...action.payload,
        currentRole: 'Admin',
      };
    },
  },
};

export default UserModel;
