/**
 * Created by wuxiaoran on 2017/2/20.
 */
import { Role } from 'xzl-web-shared/dist/utils/role';

export const urlParams = () => {
  const query = window.location.href.split('?')[1];
  const pairs = query ? query.split('&') : [];
  const data: any = {};
  pairs.forEach((pair) => {
    const tmp = pair.split('=');
    const [key, val] = tmp;
    data[key] = val;
  });

  return data;
};

/* eslint-disable implicit-arrow-linebreak */

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export function getCondition(keyName: string, value: any, operator?: string) {
  return {
    var: keyName,
    value,
    operator: operator || '=',
  };
}


export const isOpenSub = () => {
  return !!sessionStorage.getItem('openSub');
};
export const upperOrgNsId = () => {
  return sessionStorage.getItem('upperOrgNsId');
};

export const sexList: CommonData = ['女', '男', '保密'];
export const diseaseHistoryList = [
  { key: 'familyHistory', value: '家族史' },
  { key: 'smoking', value: '吸烟史' },
  { key: 'drinking', value: '饮酒史' },
  { key: 'allergy', value: '过敏史' },
];
export const tumourTreatmentTitle: CommonData = {
  CHEMOTHERAPY: '化疗',
  RADIOTHERAPY: '放疗',
  OTHER_TREATMENT: '其他治疗',
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
export const unitFlagRe:IIndexObject = {
  1: 'mg',
  2: 'g',
  3: 'ml',
  4: 'iu',
  6: 'ug',
  7: 'wu',
  5: '-',
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
