import type { Reducer } from 'umi';

export interface eduModelType {
  namespace: 'education';
  state: EduModelState;
  reducers: {
    saveArticleContent: Reducer<EduModelState>;
    saveSendContent: Reducer<EduModelState>;
  };
}

export const eduState = {
  richText: {},
  sendList: [],
};

const EduModel: eduModelType = {
  namespace: 'education',
  state: eduState,

  reducers: {
    saveArticleContent(state, action) {
      return {
        ...state,
        richText: { ...action.payload},
      };
    },
    saveSendContent(state, action) {
      return {
        ...state,
        sendList: [...action.payload],
      };
    },
  },
};

export default EduModel;
