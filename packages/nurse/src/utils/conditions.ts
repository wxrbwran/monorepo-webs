import { getCondition } from '@/utils/utils';

export const handleSelection = (allValues: CommonData): CommonData[] => {
  const selects = Object.keys(allValues)
    .filter((select) => !!allValues[select])
    .map((select) => {
      const val = allValues[select];
      switch (select) {
        case 'organization':
        case 'department':
          return getCondition('cr.namespace', val);
        default:
          return {};
      }
    });
  return selects;
};

interface ICondition {
  var: string;
  operator: string;
  value: string;
}
// 回显筛选条件
export const initSelectForm = (conditions:ICondition[]) => {
  const initObj: CommonData = {};
  conditions.forEach((item) => {
    switch (item.var) {
      case "sj.details->>'address'":
        initObj.address = item.value;
        break;
      case 'cr.s_role':
        initObj.patientRole = item.value;
        break;
      case "(sj.details->>'sex')::INTEGER":
        initObj.sex = item.value;
        break;
      case 'cr.namespace':
        initObj.organization = item.value;
        break;
      case "sj.details->>'name',sj.details->>'tel'":
        initObj.searchByName = item.value;
        break;
      default:
        break;
    }
  });
  return initObj;
};
