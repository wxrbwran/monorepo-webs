import type { Reducer } from 'umi';

export interface SuifangModelType {
  namespace: 'suifang';
  state: SuifangModelState;
  reducers: {
    saveCurrentEditScale: Reducer<SuifangModelState>;
  };
}

export const suifangState: SuifangModelState = {};

const SuifangModel: SuifangModelType = {
  namespace: 'suifang',
  state: suifangState,
  reducers: {
    saveCurrentEditScale(_state, action) {
      return {
        ...action.payload,
      };
    },
  },
};

export default SuifangModel;
