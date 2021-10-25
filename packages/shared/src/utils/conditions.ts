export function getCondition(keyName: string, value:any, operator?: string) {
  return {
    var: keyName,
    value,
    operator: operator || '=',
  };
}

const getAge = (val: string) => {
  const ageData = getCondition("(sj.details->>'age')::INTEGER", val);
  if (val === '64') {
    ageData.operator = '<=';
  } else if (val === '65') {
    ageData.operator = '>=';
  }
  return ageData;
};

export const handleSelection = (allValues: CommonData): CommonData[] => {
  const selects = Object.keys(allValues)
    .filter((select) => !!allValues[select])
    .map((select) => {
      const val = allValues[select];
      switch (select) {
        case 'address':
          return getCondition("sj.details->>'address'", val, 'like');
        case 'patientRole':
          return getCondition('cr.s_role', val);
        case 'sex':
          return getCondition("(sj.details->>'sex')::INTEGER", val);
        case 'age':
          return getAge(val);
        case 'organization':
          return getCondition('cr.namespace', val);
        case 'searchByName':
          return getCondition("sj.details->>'name',sj.details->>'tel'", val, 'like');
        case 'name':
        case 'tel':
        case 'department':
          return getCondition(`sj.details->>'${select}'`, val, 'like');
        case 'role_tag':
          return getCondition('role_tag', val, 'like');
        case 'practice_areas':
          return getCondition("practice_areas->>'name'", val, 'like');
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
