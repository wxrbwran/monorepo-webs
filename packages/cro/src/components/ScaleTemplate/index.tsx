import React, { useState, useEffect } from 'react';
import { Input, Button, Checkbox, Select, message, InputNumber, Spin } from 'antd';
import * as api from '@/services/api';
import { sendType, IPlanItem } from '@/utils/consts';
import { useSelector } from 'umi';
import ScaleCondition from '@/components/ScaleCondition';
import styles from './index.scss';
import { CrfScaleSourceType, SubectiveScaleSourceType, transformDynamicToStatic, ObjectiveSourceType } from '../../pages/query/util';
import { isEmpty, cloneDeep } from 'lodash';
import { IChooseValues, ICondition, IItem, IRuleDoc } from '../../pages/subjective_table/util';


const { TextArea } = Input;
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
  scaleType: string;
  question?: string;

  plans?: IPlanItem[];
  isDisabled?: string;
}


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

const getTreatmentDesInStartTimeKey = (timeKey: IItem) => {

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

  // ?????????
  const arrary = [];
  const delay = 9 * 60 * 60; // 9?????????????????????

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


function ScaleTemplate({ onCancel, mode, isDisabled, addPlan, originRuleDoc,
  chooseValues, scaleType, question }: IProps) {
  //???????????????????????????
  //?????????????????????
  const initFrequency = {
    frequency: 'CUSTOM',
    custom: [''],
  };

  const initItems = {
    chooseItem: {
      name: '',
      description: '',
    },
    chooseValue: {

    },
  };


  const [fetching, setFetchStatus] = useState(false); //??????????????????loading
  const [treatment, setTreatment] = useState([]); //??????????????????

  const [loading, setLoading] = useState(false);



  const { projectSid, projectRoleType, projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);

  const [remind, setRemind] = useState(''); //??????

  const [startTimeKey, setStartTimeKey] = useState<IItem>({}); //????????????????????????
  const [chooseStartTime, setChooseStartTime] = useState<IItem>({}); //??????????????????????????????item
  const [chooseTreatmentDes, setChooseTreatmentDes] = useState<string>(); //??????????????????????????????-->????????????

  const [scopeKey, setScopeKey] = useState<IItem>({}); //??????????????????????????????item
  const [choseScope, setChoseScope] = useState<IItem[]>([]); //??????????????????????????????item

  const [conditionKey, setConditionKey] = useState<IItem>({}); //??????????????????????????????item
  const [choseConditions, setChoseConditions] = useState<ICondition[]>([initItems]); //??????????????????????????????item

  const [frequency, setFrequency] = useState(initFrequency); //????????????

  const sourceType = scaleType === 'CRF' ? CrfScaleSourceType : (scaleType === 'OBJECTIVE' ? ObjectiveSourceType : SubectiveScaleSourceType);

  console.log('==================== sourceType', sourceType);
  useEffect(() => {
    api.query.fetchFields('SUBJECTIVE_SCALE').then((res) => {
      // ??????????????????item?????????dynimic
      for (let i = 0; i < res.keys.length; i++) {
        if (res.keys[i].name == 'start') {
          fillValueInStartTimeKey(res.keys[i], projectSid, projectRoleType);
          setStartTimeKey(res.keys[i]);

          setChooseStartTime((preState) => {
            if (isEmpty(preState)) {
              return res.keys[i].items[0];
            }
            return preState;
          });

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
      setChooseStartTime(chooseValues.chooseStartTime);
      setChoseScope(chooseValues.choseScope);
      setChoseConditions(chooseValues.choseConditions);
      setFrequency(chooseValues.frequency);

      const des = getTreatmentDesInStartTimeKey(chooseValues.chooseStartTime);
      setChooseTreatmentDes(des);
    }
  }, [originRuleDoc]);

  useEffect(() => {

    setRemind(question);
  }, [question]);


  //??????????????????????????????-zhou
  const handleChangeType = (value: string) => {

    const choseList = startTimeKey.items.filter(item => item.name === value);
    setChooseStartTime(choseList[0]);
  };

  //???????????????-zhou
  const handleChangeGroup = (checkedValues: any[]) => {

    const choseList = scopeKey.items.filter(item => checkedValues.includes(item.description));

    setChoseScope(choseList);
  };

  const onUpdateChoseConditions = (conditions: any[]) => {
    setChoseConditions(conditions);
  };

  //??????
  const handleChangeRemind = (e: { target: { value: string } }) => {
    setRemind(e.target.value);
  };

  //?????? ????????????????????????-->????????????
  const changeStateByValue = (value: string) => {

    const vals = String(value).split('_zsh_');
    fillTreatmentInStartTimeKey(chooseStartTime, vals[0], vals[1]);
    setChooseTreatmentDes(vals[1]);
  };
  //????????????????????????
  const handleGetType = (value: string) => {
    frequency.frequency = value;
    frequency.custom = [''];
    setFrequency({ ...frequency });
  };
  //??????????????????
  const handleAddDayEdit = () => {
    frequency.custom.push('');
    setFrequency({ ...frequency });
  };
  //??????????????????
  const handleChangeCustomCycleDay = (e: any, index: number) => {
    frequency.custom[index] = e;
    setFrequency({ ...frequency });
  };
  //???????????????????????????
  const handleDeleteDay = (index: number) => {
    frequency.custom.splice(index, 1);
    setFrequency({ ...frequency });
  };
  //??????????????????
  const handleChangeCycleDay = (day: number) => {
    frequency.custom = [day];
    setFrequency({ ...frequency });
  };
  //??????????????????????????????

  //????????????????????????????????????
  const handleSubmit = () => {
    setLoading(true);

    // console.log('callBackPlans', callBackPlans);
    // const conditionArr = formatConditions(callBackPlans);
    // console.log('conditionArr', conditionArr);
    // //????????????????????????
    // frequency.detail.custom = Array.from(new Set(frequency.detail.custom)).filter((item) => !!item);
    // if (group.detail.projectGroups.includes('PROJECT_ALL')) {
    //   group.detail.projectGroups = ['PROJECT_ALL'];
    // }
    // const params = {
    //   // plans: [startTime, ...conditionArr, frequency, group],
    //   // questions: remind,
    //   // ruleDoc:
    // };
    //????????????
    // const filterAgeObj = callBackPlans.filter((item) => item.detail.send === 'AGE')[0];
    // if (filterAgeObj) {
    //   const lowerAge = +filterAgeObj.detail.minAge;
    //   const upperAge = +filterAgeObj.detail.maxAge;
    //   if (!lowerAge || !upperAge) {
    //     message.error('?????????????????????');
    //     setLoading(false);
    //     return;
    //   } else if (lowerAge >= upperAge) {
    //     message.error('??????????????????????????????');
    //     setLoading(false);
    //     return;
    //   }
    // }

    const set = Array.from(new Set(frequency.custom));
    const filter = set.filter((item) => !!item);
    frequency.custom = filter;
    console.log('============= frequency 11', JSON.stringify(filter), JSON.stringify(frequency.custom));

    //????????????????????????
    frequency.custom = Array.from(new Set(frequency.custom)).filter((item) => !!item);
    console.log('============= chooseStartTime', JSON.stringify(chooseStartTime));
    console.log('============= choseConditions', JSON.stringify(choseConditions));
    console.log('============= choseScope', JSON.stringify(choseScope));
    console.log('============= frequency', JSON.stringify(frequency));
    const hasValConditions = choseConditions.filter(item => !isEmpty(item.chooseValue));
    const arrParma = tileAllChoosesToArray(chooseStartTime, hasValConditions, choseScope);


    console.log('=============arrParma arrParma', JSON.stringify(arrParma));

    setLoading(false);
    // ???????????????
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
    if (originRuleDoc) { // ???????????????
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
    addPlan({
      ruleDoc: params,
      questions: remind,
      chooseValues: {
        chooseStartTime: chooseStartTime,
        choseConditions: hasValConditions,
        choseScope: choseScope,
        frequency: frequency,
      },
    });
  };
  //??????
  const handCancel = () => {
    onCancel();
  };
  //??????????????????
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
              message.info('????????????????????????!');
            }
          })
          .catch((err) => {
            message.error(err);
          });
        setFetchStatus(false);
      }, 800);
    }
  };
  //???????????????????????????
  const isEmptyCustom = frequency.custom.length === 1 && !frequency.custom[0];
  const isEmptyGroup = choseScope.length == 0;
  // const isShowTextArea = mode === 'Add' || location?.pathname.includes('objective_table/detail');

  const isShowTextArea = scaleType === 'OBJECTIVE';
  const disabled =
    isShowTextArea ? !remind || isEmptyCustom || isEmptyGroup : isEmptyCustom || isEmptyGroup;

  const options = isEmpty(scopeKey) ? [] : scopeKey.items.map((item: IItem) => ({
    label: item.description,
    value: item.description,
  }));

  const des = choseScope.map(item => item.description);
  return (
    <div className={mode === 'Add' ? styles.send_plan : `${styles.send_plan} ${styles.edit}`}>
      {isShowTextArea && (
        <TextArea
          placeholder={'?????????????????????'}
          className={styles.question}
          onChange={(ev) => handleChangeRemind(ev)}
          value={remind}
          disabled={!!isDisabled}
        />
      )}
      <h2>
        <span className={styles.start}>*</span>?????????????????????
      </h2>
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
              <span className={styles.label}>?????????</span>
              <Select
                showSearch
                allowClear
                placeholder="?????????????????????"
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
              <span className={styles.after}>?????????</span>
            </div>
          )
        }
      </div>
      <h2>
        <span className={styles.start}>*</span>???????????????
      </h2>
      <div className={styles.send_type}>
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
                    <span>???</span>
                    <InputNumber
                      style={{ width: 50 }}
                      min={1}
                      max={9999}
                      value={item}
                      onChange={(e) => handleChangeCustomCycleDay(e, index)}
                    />
                    <span className={styles.info}>???????????????</span>
                  </div>
                  <div className={styles.self_add}>
                    {index === 0 ? (
                      <Button size="large" onClick={handleAddDayEdit}>
                        ????????????
                      </Button>
                    ) : (
                      <Button size="large" onClick={() => handleDeleteDay(index)}>
                        ??????
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.cycle}>
            ???{' '}
            <InputNumber
              style={{ width: 50 }}
              min={1}
              max={9999}
              value={frequency.custom[0]}
              onChange={handleChangeCycleDay}
            />{' '}
            ???????????????
          </div>
        )}
      </div>
      <ScaleCondition
        conditions={conditionKey}
        updateChoseConditions={onUpdateChoseConditions}
        values={choseConditions}
      />

      <h2>
        <span className={styles.start}>*</span>??????????????????
      </h2>
      <CheckboxGroup
        options={options}
        onChange={handleChangeGroup}
        value={des}
      />
      <div className={styles.submit}>
        <Button onClick={handCancel}>??????</Button>
        <Button type="primary" onClick={handleSubmit} disabled={disabled} loading={loading}>
          ??????
        </Button>
      </div>
    </div>
  );
}

export default ScaleTemplate;
