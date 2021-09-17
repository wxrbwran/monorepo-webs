import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性


export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getCondition(keyName: string, value:any, operator?: string) {
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

export function noop() {}

export function randomString(e?:number) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}
