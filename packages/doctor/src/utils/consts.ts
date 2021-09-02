import { Role } from './role';

export const defaultAvatar = 'https://staff-avatars-prod.oss-cn-beijing.aliyuncs.com/default-avatar.jpg';
/* eslint-disable global-require */
export { default as defaultPatientAvatar } from '@/assets/img/patientAvatar.jpg';

export const imConfig = {
  // 本地消息显示数量，会影响性能
  localMsglimit: 99,
  useDb: false,
  appkey: '1e82c88ea2c1d07f67ecfdabf23940e9',
  url: 'https://apptest.netease.im',
};

export const rolePriceList = [
  {
    text: '独立管理病人',
    key: 'INDEPENDENT_VIP',
    extra: null,
  },
  {
    text: '我做上级医生',
    key: 'SUPERIOR_VIP',
    extra: '我做上级医生',
  },
  {
    text: '我做下级医生',
    key: 'SUBORDINATE_VIP',
    extra: '我找上级医生一起管',
  },
];

//  '', 'SUBORDINATE_VIP';
export const roleType: string[] = ['INDEPENDENT_VIP', 'SUPERIOR_VIP', 'SUBORDINATE_VIP'];
export const VIPType: { type: string; divide: number }[] = [
  {
    type: 'VIP_YEAR',
    divide: 1,
  },
  {
    type: 'VIP_HALF_YEAR',
    divide: 2,
  },
  {
    type: 'VIP_QUARTER',
    divide: 4,
  },
];
export const doctorRole: {
  [key: string]: string;
} = {
  INDEPENDENT_VIP: Role.ALONE_DOCTOR.id,
  SUPERIOR_VIP: Role.UPPER_DOCTOR.id,
  SUBORDINATE_VIP: Role.LOWER_DOCTOR.id,
};
export const gluTab = [
  {
    label: 'GLU_BEFORE_BREAKFAST',
    value: '空腹',
  }, {
    label: 'GLU_AFTER_BREAKFAST',
    value: '早餐后',
  }, {
    label: 'GLU_BEFORE_LUNCH',
    value: '午餐前',
  }, {
    label: 'GLU_AFTER_LUNCH',
    value: '午餐后',
  }, {
    label: 'GLU_BEFORE_DINNER',
    value: '晚餐前',
  }, {
    label: 'GLU_AFTER_DINNER',
    value: '晚餐后',
  }, {
    label: 'GLU_BEFORE_SLEEP',
    value: '睡前',
  },
];
// 图片结构化
export const imgCheckTypeList = {
  ZD: '诊断',
  THXHDB: '糖化血红蛋白',
  NCG: '尿常规',
  CTHCHS: 'ct/核磁/核素',

  DBL: '大病历',
  NXSX: '凝血四项',
  BCG: '便常规',
  GZ: '冠造',

  XZCS: '超声',
  XGSX: '心梗三项',
  XDT: '心电图',
  XFYD: '心肺运动',

  SHQX: '生化全项',
  HXD_24H: '24小时心电图',
  JGWX: '甲功五项',
  YDPB: '运动平板',

  XCG: '血常规',
  XY_24H: '24小时血压',
  XSTLT: '血栓弹力图',
  ZDZLS: '其他病历',

  OTHER_HY: '其他化验',
  OTHER_JC: '其他检查',
};
export const imageIndexType: CommonData = {
  HYD: '化验',
  JCD: '检查',
};
export const departmentType = [
  {
    text: '通用科室',
    key: 'COMMON_DEPARTMENT_TYPE',
  },
  {
    text: '肿瘤科',
    key: 'TUMOUR_DEPARTMENT_TYPE',
  },
  {
    text: '神经内科',
    key: 'NEUROLOGY_DEPARTMENT_TYPE',
  },
];
export const clientType = {
  DOCTOR: '医生端',
  NURSE: '护士端',
  OUTPATIENT: '院外管理端',
};
