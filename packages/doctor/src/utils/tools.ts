import { Role } from 'xzl-web-shared/dist/utils/role';

export const titleList: CommonData = ['主任医师', '副主任医师', '主治医师', '住院医师'];
export const relatedOptions = [
  { label: '高血压病', value: 'hypertension' },
  { label: '高脂血症', value: 'hyperlipemia' },
  { label: '糖尿病', value: 'hyperglycemia' },
  { label: '冠心病 ', value: 'coronary' },
  { label: '外周血管病', value: 'peripheralVascular' },
  { label: '痛风', value: 'gout' },
  { label: '肿瘤', value: 'tumour' },
];
export const riskList = {
  HIGH_BLOOD_PRESSURE: '高',
  DIABETES: '糖',
  HIGH_BLOOD_LIPIDS: '脂',
  HIGH_URIC_ACID: '尿',
  CORONARY_HEART_DISEASE: '冠心病',
};

export const tumourTreatmentTitle: CommonData = {
  CHEMOTHERAPY: '化疗',
  RADIOTHERAPY: '放疗',
  OTHER_TREATMENT: '其他治疗',
};

export const chatTitle = {
  CONSULTATION: '会诊',
  DOCTOR: '上级',
  ASSISTANT: '下级',
  OPERATOR: '护士',
  PATIENT: '患者',
  CONSULTATION_DOCTOR: '会诊',
  ADVISER: '顾问',
  OPERATOR_DEPARTMENT_ADMIN: '护士',
  SESSION: '管理员',
};

export const radioList = [
  { value: 'CURED', title: '治愈' },
  { value: 'UNCURED', title: '未治愈' },
  { value: 'UNKNOWN', title: '不详' },
];
export const pRadioList = [
  { value: 'FEMININE', title: '阴性' },
  { value: 'MASCULINE', title: '阳性' },
];
export const diaList = [
  { key: 'nephroticSyndrome', value: '肾功能不全' },
  { key: 'renalArteryStenosis', value: '肾动脉狭窄' },
  { key: 'sleepApnea', value: '睡眠呼吸暂停综合征' },
  { key: 'duodenalUlcer', value: '胃-十二指肠溃疡' },
  { key: 'pylori', value: '幽门螺旋杆菌' },
];
export const hyperList = [
  { key: 'hypertension', value: '高血压' },
  { key: 'hyperglycemia', value: '糖尿病' },
  { key: 'hyperlipemia', value: '高脂血症' },
  { key: 'hyperuricemia', value: '高尿酸症' },
];
export const familyList = [
  { key: 'fatherFamilyHistory', value: '父亲' },
  { key: 'motherFamilyHistory', value: '母亲' },
  { key: 'brotherFamilyHistory', value: '兄弟姐妹' },
];
export const diseaseHistoryList = [
  { key: 'familyHistory', value: '家族史' },
  { key: 'smoking', value: '吸烟史' },
  { key: 'drinking', value: '饮酒史' },
  { key: 'allergy', value: '过敏史' },
];
export const relatedList = {
  hypertension: '高血压病',
  hyperlipemia: '高脂血症',
  hyperglycemia: '糖尿病',
  coronary: '冠心病',
  peripheralVascular: '外周血管病',
  gout: '痛风',
  tumour: '肿瘤',
};
export const detailEnumList = {
  IRREGULAR: '间断用药',
  REGULAR: '规律用药',
  NONE: '未用药',
  UNKNOWN: '不详',
  FEMININE: '阴性',
  MASCULINE: '阳性',
  CURED: '已治愈',
  UNCURED: '未治愈',
};
export const sexList: CommonData = ['女', '男', '保密'];
export const orderTypes = [
  {
    key: 'DOCUMENT',
    value: '建档',
  }, {
    key: 'IMAGE',
    value: '审核图片',
  }, {
    key: 'CHAT',
    value: '会话',
  },
];
export const unitFlag:IIndexObject = {
  mg: 1,
  g: 2,
  ml: 3,
  iu: 4,
  ug: 6,
  wu: 7,
  '-': 5,
  other: 5,
};
export const unitFlagRe:IIndexObject = {
  1: 'mg',
  2: 'g',
  3: 'ml',
  4: 'iu',
  6: 'ug',
  7: 'wu',
  5: '-',
};
export const dayType = {
  1: '每天',
  2: '隔天',
};
export const banksName = [
  '无',
  '中国工商银行',
  '中国农业银行',
  '中国银行',
  '中国建设银行',
  '交通银行',
  '中信银行',
  '中国光大银行',
  '华夏银行',
  '中国民生银行',
  '上海浦东发展银行',
  '兴业银行',
  '招商银行',
  '广发银行',
  '深圳发展银行',
  '中国邮政储蓄银行',
  '北京银行',
  '恒丰银行',
  '北京农商银行',
  '上海银行',
  '平安银行',
  '宁波银行',
];

export const basicInfoTab: CommonData = {
  biography: '个人简介',
  expertise: '擅长领域',
  achievement: '科研成果',
  meetingLecture: '会议与讲课',
  firstProfessionBrief: '第一执业医院简介',
};
export const hospitalLevel: CommonData = {
  1: '(一级医院)',
  2: '(二级医院)',
  3: '(三级医院)',
};
export const imMsgType: Store = {
  0: 'text',
  1: 'image',
  2: 'audio',
  3: 'video',
  6: 'file',
  // 10: 'tip',
  // 106: 'CUSTOM_HELP_ADJUST_MEDICAL_PLAN',
  // 110: 'CUSTOM_BLOOD_PRESSURE',
  // 102: 'CUSTOM_DOCTOR_TIPS',
  // 101: 'CUSTOM_ADVICE',
};

export const provinces = [
  { id: 1, regionName: '北京' },
  { id: 2, regionName: '上海' },
  { id: 3, regionName: '天津' },
  { id: 4, regionName: '重庆' },
  { id: 5, regionName: '江苏' },
  { id: 6, regionName: '广东' },
  { id: 7, regionName: '山东' },
  { id: 8, regionName: '辽宁' },
  { id: 9, regionName: '河北' },
  { id: 10, regionName: '河南' },
  { id: 11, regionName: '四川' },
  { id: 12, regionName: '黑龙江' },
  { id: 13, regionName: '山西' },
  { id: 14, regionName: '湖北' },
  { id: 15, regionName: '湖南' },
  { id: 17, regionName: '陕西' },
  { id: 18, regionName: '浙江' },
  { id: 21, regionName: '云南' },
  { id: 22, regionName: '吉林' },
  { id: 25, regionName: '安徽' },
  { id: 26, regionName: '广西' },
  { id: 27, regionName: '江西' },
  { id: 28, regionName: '福建' },
  { id: 29, regionName: '新疆' },
  { id: 30, regionName: '内蒙古' },
  { id: 31, regionName: '甘肃' },
  { id: 32, regionName: '贵州' },
  { id: 33, regionName: '海南' },
  { id: 34, regionName: '青海' },
  { id: 35, regionName: '宁夏' },
  { id: 36, regionName: '西藏' },
  { id: 4000, regionName: '香港' },
  { id: 4001, regionName: '澳门' },
  { id: 4002, regionName: '台湾' },
];

export const AdjustMedicineBtn: CommonData = {
  [Role.LOWER_DOCTOR.id]: '请主管医生审核',
  [Role.UPPER_DOCTOR.id]: '发送给患者及医生助手',
  [Role.ALONE_DOCTOR.id]: '发送给患者',
};

export const AdviceTitle: CommonData = {
  [Role.LOWER_DOCTOR.id]: '调整建议',
  [Role.UPPER_DOCTOR.id]: '评价与指导',
};

export const BloodType: CommonData = {
  GLU_BEFORE_BREAKFAST: '空腹血糖',
  GLU_AFTER_BREAKFAST: '早餐后血糖',
  GLU_BEFORE_LUNCH: '午餐前血糖',
  GLU_AFTER_LUNCH: '午餐后血糖',
  GLU_BEFORE_DINNER: '晚餐前血糖',
  GLU_AFTER_DINNER: '晚餐后血糖',
  GLU_BEFORE_SLEEP: '睡前血糖',
};
export const BloodType2: CommonData = {
  GLU_BEFORE_BREAKFAST: '空腹',
  GLU_AFTER_BREAKFAST: '早餐后',
  GLU_BEFORE_LUNCH: '午餐前',
  GLU_AFTER_LUNCH: '午餐后',
  GLU_BEFORE_DINNER: '晚餐前',
  GLU_AFTER_DINNER: '晚餐后',
  GLU_BEFORE_SLEEP: '睡前',
};

export const accountStatus: CommonData = {
  110: '已认证',
  118: '未通过审核',
  119: '待审核',
  117: '待激活',
};

export interface IRoleItem {
  desc: string;
  url: string;
}
// ********************关于角色-s********************
// 医生角色
export const doctorRoles: { [key: string]: IRoleItem } = {
  [Role.ALONE_DOCTOR.id]: { desc: '独立管理', url: 'alone_doctor' },
  [Role.UPPER_DOCTOR.id]: { desc: '主管医生', url: 'upper_doctor' },
  [Role.LOWER_DOCTOR.id]: { desc: '医生助手', url: 'lower_doctor' },
  [Role.DIETITIAN.id]: { desc: '营养师', url: 'dietitian' },

  [Role.PHARAMCIST.id]: { desc: '药师', url: 'pharamcist' },
  [Role.KANGFUSHI.id]: { desc: '康复师', url: 'kangfushi' },
  [Role.PSYCHOLOGIST.id]: { desc: '心理医生', url: 'psychologist' },
  [Role.TEAMNURSE.id]: { desc: '护士', url: 'teamnurse' },
};
// 科研角色
export const croRoles = {
  [Role.CRO_PM.id]: { desc: 'PM', url: 'cro_pm' },
  [Role.CRO_CRA.id]: { desc: 'CRA', url: 'cro_cra' },
  [Role.CRO_CRC.id]: { desc: 'CRC', url: 'cro_crc' },
  [Role.RESEARCH_PROJECT_DOCTOR.id]: { desc: '研究者', url: 'research_project_doctor' },
};

// 各角色排序优先级
// 独立管理 > 主管医生 > 医生助手 > 营养师 > 药师 >  康复师  > 心理医生  > 护士 >  其他医生 > 研究者 > PM > CRA > CRC
export const imRoleOrder: string[] = [
  Role.PATIENT.id,
  Role.PATIENT_VIP.id,

  Role.DEP_HEAD.id,
  Role.ALONE_DOCTOR.id,
  Role.UPPER_DOCTOR.id,
  Role.LOWER_DOCTOR.id,
  Role.DIETITIAN.id,
  Role.PHARAMCIST.id,
  Role.KANGFUSHI.id,
  Role.PSYCHOLOGIST.id,
  Role.TEAMNURSE.id, // 服务包里的护士角色

  Role.NURSE.id, // im聊天中应该不会出现此角色

  Role.RESEARCH_PROJECT_DOCTOR.id, // 科研项目医生  31
  // Role.PROJECT_RESEARCHER.id, // 研究者  36只有在组织架构里有存在，其余出现，均为31角色
  Role.CRO_PM.id,
  Role.CRO_CRA.id,
  Role.CRO_CRC.id,
];
// ********************关于角色-e********************
