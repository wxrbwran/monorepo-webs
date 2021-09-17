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
