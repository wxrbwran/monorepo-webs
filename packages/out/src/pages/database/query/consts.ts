export enum SEX {
  MALE = '男',
  FEMALE = '女'
}
export enum INFO {
  Age = '年龄',
  Weight = '体重',
  Height = '身高',
  gender = '性别',
  SHQX = '生化全项',
  XCG = '血常规',
  BCG = '便常规',
  XZCS = '心脏超声',
  XDT = '心电图',
  HYPERTENSION = '高血压',
  HYPERGLYCEMIA = '糖尿病',
  HYPERLIPEMIA = '高脂血',
  HYPERURICEMIA = '高尿酸',
  fourHigh = '四大代谢',
}
export const baseOption = [
  {
    label: '姓名',
    value: 'name'
  }, {
    label: '机构',
    value: 'orgName'
  }, {
    label: '性别',
    value: 'sex'
  }, {
    label: '年龄',
    value: 'age'
  }, {
    label: '地区',
    value: 'province'
  }
]
export const extOptions = [
  {
  label: '生化全项',
  value: 'shqx',
  key: 'SHQX'
},{
  label: '血常规',
  value: 'xcg',
  key: 'XCG'
},{
  label: '便常规',
  value: 'bcg',
  key: 'BCG'
},{
  label: '心脏超声',
  value: 'xzcs',
  key: 'XZCS'
},{
  label: '心电图',
  value: 'xdt',
  key: 'XDT'
}
// ,{
//   label: '高血压',
//   value: 'hypertension',
//   key: 'HYPERTENSION'
// },{
//   label: '糖尿病',
//   value: 'hyperglycemia',
//   key: 'HYPERGLYCEMIA'
// },{
//   label: '高脂血',
//   value: 'hyperlipemia',
//   key: 'HYPERLIPEMIA'
// },{
//   label: '高尿酸',
//   value: 'hyperuricemia',
//   key: 'HYPERURICEMIA'
// }
]
export const queryFields = {
  name: '姓名',
  orgName: '机构',
  sex: '性别',
  age: '年龄',
  province: '地区',
  shqx: '生化全项',
  xcg: '血常规',
  bcg: '便常规',
  xzcs: '心脏超声',
  xdt: '心电图',
  hypertension: '高血压',
  hyperglycemia: '糖尿病',
  hyperlipemia: '高脂血',
  hyperuricemia: '高尿酸',
}
export const columnFields = {
  姓名: 'name',
  机构: 'orgName',
  性别: 'sex',
  年龄: 'age',
  地区: 'province',
  生化全项:'shqx',
  血常规: 'xcg',
  便常规: 'bcg',
  心脏超声: 'xzcs',
  心电图: 'xdt',
  高血压: 'hypertension',
  糖尿病: 'hyperglycemia',
  高脂血: 'hyperlipemia',
  高尿酸: 'hyperuricemia'
}
