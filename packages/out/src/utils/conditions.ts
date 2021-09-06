import type { Store } from 'antd/lib/form/interface';
import { isEmpty } from 'lodash';

const sex = (value: string) => ({
  var: "(sj.details->>'sex')::INTEGER",
  operator: '=',
  value,
});

const age = (value: string) => ({
  var: "(sj.details->>'age')::INTEGER",
  operator: "<@",
  value: `int4range(${value})`
});
const height = (value: string) => ({
  var: "(sj.details->>'height')::INTEGER",
  operator: "<@",
  value: `int4range(${value})`
});
const weight = (value: string) => ({
  var: "(sj.details->>'weight')::INTEGER",
  operator: "<@",
  value: `int4range(${value})`
});
const gender = (value: string) => ({
  var: "(sj.details->>'sex')::INTEGER",
  operator: "=",
  value: value === 'FEMALE' ? "0" : "1"
});

export const name = (value: string) => ({
  var: "sj.details->>'name'", // 筛选实体姓名
  operator: 'like',
  value,
});

const title = (value: string) => ({
  var: "sj.details->>'title'",
  value,
  operator: 'like',
});

const sRole = (value: string) => ({
  var: 'cr.s_role', // 筛选实体级别(普通：普通患者角色,vip患者角色)
  operator: '=',
  value,
});

const status = (value: string) => ({
  var: 'm_etc.status',
  operator: '=',
  value,
});

export const searchOrgByNameOrAdminName = (value: string) => [
  {
    var: "sj.details->>'adminName',sj.details->>'name'", // 如果是搜索，如支持姓名、地址，则使用逗号分割
    operator: 'like',
    value,
  },
];

// const searchByName = (value: string): Store => name(value);
export function getCondition(keyName: string, value: any, operator?: string) {
  return {
    var: keyName,
    value,
    operator: operator || '=',
  };
}
export const handleSelection = (allValues: Store): Store[] => {
  console.log('allValues', allValues)
  const selects = Object.keys(allValues)
    .filter((select) => !!allValues[select])
    .map((select) => {
      console.log('select', select)
      switch (select) {
        case 'sex':
          return sex(allValues[select]);
        case 'minAge':
          return age(`${allValues.minAge},${allValues.maxAge}`);
        case 'minHeight':
          return height(`${allValues.minHeight},${allValues.maxHeight}`);
        case 'minWeight':
          return weight(`${allValues.minWeight},${allValues.maxWeight}`);
        case 'gender':
          return gender(allValues[select]);
        case 'title':
          return title(allValues[select]);
        case 's_role':
          return sRole(allValues[select]);
        case 'name':
          return name(allValues[select]);
        case 'status':
          return status(allValues[select]);
        case 'searchByName':
          return getCondition("sj.details->>'name',sj.details->>'tel'", allValues[select], 'like');
        default:
          return {};
      }
    });
  return selects.filter(item => !isEmpty(item));;
};

export default searchOrgByNameOrAdminName;
