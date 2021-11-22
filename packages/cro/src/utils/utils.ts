import { Role } from 'xzl-web-shared/src/utils/role';
import { parse } from 'querystring';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getCondition(keyName: string, value: any, operator?: string) {
  return {
    var: keyName,
    value,
    operator: operator || '=',
  };
}

export function handleOpenedSub(id: string) {
  // 增加
  const OpenedSub = window.$storage.getItem('openedSub');
  if (OpenedSub) {
    const formatOpenSub = new Set(OpenedSub.split(','));
    console.log(1, formatOpenSub);
    formatOpenSub.add(id);
    console.log(2, formatOpenSub);
    window.$storage.setItem('openedSub', JSON.stringify([...formatOpenSub]));
  } else {
    window.$storage.setItem('openedSub', id);
  }
}

export function deleteOpenSub(id: string) {
  // 删除
  const OpenedSub = window.$storage.getItem('openedSub');
  if (!!OpenedSub) {
    const formatOpenSub = new Set(OpenedSub.split(','));
    formatOpenSub.delete(id);
    const newSub = [...formatOpenSub];
    window.$storage.setItem('openedSub', JSON.stringify(newSub));
  }
}

export function getOpenSub() {
  const OpenedSub = window.$storage.getItem('openedSub');
  if (OpenedSub) {
    return OpenedSub.split(',');
  } else {
    return [];
  }
}

export const isOpenedSub = (id: string) => getOpenSub().includes(id);

export function noop() { }

export function randomString(e?: number) {
  e = e || 32;
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

export const hasPermissions = (teamMembers: any[]): boolean => {

  const str = teamMembers.map((item) => item.role).join(';');

  console.log('================= str', str);

  // RESEARCH_PROJECT_DOCTOR: roleType('m4vkea', 0, 0, 0, '科研项目医生'), // 31医生研究者
  // PI: roleType('Y0OG0Q', 0, 0, 0, 'PI'), // 32 科研多中心项目PI
  // MAIN_PI: roleType('NeEd4M', 0, 0, 0, '总PI'), // 33 科研多中心项目总PI
  // SUB_PI: roleType('D09PeP', 0, 0, 0, '分PI'), // 34 科研多中心项目分PI
  // PROJECT_LEADER: roleType('v4Rwe2', 0, 0, 0, '项目组长'), // 35 科研单中心项目组长
  // PROJECT_RESEARCHER: roleType('x4y14p', 0, 0, 0, '研究者'), // 36 科研项目普通研究者
  // PROJECT_MEMBERS: roleType('V0YzWE', 0, 0, 0, '组员'), // 38 科研单中心项目组员

  const pattern = /(m4vkea)|(Y0OG0Q)|(NeEd4M)|(D09PeP)|(v4Rwe2)|(x4y14p)|(V0YzWE)/g;

  const res = pattern.test(str);
  console.log('================= res', res);


  return res;
};


export const hasOperationPermissions = (teamMembers: any[]): boolean => {

  const ownerMember = teamMembers.filter((item) => item.role == Role.NS_OWNER.id);
  if (ownerMember.length > 0) {
    return ownerMember[0].sid == localStorage.getItem('xzl-web-doctor_sid');
  }
  return false;
};


