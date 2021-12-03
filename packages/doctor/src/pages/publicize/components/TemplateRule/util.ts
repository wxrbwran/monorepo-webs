import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';


export const fileTypes = [
  {
    name: '视频',
    code: 1,
    type: 'video',
  }, {
    name: '文件',
    code: 2,
    type: 'document',
  }, {
    name: '文章',
    code: 3,
    type: 'article',
  }, {
    name: '图片',
    code: 4,
    type: 'picture',
  }, {
    name: '音频',
    code: 6,
    type: 'audio',
  },

  {
    name: '随访表',
    code: -1000,
    type: 'accompany',
  },
  {
    name: 'CRF量表',
    code: -2000,
    type: 'crf',
  },


  // type='accompany'
];
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

export const sendType = [
  {
    key: 'CUSTOM',
    value: '自定义',
  }, {
    key: 'LOOP',
    value: '循环下发',
  }, {
    key: 'NONE',
    value: '无',
  },
];

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
  firstTime: any;
  choseConditions: ICondition[];
  choseScope: [],
  frequency: {
    frequency: string,
    custom: [],
  },
}

export interface IModel {
  childItemType: 'select' | 'diy' | 'time' | 'none';
  childItem?: IModel[];
  description: string;
  choiceModel?: IModel;
  inputDay?: number; // 当childItemType是diy时，会有输入day组件，此时才可能有值
  inputHM?: string; // 当childItemType是diy时，会有输入时间组件，此时才可能有值
  inputTime?: string; // 当childItemType是time时，会有输入年月日时间组件，此时才可能有值
}

export const AfterPatientBind = '患者与我绑定日期后';
export const DIY = '自定义';
export const ImmediatelySend = '立即发送';
export const SpecificDate = '选择特定日期';
export const PlanCreatedSendImmediately = '计划创建成功后立即发送';

export const FirstTimeModel: IModel = {

  childItemType: 'select',
  description: '首次发送时间',
  childItem: [
    {
      childItemType: 'select',
      description: AfterPatientBind,
      childItem: [
        {
          childItemType: 'diy',
          description: DIY,

        },
        {
          childItemType: 'none',
          description: ImmediatelySend,
        },
      ],
    },
    {
      childItemType: 'time',
      description: SpecificDate,
    },
    {
      childItemType: 'none',
      description: PlanCreatedSendImmediately,
    },
  ],
};

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

export function getHMstr(delay: number) {

  const hour = Math.floor(delay / 3600);
  const min = (delay - hour * 3600) / 60;
  return (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min);
}

export function getStartTimeChoiceModel(chooseStartTime: IItem, action: any, ruleDoc: { rules: IRule[], meta: any }, list: any[]) {

  const choiceModel = { childItemType: 'select', choiceModel: cloneDeep(FirstTimeModel), description: 'first' };

  if (chooseStartTime) { // 说明选择的是 患者与我绑定日期后
    choiceModel.choiceModel.choiceModel = choiceModel.choiceModel.childItem?.filter((item) => item.description == AfterPatientBind)[0];
    // action.
    if (action.params.period == 0) { // 选择的是 立即发送
      choiceModel.choiceModel.choiceModel.choiceModel = choiceModel.choiceModel.choiceModel?.childItem?.filter((item) => item.description == ImmediatelySend)[0];
    } else { // 选择的是自定义
      choiceModel.choiceModel.choiceModel.choiceModel = choiceModel.choiceModel.choiceModel?.childItem?.filter((item) => item.description == DIY)[0];
      choiceModel.choiceModel.choiceModel.choiceModel.inputDay = action.params.period;
      choiceModel.choiceModel.choiceModel.choiceModel.inputHM = getHMstr(action.params.delay);
    }
  } else if (ruleDoc.meta.firstAtTime) { // 说明选择的是 选择特定日期
    choiceModel.choiceModel.choiceModel = choiceModel.choiceModel.childItem?.filter((item) => item.description == SpecificDate)[0];
    choiceModel.choiceModel.choiceModel.inputTime = dayjs(ruleDoc.meta.firstAtTime * 1000).format('YYYY-MM-DD HH:mm');
  } else {
    choiceModel.choiceModel.choiceModel = choiceModel.choiceModel.childItem?.filter((item) => item.description == PlanCreatedSendImmediately)[0];
  }
  const sourceIds = action.params.sourceMember.flatMap((item) => item.sourceId);
  return ({
    choiceModel: choiceModel,
    choiceContents: list.filter((item) => sourceIds.includes(item.id)),
  });
}

export function getChooseValuesKeyFromRules(ruleDoc: { rules: IRule[], meta: any }, list: any[]) {

  const rule = ruleDoc.rules[0];
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

  const choseScope = [];
  for (let i = 0; i < rule.match.should_1.length; i++) {
    const mustItem = rule.match.should_1[i];
    const fatherItem = getHierarchyFromItem(mustItem);
    choseScope.push(fatherItem);
  }

  const frequency = { frequency: 'CUSTOM', custom: [] };
  for (let i = 1; i < rule.actions.length; i++) {
    const action = rule.actions[i];
    if (action.type == 'once') {
      frequency.frequency = 'CUSTOM';
    } else {
      frequency.frequency = 'LOOP';
    }
    const sourceIds = action.params.sourceMember.flatMap((item) => item.sourceId);
    frequency.custom.push({
      day: action.params.period,
      time: getHMstr(action.params.delay),
      contents: list.filter((item) => sourceIds.includes(item.id)),
    });
  }
  if (frequency.custom.length == 0) {
    frequency.frequency = 'NONE';
  }

  const firstTime = getStartTimeChoiceModel(chooseStartTime, rule.actions[0], ruleDoc, list);


  console.log('=================fan xian firstTime firstTime', JSON.stringify(firstTime));
  console.log('=================fan xian frequency frequency', JSON.stringify(frequency));

  return {
    firstTime: firstTime,
    choseConditions: choseConditions,
    choseScope: choseScope,
    frequency: frequency,
  };
}

export function getStartTimeDescriptionFromConditionss(firstTime: any) {

  let str = '';

  const choiceModel = firstTime?.choiceModel;
  if (choiceModel?.choiceModel?.choiceModel?.description == AfterPatientBind) {
    str = str + AfterPatientBind + '   ';
    if (choiceModel?.choiceModel?.choiceModel?.choiceModel?.description == ImmediatelySend) {
      str = str + ImmediatelySend + '   ';
    } else {
      str = str + '第' + choiceModel.choiceModel.choiceModel.choiceModel.inputDay + '天' + choiceModel.choiceModel.choiceModel.choiceModel.inputHM;
    }
  } else if (choiceModel?.choiceModel?.choiceModel?.description == SpecificDate) {

    str = str + SpecificDate + '   ' + choiceModel.choiceModel.choiceModel.inputTime + '  ';
  } else {
    str = str + choiceModel?.choiceModel?.choiceModel?.description ?? '';
  }
  return str;
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

