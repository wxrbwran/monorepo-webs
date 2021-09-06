import { roleType, VIPType } from 'xzl-web-shared/src/utils/consts';

const formatOrgList = (orgList) => orgList.map((org) => ({
  organizationName: org.name,
  organizationId: org.sid,
}));
export const handleServePrice2Local = (prices: TPrice[]): CommonData => {
  const tmp: CommonData = {};
  if (prices.length > 0) {
    prices.forEach((price) => {
      tmp[`${price.goodsCategory}-${price.goodsDurationType}`] = price.price / 100;
    });
  } else {
    const vips: string[] = VIPType.map((vip) => vip.type);
    roleType.forEach((role) => {
      vips.forEach((vip) => {
        tmp[`${role}-${vip}`] = 0;
      });
    });
  }
  return tmp;
};
export default formatOrgList;
