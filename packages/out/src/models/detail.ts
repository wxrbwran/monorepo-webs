import { Reducer } from 'redux';
import { Effect } from 'dva';
import medical from '@/services/api/medical';

export interface DetailModelState {
  infos: object;
}

export interface DetailModelType {
  namespace: string;
  state: DetailModelState;
  effects: {
    fetchMedicalRecord: Effect
  },
  reducers: {
    setMedicalRecord: Reducer<DetailModelState>;
  };
}

export const detailState = {
  infos: {},
};

const Model: DetailModelType = {
  namespace: 'detail',
  state: detailState,

  effects: {
    * fetchMedicalRecord({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(medical.fetchDiseaseHistory, { sid: payload });
      yield put({
        type: 'setMedicalRecord',
        payload: response,
      });
    },
  },
  reducers: {
    setMedicalRecord(state = detailState, { payload }) {
      console.log('payload', payload);
      return {
        ...state,
        infos: payload,
      };
    },
  },
};

export default Model;
