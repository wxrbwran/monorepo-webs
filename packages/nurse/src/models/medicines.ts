import { Reducer } from 'redux';
import { Effect } from 'dva';
import medicine from '@/services/api/medicine';

export interface DetailModelState {
  currentMedicinePlans: [];
}

export interface DetailModelType {
  namespace: string;
  state: DetailModelState;
  effects: {
    fetchMedicineDetail: Effect;
  };
  reducers: {
    setMedicineDetail: Reducer<DetailModelState>;
  };
}

export const detailState: DetailModelState = {
  currentMedicinePlans: [],
};

const Model: DetailModelType = {
  namespace: 'medicines',
  state: detailState,

  effects: {
    * fetchMedicineDetail({ payload }, { call, put }) {
      const response = yield call(medicine.getPlans, payload);
      yield put({
        type: 'setMedicineDetail',
        payload: response,
      });
    },
  },
  reducers: {
    setMedicineDetail(state = detailState, { payload }) {
      // 过滤含有deleteAt字段的计划
      // const filterPlans = payload.allPlans.map((item: { plans: any[] }) => ({
      //   ...item,
      //   plans: item.plans.filter((i: { deletedAt: number }) => !i.deletedAt),
      // }));
      // 过滤含有confirmAt字段的计划
      const filterPlans = payload.allPlans.map((item: { plans: any[] }) => ({
        ...item,
        plans: item.plans.filter((i: { confirmAt: number }) => !i.confirmAt),
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
