import { IQuestions } from 'packages/doctor/typings/imgStructured';
import { Reducer } from 'redux';
import { StructuredModelState } from 'typings/model';
// IQuestions
export interface StructrueModelType {
  namespace: string;
  state: StructuredModelState;
  reducers: {
    saveAddQa: Reducer<StructuredModelState>;
  };
}

export const structuredState = {
  editTabKey: null, // 是哪个tab添加的
  editQa: [],
  actionType: null, // edit 编辑|添加  del删除
};

const Model: StructrueModelType = {
  namespace: 'structured',
  state: structuredState,
  reducers: {
    saveAddQa(state = structuredState, action: { payload: IQuestions[] | IQuestions[][] }) {
      console.log(state);
      return {
        ...action.payload,
      };
    },
  },
};

export default Model;
