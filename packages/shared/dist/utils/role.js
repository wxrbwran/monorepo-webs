/*
 * @Author: gaoxue
 * @Date: 2020-10-20 03:51:21
 */
var roleType = function (id, initState, accepted, refused, desc) {
  return {
    id: process.env.PREFIX + '.' + id,
    initState: initState,
    accepted: accepted,
    refused: refused,
    desc: desc,
  };
};
// console.log('process.env.APP_ENV', process.env.APP_ENV);
export var Role = {
  ROOT: roleType('qWGr0B', 9, 0, 8, 'Root管理员'),
  ORG_ADMIN: roleType('XWrxeA', 19, 10, 18, '机构管理员'),
  ORG_NURSE_ADMIN: roleType('V0XqWB', 29, 20, 28, '机构护士管理员'),
  NURSE_ADMIN: roleType('qWdLWZ', 39, 30, 38, '护士管理员'),
  ORG: roleType('bWwj0P', 49, 40, 48, '机构主体'),
  UPPER_ORG: roleType('YWBa0j', 59, 50, 58, '上级机构'),
  LOWER_ORG: roleType('Y4NqWP', 69, 60, 68, '下级机构'),
  PATIENT: roleType('YWLG0L', 79, 70, 78, '患者(默认在万物无疆系统-慢病服务团队)'),
  PATIENT_VIP: roleType('nWgX4b', 89, 80, 88, 'VIP 患者'),
  PATIENT_FAMILY: roleType('70MG43', 99, 90, 98, '患者家属'),
  NURSE: roleType('2Wmj4M', 109, 100, 108, '护士(角色默认在 xinzhili - 护士团队)'),
  DOCTOR: roleType('n41zeZ', 119, 110, 118, '医生'),
  SYS_DOCTOR: roleType('ZW7Qew', 129, 120, 128, '系统智能医生'),
  UPPER_DOCTOR: roleType('VWVpeR', 139, 130, 138, '主管医生'),
  LOWER_DOCTOR: roleType('80pOeG', 149, 140, 148, '医生助手'),
  ALONE_DOCTOR: roleType('L03Beb', 159, 150, 158, '独立管理'),
  COUNSELOR_DOCTOR: roleType('2eAEeG', 169, 160, 168, '顾问医生'),
  CONSOLE_ROOT: roleType('6exPeb', 179, 170, 178, '后台系统Root管理员'),
  CRO_ORG: roleType('YWQD0z', 189, 180, 188, 'CRO 机构'),
  NONE: roleType('bWlZez', 199, 190, 198, '任何角色都没有，即没有任何身份，默认都进入xinzhili空间'),
  VISITOR: roleType('keaR09', 209, 200, 208, '游客'),
  ORG_IH: roleType('jW2m0r', 219, 210, 218, '线上医院和项目机构'),
  PATIENT_IH: roleType('Y4nb4D', 0, 0, 0, '线上医院和项目机构患者'),
  DOCTOR_IH: roleType('r4qE4y', 0, 0, 0, '线上医院和项目机构医生'),
  DOCTOR_IH_SENIOR: roleType('Y0ZD4o', 0, 0, 0, '线上医院和项目机构科室正高级医师'),
  DOCTOR_IH_DEPUTY: roleType('6e8JWY', 0, 0, 0, '线上医院和项目机构科室副高级医师'),
  RESEARCH_PROJECT_ORG: roleType('V0bD49', 0, 0, 0, '科研 机构'),
  RESEARCH_PROJECT: roleType('YePZWq', 0, 0, 0, '科研项目'),
  RESEARCH_PROJECT_DOCTOR: roleType('m4vkea', 0, 0, 0, '科研项目医生'),
  PI: roleType('Y0OG0Q', 0, 0, 0, 'PI'),
  MAIN_PI: roleType('NeEd4M', 0, 0, 0, '总PI'),
  SUB_PI: roleType('D09PeP', 0, 0, 0, '分PI'),
  PROJECT_LEADER: roleType('v4Rwe2', 0, 0, 0, '项目组长'),
  PROJECT_RESEARCHER: roleType('x4y14p', 0, 0, 0, '研究者'),
  PROJECT_PATIENT: roleType('NWkr0D', 0, 0, 0, '受试者'),
  PROJECT_MEMBERS: roleType('V0YzWE', 0, 0, 0, '组员'),
  PATIENT_YL: roleType('XWrVxW', 459, 450, 458, '患者'),
  PATIENT_YL_VIP: roleType('V0XNq4', 469, 460, 468, 'vip患者'),
  NURSE_YL: roleType('qWd7L0', 0, 0, 0, '护士'),
  YL_ADMIN: roleType('bWw2j0', 0, 0, 0, '高级管理员'),
  YL_YZ: roleType('YWBka4', 0, 0, 0, '院长'),
  DOCTOR_INTELLIGENT_ASSISTANT: roleType('2Wm7je', 0, 0, 0, '医生智能助手'),
  NS_OWNER: roleType('80pbO4', 0, 0, 0, '创建人'),
  DIETITIAN: roleType('6exBPW', 0, 0, 0, '营养师'),
  CRO_PM: roleType('YWQ1DW', 0, 0, 0, 'PM'),
  CRO_CRA: roleType('bWl1Z4', 0, 0, 0, 'CRA'),
  CRO_CRC: roleType('keajR0', 0, 0, 0, 'CRC'),
  DEP_HEAD: roleType('jW23m4', 0, 0, 0, '科主任'),
  PHARAMCIST: roleType('Y4n2b4', 0, 0, 0, '药师'),
  KANGFUSHI: roleType('r4qME4', 0, 0, 0, '康复师'),
  PSYCHOLOGIST: roleType('Y0ZxD4', 0, 0, 0, '心理医生'),
  TEAMNURSE: roleType('6e89J0', 0, 0, 0, '护士'),
  NINE_MEMBER_CALLER_1: roleType('qWGyBe', 0, 0, 0, '长期'),
  NINE_MEMBER_CALLER_2: roleType('XWrv6W', 0, 0, 0, '临时'),
  NINE_MEMBER: roleType('YWLRAe', 0, 0, 0, '会员'), // 九品 会员
};
export function fetchRolePropById(id) {
  var roleKey = Object.keys(Role);
  roleKey.forEach(function (key) {
    Role[key].key = key.toLowerCase();
  });
  var activeRole = roleKey.filter(function (key) {
    return Role[key].id === id;
  })[0];
  return Role[activeRole];
}
// 根据role的id，获取其它属性值
export function fetchRolePropValue(id, keyName) {
  var _a;
  return (_a = fetchRolePropById(id)) === null || _a === void 0 ? void 0 : _a[keyName];
}
export function isDoctor(roleId) {
  return !![
    Role.ALONE_DOCTOR.id,
    Role.UPPER_DOCTOR.id,
    Role.LOWER_DOCTOR.id,
    Role.DOCTOR.id,
    Role.DOCTOR_IH.id,
  ].includes(roleId);
}
