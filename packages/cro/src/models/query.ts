import { Reducer } from 'redux';
import { CommonData } from 'typings/global';

// { gender, maxAge, minAge, maxHeight, minHeight, maxWeight, minWeight }
export interface QueryBase {
  gender?: string;
  maxAge?: number;
  minAge?: number;
  maxHeight?: number;
  minHeight?: number;
  maxWeight?: number;
  minWeight?: number;
}
export interface QueryImage {
  imageType: string;
  startAt: number | null;
  endAt: number | null;
}
export interface QueryOther {
  fourHigh?: string[]
}
export interface QueryModelState {
  base: QueryBase;
  images: QueryImage[];
  other: QueryOther;
  queryScope: CommonData;
  baseCondition: any;
  tableData: any;
  isQueryStop: boolean;
  head: any;
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
    setQueryHead: Reducer<QueryModelState>;
    setQueryResult: Reducer<QueryModelState>;
    clearQueryResult: Reducer<QueryModelState>;
  };
}
export const queryState = {
  base: {},
  images: [],
  other: {},
  queryScope: {
    'nsLabelType': 'RESEARCH_PROJECT_PATIENT',
    'projectNsid': null,
  },
  baseCondition: [],
  tableData: [],
  isQueryStop: false,
  head: [], // 查询结果表头
};

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
    setQueryHead(state = queryState, action) {
      console.log('action', action);
      return {
        ...state,
        head: action.payload,
      };
    },
    setQueryResult(state = queryState, action) {
      console.log('action', action);

      const unique = (arr: any[]) => {
        const res = new Map();
        return arr.filter((item) => !res.has(item.row_key) && res.set(item.row_key, 1));
      };

      return {
        ...state,
        tableData: unique([...state.tableData, ...action.payload]),
      };
    },
    clearQueryResult(state = queryState) {
      return {
        ...state,
        tableData: [],
        isQueryStop: false,
      };
    },
  },
};

export default queryModel;
