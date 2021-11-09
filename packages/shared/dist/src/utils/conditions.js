export function getCondition(keyName, value, operator) {
    return {
        var: keyName,
        value: value,
        operator: operator || '=',
    };
}
var getAge = function (val) {
    var ageData = getCondition("(sj.details->>'age')::INTEGER", val);
    if (val === '64') {
        ageData.operator = '<=';
    }
    else if (val === '65') {
        ageData.operator = '>=';
    }
    return ageData;
};
export var handleSelection = function (allValues) {
    var selects = Object.keys(allValues)
        .filter(function (select) { return !!allValues[select]; })
        .map(function (select) {
        var val = allValues[select];
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
                return getCondition("sj.details->>'" + select + "'", val, 'like');
            case 'role_tag':
                return getCondition('role_tag', val, 'like');
            case 'practice_areas':
                return getCondition("practice_areas->>'name'", val, 'like');
            case 'having_hospital':
                return getCondition('having.ns.name', val, 'like');
            case 'having_department':
                return getCondition("having.practice_areas->>'sub'", val, 'like');
            default:
                return {};
        }
    });
    return selects;
};
// 回显筛选条件
export var initSelectForm = function (conditions) {
    var initObj = {};
    conditions.forEach(function (item) {
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
