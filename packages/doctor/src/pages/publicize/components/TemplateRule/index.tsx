import React, { FC, useRef, useState, useEffect } from 'react';
import * as api from '@/services/api';
// import { sendType, IPlanItem } from '@/utils/consts';
import { useSelector } from 'umi';
// import ScaleCondition from '@/components/ScaleCondition';

import styles from './index.scss';
import FirstSendTime from './FirstSendTime';
import { ContentListModel } from './FirstSendTime/ChoiceContent';
import SendFrequency from './SendFrequency';
import SendCondition from './ScaleCondition';
import SendGroup from './SendGroup';

// import { CrfScaleSourceType, SubectiveScaleSourceType, transformDynamicToStatic, ObjectiveSourceType } from '../../pages/query/util';
// import { isEmpty, cloneDeep } from 'lodash';
// import { IChooseValues, ICondition, IItem, IRuleDoc } from '../../pages/subjective_table/util';
import { Button } from 'antd';
import { IChooseValues, IItem, IRuleDoc } from './util';
import { isEmpty } from 'lodash';
import ContentPopover from './ContentPopover/index';





// const { TextArea } = Input;
// const CheckboxGroup = Checkbox.Group;
// const { Option } = Select;
// let timer: any = null;

// const fillValueInStartTimeKey = (timeKey: IItem, projectSid: String, projectRoleType: String) => {

//   for (let i = 0; i < timeKey.items.length; i++) {
//     const item = timeKey.items[i];
//     item.operator = '=';
//     item.value = '';
//     if (item.name === 'team') {
//       for (let j = 0; j < item.items.length; j++) {
//         const subItem = item.items[j];
//         subItem.operator = '=';
//         if (subItem.name === 'team.role') {
//           subItem.value = projectRoleType;
//         } else if (subItem.name === 'team.subject') {
//           subItem.value = projectSid;
//         } else if (subItem.name === 'team.init_time') {
//           subItem.value = '*';
//           subItem.starting = true;
//         }
//       }
//     } else if (item.name === 'diagnose.treatment') {
//       for (let j = 0; j < item.items.length; j++) {
//         const subItem = item.items[j];
//         subItem.operator = '=';
//         if (subItem.name === 'diagnose.treatment.start') {
//           subItem.value = '*';
//           subItem.starting = true;
//         } else {
//           subItem.value = '';
//         }
//       }
//     }
//   }
// };

// const fillValueInScopeKey = (scopeKey: IItem) => {

//   if (scopeKey.items && scopeKey.items.length == 0) {
//     return;
//   }
//   for (let i = 0; i < scopeKey.items.length; i++) {
//     const item = scopeKey.items[i];
//     item.operator = '=';
//     item.value = item.assign?.value ?? '';

//     for (let j = 0; j < item.items.length; j++) {
//       const subItem = item.items[j];
//       subItem.operator = '=';
//       subItem.value = subItem.assign?.value ?? '';
//     }
//   }
// };


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

const tileAllChoosesToArray = (chooseStartTime: IItem, choseConditions: ICondition[], chooseScope: IItem[]) => {


  const param = {
    must: [tileChooseToArray(chooseStartTime), ...tileChooseConditionToArray(choseConditions)],
    should_1: tileChooseScopeToArray(chooseScope),
  };

  return param;
};

const tileAllFrequencyToArray = (frequency: { frequency: string, custom: string[] }, sourceMember?: []) => {

  // 自定义
  const arrary = [];
  const delay = 9 * 60 * 60; // 9个小时的毫秒值

  if (frequency.frequency === 'CUSTOM') {
    for (let i = 0; i < frequency.custom.length; i++) {

      const period = frequency.custom[i];
      const action: any = {
        type: 'once',
        params: {
          delay: delay,
          period: period,
          unit: 'day',
        },
      };
      if (sourceMember) {
        action.params.sourceMember = sourceMember;
      }
      arrary.push(action);
    }
  } else {

    const period = frequency.custom[0];
    const action: any = {
      type: 'rolling',
      params: {
        delay: delay,
        period: period,
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

interface IProps {
  mode: string;
  originRuleDoc: IRuleDoc;
  chooseValues: IChooseValues;

  type: 'FOLLOW' | 'PUBLICIZE_EDUCATION'; // isScale ? 2 : 3
  sourceType: 2 | 3;

  dragModalSources: ContentListModel[]; //ContentListModel[]会作为+号点击弹窗的数据来源
  dragModalDidShow: () => void; // 弹窗显示会调


  onCancelClick: () => void;
  onSaveClick: ({ }) => void;
}

type ContentType = 'firstTime' | 'frequency';

const TemplateRule: FC<IProps> = ({
  mode, dragModalDidShow, dragModalSources, onCancelClick,
  type, sourceType,
  originRuleDoc,
  chooseValues,
}: IProps) => {

  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  // const [contentListVisible, setContentListVisible] = useState(false); //选中的起始发送时间子item

  const firstTimeRef = useRef<{ choiceModel: any, choiceContentSids: string[] }>({ choiceModel: null, choiceContentSids: [] });

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
    frequency: 'CUSTOM',
    custom: [{ day: '', time: '' }],
  };
  const [frequency, setFrequency] = useState(initFrequency); //发送频率

  useEffect(() => {
    api.education
      .getRules(type)
      .then((res) => {
        console.log('resrules', res);

        for (let i = 0; i < res.keys.length; i++) {
          if (res.keys[i].name == 'start') {
            // fillValueInStartTimeKey(res.keys[i], projectSid, projectRoleType);
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
                sourceType: sourceType,
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
                  // fillValueInScopeKey(r);
                  setScopeSource(r);
                  setChoseScope((preState) => {
                    if (isEmpty(preState)) {
                      return [res.keys[i].items[0]];
                    }
                    return preState;
                  });
                })
                .catch((err: string) => {
                  console.log('err', err);
                });
            }
          } else if (res.keys[i].name == 'condition') {
            setConditionSource(res.keys[i]);
          }
        }
      });
  }, []);

  useEffect(() => {

    if (chooseValues) {
      // setChooseStartTime(chooseValues.chooseStartTime);
      setChoseScope(chooseValues.choseScope);
      setChoseConditions(chooseValues.choseConditions);
      setFrequency(chooseValues.frequency);

      // const des = getTreatmentDesInStartTimeKey(chooseValues.chooseStartTime);
      // setChooseTreatmentDes(des);
    }
  }, [originRuleDoc]);

  const onChoiceModelChange = (choiceModel: IModel) => {
    firstTimeRef.current.choiceModel = choiceModel;
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

  const saveClick = () => {

    const choice = {
      firstTime: firstTimeRef.current,
      frequency: frequencyRef.current,
    };

    console.log('================== saveClick saveClick', JSON.stringify(choice));

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
    const arrParma = tileAllChoosesToArray({}, choseConditions, choseScope);

    console.log('=============arrParma arrParma', JSON.stringify(arrParma));

    // 如果是添加
    let meta: any = {
      sourceType: sourceType,
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

    if (originRuleDoc) { // 说明是修改
      meta = originRuleDoc.meta;
    }

    const actions = originRuleDoc ? tileAllFrequencyToArray(frequency, originRuleDoc.rules[0].actions[0].params.sourceMember) : tileAllFrequencyToArray(frequency);
    const params: any = {
      rules: [{
        match: arrParma,
        actions: actions,
      }],
      meta: meta,
    };
    if (originRuleDoc) {
      params.id = originRuleDoc.id;
    }

    console.log('========================= params params ', JSON.stringify(params));
    //   addPlan({
    //     ruleDoc: params,
    //     questions: remind,
    //     chooseValues: {
    //       chooseStartTime: chooseStartTime,
    //       choseConditions: choseConditions,
    //       choseScope: choseScope,
    //       frequency: frequency,
    //     },
    //   });
    // };

  };

  const onContentListAdd = (contentType: ContentType, _choicesSid: string[]) => {

    if (contentType == 'firstTime') {
      // firstTimeRef.current.choiceContentSids = choicesSid;
    }
  };

  const onRemoveSuccess = (contentType: ContentType, _item: any, _index: number, _list: any[]) => {

    if (contentType == 'firstTime') {

    }
    // setContentList(list);
  };

  const contentPopver = (contentType: ContentType) => {

    return (
      <ContentPopover contentListsources={[]}
        onRemoveSuccess={(item: any, index: number, list: any[]) => { onRemoveSuccess(contentType, item, index, list); }}
        dragModalSources={dragModalSources}
        onDragModalDidShow={dragModalDidShow}
        onSaveChoices={(choicesSid) => onContentListAdd(contentType, choicesSid)} />
    );
  };

  return (
    <div className={mode === 'Add' ? styles.send_plan : `${styles.send_plan} ${styles.edit}`}>
      <FirstSendTime choiceModelChange={onChoiceModelChange} popverContent={
        contentPopver('firstTime')
      } />
      <SendFrequency onFrequencyChange={onFrequencyChange} popverContent={
        contentPopver('frequency')
      } initFrequency={frequency}></SendFrequency>
      <SendCondition
        conditions={conditionSource}
        updateChoseConditions={onUpdateChoseConditions}
        values={choseConditions}
      />
      <SendGroup scopeSources={scopeSource} onGroupChange={onGroupChange} choseScope={choseScope}></SendGroup>
      <div className='flex flex-row justify-center'>
        <Button className="w-98 mt-20 mb-0 mr-20" type="primary" onClick={onCancelClick}>取消</Button>
        <Button className="w-98 mt-20 mb-0 " type="primary" onClick={saveClick}>完成</Button>
      </div>
    </div>
  );
};


TemplateRule.defaultProps = {

};

export default TemplateRule;
