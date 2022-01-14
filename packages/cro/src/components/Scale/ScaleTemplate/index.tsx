import React, { useState, useEffect, useRef } from 'react';
import { Button, Checkbox, message, Select, Spin } from 'antd';
import * as api from '@/services/api';
import { IPlanItem } from '@/utils/consts';
import { useSelector } from 'umi';
import ScaleCondition from '@/components/Scale/ScaleCondition';
import RichText from '@/components/RichText';
import styles from './index.scss';
import { transformDynamicToStatic } from '@/pages/query/util';
import { isEmpty, cloneDeep } from 'lodash';
import { getRuleType, getSourceType, GiveMedicTime, HandelTime, IChooseValues, ICondition, IItem, IntoGroupTime, IRuleDoc, StopMedicTime } from '@/pages/subjective_table/util';
import FirstSendTime from 'xzl-web-shared/dist/components/Rule/FirstSendTime';
import SendFrequency from 'xzl-web-shared/dist/components/Rule/SendFrequency';
import { DIY, ImmediatelySend, IModel } from 'xzl-web-shared/dist/components/Rule/util';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
let timer: any = null;
interface IProps {
  mode: string;
  onCancel: Function;
  addPlan: Function;
  originRuleDoc: IRuleDoc;
  chooseValues: IChooseValues;
  location?: {
    pathname: string,
  };
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE' | 'OBJECTIVE' | 'VISIT_OBJECTIVE';
  question?: string;

  plans?: IPlanItem[];
  isDisabled?: string;
}


const fillValueInStartTimeKey = (timeKey: IItem, projectSid: String, projectRoleType: String, projectNsId: String) => {

  for (let i = 0; i < timeKey.items.length; i++) {
    const item = timeKey.items[i];
    item.operator = '=';
    item.value = '';
    if (item.name === 'team') {
      for (let j = 0; j < item.items.length; j++) {
        const subItem = item.items[j];
        subItem.operator = '=';
        subItem.value = subItem?.assign?.value ?? '';
        if (subItem.name === 'team.role') {
          subItem.value = projectRoleType;
        } else if (subItem.name === 'team.subject') {
          subItem.value = projectSid;
        } else if (subItem.name === 'team.init_time') {
          subItem.value = '*';
          subItem.starting = true;
        }
      }
    } else if (item.name === 'diagnose.treatment') {
      for (let j = 0; j < item.items.length; j++) {
        const subItem = item.items[j];
        subItem.operator = '=';
        if (subItem.name === 'diagnose.treatment.start') {
          subItem.value = '*';
          subItem.starting = true;
        } else {
          subItem.value = '';
        }
      }
    } else if (item.name === 'location-config') {
      for (let j = 0; j < item.items.length; j++) {
        const subItem = item.items[j];
        subItem.operator = '=';
        if (subItem.name === 'location-config.ns_id') {
          subItem.value = projectNsId;
        } else {
          subItem.value = '*';
          subItem.starting = true;
        }
      }
    }
  }
};

const fillValueInScopeKey = (scopeKey: IItem) => {

  if (scopeKey.items && scopeKey.items.length == 0) {
    return;
  }
  for (let i = 0; i < scopeKey.items.length; i++) {
    const item = scopeKey.items[i];
    item.operator = '=';
    item.value = item.assign?.value ?? '';

    for (let j = 0; j < item.items.length; j++) {
      const subItem = item.items[j];
      subItem.operator = '=';
      subItem.value = subItem.assign?.value ?? '';
    }
  }
};


const fillTreatmentInStartTimeKey = (timeKey: IItem, treatmentId: string, treatmentDes: string) => {


  console.log('================ onChangeStateByValue  onChangeStateByValue', JSON.stringify(timeKey));

  if (timeKey.name === 'diagnose.treatment') {
    for (let j = 0; j < timeKey.items.length; j++) {
      const subItem = timeKey.items[j];
      if (subItem.name === 'diagnose.treatment.uid') {
        subItem.value = treatmentId;
        subItem.description = treatmentDes;
      }
    }
  }
};

// const getTreatmentDesInStartTimeKey = (timeKey: IItem) => {

//   if (timeKey.name === 'diagnose.treatment') {
//     for (let j = 0; j < timeKey.items.length; j++) {
//       const subItem = timeKey.items[j];
//       if (subItem.name === 'diagnose.treatment.uid') {
//         return subItem.description;
//       }
//     }
//   }
//   return '';
// };

const tileChooseToArray = (item: IItem) => {

  if (item) {
    const cloneItem = cloneDeep(item);
    let array = {};
    if (cloneItem?.items && cloneItem?.items?.length > 0) {
      // 将每个子项拿出来
      for (let i = 0; i < cloneItem.items.length; i++) {
        array = { ...array, ...tileChooseToArray(cloneItem.items[i]) };
      }
      // 将自己拼进去
      delete cloneItem.items;

    }
    array[cloneItem.name] = cloneItem;

    return array;
  }
  return [];
};

const addTreatmentOrDiseaseItem = (item: any, childItem: any) => {

  let treatmentObj: any = {};
  if (item.chooseItem.operator == 'in') {
    item.chooseItem.value = '{' + item.chooseItem.value + '}';
  }
  treatmentObj = {
    ...treatmentObj,
    [item.chooseItem.name]: item.chooseItem,
  };

  if (!isEmpty(childItem)) {
    if (childItem.chooseItem.operator == 'in') {
      childItem.chooseItem.value = '{' + childItem.chooseItem.value + '}';
    }
    treatmentObj = {
      ...treatmentObj,
      [childItem.chooseItem.name]: childItem.chooseItem,
    };
  }
  return treatmentObj;
};

const tileChooseConditionToArray = (conditions: ICondition[]) => {

  const array = [];
  const diseaseItem: any = {};
  const childDiseaseItem: any = {};
  const treatmentItem: any = {};
  const childTreatmentItem: any = {};

  for (let i = 0; i < conditions.length; i++) {
    if (conditions[i].chooseItem.name == 'basic.age') {
      conditions[i].chooseItem.operator = '<>';
      conditions[i].chooseItem.value = '[' + conditions[i].chooseValue.min + ',' + conditions[i].chooseValue.max + ')';

      if (conditions[i].chooseItem.name.length > 0) {
        array.push({ [conditions[i].chooseItem.name]: conditions[i].chooseItem });
      }
    } else if (conditions[i].chooseItem.name == 'basic.sex') {
      conditions[i].chooseItem.operator = '=';
      conditions[i].chooseItem.value = conditions[i].chooseValue.value;

      if (conditions[i].chooseItem.name.length > 0) {
        array.push({ [conditions[i].chooseItem.name]: conditions[i].chooseItem });
      }
    } else { // 诊断，多个用，连接

      let currentItem;
      let currentChildItem;
      if (conditions[i].chooseItem.name == 'diagnose.disease') {
        currentItem = diseaseItem;
        currentChildItem = childDiseaseItem;
      } else if (conditions[i].chooseItem.name == 'diagnose.treatment') {
        currentItem = treatmentItem;
        currentChildItem = childTreatmentItem;
      }
      if (currentItem) {
        let isIn = false;
        if (isEmpty(currentItem)) {
          currentItem.chooseItem = { ...conditions[i].chooseItem };
          delete currentItem.chooseItem.items;
        } else {
          isIn = true;
        }
        currentItem.chooseItem.operator = 'in';

        const descriptions = (isIn ? (currentItem.chooseItem.value + '},{') : '') + conditions[i].chooseValue.value;
        currentItem.chooseItem.value = descriptions;
      }
      if (currentChildItem) {

        let isIn = false;
        if (isEmpty(currentChildItem) && conditions[i]?.chooseItem?.items?.length > 0) {
          currentChildItem.chooseItem = { ...conditions[i].chooseItem.items[0] };
          delete currentChildItem.chooseItem.items;
        } else {
          isIn = true;
        }
        if (!isEmpty(currentChildItem)) {
          currentChildItem.chooseItem.operator = 'in';
          currentChildItem.chooseItem.value = (isIn ? currentChildItem.chooseItem.value + '},{' : '') + conditions[i].chooseValue.id;
        }
      }
    }
  }


  console.log('========================= diseaseItem childDiseaseItem', JSON.stringify(childDiseaseItem), JSON.stringify(diseaseItem));
  if (treatmentItem?.chooseItem?.name?.length > 0) {

    const treatmentObj = addTreatmentOrDiseaseItem(treatmentItem, childTreatmentItem);
    array.push(treatmentObj);
  }

  if (diseaseItem?.chooseItem?.name?.length > 0) {
    const treatmentObj = addTreatmentOrDiseaseItem(diseaseItem, childDiseaseItem);
    array.push(treatmentObj);
  }

  return array;
};

const tileChooseScopeToArray = (chooseScope: IItem[]) => {

  const array = [];
  for (let i = 0; i < chooseScope.length; i++) {

    array.push(tileChooseToArray(chooseScope[i]));
  }
  return array;
};

const getDelay = (time: string) => {
  const hm = time.split(':');
  return hm[0] * 60 * 60 + hm[1] * 60;
};

const tileAllFrequencyToArray = (frequency: { frequency: string, custom: string[] }, sourceMember?: []) => {

  // 自定义
  const arrary = [];

  if (frequency.frequency === 'CUSTOM') {
    for (let i = 0; i < frequency.custom.length; i++) {

      const period = frequency.custom[i];
      console.log('================= period', JSON.stringify(period));

      const action: any = {
        type: 'once',
        params: {
          delay: getDelay(period.time),
          period: period.day,
          unit: 'day',
        },
      };
      if (sourceMember) {
        action.params.sourceMember = sourceMember;
      }
      arrary.push(action);
    }
  } else if (frequency.frequency === 'ADD') { // 

    for (let i = 0; i < frequency.custom.length; i++) {

      const period = frequency.custom[i];
      const action: any = {
        type: 'once',
        params: {
          delay: 0,
          period: 0,
          unit: 'day',
          regulars: [
            {
              regularNum: period.day,
              regularUnit: 'day',
            },
            {
              regularNum: period.hour,
              regularUnit: 'hour',
            },

            {
              regularNum: period.min,
              regularUnit: 'minute',
            },
          ],
        },

      };
      if (sourceMember) {
        action.params.sourceMember = sourceMember;
      }
      arrary.push(action);
    }
  } else {

    const period = frequency.custom[0];
    console.log('================= period', JSON.stringify(period));

    const action: any = {
      type: 'rolling',
      params: {
        delay: getDelay(period.time),
        period: period.day,
        unit: 'day',
      },
    };
    if (sourceMember) {
      action.params.sourceMember = sourceMember;
    }
    arrary.push(action);
  }

  return arrary;
};


const titleAllChoosesToActionsParma = (firstSteps: string[], firstTime: any, frequency: { frequency: string, custom: { day: number, time: string }[] }, sourceMember?: []) => {

  const arr = [];

  if (firstSteps.includes(DIY)) {
    const index = firstSteps.indexOf(DIY);
    const action: any = {
      type: 'once',
      params: {
        delay: getDelay(firstSteps[index + 2]),
        period: firstSteps[index + 1],
        unit: 'day',
      },
    };
    if (sourceMember) {
      action.params.sourceMember = sourceMember;
    }

    arr.push(action);
  } else { // 
    const action: any = {
      type: 'once',
      params: {
        delay: 0,
        period: 0,
        unit: 'day',
      },
    };
    if (sourceMember) {
      action.params.sourceMember = sourceMember;
    }
    arr.push(action);
  }
  //  tileAllFrequencyToArray(frequency, originRuleDoc.rules[0].actions[0].params.sourceMember) : tileAllFrequencyToArray(frequency);

  arr.push(...tileAllFrequencyToArray(frequency, sourceMember));
  return arr;
};


const titleAllChoosesToMustParma = (chooseStartTimeList: IItem[], firstSteps: string[], choseConditions: ICondition[], scopeSource: IItem) => {
  const allPatient = scopeSource.items.filter((item) => item.description == '全部受试者');
  const allPatientArr = allPatient.length > 0 ? [tileChooseToArray(allPatient[0])] : [];

  let chooseStartTime = chooseStartTimeList[0];
  if (firstSteps.includes(IntoGroupTime)) {
    chooseStartTime = chooseStartTimeList.filter((item) => item.name == 'team')[0];
  } else if (firstSteps.includes(GiveMedicTime)) {

    chooseStartTime = chooseStartTimeList.filter((item) => item.name == 'location-config' && item.items.find((it) => it.name == 'location-config.startMedTime'))[0];
  } else if (firstSteps.includes(StopMedicTime)) {
    chooseStartTime = chooseStartTimeList.filter((item) => item.name == 'location-config' && item.items.find((it) => it.name == 'location-config.stopMedTime'))[0];
  } else if (firstSteps.includes(HandelTime)) {
    chooseStartTime = chooseStartTimeList.filter((item) => item.name == 'diagnose.treatment')[0];
  }

  console.log('=================== chooseStartTime', JSON.stringify(chooseStartTime));
  // 计划外多出来的2个不走这个if
  if (firstSteps.includes(IntoGroupTime) || firstSteps.includes(GiveMedicTime) || firstSteps.includes(StopMedicTime) || firstSteps.includes(HandelTime)) {

    const must = [tileChooseToArray(chooseStartTime), ...tileChooseConditionToArray(choseConditions), ...allPatientArr];
    return must;
  } else {
    return [...tileChooseConditionToArray(choseConditions), ...allPatientArr];
  }
};

const getFirstSteps = (firstTime: any): string[] => {
  const steps = [];
  steps.push(firstTime.description);
  if (firstTime.description == DIY) {
    steps.push(firstTime.inputDay);
    steps.push(firstTime.inputHM);
  }
  if (firstTime?.choiceModel) {
    steps.push(...getFirstSteps(firstTime.choiceModel));
  }
  return steps;
};

const tileAllChoosesToArray = (chooseStartTime: IItem, choseConditions: ICondition[], chooseScope: IItem[]) => {


  const param = {
    must: [tileChooseToArray(chooseStartTime), ...tileChooseConditionToArray(choseConditions)],
    should_1: tileChooseScopeToArray(chooseScope),
  };

  return param;
};



interface HandleChooseIProps {

  onChangeStateByValue: (val: string[]) => void;
}


function HandleChoose({ onChangeStateByValue }: HandleChooseIProps) {

  const [fetching, setFetchStatus] = useState(false); //搜索是否显示loading
  const [treatment, setTreatment] = useState([]); //获取处理方式
  const [chooseTreatmentDes, setChooseTreatmentDes] = useState<string>(); //存储患者做处理的时间-->处理方式

  //获取处理方式
  const fetchTreatment = (value: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.detail
          .fetchTreatment({ name: value })
          .then((res) => {
            const { treatments } = res;
            if (treatments.length > 0) {
              setTreatment(treatments);
            } else {
              message.info('没有治疗方式信息!');
            }
          })
          .catch((err) => {
            message.error(err);
          });
        setFetchStatus(false);
      }, 800);
    }
  };

  //更改 患者做处理的时间-->处理方式
  const changeStateByValue = (value: string) => {

    const vals = String(value).split('_zsh_');

    // fillTreatmentInStartTimeKey(chooseStartTimeList.filter((item) => item.name == 'diagnose.treatment')[0], vals[0], vals[1]);
    setChooseTreatmentDes(vals[1]);
    onChangeStateByValue(vals);
  };

  return (
    <div className={styles.item_value}>
      <span>患者做</span>
      <Select
        showSearch
        allowClear
        placeholder="请输入处理方式"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={fetchTreatment}
        value={chooseTreatmentDes}
        onChange={(value: string) => {
          changeStateByValue(value);
        }}
      >
        {treatment.map((item: { id: string; name: string }) => (
          <Option key={item.id} value={item.id + '_zsh_' + item.name} title={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>
      <span>的时间</span>
    </div>
  );
}

function ScaleTemplate({ onCancel, mode, isDisabled, addPlan, originRuleDoc,
  chooseValues, scaleType, question }: IProps) {
  //起始发送时间默认值
  //发送频率默认值
  const initFrequency = {
    frequency: 'NONE',
    custom: [{ day: '', time: '', contents: [] }],
  };

  const initItems = {
    chooseItem: {
      name: '',
      description: '',
    },
    chooseValue: {

    },
  };

  const frequencySource = [
    {
      key: 'CUSTOM',
      value: '自定义',
    }, {
      key: 'LOOP',
      value: '循环下发',
    }, {
      key: 'NONE',
      value: '无',
    }, {
      key: 'ADD',
      value: '在首次发送时间的基础上累加',
    },
  ];


  const chooseStartTimeListRef = useRef<IItem[]>([]);

  // const [chooseStartTimeList, setChooseStartTimeList] = useState<IItem[]>([]); //选中的起始发送时间子item 有4个
  const [loading, setLoading] = useState(false);

  const { projectSid, projectRoleType, projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);

  const [remind, setRemind] = useState(''); //问题

  // const remind = useRef('');
  // const richTextCont = useRef('');
  // const [startTimeKey, setStartTimeKey] = useState<IItem>({}); //起始发送模版数据

  const [scopeKey, setScopeKey] = useState<IItem>({}); //选中的起始发送时间子item
  const [choseScope, setChoseScope] = useState<IItem[]>([]); //选中的起始发送时间子item

  const [conditionKey, setConditionKey] = useState<IItem>({}); //选中的起始发送时间子item
  const [choseConditions, setChoseConditions] = useState<ICondition[]>([initItems]); //选中的起始发送时间子item

  const [frequency, setFrequency] = useState(initFrequency); //发送频率


  const sourceType = getSourceType(scaleType);

  console.log('================== scaleType  sourceType', scaleType, sourceType);

  const childChoiceModel = (name: string): IModel => {

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


  //更改 患者做处理的时间-->处理方式
  const onChangeStateByValue = (vals: string[]) => {
    fillTreatmentInStartTimeKey(chooseStartTimeListRef.current.filter((item) => item.name == 'diagnose.treatment')[0], vals[0], vals[1]);
  };

  const childReactFunc = () => {

    return (<HandleChoose onChangeStateByValue={onChangeStateByValue}></HandleChoose>);
  };

  const initFirstTimeChoiceMode: IModel = {

    childItemType: 'select',
    description: '首次发送时间',
    childItem: [
      childChoiceModel(IntoGroupTime),
      childChoiceModel(GiveMedicTime),
      childChoiceModel(StopMedicTime),
      {
        childItemType: 'select',
        description: HandelTime,
        childReact: childReactFunc,
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

  const [firstTime, setFirstTime] = useState<{ choiceModel: any }>({ choiceModel: initFirstTimeChoiceMode });


  useEffect(() => {
    api.query.fetchFields(getRuleType(scaleType).templeType).then((res) => {
      // 循环判断每个item是不是dynimic
      for (let i = 0; i < res.keys.length; i++) {
        if (res.keys[i].name == 'start') {
          fillValueInStartTimeKey(res.keys[i], projectSid, projectRoleType, projectNsId);
          chooseStartTimeListRef.current = res.keys[i].items;
        } else if (res.keys[i].name == 'scope') {

          for (let j = 0; j < res.keys[i].items.length; j++) {
            const element = res.keys[i].items[j];
            if (element.type == 'dynamic') {
              transformDynamicToStatic(element, window.$storage.getItem('projectSid'), projectRoleType, sourceType).then((items: any) => {
                res.keys[i].items = items;
                fillValueInScopeKey(res.keys[i]);
                setScopeKey(res.keys[i]);

                setChoseScope((preState) => {
                  if (isEmpty(preState)) {
                    return [res.keys[i].items[0]];
                  }
                  return preState;
                });
              }).catch(() => {

              });
            }
          }
        } else if (res.keys[i].name == 'condition') {
          setConditionKey(res.keys[i]);
        }
      }
    });
  }, []);

  useEffect(() => {

    if (chooseValues) {
      // chooseStartTimeListRef.current = chooseValues.chooseStartTime;
      // setChooseStartTimeList(chooseValues.chooseStartTime);
      // setChoseScope(chooseValues.choseScope);
      // setChoseConditions(chooseValues.choseConditions);
      // setFrequency(chooseValues.frequency);

      // setFirstTime(firstTime);

      setFirstTime(cloneDeep(chooseValues.firstTime));
      // setChooseStartTime(chooseValues.chooseStartTime);
      setChoseScope(cloneDeep(chooseValues.choseScope));
      setChoseConditions(cloneDeep(chooseValues.choseConditions));
      setFrequency(cloneDeep(chooseValues.frequency));
    }
  }, [originRuleDoc]);

  useEffect(() => {

    setRemind(question ?? '');
    // remind.current = question;
  }, [question]);





  //改变起始发送时间类型-zhou
  // const handleChangeType = (value: string) => {

  //   const choseList = startTimeKey.items.filter(item => item.name === value);
  //   setChooseStartTime(choseList[0]);
  // };

  //发送实验组-zhou
  const handleChangeGroup = (checkedValues: any[]) => {

    const choseList = scopeKey.items.filter(item => checkedValues.includes(item.description));

    setChoseScope(choseList);
  };

  const onUpdateChoseConditions = (conditions: any[]) => {
    setChoseConditions(conditions);
  };

  //问题
  // const handleChangeRemind = (e: { target: { value: string } }) => {
  //   setRemind(e.target.value);
  // };
  const handleChangeRemind = (value: any, _text: string) => {
    setRemind(value);
  };

  //确定，回传拼好的数据格式
  const handleSubmit = () => {

    setLoading(true);

    const set = Array.from(new Set(frequency.custom));
    const filter = set.filter((item) => !!item);
    frequency.custom = filter;
    console.log('============= frequency 11', JSON.stringify(filter), JSON.stringify(frequency.custom));

    //去重、过滤空数据
    frequency.custom = Array.from(new Set(frequency.custom)).filter((item) => !!item);
    // console.log('============= chooseStartTime', JSON.stringify(chooseStartTime));
    console.log('============= choseConditions', JSON.stringify(choseConditions));
    console.log('============= choseScope', JSON.stringify(choseScope));
    console.log('============= frequency', JSON.stringify(frequency));

    const firstSteps = getFirstSteps(firstTime.choiceModel);

    console.log('============= firstSteps', JSON.stringify(firstSteps));

    const must = titleAllChoosesToMustParma(chooseStartTimeListRef.current, firstSteps, choseConditions, scopeKey);
    console.log('=============must must', JSON.stringify(must));
    const should1 = tileChooseScopeToArray(choseScope);
    console.log('=============should_1 should_1', JSON.stringify(should1));

    const actions = originRuleDoc ? titleAllChoosesToActionsParma(firstSteps, firstTime, frequency, originRuleDoc.rules[0].actions[0].params.sourceMember) : titleAllChoosesToActionsParma(firstSteps, firstTime, frequency);
    console.log('=============actions actions', JSON.stringify(actions));

    setLoading(false);
    // 如果是添加
    let meta: any = {
      sourceType: sourceType,
      teamLocations: [
        {
          sid: projectSid,
          ns: projectNsId,
          role: projectRoleType,
          tag: 'ownership',
        },
        {
          sid: localStorage.getItem('xzl-web-doctor_sid'),
          ns: projectNsId,
          role: roleType,
          tag: 'operator',
        },
      ],
    };
    if (originRuleDoc) { // 说明是修改
      meta = originRuleDoc.meta;
    }

    // const actions = originRuleDoc ? tileAllFrequencyToArray(frequency, originRuleDoc.rules[0].actions[0].params.sourceMember) : tileAllFrequencyToArray(frequency);

    const params: any = {
      rules: [{
        match: {
          must: must,
          should_1: should1,
        },
        actions: actions,
      }],
      meta: meta,
    };
    if (originRuleDoc) {
      params.id = originRuleDoc.id;
      params.createdAtTime = originRuleDoc.createdAtTime;
    }

    addPlan({
      ruleDoc: params,
      questions: remind,
      chooseValues: {
        firstTime: firstTime,
        choseConditions: choseConditions,
        choseScope: choseScope,
        frequency: frequency,
      },
    });
  };
  //取消
  const handCancel = () => {
    onCancel();
  };

  const onChoiceModelChange = (choiceModel: IModel) => {
    console.log('============== choiceModel choiceModel', JSON.stringify(choiceModel));
    firstTime.choiceModel = choiceModel;
  };



  //存在空记录不可提交
  const isEmptyCustom = frequency.custom.length === 1 && !frequency.custom[0];
  const isEmptyGroup = choseScope.length == 0;
  // const isShowTextArea = mode === 'Add' || location?.pathname.includes('objective_table/detail');

  const isShowTextArea = scaleType === 'OBJECTIVE' || scaleType == 'VISIT_OBJECTIVE';
  const disabled =
    isShowTextArea ? !remind.trim() || isEmptyCustom || isEmptyGroup : isEmptyCustom || isEmptyGroup;

  const options = isEmpty(scopeKey) ? [] : scopeKey.items.map((item: IItem) => ({
    label: item.description,
    value: item.description,
  }));
  const des = choseScope.map(item => item.description);
  console.log('isDisabled', isDisabled);

  console.log('==================== use ues ', JSON.stringify(chooseStartTimeListRef.current));

  return (
    <div className={mode === 'Add' ? styles.send_plan : `${styles.send_plan} ${styles.edit}`}>
      {isShowTextArea && (
        // <TextArea
        //   placeholder={'请输入提醒内容11'}
        //   className={styles.question}
        //   onChange={(ev) => handleChangeRemind(ev)}
        //   value={remind}
        //   disabled={!!isDisabled}
        // />
        <div className="h-160 mb-40">
          <RichText handleChange={handleChangeRemind} value={remind} style={{ height: '135px' }} />
        </div>
      )}



      <FirstSendTime choiceModelChange={onChoiceModelChange} choiceModelSource={firstTime.choiceModel} popverContent={undefined} />
      {/* 
      <div className={styles.send_time}>
        <Select style={{ width: 180 }} onChange={handleChangeType} value={chooseStartTime.description}>
          {startTimeKey.items &&
            startTimeKey.items.map((item) => (
              <Option value={item.name} key={item.name}>
                {item.description}
              </Option>
            ))}
        </Select>
        {
          chooseStartTime.name === 'diagnose.treatment' && (
            <div className={styles.item_value}>
              <span className={styles.label}>患者做</span>
              <Select
                showSearch
                allowClear
                placeholder="请输入处理方式"
                style={{ width: 237 }}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={fetchTreatment}
                value={chooseTreatmentDes}
                onChange={(value: string) => {
                  changeStateByValue(value);
                }}
              >
                {treatment.map((item: { id: string; name: string }) => (
                  <Option key={item.id} value={item.id + '_zsh_' + item.name} title={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <span className={styles.after}>的时间</span>
            </div>
          )
        }
      </div> */}


      {/* // 发送发送频率
  const initFrequency = {
    frequency: 'NONE',
    custom: [{ day: '', time: '', contents: [] }],
  }; */}


      <SendFrequency onFrequencyChange={(fre) => { setFrequency(fre); }} initFrequency={frequency} frequencySource={frequencySource}></SendFrequency>

      {/* <h2>
        <span className={styles.start}>*</span>发送频率：
      </h2> */}
      {/* <div className={styles.send_type}>
        <Select style={{ width: 180 }} onChange={handleGetType} value={frequency.frequency}>
          {sendType.map((item) => (
            <Option value={item.key} key={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        {frequency.frequency === 'CUSTOM' ? (
          <div className={styles.self}>
            <div className={styles.self_content}>
              {frequency.custom.map((item: any, index) => (
                <div className={styles.add_item} key={index}>
                  <div className={styles.add_item_left}>
                    <span>第</span>
                    <InputNumber
                      style={{ width: 50 }}
                      min={1}
                      max={9999}
                      value={item}
                      onChange={(e) => handleChangeCustomCycleDay(e, index)}
                    />
                    <span className={styles.info}>天发送一次</span>
                  </div>
                  <div className={styles.self_add}>
                    {index === 0 ? (
                      <Button size="large" onClick={handleAddDayEdit}>
                        添加更多
                      </Button>
                    ) : (
                      <Button size="large" onClick={() => handleDeleteDay(index)}>
                        删除
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.cycle}>
            每{' '}
            <InputNumber
              style={{ width: 50 }}
              min={1}
              max={9999}
              value={frequency.custom[0]}
              onChange={handleChangeCycleDay}
            />{' '}
            天下发一次
          </div>
        )}
      </div> */}
      <ScaleCondition
        conditions={conditionKey}
        updateChoseConditions={onUpdateChoseConditions}
        values={choseConditions}
      />

      <h2>
        <span className={styles.start}>*</span>发送试验组：
      </h2>
      <CheckboxGroup
        options={options}
        onChange={handleChangeGroup}
        value={des}
      />
      <div className={styles.submit}>
        <Button onClick={handCancel}>取消</Button>
        <Button type="primary" onClick={handleSubmit} disabled={disabled} loading={loading}>
          确定
        </Button>
      </div>
    </div>
  );
}

export default ScaleTemplate;
