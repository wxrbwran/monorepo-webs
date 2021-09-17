import { commonData } from 'typings/global';

export const localRole = localStorage.getItem('xzl-web-doctor_role') || '';

export const uid = window.$storage.getItem('user');

export const pageSize = process.env.NODE_ENV === 'development' ? 3 : 10;

export const initialOrg: Iorg = {
  organizationId: '',
  organizationName: '',
  role: '',
  roles: [],
  status: '',
  qrCodeUrl: '',
};
export enum SEX {
  MALE = '男',
  FEMALE = '女'
}
export const sexList = ['女', '男', '保密'];
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
export interface IVal {
  projectGroups?: string;
  frequency?: string;
  custom?: number;
  remind?: string;
  maxAge?: number;
  minAge?: number;
  sex?: number;
  diagnosis?: string;
  treatment?: string;
  start?: string;
}
interface IDetail {
  projectGroups?: [];
  frequency?: string;
  custom?: Array<number>;
  maxAge?: number;
  minAge?: number;
  sex?: string;
  diagnosis?: string;
  treatment?: string;
  send?: string;
  start?: string;
}
export interface IPlanItem {
  detail: IDetail,
  type: string,
}
export interface IPlanInfos {
  plans: [{
    type: string,
    detail: IDetail
  }],
  questions: string,
  scaleId: string,
}
export interface IGroup {
  project: {
    objectiveGroup:{
      groupName: string,
      groupId: string,
    }[]
  }
}
export interface Ioptions {
  content: string;
  checked?: boolean;
}
export interface IQuestions {
  type: string;
  code?: number;
  detail: {
    checkedArr?: string[] | string; // 多选题，h5填写完返回的是string[]。单选题，h5返回的是string
    stem: string | string[];
    options: Ioptions[];
    answer?: string | string[];
  }
}
export interface IStandard {
  type?: string;
  age?: {
    lowerAge: number;
    upperAge: number;
  },
  diagnoseName?: string[];
  gender?: number;
  medicineName?: string[];
  customize?: string[];
}

export const sendTimeType = [
  {
    key: 'ADMISSION_TIME',
    value: '患者入组的时间',
  }, {
    key: 'TREATMENT_TIME',
    value: '患者做处理的时间',
  }
]
export const typeList = {
  ADMISSION_TIME: '患者入组的时间',
  TREATMENT_TIME: '患者做处理的时间',
};
export const sendType = [
  {
    key: 'CUSTOM',
    value: '自定义',
  }, {
    key: 'LOOP',
    value: '循环下发',
  }
];
export const accountStatus: commonData = {
  1000: '待确认',
  1001: '已拒绝',
  1002: '已加入'
};
export const projectDefaultImg = [
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/8e43d72d-5ae5-40c8-9d04-21c777b57b14projectImg1.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/d1f6b9bb-b5cf-4d32-96a0-108d2338d382projectImg2.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/364a407a-cd3a-4886-8029-c43434f7838dprojectImg3.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/5c267f30-ccc7-4d9f-a749-420f3d740a4cprojectImg4.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/ee254d65-f014-4c55-a952-6ec4c5ccf04aprojectImg5.jpeg'
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
export const projectLabel: commonData  = {
  'multi_project': '多中心临床试验',
  'single_project': '单中心临床试验'
}
export const eventList = ['', '主要终点事件', '次要终点事件', '不良反应', '严重不良反应事件'];

export const projectStatus: commonData = {
  1001: '封闭',
  1002: '进行',
  1003: '结束'
}

export const exitReason = ['受试者主动退出', '研究者停止', '完成试验自动退出'];
