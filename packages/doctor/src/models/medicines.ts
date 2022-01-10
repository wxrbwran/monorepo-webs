import { Reducer } from 'redux';
import { Effect } from 'dva';
import medicine from '@/services/api/medicine';
import { compare } from '@/utils/utils';

export interface MedicineModelState {
  currentMedicinePlans: [];
}

export interface MedicineModelType {
  namespace: string;
  state: MedicineModelState;
  effects: {
    fetchMedicineDetail: Effect;
  };
  reducers: {
    setMedicineDetail: Reducer<MedicineModelState>;
  };
}

export const MedicineState: MedicineModelState = {
  currentMedicinePlans: [],
};

const Model: MedicineModelType = {
  namespace: 'medicines',
  state: MedicineState,

  effects: {
    *fetchMedicineDetail({ payload }, { call, put }) {
      const response = yield call(medicine.getPlans, payload);
      yield put({
        type: 'setMedicineDetail',
        payload: response,
      });
    },
  },
  reducers: {
    setMedicineDetail(state = MedicineState, { payload }) {
      // 过滤含有deleteAt字段的计划
      // const filterPlans = payload.allPlans.map((item: { plans: any[] }) => ({
      //   ...item,
      //   plans: item.plans.filter((i: { deletedAt: number }) => !i.deletedAt),
      // }));
      // 过滤含有confirmAt字段的计划
      const filterPlans = payload.allPlans.map((item: { plans: any[] }) => ({
        ...item,
        plans: item.plans.filter((i: { confirmAt: number }) => !i.confirmAt).sort(compare('range')),
      }));
      // 过滤掉服药计划 plans为空的
      const newData = filterPlans.filter((item: { plans: any[] }) => !(item.plans.length === 0));
      return {
        ...state,
        currentMedicinePlans: newData,
      };
    },
  },
};

export default Model;
