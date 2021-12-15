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
  [propName: string]: RoleType;
}
const roleType = (
  id: string,
  initState: number,
  accepted: number,
  refused: number,
  desc: string,
) => ({
  id: `${process.env.PREFIX}.${id}`,
  initState,
  accepted,
  refused,
  desc,
});

export const Role: RolesMap = {
  ROOT: roleType('qWGr0B', 9, 0, 8, 'Root管理员'), // 1
  ORG_ADMIN: roleType('XWrxeA', 19, 10, 18, '机构管理员'), // 2
  ORG_NURSE_ADMIN: roleType('V0XqWB', 29, 20, 28, '机构护士管理员'), // 3
  NURSE_ADMIN: roleType('qWdLWZ', 39, 30, 38, '护士管理员'), // 4
  ORG: roleType('bWwj0P', 49, 40, 48, '机构主体'), // 5
  UPPER_ORG: roleType('YWBa0j', 59, 50, 58, '上级机构'), // 6
  LOWER_ORG: roleType('Y4NqWP', 69, 60, 68, '下级机构'), // 7
  PATIENT: roleType('YWLG0L', 79, 70, 78, '患者'), // 8
  PATIENT_VIP: roleType('nWgX4b', 89, 80, 88, 'VIP 患者'), // 9
  PATIENT_FAMILY: roleType('70MG43', 99, 90, 98, '患者家属'), // 10
  NURSE: roleType('2Wmj4M', 109, 100, 108, '护士'), // 11
  DOCTOR: roleType('n41zeZ', 119, 110, 118, '医生'), // 12

  SYS_DOCTOR: roleType('ZW7Qew', 129, 120, 128, '系统智能医生'), // 13
  UPPER_DOCTOR: roleType('VWVpeR', 139, 130, 138, '主管医生'), // 14
  LOWER_DOCTOR: roleType('80pOeG', 149, 140, 148, '医生助手'), // 15
  ALONE_DOCTOR: roleType('L03Beb', 159, 150, 158, '独立管理医生'), // 16
  COUNSELOR_DOCTOR: roleType('2eAEeG', 169, 160, 168, '顾问医生'), // 17
  CONSOLE_ROOT: roleType('6exPeb', 179, 170, 178, '后台系统Root管理员'), // 18
  CRO_ORG: roleType('YWQD0z', 189, 180, 188, 'CRO 机构'), // 19
  NONE: roleType(
    'bWlZez',
    199,
    190,
    198,
    '任何角色都没有，即没有任何身份，默认都进入xinzhili空间',
  ), // 20
  VISITOR: roleType('keaR09', 209, 200, 208, '游客'), // 21
  ORG_IH: roleType('jW2m0r', 219, 210, 218, '线上医院和项目机构'), // 22
};

export type RoleTypeByKey = Record<string, Store>;
const RoleByKey: RoleTypeByKey = {};

Object.keys(Role).forEach((role: string) => {
  const tmp: Store = { ...Role[role] };
  tmp.key = role;
  RoleByKey[Role[role].id] = tmp;
});

export default RoleByKey;

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
  return fetchRolePropById(id)[keyName];
}
