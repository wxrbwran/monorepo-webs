import type { Reducer } from 'umi';
import { Effect } from 'dva';
import { education } from '../services/api';

export interface EduModelType {
  namespace: 'education';
  state: EduModelState;
  effects: {
    fetchGroupList: Effect;
  };
  reducers: {
    saveArticleContent: Reducer<EduModelState>;
    saveSendContent: Reducer<EduModelState>;
    setCurrentOrgInfo: Reducer<EduModelState>;
    setGroupList: Reducer<EduModelState>;
  };
}

export const eduState = {
  richText: {},
  sendList: [],
  currentOrgInfo: {},
  groupList: [],
};

const EduModel: EduModelType = {
  namespace: 'education',
  state: eduState,

  effects: {
    *fetchGroupList({ payload }, { call, put }) {
      const response = yield call(education.getGroupList, payload);
      console.log('response111', response);
      yield put({
        type: 'setGroupList',
        payload: response.infos,
      });
    },
  },
  reducers: {
    saveArticleContent(state, action) {
      return {
        ...state,
        richText: { ...action.payload },
      };
    },
    saveSendContent(state, action) {
      return {
        ...state,
        sendList: [...action.payload],
      };
    },
    setCurrentOrgInfo(state, action) {
      return {
        ...state,
        currentOrgInfo: { ...action.payload },
      };
    },
    setGroupList(state, action) {
      return {
        ...state,
        groupList: [...action.payload],
      };
    },
  },
};

export default EduModel;
