import { Reducer } from 'redux';
import { Effect } from 'dva';
import * as api from '@/services/api';

interface MedicalModelType {
  namespace: string;
  state: CurrentPatientModelState;
  effects: {
    fetchMedicalLast: Effect;
  }
  reducers: {
    saveMedicalLast: Reducer;
    saveDeparment: Reducer;
    savePatientDetails: Reducer;
  }
}

const patientState = {
  medicalLast: [],
  department: {
    name: '',
    nsId: '',
    nsLabels: [],
  },
  actionType: 'im', // 根据点击入口。进入患者详情，判断操作面板默认打开哪个tab
  isYlPatient: 3, // 1是养老患者 2不是养老患者 3未知     (:弃用boolean是因为帮患者修改服药计划显示隐藏闪现）
};

const currentPatient: MedicalModelType = {
  namespace: 'currentPatient',
  state: patientState,
  effects: {
    * fetchMedicalLast({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
          wcId: window.$storage.getItem('patientWcId'),
        };
        const { medicalIndexList } = yield call(api.medical.fetchMedicalLast, params);
        yield put({
          type: 'saveMedicalLast',
          payload: medicalIndexList,
        });
      } catch (err: any) {
        console.log('接口请求失败', err);
      }
    },
  },
  reducers: {
    saveMedicalLast(state, action) {
      return {
        ...state,
        medicalLast: action.payload,
      };
    },
    saveDeparment(state, action) {
      return {
        ...state,
        department: action.payload,
      };
    },
    savePatientDetails(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default currentPatient;
