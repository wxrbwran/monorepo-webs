import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { message, Checkbox, Steps, Divider, Select } from 'antd';
import { history, useSelector, useDispatch } from 'umi';
import ToogleSide from '@/components/ToogleSide';
import FieldCard from './components/field_card';
import PreTable from './components/pre_table';
import { handleFormatValues, handleShouldValues, ResearchSourceType, transformDynamicToStatic } from './util';
import styles from './index.scss';
import { IState } from 'typings/global';
import radioCheck from '@/assets/img/radio_check.png';
import deletePng from '@/assets/img/delete.png';
import exportStylesPng from '@/assets/img/export_styles.jpg';
import addPng from '@/assets/img/add.png';
import deleteBluePng from '@/assets/img/delete_blue.png';
import dayjs from 'dayjs';

const { Option } = Select;
interface IProps {
}
export interface IChecked {
  label?: string,
  title?: string,
  parent: string,
  type?: string,
  name: string,
  assign?: any,
  key?: string
  items: any[];
  description: string;
}
interface IFields {
  items: IFieldItem[]
}
interface IFieldItem {
  description: string,
  name: string,
  items: any[];
}

const CheckboxGroup = Checkbox.Group;
const { Step } = Steps;
function Query({ }: IProps) {

  const [currentStep, setCurrentStep] = useState<number>(2);

  const dispatch = useDispatch();
  const projectSid = window.$storage.getItem('projectSid');
  const { projectRoleType, projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);

  const [checkedField, setCheckedField] = useState<IChecked[]>([]);


  const [allFields, setAllFields] = useState<IFields>(); // 所有节点
  const [activeField, setActiveField] = useState<IFields>(); // 选中的节点



  const defaultItem = {
    name: '',
    operation: '',
    value: '',
    time: dayjs(),
  };
  const [allRules, setAllRules] = useState<any[]>([
    {
      items: [
        { ...defaultItem },
        { ...defaultItem },
        { ...defaultItem },
      ],
    },
    {
      items: [
        { ...defaultItem },
      ],
    },
  ]); // 查询规则



  const [groupIds, setGroupIds] = useState<string[]>(['全部受试者']);

  const [groupList, setGroupList] = useState<any[]>([]);


  const fetchField = async () => {

    const res = await api.query.fetchFields('RESEARCH');
    let allItems = res.keys[0];
    // 循环判断每个item是不是dynimic
    for (let i = 0; i < allItems.items.length; i++) {

      const items = await transformDynamicToStatic(allItems.items[i], projectSid, projectRoleType, ResearchSourceType);

      if (res.keys[0].items[i].name.includes('team')) {
        allItems.items[i].items = items;
      }

      // 如果allItems.items[i]?.items的第一个元素是dynamic,再请求真是数据
      if (allItems.items[i]?.items[0].type.includes('dynamic')) {
        const childItems = await transformDynamicToStatic(allItems.items[i]?.items[0], projectSid, projectRoleType, ResearchSourceType);
        allItems.items[i].items = [...childItems];
      }

      // 将所有数据都添加上formateData
      const tempData = allItems.items[i]?.items?.filter(f => !!f.show).map((itemTemp: IField, index: number) => ({
        title: itemTemp.description,
        key: `${itemTemp.name}_${index}`,
        fieldCheck: itemTemp.description == '姓名',
        parent: res.keys[0].items[i]?.description,
        parentName: res.keys[0].items[i]?.name,
        value: itemTemp.description,
        label: itemTemp.description,
        children: itemTemp?.items ? itemTemp.items?.filter(t => !!t.show).map((childItem: IField, idx: number) => ({
          title: childItem.description,
          key: `${childItem.name}_${index + 1}${idx}`,
          value: childItem.description,
          label: childItem.description,
          parent: res.keys[0].items[i]?.description,
          parentName: res.keys[0].items[i]?.name,
          subParent: itemTemp.description,
          subParentName: itemTemp.name,
          subParentAssign: itemTemp.assign,
          children: [],
          isLeaf: !(childItem?.items && childItem?.items[0]?.type.includes('dynamic')),
          ...childItem,
        })) : [],
        isLeaf: ['终点事件'].includes(res.keys[0].items[i].description) ? false : !(itemTemp?.items && itemTemp?.items[0].type.includes('dynamic')),
        disabled: itemTemp?.items && itemTemp?.items[0].type.includes('dynamic') && itemTemp?.items.length === 1,
        ...itemTemp,
      }));
      allItems.items[i].checkSources = tempData;
    }
    console.log('====================== useEffect, ', allItems);
    setAllFields({ ...allItems });
    setActiveField(allItems.items[0]);
  };

  useEffect(() => {

    // 获取数据
    fetchField();

  }, []);

  /** 数据去重 */
  const unique = (arr: any[], key: string) => {
    const res = new Map();
    return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1));
  };


  const handleChangeActiveField = (item: IFieldItem, index: number) => {
    const FIELDCARD = document.getElementById('FIELD_CARD');
    if (FIELDCARD) {
      setTimeout(() => {
        FIELDCARD.scrollTop = 999999;
      }, 300);
    }
    if (activeField.name == item.name) {
      return;
    }
    setActiveField(item);
  };

  const onValueChange = (items: IChecked[]) => {
    console.log('============= onValueChange', JSON.stringify(items));
    setAllFields((preState) => { return { ...preState }; });
  };

  console.log('=========== allFields', allFields?.items?.length);
  console.log('============ allFields allFields ,', JSON.stringify(allFields));

  const checkedList = allFields?.items?.filter((item) => item.name != 'basic').flatMap((item) => item.checkSources).filter((item) => item.fieldCheck);

  console.log('=========== checkedList', JSON.stringify(checkedList));

  const onCancelItemFieldCheck = (item) => {
    item.fieldCheck = false;
    setAllFields((preState) => { return { ...preState }; });
  };

  const onCancelItemRuleCheck = (item) => {

    item.ruleCheck = false;
    setAllFields((preState) => { return { ...preState }; });
  };

  const onNextStepClick = () => {

    setCurrentStep(currentStep + 1);
  };

  const onPreStepClick = () => {
    setCurrentStep(currentStep - 1);
  };

  const otherChoiceFields = allFields?.items?.filter((item) => item.name != 'basic').flatMap((item) => item.checkSources).filter((item) => item.fieldCheck);
  const otherChoiceRules = allFields?.items?.flatMap((item) => item.checkSources).filter((item) => item.ruleCheck);

  if (otherChoiceFields?.length > 0) {
    console.log('================= otherChoiceFields ', JSON.stringify(otherChoiceFields[0]));
  }

  const getChoiceItemsView = (type: 'fieldChoice' | 'ruleChoice') => {
    return (
      <div className={styles.choiceItems}>
        <div className={styles.left}>
          {allFields && allFields?.items?.map((item, index) => (
            <div
              className={`${activeField?.name == item.name ? styles.active : ''} ${styles.field}`}
              title={item.description}
              onClick={() => handleChangeActiveField(item, index)}
            >
              {item.description}
            </div>
          ))}
        </div>

        <div className={styles.centerLine}></div>

        <div className={styles.right}>
          <FieldCard
            key={activeField?.name}
            currentField={activeField}
            type={type}
            onValueChange={onValueChange}
          />
        </div>
      </div>
    );
  };


  const onAddRule = () => {

    setAllRules([...allRules, {
      items: [
        { ...defaultItem },
      ],
    }]);
  };

  const onCopyClick = (ruleIndex) => {

    setAllRules([...allRules, allRules[ruleIndex]]);
  };

  const onDeleteRule = (ruleIndex) => {

    allRules.splice(ruleIndex, 1);
    setAllRules([...allRules]);
  };

  const onAddItem = (ruleIndex, itemIndex) => {
    // [allRules, setAllRules
    allRules[ruleIndex].items = [...allRules[ruleIndex].items, { ...defaultItem }];
    setAllRules([...allRules]);
  };



  const onDeleteItem = (ruleIndex, itemIndex) => {

    allRules[ruleIndex].items.splice(itemIndex, 1);

    console.log('============== onDeleteItem', JSON.stringify(allRules));
    setAllRules([...allRules]);
  };

  const getRuleView = (rule, ruleIndex) => {

    return (
      <div className={styles.rule}>
        <div className='flex flex-row justify-between'>
          <div className={styles.ruleTitle}>查询规则{ruleIndex + 1}</div>

          <div className={`flex flex-row items-center ${styles.ruleTitleRight}`}>
            {
              ruleIndex != 0 &&
              <>
                <div className='flex flex-row items-center' onClick={() => { onDeleteRule(ruleIndex); }}>
                  <img src={deleteBluePng} className='w-16 h-16' />
                  <div className='ml-4'>删除该组规则</div>
                </div>
                <div className={`${styles.ruleLine}`}></div>
              </>
            }
            <div className='flex flex-row items-center mr-20' onClick={() => { onCopyClick(ruleIndex); }}  >
              <img src={deleteBluePng} className='w-16 h-16' />
              <div className='ml-4'>复制</div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        {
          rule.items.map((item, itemIndex) => {
            return (
              <div className={styles.item} key={JSON.stringify(item.time)}>
                <Select className={styles.name} defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select className={styles.operation} defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select className={styles.value} defaultValue="lucy">
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                {
                  itemIndex == 0 ?
                    <>
                      <div className={styles.add} onClick={() => onAddItem(ruleIndex, itemIndex)}>
                        <img src={addPng} className='w-16 h-16 ml-10' />
                        <div className='ml-4'>增加</div>
                      </div>
                    </>
                    :
                    <>
                      <div className={styles.delete} onClick={() => onDeleteItem(ruleIndex, itemIndex)}>
                        <img src={deleteBluePng} className='w-16 h-16 ml-10' />
                        <div className='ml-4'>删除</div>
                      </div>
                    </>
                }
              </div>);
          })
        }
      </div>
    );
  };

  return (
    <div className={styles.query}>
      <Steps current={currentStep} className={styles.steps}>
        <Step title="输出变量配置" />
        <Step title="查询字段选择" />
        <Step title="构造查询条件" />
        <Step title="数据查询" />
      </Steps>
      {
        currentStep == 0 &&
        <div className={styles.fieldsChoice}>
          <div className={styles.exportTitle}>导出字段配置</div>
          {getChoiceItemsView('fieldChoice')}
          <div className={styles.hasChoicedItems}>
            <div className={styles.left}>
              {/* 基本数据展示 */}
              {
                allFields?.items?.filter((item) => item.name == 'basic').flatMap((item) => item.checkSources).filter((item) => item.fieldCheck).map((item) => {
                  return (
                    <div className={styles.hasChoiceItem}>
                      <div className={styles.hasChoiceItemTitle}>{item.title}</div>
                      {
                        item.title != '姓名' && <img className={styles.hasChoiceItemImg} src={deletePng} onClick={() => { onCancelItemFieldCheck(item); }} />
                      }
                    </div>
                  );
                })
              }
            </div>
            <div className={styles.centerLine}></div>
            <div className={styles.right}>
              {
                otherChoiceFields && otherChoiceFields.length > 0 ?
                  otherChoiceFields.map((item) => {
                    return (
                      <div className={styles.hasChoiceItem}>
                        {
                          //递归显示名字
                          <div className={styles.hasChoiceItemTitle}>{item.title}</div>
                        }

                        <img className={styles.hasChoiceItemImg} src={deletePng} onClick={() => { onCancelItemFieldCheck(item); }} />
                      </div>
                    );
                  })
                  : <div className={styles.empty}>请在上方选择自定义导出字段</div>
              }
            </div>
          </div>
          <div className={styles.centerLine}></div>
          <div className={styles.exportStylesChoice}>
            <div className={styles.exportStylesTitle}>请选择导出样式</div>
            {
              ['样式1'].map((title) => {
                return (
                  <div className={styles.exportBtn}>
                    <img src={radioCheck} className='w-16 h-16' />
                    <img src={exportStylesPng} className='w-38 h-32' />
                    <div>样式一</div>
                  </div>
                );
              })
            }
          </div>
        </div>
      }
      {
        currentStep == 1 &&
        <div className={styles.rulesChoice}>
          {getChoiceItemsView('ruleChoice')}
          <div className={styles.ruleHasChoices}>
            {
              otherChoiceRules && otherChoiceRules.length > 0 ?
                otherChoiceRules.map((item) => {
                  return (
                    <div className={styles.hasChoiceItem}>
                      <div className={styles.hasChoiceItemTitle}>{item.title}</div>
                      <img className={styles.hasChoiceItemImg} src={deletePng} onClick={() => { onCancelItemRuleCheck(item); }} />
                    </div>
                  );
                })
                : <div className={styles.empty}>请在上方选择自定义导出字段</div>
            }
          </div>
        </div>
      }
      {
        currentStep == 2 &&
        <div className={styles.rulesBuild}>
          {
            allRules.map((rule, index) => {
              return getRuleView(rule, index);
            })
          }
          <div className={`flex flex-row ${styles.addRule}`} onClick={onAddRule}>
            <div>+</div>
            <div className='ml-4'>增加多组规则</div>
          </div>
        </div>
      }

      <div className={styles.bottom_steps}>
        {
          currentStep != 0 && <div className={styles.pre_step} onClick={onPreStepClick}>上一步</div>
        }
        <div className={styles.next_step} onClick={onNextStepClick}>下一步</div>
      </div>
    </div>
  );
}

export default Query;
