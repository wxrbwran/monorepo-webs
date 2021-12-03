import { Reducer } from 'redux';

export type TDocument = {
  id?: string;
  name?: string;
  sampleFrom?: string;
  part?: string;
  method?: string;
  data?: any[];
};

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
      console.log('payload', payload);
      return {
        ...state,
        curDocument: payload,
      };
    },
  },
};

export default Model;
