import { Role } from './role';
import { croStatus, UserStatus } from './enums';
export const defaultAvatar = 'https://staff-avatars-prod.oss-cn-beijing.aliyuncs.com/default-avatar.jpg';

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

export const clientType = {
  DOCTOR: '医生端',
  NURSE: '护士端',
  OUTPATIENT: '院外管理端',
};

export const pageSize = process.env.NODE_ENV === 'development' ? 10 : 10;

export const titleList: string[] = ['主任医师', '副主任医师', '主治医师', '住院医师'];

export const doctorRelated = {
  biography: '个人简介',
  expertise: '擅长领域',
  achievement: '科研成果',
  meetingLecture: '会议讲课',
  firstProfessionBrief: '第一执业医院简介',
};

export const roleList = {
  OPERATOR: '护士',
  OPERATOR_ADMIN: '机构护士管理员',
  OPERATOR_DEPARTMENT_ADMIN: '科室护士管理员',
};

export const orgCategroy = {
  ORDINARY: '慢病管理',
  CLINICAL: '临床试验',
};

export const sexList = ['女', '男', '保密'];

export const provinces = [
  {
    id: 1,
    regionName: '北京',
  },
  {
    id: 2,
    regionName: '上海',
  },
  {
    id: 3,
    regionName: '天津',
  },
  {
    id: 4,
    regionName: '重庆',
  },
  {
    id: 5,
    regionName: '江苏',
  },
  {
    id: 6,
    regionName: '广东',
  },
  {
    id: 7,
    regionName: '山东',
  },
  {
    id: 8,
    regionName: '辽宁',
  },
  {
    id: 9,
    regionName: '河北',
  },
  {
    id: 10,
    regionName: '河南',
  },
  {
    id: 11,
    regionName: '四川',
  },
  {
    id: 12,
    regionName: '黑龙江',
  },
  {
    id: 13,
    regionName: '山西',
  },
  {
    id: 14,
    regionName: '湖北',
  },
  {
    id: 15,
    regionName: '湖南',
  },
  {
    id: 17,
    regionName: '陕西',
  },
  {
    id: 18,
    regionName: '浙江',
  },
  {
    id: 21,
    regionName: '云南',
  },
  {
    id: 22,
    regionName: '吉林',
  },
  {
    id: 25,
    regionName: '安徽',
  },
  {
    id: 26,
    regionName: '广西',
  },
  {
    id: 27,
    regionName: '江西',
  },
  {
    id: 28,
    regionName: '福建',
  },
  {
    id: 29,
    regionName: '新疆',
  },
  {
    id: 30,
    regionName: '内蒙古',
  },
  {
    id: 31,
    regionName: '甘肃',
  },
  {
    id: 32,
    regionName: '贵州',
  },
  {
    id: 33,
    regionName: '海南',
  },
  {
    id: 34,
    regionName: '青海',
  },
  {
    id: 35,
    regionName: '宁夏',
  },
  {
    id: 36,
    regionName: '西藏',
  },
  {
    id: 4000,
    regionName: '香港',
  },
  {
    id: 4001,
    regionName: '澳门',
  },
  {
    id: 4002,
    regionName: '台湾',
  },
];

export const adminRoles = ['ROOT', 'SUB_ROOT', 'ADMIN'];

export const labelCol = {
  span: 4,
};
export const operatorRoles = [
  'OPERATOR',
  'ROOT_OPERATOR',
  'OPERATOR_ADMIN',
  'OPERATOR_DEPARTMENT_ADMIN',
];

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


export const inviteStatusLists = {
  WAITING: '待确认',
  CONFIRMED: '已确认',
  REFUSED: '已拒绝',
};
export const accountStatus = {
  110: '已认证',
  118: '未通过审核',
  119: '待审核',
  117: '待激活',
};
export const projectStatus = {
  1000: '待确认',
  1001: '已拒绝',
  1002: '进行中',
  1003: '已结束',
};
export const projectInviteStatus: CommonData = {
  1000: '待确认',
  1001: '已拒绝',
  1002: '已加入',
  0: '未邀请',
};
export const croLists = {
  [croStatus.Running]: '进行中',
  [croStatus.Stopping]: '已结束',
};

export const itemWithoutlabel = ['name', 'sex', 'title'];
export const itemWithLabel = [
  { key: 'tel', label: '手机' },
  { key: 'firstProfessionCompany', label: '第一执业医院' },
];
export const basicInfoTab: Store = {
  biography: '个人简介',
  expertise: '擅长领域',
  achievement: '科研成果',
  meetingLecture: '会议与讲课',
  firstProfessionBrief: '第一执业医院简介',
};
export const isInternet: Store = {
  NO: '否',
  YES: '是',
};
export const orgType: string[] = ['一级', '二级', '三级', '未定级'];
export const orgGrade: string[] = ['甲等', '乙等', '丙等', '合格', '未评'];

export const hospitalLevel: Store = {
  ONE: '一级',
  TWO: '二级',
  THREE: '三级',
  NOLEVEL: '未定级',
};

export const hospitalGrade: Store = {
  FIRST: '甲等',
  SECOND: '乙等',
  THIRD: '丙等',
  QUALIFIED: '合格',
  NOGEADE: '未评',
};

export const topInfos: Store = {
  account: '管理员账号：',
  uuCode: '机构识别码',
  name: '机构名称',
  organizationCode: '组织机构代码',
  isInternet: '是否为互联网医院',
  orgType: '机构类别',
  level: '医院级别',
  grade: '医院等次',
  legalPerson: '法人',
  area: '实体医院地址',
};

export const addtionalMenuList = {
  nurse_team: '护士团队',
  counselor_doctor_team: '顾问医生团队',
  superior_org_space: '上级机构',
  lower_org_space: '下级机构',
};

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
export const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
export const projectDefaultImg = [
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/8e43d72d-5ae5-40c8-9d04-21c777b57b14projectImg1.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/d1f6b9bb-b5cf-4d32-96a0-108d2338d382projectImg2.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/364a407a-cd3a-4886-8029-c43434f7838dprojectImg3.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/5c267f30-ccc7-4d9f-a749-420f3d740a4cprojectImg4.jpeg',
  'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/dev/2/ee254d65-f014-4c55-a952-6ec4c5ccf04aprojectImg5.jpeg',
];




export const statusLists = {
  [UserStatus.Accepted]: '已认证',
  // [UserStatus.InitState]: '未完成注册',
  [UserStatus.InitState]: '待审核',
  [UserStatus.Refused]: '审核失败',
};

