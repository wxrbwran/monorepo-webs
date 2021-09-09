import { Reducer } from 'redux';
import { CommonData } from 'typings/global';

// { gender, maxAge, minAge, maxHeight, minHeight, maxWeight, minWeight }
export interface queryBase {
  gender?: string;
  maxAge?: number;
  minAge?: number;
  maxHeight?: number;
  minHeight?: number;
  maxWeight?: number;
  minWeight?: number;
}
export interface queryImage {
  imageType: string;
  startAt: number | null;
  endAt: number | null;
}
export interface queryOther {
  fourHigh?: string[]
}
export interface QueryModelState {
  base: queryBase;
  images: queryImage[];
  other: queryOther;
  queryScope: CommonData;
  baseCondition: any;
  tableData: any;
  isQueryStop: boolean;
}

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
    setQueryResult: Reducer<QueryModelState>;
    clearQueryResult: Reducer<QueryModelState>;
    setIsQueryStop: Reducer<QueryModelState>;
  };
}
export const queryState = {
  base: {},
  images: [],
  other: {},
  queryScope: {
    "nsLabelType":"RESEARCH_PROJECT_PATIENT",
    "projectNsid": null
  },
  baseCondition: [],
  tableData: [],
  isQueryStop: false,
}
const queryModel: QueryType = {
  namespace: 'query',
  state: queryState,

  reducers: {
    setBaseVal(state = queryState, action): QueryModelState {
      return {
        ...state,
        base: Object.assign({}, state.base, action.payload),
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
    delAllQuery(state = queryState, action) {
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
    setQueryResult(state = queryState, action) {
      console.log('action', action);
      return {
        ...state,
        tableData: [...state.tableData, ...action.payload],
      };
    },
    clearQueryResult(state = queryState, action) {
      return {
        ...state,
        tableData: [],
        isQueryStop: false,
      };
    },
    setIsQueryStop(state = queryState, action) {
      return {
        ...state,
        isQueryStop: true,
      };
    },
  },
};

export default queryModel;
