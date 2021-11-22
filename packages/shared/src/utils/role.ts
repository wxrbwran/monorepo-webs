/*
 * @Author: gaoxue
 * @Date: 2020-10-20 03:51:21
 */

export interface RoleType {
  id: string;
  initState: number;
  accepted: number;
  refused: number;
  desc: string;
  [propName: string]: string | number;
}

// 仅列了常用的几个角色
interface RolesMap {
  UPPER_DOCTOR: RoleType;
  LOWER_DOCTOR: RoleType;
  ALONE_DOCTOR: RoleType;
  COUNSELOR_DOCTOR: RoleType;
  NURSE: RoleType;
  PATIENT_VIP: RoleType;
  PATIENT: RoleType;
  ORG: RoleType;
  PI: RoleType;
  MAIN_PI: RoleType;
  SUB_PI: RoleType;
  PROJECT_LEADER: RoleType;
  PROJECT_RESEARCHER: RoleType;
  PROJECT_MEMBERS: RoleType;
  [propName: string]: RoleType;
}
const roleType = (
  id: string,
  initState: number,
  accepted: number,
  refused: number,
  desc: string,
) => ({
  id: `${process.env.APP_ENV}.${id}`,
  initState,
  accepted,
  refused,
  desc,
});
// console.log('process.env.APP_ENV', process.env.APP_ENV);
export const Role: RolesMap = {
  ROOT: roleType('qWGr0B', 9, 0, 8, 'Root管理员'), // 1
  ORG_ADMIN: roleType('XWrxeA', 19, 10, 18, '机构管理员'), // 2
  ORG_NURSE_ADMIN: roleType('V0XqWB', 29, 20, 28, '机构护士管理员'), // 3
  NURSE_ADMIN: roleType('qWdLWZ', 39, 30, 38, '护士管理员'), // 4
  ORG: roleType('bWwj0P', 49, 40, 48, '机构主体'), // 5
  UPPER_ORG: roleType('YWBa0j', 59, 50, 58, '上级机构'), // 6
  LOWER_ORG: roleType('Y4NqWP', 69, 60, 68, '下级机构'), // 7
  PATIENT: roleType('YWLG0L', 79, 70, 78, '患者(默认在心之力系统-慢病服务团队)'), // 8
  PATIENT_VIP: roleType('nWgX4b', 89, 80, 88, 'VIP 患者'), // 9
  PATIENT_FAMILY: roleType('70MG43', 99, 90, 98, '患者家属'), // 10
  NURSE: roleType('2Wmj4M', 109, 100, 108, '护士(角色默认在 xinzhili - 护士团队)'), // 11
  DOCTOR: roleType('n41zeZ', 119, 110, 118, '医生'), // 12 医生(角色默认在xinzhili - 全科
  SYS_DOCTOR: roleType('ZW7Qew', 129, 120, 128, '系统智能医生'), // 13
  UPPER_DOCTOR: roleType('VWVpeR', 139, 130, 138, '上级医生'), // 14
  LOWER_DOCTOR: roleType('80pOeG', 149, 140, 148, '下级医生'), // 15
  ALONE_DOCTOR: roleType('L03Beb', 159, 150, 158, '独立管理医生'), // 16

  COUNSELOR_DOCTOR: roleType('2eAEeG', 169, 160, 168, '顾问医生'), // 17 顾问医生(角色默认在xinzhili - 顾问医生团队)
  CONSOLE_ROOT: roleType('6exPeb', 179, 170, 178, '后台系统Root管理员'), // 18
  CRO_ORG: roleType('YWQD0z', 189, 180, 188, 'CRO 机构'), // 19
  NONE: roleType('bWlZez', 199, 190, 198, '任何角色都没有，即没有任何身份，默认都进入xinzhili空间'), // 20
  VISITOR: roleType('keaR09', 209, 200, 208, '游客'), // 21

  ORG_IH: roleType('jW2m0r', 219, 210, 218, '互联网医院'), // 22
  PATIENT_IH: roleType('Y4nb4D', 0, 0, 0, '互联网医院患者'), // 23
  DOCTOR_IH: roleType('r4qE4y', 0, 0, 0, '互联网医院医生'), // 24
  DOCTOR_IH_SENIOR: roleType('Y0ZD4o', 0, 0, 0, '互联网医院科室正高级医师'), // 25
  DOCTOR_IH_DEPUTY: roleType('6e8JWY', 0, 0, 0, '互联网医院科室副高级医师'), // 26

  RESEARCH_PROJECT_ORG: roleType('V0bD49', 0, 0, 0, '科研 机构'), // 29
  RESEARCH_PROJECT: roleType('YePZWq', 0, 0, 0, '科研项目'), // 30
  RESEARCH_PROJECT_DOCTOR: roleType('m4vkea', 0, 0, 0, '科研项目医生'), // 31医生研究者
  PI: roleType('Y0OG0Q', 0, 0, 0, 'PI'), // 32 科研多中心项目PI
  MAIN_PI: roleType('NeEd4M', 0, 0, 0, '总PI'), // 33 科研多中心项目总PI
  SUB_PI: roleType('D09PeP', 0, 0, 0, '分PI'), // 34 科研多中心项目分PI
  PROJECT_LEADER: roleType('v4Rwe2', 0, 0, 0, '项目组长'), // 35 科研单中心项目组长
  PROJECT_RESEARCHER: roleType('x4y14p', 0, 0, 0, '研究者'), // 36 科研项目普通研究者
  PROJECT_PATIENT: roleType('NWkr0D', 0, 0, 0, '受试者'), // 37 科研 受试者
  PROJECT_MEMBERS: roleType('V0YzWE', 0, 0, 0, '组员'), // 38 科研单中心项目组员

  PATIENT_YL: roleType('XWrVxW', 459, 450, 458, '患者'), // 46 患 养老院患者
  PATIENT_YL_VIP: roleType('V0XNq4', 469, 460, 468, 'vip患者'), // 47 患 养老院vip患者
  NURSE_YL: roleType('qWd7L0', 0, 0, 0, '护士'), // 48 护 养老院护士
  YL_ADMIN: roleType('bWw2j0', 0, 0, 0, '高级管理员'), // 49 管 养老院高级管理员
  YL_YZ: roleType('YWBka4', 0, 0, 0, '院长'), // 50 院 养老院院长

  NS_OWNER: roleType('80pbO4', 0, 0, 0, '创建人'), // 59 空间所属者/创建者  慢病里叫创建人

  DIETITIAN: roleType('6exBPW', 0, 0, 0, '营养师'), // 62 营养师
  CRO_PM: roleType('YWQ1DW', 0, 0, 0, 'PM'), // CRO业务-PM
  CRO_CRA: roleType('bWl1Z4', 0, 0, 0, 'CRA'), // CRO业务-CRA
  CRO_CRC: roleType('keajR0', 0, 0, 0, 'CRC'), //CRO业务-CRC
};

export function fetchRolePropById(id: string) {
  const roleKey = Object.keys(Role);

  roleKey.forEach((key) => {
    Role[key].key = key.toLowerCase();
  });
  const activeRole = roleKey.filter((key: string) => Role[key].id === id)[0];
  return Role[activeRole];
}
// 根据role的id，获取其它属性值
export function fetchRolePropValue(id: string, keyName: string) {
  return fetchRolePropById(id)?.[keyName];
}

export function isDoctor(roleId: string) {
  return !![
    Role.ALONE_DOCTOR.id,
    Role.UPPER_DOCTOR.id,
    Role.LOWER_DOCTOR.id,
    Role.DOCTOR.id,
    Role.DOCTOR_IH.id,
  ].includes(roleId);
}
