import type { Effect, Reducer } from 'umi';
// import { initialOrg, localRole } from 'xzl-web-shared/dist/utils/consts';

export interface PersonnelModelType {
  namespace: 'personnel';
  state: PersonnelModelState;
  effects: {
    fetchRoleList: Effect;
  };
  reducers: {
    saveRoleList: Reducer<PersonnelModelState>;
  };
}

export const userState = {
  roleList: [],
};

const PersonnelModel: PersonnelModelType = {
  namespace: 'personnel',
  state: userState,
  effects: {
    *fetchRoleList({ payload }, { call, put }: any) {
      const response = yield call(window.$api.personnel.getRoleList, payload);
      console.log('response', response);
      yield put({
        type: 'saveRoleList',
        payload: {
          roleList: response.roleTag,
        },
      });
    },
  },

  reducers: {
    saveRoleList(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default PersonnelModel;
