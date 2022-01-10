import { Reducer } from 'umi';

export type TDocumentState = {
  curDocument: TDocument;
};

export interface DocumentModelType {
  namespace: string;
  state: TDocumentState;
  reducers: {
    setCurDocument: Reducer<TDocumentState>;
  };
}

export const documentState = {
  curDocument: {},
};

const Model: DocumentModelType = {
  namespace: 'document',
  state: documentState,
  reducers: {
    setCurDocument(state: TDocumentState, { payload }: { payload: TDocument }) {
      return {
        ...state,
        curDocument: payload,
      };
    },
  },
};

export default Model;
