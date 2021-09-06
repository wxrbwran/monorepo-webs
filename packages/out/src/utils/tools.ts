/**
 * Created by wuxiaoran on 2017/2/20.
 */

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
  return !!sessionStorage.getItem('openSub')
};
export const upperOrgNsId = () => {
  return sessionStorage.getItem('upperOrgNsId');
}
