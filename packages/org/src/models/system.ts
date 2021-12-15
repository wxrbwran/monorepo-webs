import { Effect, Reducer } from 'umi';
import { fetchRolePropById } from 'xzl-web-shared/dist/src/utils/role';
// import org from '@/services/api/org';

export interface SystemModelType {
  namespace: 'system';
  state: SystemModelState;
  effects: {
    getCount: Effect;
  };
  reducers: {
    saveCount: Reducer<SystemModelState>;
  };
}

export const SystemState = {
  roleCount: [],
};

const OrgModel: SystemModelType = {
  namespace: 'system',
  state: SystemState,
  effects: {
    *getCount(_action, { put, call }) {
      const { results } = yield call(window.$api.system.getCount);
      const newRes: Store[] = [];
      results.forEach((res) => {
        const role = fetchRolePropById(res.role);
        const tmp = { ...res, ...role };
        newRes.push(tmp);
      });
      console.log('newRes', newRes);
      yield put({
        type: 'saveCount',
        payload: newRes,
      });
    },
  },

  reducers: {
    saveCount(state, action) {
      console.log('fetchRolePropValue', action);

      return {
        ...state,
        roleCount: action.payload,
      };
    },
  },
};

export default OrgModel;
