import type { Reducer } from 'redux';

export interface QueryType {
  namespace: 'query';
  state: QueryModelState;
  reducers: {
    setBaseVal: Reducer<QueryModelState>;
    setBaseCondition: Reducer<QueryModelState>;
    setImages: Reducer<QueryModelState>;
    setOther: Reducer<QueryModelState>;
    delAllQuery: Reducer<QueryModelState>;
    setQueryScope: Reducer<QueryModelState>;
  };
}
export const queryState = {
  base: {},
  images: [],
  other: {},
  queryScope: {},
  baseCondition: []
}
const queryModel: QueryType = {
  namespace: 'query',
  state: queryState,

  reducers: {
    setBaseVal(state = queryState, action): QueryModelState {
      return {
        ...state,
        base: { ...state.base, ...action.payload},
      };
    },
    setBaseCondition(state = queryState, action): QueryModelState {
      return {
        ...state,
        baseCondition: action.payload,
      };
    },
    setImages(state = queryState, action) {
      return {
        ...state,
        images: action.payload,
      };
    },
    setOther(state = queryState, action) {
      return {
        ...state,
        other: action.payload,
      };
    },
    delAllQuery(state = queryState) {
      return {
        ...state,
        other: {},
        base: {},
        images: [],
      };
    },
    setQueryScope(state = queryState, action) {
      return {
        ...state,
        queryScope: action.payload,
      };
    },
  },
};

export default queryModel;
