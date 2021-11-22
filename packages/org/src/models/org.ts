import { Effect, Reducer } from 'umi';
import { message } from 'antd';
// import org from '@/services/api/org';

export interface OrgModelType {
  namespace: 'org';
  state: OrgModelState;
  effects: {
    getOrgMenu: Effect;
    getDepRoleInfo: Effect;
  };
  reducers: {
    saveCurrentOrgMenu: Reducer<OrgModelState>;
    saveCurrentOrgByList: Reducer<OrgModelState>;
    saveCurrentRoleInfo: Reducer<OrgModelState>;
  };
}

export const OrgState: OrgModelState = {
  loginOrg: {},
  currentOrg: {
    departmentInfoList: [],
    orgBase: {
      nsId: '',
      uuCode: '',
      name: '',
    },
  },
  infoByList: {},
  currentDepRole: {},
};

const OrgModel: OrgModelType = {
  namespace: 'org',
  state: OrgState,
  effects: {
    *getOrgMenu({ payload }, { put, call }) {
      const response = yield call(window.$api.org.getOrgMenu, payload);
      yield put({
        type: 'saveCurrentOrgMenu',
        payload: response,
      });
      message.destroy();
      if (payload.resolve) {
        payload.resolve(response);
      }
    },
    *getDepRoleInfo({ payload }, { put, call }) {
      const response = yield call(window.$api.org.getDoctorDetail, payload);
      yield put({
        type: 'saveCurrentRoleInfo',
        payload: response,
      });
      message.destroy();
      if (payload.resolve) {
        payload.resolve(response);
      }
    },
  },

  reducers: {
    saveCurrentOrgMenu(state, action) {
      return {
        ...state,
        currentOrg: action.payload,
      };
    },
    saveCurrentOrgByList(state, action) {
      return {
        ...state,
        infoByList: action.payload,
      };
    },
    saveCurrentRoleInfo(state, action) {
      return {
        ...state,
        currentDepRole: action.payload,
      };
    },
  },
};

export default OrgModel;
