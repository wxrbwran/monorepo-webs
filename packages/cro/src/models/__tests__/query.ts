import 'jest'
import QueryModelState, { queryState } from '../query';
const baseState = { maxAge: 20, minAge: 8};
const imagesState = [{imageType: 'SHQX'}];
const otherState = { fourHigh: ['HYPERGLYCEMIA']};

describe('models: query', () => {
  it('Model namespace: query', () => {
    expect(QueryModelState.namespace).toBe('query');
  });
  it('setBaseVal,基本资料查询条件', () => {
    const payload = baseState;
    const { setBaseVal } = QueryModelState.reducers;
    const state = queryState;
    const result = setBaseVal(state, { payload });
    expect(result).toEqual({
      ...state,
      base: Object.assign({}, state.base, payload),
    });
  });
  it('setImages,纸质单据查询条件', () => {
    const payload = imagesState;
    const { setImages } = QueryModelState.reducers;
    const state = queryState;
    const result = setImages(state, { payload });
    expect(result).toEqual({
      ...state,
      images: payload,
    });
  });
  it('setOther,四大代谢查询条件', () => {
    const payload = otherState;
    const { setOther } = QueryModelState.reducers;
    const state = queryState;
    const result = setOther(state, { payload });
    expect(result).toEqual({
      ...state,
      other: payload,
    });
  });
  it('delAllQuery,清除所有查询条件', () => {
    const { delAllQuery } = QueryModelState.reducers;
    const state = queryState;
    const result = delAllQuery(state);
    expect(result).toEqual({
      other: {},
      base: {},
      images: [],
    });
  });
});
