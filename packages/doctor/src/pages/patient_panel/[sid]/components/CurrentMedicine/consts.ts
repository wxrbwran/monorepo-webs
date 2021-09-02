// 添加计划IM所需数据默认值
export const initPlanAction = {
  status: 'ADD',
  adjustCount: null,
  adjustCycleDays: null,
  adjustDate: null,
  originalCount: null,
  originalCycleDays: null,
  originalDate: null,
};
// 添加新药IM所需数据默认值
export const initActionRecord = {
  id: '',
  name: '',
  status: 'ADD',
  plans: [{ ...initPlanAction }],
};
// 添加新药默认值
export const initRecord = {
  medicine: {},
  medicineSource: 2,
  plans: [{ boxCellNos: [0], cycleDays: [1] }],
};
