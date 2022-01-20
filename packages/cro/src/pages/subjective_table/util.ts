import { cloneDeep } from 'lodash';
import { IModel } from 'xzl-web-shared/dist/components/Rule/util';
import dayjs from 'dayjs';


// export const ResearchSourceType = '4';
// export const SubectiveScaleSourceType = '5';
// export const CrfScaleSourceType = '6';
// export const ObjectiveSourceType = '7';


// const sourceType = scaleType === 'CRF' ? CrfScaleSourceType : (scaleType === 'OBJECTIVE' ? ObjectiveSourceType : SubectiveScaleSourceType);


// OBJECTIVE  CRF  SUBJECTIVE  VISIT_OBJECTIVE   VISIT_CRF  VISIT_SUBJECTIVE
export const RuleTypeMap = {
  objective: {
    type: 'OBJECTIVE',
    scaleType: 'OBJECTIVE',
    text: '客观量表',
    sourceType: '7',
    templeType: 'OBJECTIVE_INSPECTION',
  },
  crf: {
    type: 'CRF',
    scaleType: 'CRF',
    text: 'crf量表',
    sourceType: '6',
    templeType: 'CRF_SCALE',
  },
  subjective: {
    type: 'SUBJECTIVE',
    scaleType: 'SUBJECTIVE',
    text: '主观量表',
    sourceType: '5',
    templeType: 'SUBJECTIVE_SCALE',
  },

  visit_objective: {
    type: 'VISIT_OBJECTIVE',
    scaleType: 'VISIT_OBJECTIVE',
    text: '计划外访视客观',
    sourceType: '13', // 计划外访视客观量表提醒
    templeType: 'VISIT_OBJECTIVE_INSPECTION',
  },
  visit_crf: {
    type: 'VISIT_CRF',
    scaleType: 'VISIT_CRF',
    text: '计划外访视CRF',
    sourceType: '12', // 计划外访视CRF量表提醒
    templeType: 'VISIT_CRF_SCALE',
  },
  visit_subjective: {
    type: 'VISIT_SUBJECTIVE',
    scaleType: 'VISIT_SUBJECTIVE',
    text: '计划外访视主观',
    sourceType: '11', //计划外访视主观量表提醒
    templeType: 'VISIT_SUBJECTIVE_SCALE',
  },
};

export const getUrlPreFix = (scaleType: string) => {

  switch (scaleType) {
    case RuleTypeMap.crf.scaleType:
      return 'end_event';
    case RuleTypeMap.subjective.scaleType:
      return 'subjective_table';
    case RuleTypeMap.objective.scaleType:
      return 'objective_table';
    case RuleTypeMap.visit_crf.scaleType:
      return 'out_plan_visit/crf';
    case RuleTypeMap.visit_subjective.scaleType:
      return 'out_plan_visit/subjective';
    case RuleTypeMap.visit_objective.scaleType:
      return 'out_plan_visit/objective';
    default:
      return '';
  }
};

export const getSourceType = (scaleType: string) => {

  switch (scaleType) {
    case RuleTypeMap.crf.scaleType:
      return RuleTypeMap.crf.sourceType;

    case RuleTypeMap.subjective.scaleType:
      return RuleTypeMap.subjective.sourceType;

    case RuleTypeMap.objective.scaleType:
      return RuleTypeMap.objective.sourceType;

    case RuleTypeMap.visit_crf.scaleType:
      return RuleTypeMap.visit_crf.sourceType;

    case RuleTypeMap.visit_subjective.scaleType:
      return RuleTypeMap.visit_subjective.sourceType;

    case RuleTypeMap.visit_objective.scaleType:
      return RuleTypeMap.visit_objective.sourceType;
    default:
      return '';
  }
};

export const getRuleType = (scaleType: string) => {

  switch (scaleType) {
    case RuleTypeMap.crf.scaleType:
      return RuleTypeMap.crf;

    case RuleTypeMap.subjective.scaleType:
      return RuleTypeMap.subjective;

    case RuleTypeMap.objective.scaleType:
      return RuleTypeMap.objective;

    case RuleTypeMap.visit_crf.scaleType:
      return RuleTypeMap.visit_crf;

    case RuleTypeMap.visit_subjective.scaleType:
      return RuleTypeMap.visit_subjective;

    case RuleTypeMap.visit_objective.scaleType:
      return RuleTypeMap.visit_objective;
    default:
      return '';
  }
};


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
  firstTime: any;
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




export const IntoGroupTime = '受试者入组的时间';  // 项目sid和label
export const GiveMedicTime = '受试者给药的时间';  // 
export const StopMedicTime = '受试者停止此项目用药的时间';
export const HandelTime = '受试者做处理的时间 ';
export const SpecificDate = '选择特定日期';
export const PlanCreatedSendImmediately = '计划创建成功后立即发送';

export const DIY = '自定义';
export const ImmediatelySend = '立即发送';


export const childChoiceModel = (name: string): IModel => {

  return {
    childItemType: 'select',
    description: name,
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
  };
};

export const initFirstTimeChoiceMode: IModel = {

  childItemType: 'select',
  description: '首次发送时间',
  childItem: [
    childChoiceModel(IntoGroupTime),
    childChoiceModel(GiveMedicTime),
    childChoiceModel(StopMedicTime),
    {
      childItemType: 'select',
      description: HandelTime,
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
  ],
};

export function getHMstr(delay: number) {

  const hour = Math.floor(delay / 3600);
  const min = (delay - hour * 3600) / 60;
  return (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min);
}

export function getStartTimeChoiceModel(chooseStartTime: IItem, action: any, ruleDoc: { rules: IRule[], meta: any }) {

  const choiceModel = cloneDeep(initFirstTimeChoiceMode);

  if (chooseStartTime) {

    if (chooseStartTime.name == 'diagnose.treatment') { // 说明选择的是做处理的时间

      choiceModel.choiceModel = choiceModel.childItem?.filter((item) => item.description == HandelTime)[0];
      const treatmentList = chooseStartTime.items.filter((item) => item.name == 'diagnose.treatment.uid');
      if (treatmentList.length > 0) {

        choiceModel.choiceModel.inputDes = treatmentList[0].description;
      }
    } else if (chooseStartTime.name == 'team') {  // 说明选择的是  受试者入组的时间

      choiceModel.choiceModel = choiceModel.childItem?.filter((item) => item.description == IntoGroupTime)[0];

    } else if (chooseStartTime.name == 'location-config') {  // 说明选择的是  受试者入组的时间

      if (chooseStartTime.items.find((item) => item.name == 'location-config.startMedTime')) {
        choiceModel.choiceModel = choiceModel.childItem?.filter((item) => item.description == GiveMedicTime)[0];

      } else if (chooseStartTime.items.find((item) => item.name == 'location-config.stopMedTime')) {
        choiceModel.choiceModel = choiceModel.childItem?.filter((item) => item.description == StopMedicTime)[0];
      }
    }
    if (action.params.period == 0) { // 选择的是 立即发送
      choiceModel.choiceModel.choiceModel = choiceModel.choiceModel?.childItem?.filter((item) => item.description == ImmediatelySend)[0];
    } else { // 选择的是自定义
      choiceModel.choiceModel.choiceModel = choiceModel.choiceModel?.childItem?.filter((item) => item.description == DIY)[0];
      choiceModel.choiceModel.choiceModel.inputDay = action.params.period;
      choiceModel.choiceModel.choiceModel.inputHM = getHMstr(action.params.delay);
    }
  } else if (ruleDoc.meta.firstAtTime) { // 说明选择的是 选择特定日期
    const choiceSpecificDateTime = {
      childItemType: 'time',
      description: SpecificDate,
    };
    choiceModel.choiceModel = choiceSpecificDateTime;
    choiceModel.choiceModel.inputTime = dayjs(ruleDoc.meta.firstAtTime).format('YYYY-MM-DD HH:mm');
  } else {

    const choiceSendImmediately = {
      childItemType: 'none',
      description: PlanCreatedSendImmediately,
    };
    choiceModel.choiceModel = choiceSendImmediately;
  }
  return ({
    choiceModel: choiceModel,
  });
}

export function getChooseValuesKeyFromRules(ruleDoc: { rules: IRule[], meta: any }) {

  const rule = ruleDoc.rules[0];
  let chooseStartTime;
  const choseConditions = [];
  for (let i = 0; i < rule.match.must.length; i++) {
    const mustItem = rule.match.must[i];


    const mustItemKeys = Object.keys(mustItem);
    if (mustItemKeys.includes('team.init_time') || mustItemKeys.includes('diagnose.treatment.start') || mustItemKeys.includes('location-config.startMedTime') || mustItemKeys.includes('location-config.startMedTime') || mustItemKeys.includes('location-config.stopMedTime')) {
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
  for (let i = 1; i < rule.actions.length; i++) {
    const action = rule.actions[i];
    console.log('================ action', JSON.stringify(action));
    if (action.type == 'once') {

      if (action.params?.regulars?.length > 0) {

        frequency.frequency = 'ADD';
      } else {
        frequency.frequency = 'CUSTOM';
      }
    } else {
      frequency.frequency = 'LOOP';
    }
    // 
    // [{"day":1,"time":"","content":[],"hour":2,"min":3},{"day":4,"time":"","content":[],"hour":5,"min":5}] [{"day":1,"time":"","content":[],"hour":2,"min":3},{"day":4,"time":"","content":[],"hour":5,"min":5}]
    if (action.params?.regulars?.length > 0) {

      const regulars = {};
      for (let index = 0; index < action.params.regulars.length; index++) {
        const regu = action.params.regulars[index];

        console.log('================ regu regu', JSON.stringify(regu));
        if (regu.regularUnit == 'day') {
          regulars.day = regu.regularNum;
        } else if (regu.regularUnit == 'hour') {
          regulars.hour = regu.regularNum;
        } else if (regu.regularUnit == 'minute') {
          regulars.min = regu.regularNum;
        }
      }
      frequency.custom.push(regulars);
    } else {
      frequency.custom.push({
        day: action.params.period,
        time: getHMstr(action.params.delay),
      });
    }
  }

  if (frequency.custom.length == 0) {
    frequency.frequency = 'NONE';
  }

  const firstTime = getStartTimeChoiceModel(chooseStartTime, rule.actions[0], ruleDoc);

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
  str = str + choiceModel?.choiceModel?.description + '   ';
  if (choiceModel?.choiceModel?.description == PlanCreatedSendImmediately) {
  } else if (choiceModel?.choiceModel?.description == SpecificDate) {
    str = str + '   ' + choiceModel.choiceModel.inputTime + '  ';
  } else {
    if (choiceModel?.choiceModel?.choiceModel?.description == ImmediatelySend) {
      str = str + ImmediatelySend + '   ';
    } else {
      str = str + '第' + (choiceModel?.choiceModel?.choiceModel?.inputDay ?? ' ') + '天' + (choiceModel?.choiceModel?.choiceModel?.inputHM ?? ' ');
    }
  }
  return str;
}

export function getConditionDescriptionFromConditionss(conditions: any[]) {

  let ageDes: string = '';
  let sexDes: string = '';
  let diseaseDes: any = '';
  let treatmentDes: string = '';

  for (let i = 0; i < conditions?.length; i++) {
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


export function getFrequencyDescriptionFromFrequency(frequency: any) {

  let str = '';

  if (frequency && frequency.frequency) {

    if (frequency.frequency == 'ADD') {
      str = str + '在首次发送时间的基础上累加';
      for (let index = 0; index < frequency.custom.length; index++) {
        const element = frequency.custom[index];
        str = str + '  ' + element.day + '天' + element.hour + '时' + element.min + '分' + '发送一次;  ';
      }
    } else if (frequency.frequency == 'NONE') {
      return str;
    } else {
      if (frequency.custom.length > 0) {
        str = str + '首次发送给患者后';
      }
      for (let index = 0; index < frequency.custom.length; index++) {
        const element = frequency.custom[index];
        str = str + (frequency.frequency == 'CUSTOM' ? '    第' : '    每') + element.day + '天' + element.time + '发送一次;';
      }
    }
  }
  return str;
}