import { Store } from 'antd/lib/form/interface';

interface IConditionItem {
  var: string;
  operator: string;
  value: string;
}
import { isEmpty } from 'lodash';
const sex = (value: string) => ({
  var: "(sj.details->>'sex')::INTEGER",
  operator: '=',
  value,
});

const organization = (value: string) => ({
  var: 'cr.namespace',
  operator: '=',
  value,
});

const status = (value: string) => ({
  var: 'etc.status',
  operator: '=',
  value,
});

const group = (value: string) => ({
  var: 'cr.group',
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
export function getCondition(keyName: string, value: any, operator?: string) {
  return {
    var: keyName,
    value,
    operator: operator || '=',
  };
}

export const handleSelection = (allValues: Store): Store[] => {
  console.log('allValues', allValues);
  const selects = Object.keys(allValues)
    .filter((select) => !!allValues[select])
    .map((select) => {
      switch (select) {
        case 'sex':
          return sex(allValues[select]);
        case 'organization':
        case 'orgId':
          return organization(allValues[select]);
        case 'status':
          return status(allValues[select]);
        case 'group':
          return group(allValues[select]);
        case 'minAge':
          return age(`${allValues.minAge},${allValues.maxAge}`);
        case 'minHeight':
          return height(`${allValues.minHeight},${allValues.maxHeight}`);
        case 'minWeight':
          return weight(`${allValues.minWeight},${allValues.maxWeight}`);
        case 'gender':
          return gender(allValues[select]);
        case 'searchByName':
          return getCondition("sj.details->>'name',sj.details->>'tel'", allValues[select], 'like');
        default:
          return {};
      }
    });
  return selects.filter(item => !isEmpty(item));
};

export const initSelectForm = (conditions:IConditionItem[]) => {
  const initObj: Store = {};
  conditions.forEach((item: any) => {
    switch (item.var) {
      case "(sj.details->>'sex')::INTEGER":
        initObj.sex = item.value;
        break;
      case "(sj.details->>'age')::INTEGER":
        //格式1: int4range(40, 80)  --> [40, 80]
        //格式2: '40,80' --> [40, 80]
        const ageArr = item.value.includes('int4range')
        ? item.value.match(/\(([^)]*)\)/)[1].split(',')
        : item.value.split(',')
        initObj.minAge = ageArr[0];
        initObj.maxAge = ageArr[1];
      default:
        break;
    }
  });
  return initObj;
};

