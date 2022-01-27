import React, { useState, useEffect, useRef } from 'react';
import { Button, Checkbox, message, Select, Spin, Switch } from 'antd';
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
import { DIY, ImmediatelySend, IModel, PlanCreatedSendImmediately, SpecificDate } from 'xzl-web-shared/dist/components/Rule/util';
import dayjs from 'dayjs';

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
    timeKey.value = treatmentDes;
    for (let j = 0; j < timeKey.items.length; j++) {
      const subItem = timeKey.items[j];
      if (subItem.name === 'diagnose.treatment.uid') {
        subItem.value = treatmentId;
        subItem.description = treatmentDes;
      }
    }
  }
};

const getTreatmentDes = (timeKey: IItem) => {

  if (timeKey.name === 'diagnose.treatment') {
    for (let j = 0; j < timeKey.items.length; j++) {
      const subItem = timeKey.items[j];
      if (subItem.name === 'diagnose.treatment.uid') {
        return subItem.description;
      }
    }
  }

  return '';
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
  } else if (frequency.frequency === 'LOOP') {

    const period = frequency.custom[0];

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


const titleAllChoosesToActionsParma = (firstSteps: string[], firstTime: any, frequency: { frequency: string, custom: { day: number, time: string }[] }, isFirstSend: boolean, sourceMember?: []) => {

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
    if (!isFirstSend) {
      action.type = 'block';
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
    if (!isFirstSend) {
      action.type = 'block';
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
  } else if (firstTime.description == SpecificDate) {
    steps.push(firstTime.inputTime);
  }
  if (firstTime?.choiceModel) {
    steps.push(...getFirstSteps(firstTime.choiceModel));
  }
  return steps;
};


interface HandleChooseIProps {

  onChangeStateByValue: (val: string[]) => void;
  chooseDes?: string;
}


function HandleChoose({ onChangeStateByValue, chooseDes }: HandleChooseIProps) {

  const [fetching, setFetchStatus] = useState(false); //搜索是否显示loading
  const [treatment, setTreatment] = useState([]); //获取处理方式
  const [chooseTreatmentDes, setChooseTreatmentDes] = useState<string>(); //存储患者做处理的时间-->处理方式

  useEffect(() => {
    if (chooseDes) {
      setChooseTreatmentDes(chooseDes);
    }
  }, [chooseDes]);

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

    if (value?.length > 0) {
      const vals = String(value).split('_zsh_');
      setChooseTreatmentDes(vals[1]);
      onChangeStateByValue(vals);
    } else {
      setChooseTreatmentDes('');
      onChangeStateByValue(['', '']);
    }
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

  const [remind, setRemind] = useState(''); //只是为了触发ui刷新用，并不存着最新值

  const remindRef = useRef<string>('');

  const [scopeKey, setScopeKey] = useState<IItem>({}); //选中的起始发送时间子item
  const [choseScope, setChoseScope] = useState<IItem[]>([]); //选中的起始发送时间子item

  const [conditionKey, setConditionKey] = useState<IItem>({}); //选中的起始发送时间子item
  const [choseConditions, setChoseConditions] = useState<ICondition[]>([initItems]); //选中的起始发送时间子item

  const [frequency, setFrequency] = useState(initFrequency); //发送频率

  const sourceType = getSourceType(scaleType);

  const isFirstSendRef = useRef<boolean>(true);

  const onChangeSwitch = (isSend: boolean) => {

    console.log('================= isSend ', isSend);
    isFirstSendRef.current = isSend;
  };

  const childReactSwitchFunc = () => {
    return <div className={styles.switch_bg}>
      <Switch
        checkedChildren="发送"
        unCheckedChildren="不发送"
        defaultChecked={isFirstSendRef.current}
        onChange={(e) => { onChangeSwitch(e); }}
      />
    </div>;
  };

  const childChoiceModel = (name: string): IModel => {

    return {
      childItemType: 'select',
      description: name,
      childItem: [
        {
          childItemType: 'diy',
          description: DIY,
          lastChildReact: childReactSwitchFunc,
        },
        {
          childItemType: 'none',
          description: ImmediatelySend,
          lastChildReact: childReactSwitchFunc,
        },
      ],
    };
  };


  const childReactFunc = (value?: string) => {

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return (<HandleChoose onChangeStateByValue={onChangeStateByValue} chooseDes={value}></HandleChoose>);
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
        firstchildReact: childReactFunc,
        childItem: [
          {
            childItemType: 'diy',
            description: DIY,
            lastChildReact: childReactSwitchFunc,
          },
          {
            childItemType: 'none',
            description: ImmediatelySend,
            lastChildReact: childReactSwitchFunc,
          },
        ],
      },
    ],
  };

  const [firstTime, setFirstTime] = useState<{ choiceModel: any }>({ choiceModel: initFirstTimeChoiceMode });

  const isShowTextArea = scaleType === 'OBJECTIVE' || scaleType == 'VISIT_OBJECTIVE';

  //更改 患者做处理的时间-->处理方式
  const onChangeStateByValue = (vals: string[]) => {
    fillTreatmentInStartTimeKey(chooseStartTimeListRef.current.filter((item) => item.name == 'diagnose.treatment')[0], vals[0], vals[1]);
  };

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

    let firstTimeTemp;
    if (chooseValues) {

      if (originRuleDoc.rules[0].actions[0].type == 'block') {
        isFirstSendRef.current = false;
      }
      firstTimeTemp = cloneDeep(chooseValues.firstTime);

      for (let index = 0; index < firstTimeTemp.choiceModel.childItem.length; index++) {

        const element = firstTimeTemp.choiceModel.childItem[index];
        if (element.description == HandelTime) {
          element.firstchildReact = childReactFunc;
        }

        for (let childIndex = 0; childIndex < element.childItem.length; childIndex++) {
          const childElement = element.childItem[childIndex];
          childElement.lastChildReact = childReactSwitchFunc;
        }


        //     childChoiceModel(IntoGroupTime),
        // childChoiceModel(GiveMedicTime),
        // childChoiceModel(StopMedicTime),
        // {
        //   childItem: [
        //     {
        //       childItemType: 'diy',
        //       description: DIY,
        //       lastChildReact: childReactSwitchFunc,
        //     },
        //     {
        //       childItemType: 'none',
        //       description: ImmediatelySend,
        //       lastChildReact: childReactSwitchFunc,
        //     },
        //   ],



        // export const GiveMedicTime = '受试者给药的时间';  // 
        // export const StopMedicTime = '受试者停止此项目用药的时间';
        // export const HandelTime = '受试者做处理的时间 ';
        // export const SpecificDate = '选择特定日期';
        // export const PlanCreatedSendImmediately = '计划创建成功后立即发送';



      }



      setChoseScope(cloneDeep(chooseValues.choseScope));
      setChoseConditions(cloneDeep(chooseValues.choseConditions));
      setFrequency(cloneDeep(chooseValues.frequency));

    } else {

      firstTimeTemp = { choiceModel: initFirstTimeChoiceMode };
    }

    if (scaleType == 'VISIT_CRF' || scaleType == 'VISIT_OBJECTIVE' || scaleType == 'VISIT_SUBJECTIVE') {
      firstTimeTemp.choiceModel.childItem = [
        ...firstTimeTemp.choiceModel.childItem,
        {
          childItemType: 'time',
          description: SpecificDate,
          lastChildReact: childReactSwitchFunc,
        },
        {
          childItemType: 'none',
          description: PlanCreatedSendImmediately,
          lastChildReact: childReactSwitchFunc,
        },
      ];
    }

    setFirstTime(firstTimeTemp);
  }, [originRuleDoc, scaleType]);

  useEffect(() => {

    console.log('=================== question', question);
    setRemind(question ?? '');
    remindRef.current = question;
  }, [question]);

  //发送实验组-zhou
  const handleChangeGroup = (checkedValues: any[]) => {

    const choseList = scopeKey.items.filter(item => checkedValues.includes(item.description));
    setChoseScope(choseList);
  };

  const onUpdateChoseConditions = (conditions: any[]) => {
    setChoseConditions(conditions);
  };

  const handleChangeRemind = (value: any, text: string) => {
    // setRemind(value); // 不能调用setRemind，会触发刷新，然后失去聚焦

    console.log('============== value', value);
    console.log('============== text', JSON.stringify(text));

    remindRef.current = value;
  };



  const canSave = (firstSteps: string[]) => {

    if (isShowTextArea) {

      let content = remindRef.current;
      content = content?.replaceAll('<br>', '');
      content = content?.replaceAll('<p>', '');
      content = content?.replaceAll('</p>', '');
      content = content?.replaceAll(' ', '');
      if (!!!content) {
        return '请输入内容';
      }
    }

    // 首次发送时间一定要填写 
    if (firstSteps.includes(IntoGroupTime) || firstSteps.includes(GiveMedicTime) || firstSteps.includes(StopMedicTime) || firstSteps.includes(HandelTime)) {

      // 处理选择的值要补全
      if (firstSteps.includes(HandelTime)) {
        if (!(firstTime.choiceModel?.choiceModel?.inputDes?.length > 0)) {
          return '请补全首次发送时间的处理';
        }
      }

      if (firstSteps.includes(ImmediatelySend)) {
        // 填全了
      } else if (firstSteps.includes(DIY)) {

        const diyIndex = firstSteps.indexOf(DIY);
        if (firstSteps.length > diyIndex + 2) {
          if (!firstSteps[diyIndex + 1]) { // 没填写自定义的天数
            return '请补全首次发送时间';
          } else if (!firstSteps[diyIndex + 2]) { // 没填写自定义的时分
            return '请补全首次发送时间';
          }
          // 填全了
        } else {
          return '请补全首次发送时间'; // 没填写自定义的天数或时间
        }
      } else {
        return '请补全首次发送时间'; // 没选择自定义还是立即发送
      }
    } else if (firstSteps.includes(SpecificDate)) {
      const dateIndex = firstSteps.indexOf(SpecificDate);
      if (firstSteps.length > dateIndex + 1) {
        if (!firstSteps[dateIndex + 1]) { // 没填写特定日期的时间
          return '请补全首次发送时间';
        }
        // 填全了
      } else {
        return '请补全首次发送时间';
      }
    } else if (firstSteps.includes(PlanCreatedSendImmediately)) {
      // 填全了
    } else {
      return '请补全首次发送时间';
    }

    // 发送频率
    if (frequency.frequency == 'CUSTOM' || frequency.frequency == 'LOOP') {
      for (let i = 0; i < frequency.custom.length; i++) {
        const period = frequency.custom[i];
        if (!period.day || !period.time) {
          return '请补全发送频率';
        }
      }
    } else if (frequency.frequency == 'ADD') {
      for (let i = 0; i < frequency.custom.length; i++) {
        const period = frequency.custom[i];
        if (!(period.day >= 0) || !(period.hour >= 0) || !(period.min >= 0)) {
          return '请补全发送频率';
        } else if (period.hour >= 24) {
          return '发送频率的小时不应该大于23';
        } else if (period.min >= 60) {
          return '发送频率的分钟不应该大于59';
        }
      }
    }

    // 发送对象
    if (!(choseScope.length > 0)) {
      return '请选择发送对象';
    }

    // 发送条件
    for (let i = 0; i < choseConditions.length; i++) {
      if (choseConditions[i].chooseItem.name == 'basic.age') {
        if (!choseConditions[i].chooseValue.min || !choseConditions[i].chooseValue.max) {
          return '请补全发送条件的年龄范围';
        }
      } else if (choseConditions[i].chooseItem.name == 'basic.sex') {
        if (!choseConditions[i].chooseValue.value) {
          return '请补全发送条件的性别';
        }
      } else if (choseConditions[i].chooseItem.name == 'diagnose.disease') { // 诊断，多个用，连接

        if (!choseConditions[i].chooseValue.value) {
          return '请补全发送条件的诊断内容';
        }
      } else if (choseConditions[i].chooseItem.name == 'diagnose.treatment') { // 诊断，多个用，连接

        if (!choseConditions[i].chooseValue.value) {
          return '请补全发送条件的处理内容';
        }
      }
    }

    return null;
  };

  //确定，回传拼好的数据格式
  const handleSubmit = () => {

    const firstSteps = getFirstSteps(firstTime.choiceModel);
    const handleItemList = firstTime?.choiceModel?.childItem?.filter((item) => item.description == HandelTime);
    handleItemList[0].inputDes = getTreatmentDes(chooseStartTimeListRef.current.filter((item) => item.name == 'diagnose.treatment')[0]);


    const can = canSave(firstSteps);
    if (can) {
      message.error(can);
      return;
    }

    setLoading(true);

    const set = Array.from(new Set(frequency.custom));
    const filter = set.filter((item) => !!item);
    frequency.custom = filter;
    //去重、过滤空数据
    frequency.custom = Array.from(new Set(frequency.custom)).filter((item) => !!item);
    console.log('============= firstTime', JSON.stringify(firstTime));
    console.log('============= choseConditions', JSON.stringify(choseConditions));
    console.log('============= choseScope', JSON.stringify(choseScope));
    console.log('============= frequency', JSON.stringify(frequency));


    console.log('============= firstSteps', JSON.stringify(firstSteps));

    const must = titleAllChoosesToMustParma(chooseStartTimeListRef.current, firstSteps, choseConditions, scopeKey);
    console.log('=============must must', JSON.stringify(must));
    const should1 = tileChooseScopeToArray(choseScope);
    console.log('=============should_1 should_1', JSON.stringify(should1));

    const actions = originRuleDoc ? titleAllChoosesToActionsParma(firstSteps, firstTime, frequency, isFirstSendRef.current, originRuleDoc.rules[0].actions[0].params.sourceMember) : titleAllChoosesToActionsParma(firstSteps, firstTime, frequency, isFirstSendRef.current);
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
      meta = cloneDeep(originRuleDoc.meta);
    }
    // 判断是不是要添加时间firstAtTime
    if (firstSteps.includes(SpecificDate)) {
      const index = firstSteps.indexOf(SpecificDate);
      meta.firstAtTime = dayjs(firstSteps[index + 1], 'YYYY-MM-DD HH:mm').valueOf();
    } else {
      delete meta.firstAtTime;
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
      questions: remindRef.current,
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

    console.log('===============1  111', JSON.stringify(choiceModel));

    console.log('===============1  2222', JSON.stringify(firstTime.choiceModel));

    console.log('===============1  333', JSON.stringify(firstTime.choiceModel) == JSON.stringify(choiceModel));

    // console.log('============= onChoiceModelChange onChoiceModelChange', JSON.stringify(firstTime));

    if (JSON.stringify(firstTime.choiceModel) != JSON.stringify(choiceModel)) {
      setFirstTime({ choiceModel: choiceModel });
    }

  };

  const options = isEmpty(scopeKey) ? [] : scopeKey.items.map((item: IItem) => ({
    label: item.description,
    value: item.description,
  }));
  const des = choseScope.map(item => item.description);

  return (
    <div className={mode === 'Add' ? styles.send_plan : `${styles.send_plan} ${styles.edit}`}>
      {isShowTextArea && (
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
        scaleType={scaleType}
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
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          确定
        </Button>
      </div>
    </div>
  );
}

export default ScaleTemplate;
