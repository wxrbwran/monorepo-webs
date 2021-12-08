import { cloneDeep } from 'lodash';
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

export function getChooseValueFromItem(item: any) {

  if (item.name == 'basic.age') {

    let value = item.value.replace('[', '');
    value = value.replace(')', '');
    value = value.split(',');
    return { min: value[0], max: value[1] };
  } else if (item.name == 'basic.sex') {
    return { value: item.value };
  } else {
    return { id: item?.items?.length > 0 ? (item.items[0]?.value ?? '') : '', value: item.value };
  }
}

export function changeDescritionWithItem(item: IItem) {

  if (item.name.includes('disease')) {
    item.description = '诊断';
  } else if (item.name.includes('treatment')) {
    item.description = '处理';
  }
}

// 除掉首尾的大括号
export function deleteStartOrEndSymbol(str: string) {

  if (str.startsWith('{')) {

    // 除完'{'可能还有'}'
    return deleteStartOrEndSymbol(str.substring(1));
  } else if (str.endsWith('}')) {

    return str.substring(0, str.length - 1);
  } else {
    return str;
  }
}

export function getChooseValuesKeyFromRules(rule: IRule) {

  let chooseStartTime;
  const choseConditions = [];
  for (let i = 0; i < rule.match.must.length; i++) {
    const mustItem = rule.match.must[i];

    if (Object.keys(mustItem).includes('team.init_time') || Object.keys(mustItem).includes('diagnose.treatment.start')) {
      const fatherItem = getHierarchyFromItem(mustItem);
      chooseStartTime = fatherItem;
    } else {

      if (Object.keys(mustItem).length > 0) {

        const fatherItem = getHierarchyFromItem(mustItem);
        changeDescritionWithItem(fatherItem);
        // 分割诊断处理成多个数组
        if (fatherItem.name == 'diagnose.treatment' || fatherItem.name == 'diagnose.disease') {

          const valueArray = fatherItem.value.split('},{');
          const idArray = fatherItem?.items?.length > 0 ? fatherItem.items[0].value.split('},{') : [];

          const conditionArr = [];
          for (let j = 0; j < valueArray.length; j++) {
            const obj = cloneDeep(fatherItem);
            obj.value = deleteStartOrEndSymbol(valueArray[j]);
            if (idArray.length > j && obj?.items?.length > 0) {
              obj.items[0].value = deleteStartOrEndSymbol(idArray[j]);
            }
            conditionArr.push({
              chooseItem: obj,
              chooseValue: getChooseValueFromItem(obj),
            });
          }
          choseConditions.push(...conditionArr);
        } else {

          if (fatherItem.name == 'basic.age' || fatherItem.name == 'basic.sex') {
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
      }
    }
  }

  const choseScope = [];
  for (let i = 0; i < rule.match.should_1.length; i++) {
    const mustItem = rule.match.should_1[i];
    const fatherItem = getHierarchyFromItem(mustItem);
    choseScope.push(fatherItem);
  }

  const frequency = { frequency: 'CUSTOM', custom: [] };
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






export function getConditionDescriptionFromConditionss(conditions: any[]) {

  let ageDes: string = '';
  let sexDes: string = '';
  let diseaseDes: any = '';
  let treatmentDes: string = '';

  for (let i = 0; i < conditions.length; i++) {
    const condi = conditions[i];
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