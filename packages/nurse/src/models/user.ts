/*
 * @Author: gaoxue
 * @Date: 2020-11-26 11:10:51
 */
import { Reducer } from 'redux';
import { Effect } from 'dva';
import * as api from '@/services/api';

export interface UserModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    getUserOrganizations: Effect,
  }
  reducers: {
    saveUserFilterOrg: Reducer;
  };
}

const userState: UserModelState = {
  filterOrgs: [],
};

const Model: UserModelType = {
  namespace: 'user',
  state: userState,
  effects: {
    * getUserOrganizations({ payload }, { call, put }) {
      console.log(payload);
      const data = yield call(api.doctor.getNurseOrgs, { sid: window.$storage.getItem('sid') });
      yield put({
        type: 'saveUserFilterOrg',
        payload: data.list,
      });
    },
  },
  reducers: {
    saveUserFilterOrg(state, action) {
      return {
        ...state,
        filterOrgs: action.payload,
      };
    },
  },
};

export default Model;
