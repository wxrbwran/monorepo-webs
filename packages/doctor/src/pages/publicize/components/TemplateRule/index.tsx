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
    // ????????????????????????
    for (let i = 0; i < cloneItem.items.length; i++) {
      array = { ...array, ...tileChooseToArray(cloneItem.items[i]) };
    }
    // ??????????????????
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
    } else { // ???????????????????????????

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
  // ?????????
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

const titleAllChoosesToMustParma = (chooseStartTime: IItem, firstSteps: string[], choseConditions: ICondition[], scopeSource: IItem) => {


  const allPatient = scopeSource.items.filter((item) => item.description == '???????????????');

  const allPatientArr = allPatient.length > 0 ? [tileChooseToArray(allPatient[0])] : [];

  console.log('=================== allPatientArr', JSON.stringify(allPatientArr));

  if (firstSteps.includes(AfterPatientBind)) {

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
  // const [contentListVisible, setContentListVisible] = useState(false); //??????????????????????????????item

  const startTimeRef = useRef<IItem>();

  // ??????????????????
  const [firstTime, setFirstTime] = useState<{ choiceModel: any, choiceContents: IList[] }>({ choiceModel: null, choiceContents: [] });

  // ????????????
  const [scopeSource, setScopeSource] = useState<IItem>({});
  const [choseScope, setChoseScope] = useState<IItem[]>([]);

  // ????????????
  const [conditionSource, setConditionSource] = useState<IItem>({});
  const initItems = {
    chooseItem: {
      name: '',
      description: '',
    },
    chooseValue: {

    },
  };
  const [choseConditions, setChoseConditions] = useState<ICondition[]>([initItems]); //??????????????????????????????item

  // ??????????????????
  const initFrequency = {
    frequency: 'NONE',
    custom: [{ day: '', time: '', contents: [] }],
  };
  const [frequency, setFrequency] = useState(initFrequency); //????????????

  useEffect(() => {
    api.education
      .getRules(sfTypeUrl?.[pageType].templateType)
      .then((res) => {

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

  // ??????
  const onFrequencyChange = (fre) => {
    setFrequency(fre);
  };

  // ????????????
  const onUpdateChoseConditions = (conditions: any[]) => {
    setChoseConditions(conditions);
  };

  // ????????????
  const onGroupChange = (scope: IItem[]) => {


    setChoseScope(scope);
  };

  const canSave = (firstSteps: string[]) => {

    // ????????????????????????????????? 

    if (firstSteps.includes(AfterPatientBind)) {

      if (firstSteps.includes(ImmediatelySend)) {
        // ?????????
      } else if (firstSteps.includes(DIY)) {

        const diyIndex = firstSteps.indexOf(DIY);
        if (firstSteps.length > diyIndex + 2) {
          if (!firstSteps[diyIndex + 1]) { // ???????????????????????????
            return '???????????????????????????';
          } else if (!firstSteps[diyIndex + 2]) { // ???????????????????????????
            return '???????????????????????????';
          }
          // ?????????
        } else {
          return '???????????????????????????'; // ????????????????????????????????????
        }
      } else {
        return '???????????????????????????'; // ????????????????????????????????????
      }
    } else if (firstSteps.includes(SpecificDate)) {
      const dateIndex = firstSteps.indexOf(SpecificDate);
      if (firstSteps.length > dateIndex + 1) {
        if (!firstSteps[dateIndex + 1]) { // ??????????????????????????????
          return '???????????????????????????';
        }
        // ?????????
      } else {
        return '???????????????????????????';
      }
    } else if (firstSteps.includes(PlanCreatedSendImmediately)) {
      // ?????????
    } else {
      return '???????????????????????????';
    }
    if (!(firstTime?.choiceContents?.length > 0)) {
      return '????????????????????????????????????';
    }


    // ????????????
    if (frequency.frequency == 'CUSTOM' || frequency.frequency == 'LOOP') {
      for (let i = 0; i < frequency.custom.length; i++) {
        const period = frequency.custom[i];
        if (!period.day || !period.time) {
          return '?????????????????????';
        } else if (!(period.contents?.length > 0)) {
          return '????????????????????????????????????';
        }
      }
    }

    // ????????????
    if (!(choseScope.length > 0)) {
      return '?????????????????????';
    }

    // ????????????
    for (let i = 0; i < choseConditions.length; i++) {
      if (choseConditions[i].chooseItem.name == 'basic.age') {
        if (!choseConditions[i].chooseValue.min || !choseConditions[i].chooseValue.max) {
          return '????????????????????????????????????';
        }
      } else if (choseConditions[i].chooseItem.name == 'basic.sex') {
        if (!choseConditions[i].chooseValue.value) {
          return '??????????????????????????????';
        }
      } else if (choseConditions[i].chooseItem.name == 'diagnose.disease') { // ???????????????????????????

        if (!choseConditions[i].chooseValue.value) {
          return '????????????????????????????????????';
        }
      } else if (choseConditions[i].chooseItem.name == 'diagnose.treatment') { // ???????????????????????????

        if (!choseConditions[i].chooseValue.value) {
          return '????????????????????????????????????';
        }
      }
    }

    return null;
  };

  const saveClick = () => {


    const firstSteps = getFirstSteps(firstTime.choiceModel);

    const can = canSave(firstSteps);
    if (can) {
      message.error(can);
      return;
    }

    const set = Array.from(new Set(frequency.custom));
    const filter = set.filter((item) => !!item);
    frequency.custom = filter;

    //????????????????????????
    frequency.custom = Array.from(new Set(frequency.custom)).filter((item) => !!item);
    console.log('============= firstTime', JSON.stringify(firstTime));
    console.log('============= choseConditions', JSON.stringify(choseConditions));
    console.log('============= choseScope', JSON.stringify(choseScope));
    console.log('============= frequency', JSON.stringify(frequency));


    const must = titleAllChoosesToMustParma(startTimeRef.current, firstSteps, choseConditions, scopeSource);
    console.log('=============must must', JSON.stringify(must));
    const should1 = tileChooseScopeToArray(choseScope);
    console.log('=============should_1 should_1', JSON.stringify(should1));
    const actions = titleAllChoosesToActionsParma(firstSteps, firstTime, frequency);
    console.log('=============actions actions', JSON.stringify(actions));

    // ???????????????
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

    if (originRuleDoc) { // ???????????????
      meta = originRuleDoc.meta;
    }

    // ??????????????????????????????firstAtTime
    if (firstSteps.includes(SpecificDate)) {
      const index = firstSteps.indexOf(SpecificDate);
      meta.firstAtTime = dayjs(firstSteps[index + 1], 'YYYY-MM-DD HH:mm').valueOf();
    } else {
      delete meta.firstAtTime;
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
      params.createdAtTime = originRuleDoc.createdAtTime;
    }

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

    if (contentType == 'firstTime') {
      firstTime.choiceContents.push(...choicesSid);
      setFirstTime({ ...firstTime });
    }
  };

  const onRemoveSuccess = (contentType: ContentType, _item: any, _index: number, list: any[]) => {
    if (contentType == 'firstTime') {
      firstTime.choiceContents = list;
      setFirstTime({ ...firstTime });
    }
    // setContentList(list);
  };

  const contentPopver = (contentType: ContentType) => {

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
        <Button className="w-98 mt-20 mb-0 mr-20" type="primary" onClick={onCancelClick}>??????</Button>
        <Button className="w-98 mt-20 mb-0 " type="primary" onClick={saveClick} loading={loading}>??????</Button>
      </div>
    </div >
  );
};


TemplateRule.defaultProps = {

};

export default TemplateRule;
