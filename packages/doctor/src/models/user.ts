/*
 * @Author: gaoxue
 * @Date: 2020-11-26 11:10:51
 */
import { Reducer } from 'redux';
import { Effect } from 'dva';
import * as api from '@/services/api';
import config from '@/config';
import { Role } from 'xzl-web-shared/src/utils/role';

export interface UserModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    getPrice: Effect;
    getUserOrganizations: Effect;
    getUserWclDetail: Effect;
  };
  reducers: {
    saveUserInfo: Reducer;
    saveUserOrg: Reducer;
    saveUserPrice: Reducer;
    saveUserFilterOrg: Reducer;
    setCurrentOrgInfo: Reducer;
  };
}

const userState: UserModelState = {
  user: {},
  prices: [],
  userInfo: {},
  organizations: {
    teams: [],
    total: 0,
  },
  filterOrgs: [],
  currentOrgInfo: {},
};

const Model: UserModelType = {
  namespace: 'user',
  state: userState,
  effects: {
    * getPrice({ payload }, { call, put }) {
      const data = yield call(api.user.getPrice, payload);
      if (payload.resolve) {
        payload.resolve(data.goodsDetailList);
      }
      yield put({
        type: 'saveUserPrice',
        payload: data,
      });
    },
    * getUserWclDetail({ payload }, { call, put }) {
      const data = yield call(api.user.getUserInfo, payload);
      const { subject, rsConfig } = data.wcl[0].roles[0];
      window.$storage.setItem('userName', subject.name);
      window.$storage.setItem('userAvatarUrl', subject.avatarUrl || config.defaultAvatar);
      yield put({
        type: 'saveUserInfo',
        payload: {
          ...subject,
          status: rsConfig.status,
        },
      });
    },
    * getUserOrganizations({ payload }, { call, put }) {
      const data = yield call(api.doctor.getDoctorOrgs, payload);
      // 全部机构teams(以机构为主体，里面包涵机构与机构医生。用于我的二维码与个人资料等，需根据使用情况组合数据)
      yield put({
        type: 'saveUserOrg',
        payload: data,
      });
      // 过滤后的全部机构(去除掉医生，过滤出纯机构列表：用于机构筛选数据源等)
      yield put({
        type: 'saveUserFilterOrg',
        payload: data,
      });
    },
  },
  reducers: {
    saveUserInfo(state, action) {
      console.log(999999);
      // 有些老数据存在只有第一执业医院名称，没有医院id，会导致后面逻辑错误，这里兼容一下，没有id直接清掉名字，让用户再录入
      const userInfo = action.payload;
      if (!userInfo.firstPracticeDepartmentId) {
        delete userInfo.firstPracticeDepartment;
      }
      if (!userInfo.firstProfessionCompanyId) {
        delete userInfo.firstProfessionCompany;
      }
      return {
        ...state,
        userInfo,
      };
    },
    saveUserPrice(state, action) {
      return {
        ...state,
        prices: action.payload?.goodsDetailList || [],
      };
    },
    saveUserOrg(state, action) {
      return {
        ...state,
        organizations: action.payload,
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
    setCurrentOrgInfo(state, action) {
      return {
        ...state,
        currentOrgInfo: { ...action.payload },
      };
    },
  },
};

export default Model;
