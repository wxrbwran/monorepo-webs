import type { Effect } from 'umi';
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
    pureDepartmentList: [],
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
      // console.log(payload);
      const response = yield call(window.$api.org.getOrgMenu, payload);
      // 此接口是以前机构适用的接口，返回 的departmentInfoList里不只有列表，这里过滤一下。
      const pureDepartmentList = response.departmentInfoList.filter((dep: Department) => dep?.labels.includes('department'));
      yield put({
        type: 'org_menu/changeOrgMenu',
        payload: {
          type: 'department',
          department: response.departmentInfoList[0],
          group: '',
        },
      });
      yield put({
        type: 'saveCurrentOrgMenu',
        payload: {
          ...response,
          pureDepartmentList
        },
      });
      message.destroy();
      if (payload.resolve) {
        payload.resolve(response);
      }
    },
    *getDepRoleInfo({ payload }, { put, call }) {
      const response = yield call(window.$api.org.getDoctorDetail, payload);
      response.departments = response.departmentInfoList.filter(
        (department: Department) => !department.labels.includes('team'),
      );
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
    saveCurrentOrgMenu(state: OrgModelState, action: AnyAction) {
      return {
        ...state,
        currentOrg: action.payload,
      };
    },
    saveCurrentOrgByList(state: OrgModelState, action: AnyAction) {
      return {
        ...state,
        infoByList: action.payload,
      };
    },
    saveCurrentRoleInfo(state: OrgModelState, action: AnyAction) {
      return {
        ...state,
        currentDepRole: action.payload,
      };
    },
  },
};

export default OrgModel;
