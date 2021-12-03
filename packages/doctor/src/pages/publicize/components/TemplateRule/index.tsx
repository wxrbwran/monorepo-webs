import React, { FC, useRef, useState, useEffect } from 'react';
import * as api from '@/services/api';
// import { sendType, IPlanItem } from '@/utils/consts';
import { useSelector } from 'umi';
// import ScaleCondition from '@/components/ScaleCondition';

import styles from './index.scss';
import FirstSendTime from './FirstSendTime';
import SendFrequency from './SendFrequency';
import SendCondition from './ScaleCondition';
import SendGroup from './SendGroup';

// import { CrfScaleSourceType, SubectiveScaleSourceType, transformDynamicToStatic, ObjectiveSourceType } from '../../pages/query/util';
// import { isEmpty, cloneDeep } from 'lodash';
// import { IChooseValues, ICondition, IItem, IRuleDoc } from '../../pages/subjective_table/util';
import { Button, message } from 'antd';
import { AfterPatientBind, DIY, IItem, ImmediatelySend, IRuleDoc, PlanCreatedSendImmediately, SpecificDate } from './util';
import { cloneDeep, isEmpty } from 'lodash';
import ContentPopover from './ContentPopover/index';
import { IList } from '../../const';
import dayjs from 'dayjs';
import { sfTypeUrl } from '../../utils';



const fillValueInStartTimeKey = (timeKey: IItem, projectSid: String, projectRoleType: String) => {

  for (let i = 0; i < timeKey.items.length; i++) {
    const item = timeKey.items[i];
    item.operator = '=';
    item.value = '';
    if (item.name === 'team') {
      for (let j = 0; j < item.items.length; j++) {
        const subItem = item.items[j];
        subItem.operator = '=';
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
    }
  }
};

const fillValueInScopeKey = (scopeKey: IItem) => {

  if (scopeKey.items && scopeKey.items.length == 0) {
    return;
  }
  for (let i = 0; i < scopeKey.items.length; i++) {
    const item = scopeKey.items[i];

    item.value = item.assign?.value ?? '';
    if (item.value.includes('{')) {
      item.operator = 'in';
    } else {
      item.operator = '=';
    }
    for (let j = 0; j < item.items.length; j++) {
      const subItem = item.items[j];

      subItem.value = subItem.assign?.value ?? '';
      if (subItem.value.includes('{')) {
        subItem.operator = 'in';
      } else {
        subItem.operator = '=';
      }
    }
  }
};

// const fillTreatmentInStartTimeKey = (timeKey: IItem, treatmentId: string, treatmentDes: string) => {

//   if (timeKey.name === 'diagnose.treatment') {
//     for (let j = 0; j < timeKey.items.length; j++) {
//       const subItem = timeKey.items[j];
//       if (subItem.name === 'diagnose.treatment.uid') {
//         subItem.value = treatmentId;
//         subItem.description = treatmentDes;
//       }
//     }
//   }
// };

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

  const cloneItem = cloneDeep(item);
  let array = {};
  if (cloneItem.items && cloneItem.items.length > 0) {
    // 将每个子项拿出来
    for (let i = 0; i < cloneItem.items.length; i++) {
      console.log('=============== i', i, JSON.stringify(tileChooseToArray(cloneItem.items[i])));
      array = { ...array, ...tileChooseToArray(cloneItem.items[i]) };
    }
    // 将自己拼进去
    delete cloneItem.items;
  }
  array[cloneItem.name] = cloneItem;

  return array;
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

const tileAllFrequencyToArray = (frequency: { frequency: string, custom: { day: number, time: string, contents: [] }[] }, _sourceMember?: []) => {

  // {"frequency":"CUSTOM","custom":[{"day":1,"time":"14:22"},{"day":2,"time":"07:07"},{"day":2,"time":"05:05"}]}
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
          sourceMember: period.contents.map((item: { id: any; }) => {
            return ({
              sourceId: item.id,
            });
          }),
        },
      };
      // if (sourceMember) {
      //   action.params.sourceMember = sourceMember;
      // }
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
        sourceMember: period.contents.map((item: { id: any; }) => {
          return ({
            sourceId: item.id,
          });
        }),
      },
    };
    // if (sourceMember) {
    //   action.params.sourceMember = sourceMember;
    // }
    arrary.push(action);
  }

  return arrary;
};

const titleAllChoosesToActionsParma = (firstSteps: string[], firstTime: any, frequency: { frequency: string, custom: { day: number, time: string }[] }) => {

  const arr = [];

  console.log('==================  firstTime firstTime', JSON.stringify(firstTime));
  if (firstSteps.includes(DIY)) {
    const index = firstSteps.indexOf(DIY);
    const action: any = {
      type: 'once',
      params: {
        delay: getDelay(firstSteps[index + 2]),
        period: firstSteps[index + 1],
        unit: 'day',
        sourceMember: firstTime.choiceContents.map((item: { id: any; }) => {
          return ({
            sourceId: item.id,
          });
        }),
      },
    };
    arr.push(action);
  } else { // 
    const action: any = {
      type: 'once',
      params: {
        delay: 0,
        period: 0,
        unit: 'day',
        sourceMember: firstTime.choiceContents.map((item: { id: any; }) => {
          return ({
            sourceId: item.id,
          });
        }),
      },
    };
    arr.push(action);
  }

  arr.push(...tileAllFrequencyToArray(frequency));
  return arr;
};

const titleAllChoosesToMustParma = (chooseStartTime: IItem, firstSteps: string[], choseConditions: ICondition[]) => {


  if (firstSteps.includes(AfterPatientBind)) {

    const must = [tileChooseToArray(chooseStartTime), ...tileChooseConditionToArray(choseConditions)];
    return must;
  } else {
    return [...tileChooseConditionToArray(choseConditions)];
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


interface IProps {
  originRuleDoc?: IRuleDoc;
  chooseValues?: any;

  pageType: 'crf' | 'education' | 'suifang';

  onCancelClick: () => void;
  onSaveClick: (data: { ruleDoc: any, chooseValues: any }) => void;
  loading?: boolean;
}

// chooseValues: {
//   firstTime: firstTime,
//   choseConditions: choseConditions,
//   choseScope: choseScope,
//   frequency: frequency,
// },

type ContentType = 'firstTime' | 'frequency';

const TemplateRule: FC<IProps> = ({
  pageType,
  originRuleDoc,
  chooseValues,
  onCancelClick,
  onSaveClick,
  loading,
}: IProps) => {

  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);


  // const sourceType = pageType == 'education' ? 3 : (pageType == 'suifang' ? 2 : 6);
  // const ruleType = pageType == 'education' ? 'PUBLICIZE_EDUCATION' : (pageType == 'suifang' ? 'FOLLOW' : 'CRF_SCALE');
  // const [contentListVisible, setContentListVisible] = useState(false); //选中的起始发送时间子item

  const startTimeRef = useRef<IItem>();

  // 首次发送时间
  const [firstTime, setFirstTime] = useState<{ choiceModel: any, choiceContents: IList[] }>({ choiceModel: null, choiceContents: [] });

  // 发送对象
  const [scopeSource, setScopeSource] = useState<IItem>({});
  const [choseScope, setChoseScope] = useState<IItem[]>([]);

  // 发送条件
  const [conditionSource, setConditionSource] = useState<IItem>({});
  const initItems = {
    chooseItem: {
      name: '',
      description: '',
    },
    chooseValue: {

    },
  };
  const [choseConditions, setChoseConditions] = useState<ICondition[]>([initItems]); //选中的起始发送时间子item

  // 发送发送频率
  const initFrequency = {
    frequency: 'NONE',
    custom: [{ day: '', time: '', contents: [] }],
  };
  const [frequency, setFrequency] = useState(initFrequency); //发送频率

  useEffect(() => {
    api.education
      .getRules(sfTypeUrl?.[pageType].templateType)
      .then((res) => {
        console.log('resrules', res);

        for (let i = 0; i < res.keys.length; i++) {
          if (res.keys[i].name == 'start') {

            fillValueInStartTimeKey(res.keys[i], currentOrgInfo.sid, currentOrgInfo.role);
            startTimeRef.current = res.keys[i].items[0];
            // setStartTimeKey(res.keys[i]);
            // setChooseStartTime((preState) => {
            //   if (isEmpty(preState)) {
            //     return res.keys[i].items[0];
            //   }
            //   return preState;
            // });
          } else if (res.keys[i].name == 'scope') {

            const element = res.keys[i].items[0];
            if (element.type == 'dynamic') {

              const params = {
                sourceType: sfTypeUrl?.[pageType].sourceType,
                kp: element.name,
                rsList: [{
                  sid: window.$storage.getItem('sid'),
                  roleType: window.$storage.getItem('currRoleId'),
                  nsId: window.$storage.getItem('nsId'),
                }, {
                  sid: currentOrgInfo.sid,
                  roleType: currentOrgInfo.role,
                  nsId: currentOrgInfo.nsId,
                }],
              };
              api.education
                .fetchNodeEl(element.assign.value, params)
                .then((r) => {
                  fillValueInScopeKey(r);
                  setScopeSource(r);
                  setChoseScope((preState) => {


                    if (isEmpty(preState)) {
                      console.log('============== preState preState', JSON.stringify(r.items[0]));
                      return [r.items[0]];
                    }
                    return preState;
                  });
                })
                .catch((err: string) => {
                  message.error(err?.result);
                });
            }
          } else if (res.keys[i].name == 'condition') {
            setConditionSource(res.keys[i]);
          }
        }
      });
  }, []);

  useEffect(() => {


    console.log('=============== originRuleDoc', JSON.stringify(originRuleDoc));
    console.log('=============== chooseValues', JSON.stringify(chooseValues));
    if (chooseValues) {

      setFirstTime(cloneDeep(chooseValues.firstTime));
      // setChooseStartTime(chooseValues.chooseStartTime);
      setChoseScope(cloneDeep(chooseValues.choseScope));
      setChoseConditions(cloneDeep(chooseValues.choseConditions));
      setFrequency(cloneDeep(chooseValues.frequency));

      // const des = getTreatmentDesInStartTimeKey(chooseValues.chooseStartTime);
      // setChooseTreatmentDes(des);
    }
  }, [originRuleDoc]);

  const onChoiceModelChange = (choiceModel: IModel) => {

    firstTime.choiceModel = choiceModel;
    setFirstTime({ ...firstTime });
  };

  // 平率
  const onFrequencyChange = (fre) => {
    setFrequency(fre);
  };

  // 发送条件
  const onUpdateChoseConditions = (conditions: any[]) => {
    setChoseConditions(conditions);
  };

  // 发送小组
  const onGroupChange = (scope: IItem[]) => {

    console.log('=================== onGroupChange', JSON.stringify(scope));
    setChoseScope(scope);
  };

  const canSave = (firstSteps: string[]) => {

    // 首次发送时间一定要填写
    console.log('============= firstTime', JSON.stringify(firstTime));

    if (firstSteps.includes(AfterPatientBind)) {

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
    if (!(firstTime?.choiceContents?.length > 0)) {
      return '请补全首次发送的发送内容';
    }


    // 发送频率
    if (frequency.frequency == 'CUSTOM' || frequency.frequency == 'LOOP') {
      for (let i = 0; i < frequency.custom.length; i++) {
        const period = frequency.custom[i];
        if (!period.day || !period.time) {
          return '请补全发送频率';
        } else if (!(period.contents?.length > 0)) {
          return '请补全发送频率的发送内容';
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

  const saveClick = () => {


    const firstSteps = getFirstSteps(firstTime.choiceModel);
    console.log('============= firsts', JSON.stringify(firstSteps));

    const can = canSave(firstSteps);
    if (can) {
      message.error(can);
      return;
    }

    const set = Array.from(new Set(frequency.custom));
    const filter = set.filter((item) => !!item);
    frequency.custom = filter;
    console.log('============= frequency 11', JSON.stringify(filter), JSON.stringify(frequency.custom));

    //去重、过滤空数据
    frequency.custom = Array.from(new Set(frequency.custom)).filter((item) => !!item);
    console.log('============= firstTime', JSON.stringify(firstTime));
    console.log('============= choseConditions', JSON.stringify(choseConditions));
    console.log('============= choseScope', JSON.stringify(choseScope));
    console.log('============= frequency', JSON.stringify(frequency));


    const must = titleAllChoosesToMustParma(startTimeRef.current, firstSteps, choseConditions);
    console.log('=============must must', JSON.stringify(must));
    const should1 = tileChooseScopeToArray(choseScope);
    console.log('=============should_1 should_1', JSON.stringify(should1));
    const actions = titleAllChoosesToActionsParma(firstSteps, firstTime, frequency);
    console.log('=============actions actions', JSON.stringify(actions));

    // 如果是添加
    let meta: any = {
      sourceType: sfTypeUrl?.[pageType].sourceType,
      teamLocations: [
        {
          sid: window.$storage.getItem('sid'),
          ns: window.$storage.getItem('nsId'),
          role: window.$storage.getItem('currRoleId'),
          tag: 'operator',
        },
        {
          sid: currentOrgInfo.sid,
          ns: currentOrgInfo.nsId,
          role: currentOrgInfo.role,
          tag: 'ownership',
        },
      ],
    };

    // 判断是不是要添加时间firstAtTime
    if (firstSteps.includes(SpecificDate)) {
      const index = firstSteps.indexOf(SpecificDate);
      meta.firstAtTime = dayjs(firstSteps[index + 1], 'YYYY-MM-DD HH:mm').valueOf() / 1000;
    }
    if (originRuleDoc) { // 说明是修改
      meta = originRuleDoc.meta;
    }
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
    }

    console.log('========================= params params ', JSON.stringify(params));

    onSaveClick({
      ruleDoc: params,
      chooseValues: {
        firstTime: firstTime,
        choseConditions: choseConditions,
        choseScope: choseScope,
        frequency: frequency,
      },
    });
  };

  const onContentListAdd = (contentType: ContentType, choicesSid: IList[]) => {
    console.log('================= onContentListAdd choicesSid', JSON.stringify(choicesSid));
    console.log('================= onContentListAdd choicesSid 11', JSON.stringify(firstTime.choiceContents));

    if (contentType == 'firstTime') {
      firstTime.choiceContents.push(...choicesSid);
      setFirstTime({ ...firstTime });
    }
  };

  const onRemoveSuccess = (contentType: ContentType, _item: any, _index: number, list: any[]) => {
    console.log('================= onRemoveSuccess choicesSid', JSON.stringify(list));
    if (contentType == 'firstTime') {
      firstTime.choiceContents = list;
      setFirstTime({ ...firstTime });
    }
    // setContentList(list);
  };

  const contentPopver = (contentType: ContentType) => {

    console.log('================= render contentType', firstTime.choiceContents.length);

    const getContentList = () => {
      if (contentType == 'firstTime') {
        return [...firstTime.choiceContents];
      }
      return [];
    };

    return (
      <ContentPopover contentListsources={getContentList()}
        onRemoveSuccess={(item: any, index: number, list: any[]) => { onRemoveSuccess(contentType, item, index, list); }}
        // dragModalSources={dragModalSources}
        // onDragModalDidShow={dragModalDidShow}
        onSaveChoices={(choices) => onContentListAdd(contentType, choices)} type={pageType} />
    );
  };

  console.log('================= render', JSON.stringify(firstTime.choiceModel));
  return (
    <div className={styles.send_plan}>
      <FirstSendTime choiceModelChange={onChoiceModelChange} popverContent={
        contentPopver('firstTime')
      } choiceModelSource={firstTime.choiceModel} />
      <SendFrequency onFrequencyChange={onFrequencyChange} initFrequency={frequency} type={pageType}></SendFrequency>
      <SendCondition
        conditions={conditionSource}
        updateChoseConditions={onUpdateChoseConditions}
        values={choseConditions}
      />
      <SendGroup scopeSources={scopeSource} onGroupChange={onGroupChange} choseScopes={choseScope}></SendGroup>
      <div className='flex flex-row justify-center'>
        <Button className="w-98 mt-20 mb-0 mr-20" type="primary" onClick={onCancelClick}>取消</Button>
        <Button className="w-98 mt-20 mb-0 " type="primary" onClick={saveClick} loading={loading}>完成</Button>
      </div>
    </div >
  );
};


TemplateRule.defaultProps = {

};

export default TemplateRule;
