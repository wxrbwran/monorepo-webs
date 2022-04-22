// import { Role } from 'xzl-web-shared/dist/utils/role';

// tools.ts 与某些业务有关，通用性只限于某几个业务类之间


export function getCondition(keyName: string, value: any, operator?: string) {
  return {
    var: keyName,
    value,
    operator: operator || '=',
  };
}

export function getRoles(msgCustom: { fromUsers?: { role: string }[], fromUser: { role: string } }) {
  if (msgCustom?.fromUsers) {
    return [...new Set(msgCustom?.fromUsers.map(item => item.role))]
      .sort(roleCompare)
      .map(roleId => getRole(roleId)).filter(Boolean).join('、');
  } else {
    return getRole(msgCustom?.fromUser?.role) || '';
  }
}
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
