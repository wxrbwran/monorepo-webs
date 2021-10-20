
export interface IItem {
  name: string;
  type: string;
  level: string;
  description: string;
  value: string | number;
  items: IItem[];
  starting: boolean;
  operator: string;
}

export interface ICondition {
  chooseItem: IItem;
  chooseValue: {
    min: number; // 针对年龄
    max: number; // 针对年龄
    value: number | string;
    id: string;
  },
}

export interface IRuleDoc {
  rules: IRules[];
}

export interface IRules {
  meta: IMeta;
  rules: IRule[];
  id: string;
}

export interface IMeta {
  sourceType: number;
  actionId: number;
  teamLocations: [];
  sourceMembers: [];
}

export interface IRule {
  match: {
    should_1: [];
    must: [];
  };
  actions: IAction[];
}

export interface IAction {
  type: string;
  params: {
    period: number;
    unit: string;
    delay: number;
    sourceMember: [];
  };
}


export interface IChooseValues {
  chooseStartTime: IItem;
  choseConditions: ICondition[];
  choseScope: [],
  frequency: {
    frequency: string,
    custom: [],
  },
}



export function getHierarchyFromItem(originItem: {}) {

  const keys = Object.keys(originItem);
  let fatherItem;
  const childItem = [];
  for (let i = 0; i < keys.length; i++) {
    const item = originItem[keys[i]];
    item.name = keys[i];
    console.log('============ getHierarchyFromItem', JSON.stringify(item));
    if (!fatherItem || fatherItem.name.length > item.name.length) {
      if (fatherItem) {
        childItem.push(fatherItem);
      }
      fatherItem = item;
    } else {
      childItem.push(item);
    }
  }
  fatherItem.items = childItem;
  console.log('========== getStartTimeKeyFromRules  startKey', JSON.stringify(fatherItem));
  return fatherItem;
}

export function getChooseValueFromItem(item: {}) {

  if (item.name == 'basic.age') {

    let value = item.value.replace('[', '');
    value = value.replace(')', '');
    value = value.split(',');
    return { min: value[0], max: value[1] };
  } else if (item.name == 'basic.sex') {
    return { value: item.value };
  } else {
    return { id: item.value, value: item.description };
  }
}

export function changeDescritionWithItem(item: IItem) {

  if (item.name.includes('disease')) {
    item.description = '诊断';
  } else if (item.name.includes('treatment')) {
    item.description = '处理';
  }
}

export function getChooseValuesKeyFromRules(rule: IRule) {

  console.log('========== getStartTimeKeyFromRules', JSON.stringify(rule));
  let chooseStartTime;
  const choseConditions = [];
  for (let i = 0; i < rule.match.must.length; i++) {
    const mustItem = rule.match.must[i];
    if (Object.keys(mustItem).length > 1) {
      const fatherItem = getHierarchyFromItem(mustItem);
      chooseStartTime = fatherItem;
    } else {

      const key = Object.keys(mustItem)[0];
      const item = mustItem[key];
      item.name = key;

      choseConditions.push({
        chooseItem: item,
        chooseValue: getChooseValueFromItem(item),
      });
      changeDescritionWithItem(item);
    }
  }

  const choseScope = [];
  for (let i = 0; i < rule.match.should_1.length; i++) {
    const mustItem = rule.match.should_1[i];
    const fatherItem = getHierarchyFromItem(mustItem);
    choseScope.push(fatherItem);
  }

  const frequency = { frequency: 'CUSTOM', custom: [] };
  console.log('================ rule.actions', JSON.stringify(rule.actions));
  for (let i = 0; i < rule.actions.length; i++) {
    const action = rule.actions[i];
    console.log('================ action', JSON.stringify(action));
    if (action.type == 'once') {
      frequency.frequency = 'CUSTOM';
    } else {
      frequency.frequency = 'LOOP';
    }
    frequency.custom.push(action.params.period);
  }
  return {
    chooseStartTime: chooseStartTime,
    choseConditions: choseConditions,
    choseScope: choseScope,
    frequency: frequency,
  };
}






export function getConditionDescriptionFromConditionss(conditions: []) {

  let ageDes: string;
  let sexDes: string;
  let diseaseDes: any;
  let treatmentDes: string;

  for (let i = 0; i < conditions.length; i++) {
    const condi = conditions[i];
    console.log('================== condi', condi);
    if (condi.chooseItem.name == 'basic.age') {
      ageDes = '年龄: ' + condi.chooseValue.min + '-' + condi.chooseValue.max;
    } else if (condi.chooseItem.name == 'basic.sex') {
      sexDes = '性别: ' + condi.chooseValue.value;
    } else if (condi.chooseItem.name.includes('disease')) {
      if (!diseaseDes) {
        diseaseDes = '诊断: ' + condi.chooseValue.value;
      } else {
        diseaseDes = diseaseDes + ',' + condi.chooseValue.value;
      }
    } else if (condi.chooseItem.name.includes('treatment')) {
      if (!treatmentDes) {
        treatmentDes = '处理: ' + condi.chooseValue.value;
      } else {
        treatmentDes = treatmentDes + ',' + condi.chooseValue.value;
      }
    }
  }

  return {
    age: ageDes,
    sex: sexDes,
    disease: diseaseDes,
    treatment: treatmentDes,
  };
}