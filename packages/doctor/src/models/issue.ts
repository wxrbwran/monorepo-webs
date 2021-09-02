import { Reducer } from 'redux';
import { Effect } from 'dva';
import config from '@/config';
import issue from '@/services/api/issue';

export interface IssueModelType {
  namespace: string;
  state: IssueModelState;
  effects: {
    fetchIssueHistory: Effect,
  },
  reducers: {
    setIssueHistory: Reducer<IssueModelState>;
    setIssueHistoryPager: Reducer<IssueModelState>;
  };
}

export const issueState = {
  issueHistoryList: [],
  issueHistoryPager: {
    pageAt: 1,
    total: 0,
  },
};

const Model: IssueModelType = {
  namespace: 'issue',
  state: issueState,
  effects: {
    * fetchIssueHistory({ payload }, { call, put }) { // 获取操作历史列表
      console.log(payload);
      const params = {
        // 1 是已读 0 是未读, 5是已修改 (忽略：2独立管理和上级医生，4是下级医生)。独立管理不需要传0
        state: window.$storage.getItem('role') === 'ALONE_DOCTOR' ? [1, 2, 4, 5] : [0, 1, 2, 4, 5],
        fromSid: window.$storage.getItem('sid') || '',
        roleType: window.$storage.getItem('roleId') || '',
        pageSize: config.ISSUE_LIST,
        pageAt: 1,
      };
      const response = yield call(issue.fetchIssue, { ...params, ...payload });
      yield put({
        type: 'setIssueHistory',
        payload: response.issueMessages,
      });
      yield put({
        type: 'setIssueHistoryPager',
        payload: {
          pageAt: payload.pageAt || 1,
          total: response.total,
        },
      });
    },
  },
  reducers: {
    setIssueHistory(state = issueState, { payload }) {
      console.log('payload', payload);
      return {
        ...state,
        issueHistoryList: payload,
      };
    },
    setIssueHistoryPager(state = issueState, { payload }) {
      return {
        ...state,
        issueHistoryPager: payload,
      };
    },
  },
};

export default Model;
