import { Effect } from 'dva';
import { Reducer } from 'redux';
import { initialOrg } from '@/utils/consts';
import user from '@/services/api/user';
import { UserModelState } from 'typings/global';
import { Role } from 'xzl-web-shared/src/utils/role';
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    fetchUserOrganizations: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    saveUserFilterOrg: Reducer<UserModelState>;
  };
}

export const userState = {
  user: {
    username: '',
    tel: '',
    status: '',
    roles: [],
  },
  institution: {
    id: '',
    name: '',
  },
  relationship: [initialOrg],
  legalRelationship: [],
  currentRole: '',
  isShowMsgHistory: false,
  filterOrgs: [],
};

const UserModel: UserModelType = {
  namespace: 'user',
  state: userState,

  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(user.getUserInfo, payload);
      console.log('response111', response);
      yield put({
        type: 'saveCurrentUser',
        payload: response.wcl[0],
      });
    },
    * fetchUserOrganizations({ payload }, { call, put }) {
      const data = yield call(user.getDoctorOrgs, payload);

      console.log('========== fetchUserOrganizations data', JSON.stringify(data));
      yield put({
        type: 'saveUserFilterOrg',
        payload: data,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      console.log('action.payload', action.payload);
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    },
    saveUserFilterOrg(state, action) {
      const filterOrgList: any[] = [];
      action.payload.teams.forEach((item: IOrgTeams) => {
        item.members.forEach((member: ISubject) => {
          if (member.role === Role.ORG.id) {
            filterOrgList.push({
              ...member,
              nsId: item.teamNSId,
            });
          }
        });
      });
      return {
        ...state,
        filterOrgs: filterOrgList,
      };
    },
  },
};

export default UserModel;
