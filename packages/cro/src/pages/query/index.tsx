import React, { useState, useEffect, useRef } from 'react';
import * as api from '@/services/api';
import { message, Checkbox, Steps, DatePicker, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'umi';
import FieldCard from './components/field_card';
import { numberOperationType, rangNumberOperationType, ResearchSourceType, stringOperationType, transformDynamicToStatic, transformQueryPageAllRuleToFetchQueryIdRules, utilNumType, utilStringType, utilYesNoType } from './util';
import styles from './index.scss';
import { IState } from 'typings/global';
import radioCheck from '@/assets/img/radio_check.png';
import deletePng from '@/assets/img/delete.png';
import exportStylesPng from '@/assets/img/export_styles.jpg';
import addPng from '@/assets/img/add.png';
import deleteBluePng from '@/assets/img/delete_blue.png';
import dayjs from 'dayjs';
import { cloneDeep, isEmpty } from 'lodash';
import moment from 'moment';
import QueryResult from './query_result';


import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
const { RangePicker } = DatePicker;
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

  const [currentStep, setCurrentStep] = useState<number>(0);

  const dispatch = useDispatch();
  const projectSid = window.$storage.getItem('projectSid');
  const { projectRoleType, projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);

  const [allFields, setAllFields] = useState<IFields>(); // 所有节点
  const [activeField, setActiveField] = useState<IFields>(); // 选中的节点
  const [searchRangeItems, setSearchRangeItems] = useState<any>([]); // 查询范围节点
  const [searchTimeRange, setSearchTimeRange] = useState<string[]>();  // 查询时间范围
  const [resultKey, setResultKey] = useState<string>(); // 查询结果
  const queryResultRef = useRef();



  const defaultItem = {
    name: null,
    operation: null,
    value: '',
    min: '',
    max: '',
    optionArray: [],
    unit: '',
    uid: '',
    time: dayjs(),
    description: '',
  };
  const [allRules, setAllRules] = useState<any[]>([
    {
      items: [
        { ...defaultItem },
      ],
    },
  ]);

  const fillChildItemsAndChildren = async (fatherItem) => {

    if (fatherItem.items?.length > 0) {

      if (fatherItem.items[0].type.includes('dynamic')) {
        const childItems = await transformDynamicToStatic(fatherItem?.items[0], projectSid, projectRoleType, ResearchSourceType);
        fatherItem.items = [...childItems];
      }

      if (fatherItem.children == undefined) {
        // 将所有数据都添加上formateData
        const tempData = fatherItem?.items?.filter(f => !!f.show).map((itemTemp: IField, index: number) => {
          const description = (itemTemp?.name?.includes('objective') || itemTemp?.name?.includes('visit_objective')) ? itemTemp.description.replace(/<[^>]+>/g, '') : itemTemp.description;

          console.log('============= description description', description);
          return (
            {
              key: `${itemTemp.name}_${index}`,
              fieldCheck: itemTemp.description == '姓名',
              fieldUpdateTime: itemTemp.description == '姓名' ? dayjs().valueOf() : undefined,
              parent: fatherItem?.description,
              parentName: fatherItem?.name,
              value: description,
              label: itemTemp.description,
              children: itemTemp?.items ? itemTemp.items?.filter(t => !!t.show).map((childItem: IField, idx: number) => ({
                key: `${childItem.name}_${index + 1}${idx}`,
                value: childItem.description,
                label: childItem.description,
                parent: itemTemp?.description,
                parentName: itemTemp?.name,
                children: [],
                isLeaf: !(childItem?.items && childItem?.items[0]?.type.includes('dynamic')),
                ...childItem,
              })) : [],
              isLeaf: ['终点事件'].includes(fatherItem.description) ? false : !(itemTemp?.items && itemTemp?.items[0].type.includes('dynamic')),
              disabled: itemTemp?.items && itemTemp?.items[0].type.includes('dynamic') && itemTemp?.items.length === 1,
              ...itemTemp,
              choiceDescription: description.length > 25 ? description.slice(0, 25) + '...' : undefined,
              description: description,
            }
          );
        });
        fatherItem.children = tempData;
      }
    }
  };

  const fetchField = async () => {

    const res = await api.query.fetchFields('RESEARCH');
    let allItems = res.keys[0];
    const searchRangeTemp = allItems.items.filter((item) => item.name == 'team');
    if (searchRangeTemp.length > 0) {
      const items = await transformDynamicToStatic(searchRangeTemp[0], projectSid, projectRoleType, ResearchSourceType);
      if (items.length > 0) {
        items[0].checked = true;
      }
      setSearchRangeItems(items);
    }

    console.log('====================== allItems, ', JSON.stringify(allItems));
    const allItemsTempChild = allItems.items.filter((item) => item.name != 'team');
    allItems.items = allItemsTempChild;

    await fillChildItemsAndChildren(allItems.items[0]);
    setAllFields({ ...allItems });
    setActiveField(allItems.items[0]);
  };

  useEffect(() => {
    // 获取数据
    fetchField();
  }, []);

  const handleChangeActiveField = async (item: IFieldItem, index: number) => {
    const FIELDCARD = document.getElementById('FIELD_CARD');
    if (FIELDCARD) {
      setTimeout(() => {
        FIELDCARD.scrollTop = 999999;
      }, 300);
    }
    if (activeField.name == item.name) {
      return;
    }

    // 判断item是否需要获取子item
    console.log('================ handleChangeActiveField ', JSON.stringify(item));
    await fillChildItemsAndChildren(item);
    setActiveField(item);
  };

  const onValueChange = (items: IFields) => {

    // 刷新当前页面的值
    setActiveField(items);
    const needChangeItem = allFields?.items?.filter((item) => item.name == items.name);

    if (needChangeItem?.length > 0) {
      const index = allFields?.items.indexOf(needChangeItem[0]);
      allFields?.items.splice(index, 1, items);
      setAllFields(allFields);
    }
  };

  const getChoiceItemsView = (type: 'fieldChoice' | 'ruleChoice') => {
    return (
      <div className={styles.choiceItems}>
        <div className={styles.left}>
          {allFields && allFields?.items?.map((item, index) => (
            <div
              className={`${activeField?.name == item.name ? styles.active : ''} ${styles.field}`}
              title={item.choiceDescription ?? item.description}
              onClick={() => handleChangeActiveField(item, index)}
            >
              {item.choiceDescription ?? item.description}
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

  //#region  Step 0
  const otherSingleItems = allFields?.items?.filter((item) => item.name != 'basic').flatMap((item) => item.children).filter((item) => item?.fieldCheck) ?? [];
  const choiceMuiltItems = allFields?.items?.filter((item) => item.children?.find((i) => i.cascaderChoiceItems?.length > 0)).flatMap((item) => item.children).filter((item) => item.cascaderChoiceItems?.length > 0).flatMap((item) => item.cascaderChoiceItems) ?? [];
  const otherChoiceFields = [...otherSingleItems, ...choiceMuiltItems];

  const options = searchRangeItems.map((item: IItem) => ({
    label: item.description,
    value: item.description,
  }));
  const des = searchRangeItems.filter((item) => item.checked).map(item => item.description);

  const handleChangeGroup = (checkedValues: any[]) => {

    searchRangeItems.forEach((item) => {
      if (checkedValues.includes(item.description)) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    setSearchRangeItems([...searchRangeItems]);
  };

  const onCancelItemFieldCheck = (deletedItem) => {

    console.log('==============  onCancelItemFieldCheck ');
    if (deletedItem.children.length > 0) { // 多层级的item删除

      const cancelNode = allFields?.items?.filter((item) => item.children?.find((i) => i.key == deletedItem.key));

      if (cancelNode?.length > 0) {
        const cancelChild = cancelNode[0].children.filter((i) => i.key == deletedItem.key);

        console.log('================== cancelChild cancelChild', JSON.stringify(cancelChild));

        if (cancelChild.length > 0) {

          const index = cancelChild[0].cascaderChoiceItems.indexOf(deletedItem);
          cancelChild[0].cascaderChoiceItems.splice(index, 1);
          cancelChild[0].cascaderChoiceValues.splice(index, 1);
        }
      }
      setAllFields((preState) => { return cloneDeep(preState); });
      setActiveField(cloneDeep(activeField));
    } else {

      deletedItem.fieldCheck = false;
      setAllFields((preState) => { return { ...preState }; });
    }
  };

  const SortableItem = SortableElement(({ item }) => (

    <div className={styles.hasChoiceItem}>
      <div className={styles.hasChoiceItemTitle} title={item.choiceDescription && item.description.length > item.choiceDescription.length ? item.description : undefined}>{item.choiceDescription ?? item.description}</div>
      {
        item.description != '姓名' && <img className={styles.hasChoiceItemImg} src={deletePng} onClick={() => { onCancelItemFieldCheck(item); }} />
      }
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <div className={styles.container}>
      {items?.map((item, index) => (
        <SortableItem
          key={`${item.choiceDescription ?? item.description}`}
          index={index}
          item={item}
        />
      ))}
    </div>
  ));


  const onSortEnd = (array, oldIndex, newIndex) => {

    console.log('================== onSortEnd onSortEnd', JSON.stringify(array));
    console.log('================== oldIndex newIndex', oldIndex, newIndex);

    if (oldIndex > newIndex) {  // 将元素往前挪

      const tempTiem = array[newIndex].fieldUpdateTime;
      for (let index = newIndex; index < oldIndex; index++) {
        array[index].fieldUpdateTime = array[index + 1].fieldUpdateTime;
      }
      array[oldIndex].fieldUpdateTime = tempTiem;
    } else { // // 将元素往后挪  1  4 

      const tempTiem = array[newIndex].fieldUpdateTime;
      for (let index = newIndex; index > oldIndex; index--) {
        array[index].fieldUpdateTime = array[index - 1].fieldUpdateTime;
      }
      array[oldIndex].fieldUpdateTime = tempTiem;
    }
    console.log('================== onSortEnd onSortEnd', JSON.stringify(array));
    setAllFields((preState) => { return cloneDeep(preState); });
  };

  const basicStep0Arr = allFields?.items?.filter((item) => item.name == 'basic').flatMap((item) => item.children)?.filter((item) => item?.fieldCheck).sort((a, b) => a.fieldUpdateTime - b.fieldUpdateTime);
  const step0View = () => {

    return (
      <div>

        <div className={`${styles.searchRange} flex flex-row ml-50 mr-50 mb-10 h-66 items-center`}>
          <div className={`mr-20 ml-20 ${styles.searchRangeTitle}`}>查询范围:</div>
          {
            <CheckboxGroup
              options={options}
              onChange={handleChangeGroup}
              value={des}
            />
          }
        </div>

        <div className={styles.fieldsChoice}>
          <div className={styles.exportTitle}>导出字段配置</div>
          {getChoiceItemsView('fieldChoice')}
          <div className={styles.hasChoicedItems}>
            <div className={styles.left}>
              {/* 基本数据展示 */}
              <SortableList
                distance={1}
                items={basicStep0Arr}
                onSortEnd={({ oldIndex, newIndex }) => { onSortEnd(basicStep0Arr, oldIndex, newIndex); }}
                axis="xy"
                helperClass={styles.SortableHelper}
              />
              {/* {
                allFields?.items?.filter((item) => item.name == 'basic').flatMap((item) => item.children)?.filter((item) => item?.fieldCheck)?.map((item) => {
                  return (
                    <div className={styles.hasChoiceItem}>
                      <div className={styles.hasChoiceItemTitle}>{item.choiceDescription ?? item.description}</div>
                      {
                        item.description != '姓名' && <img className={styles.hasChoiceItemImg} src={deletePng} onClick={() => { onCancelItemFieldCheck(item); }} />
                      }
                    </div>
                  );
                })
              } */}
            </div>
            <div className={styles.centerLine}></div>
            <div className={styles.right}>
              {
                otherChoiceFields && otherChoiceFields.length > 0 ?

                  <SortableList
                    distance={1}
                    items={otherChoiceFields.sort((a, b) => a.fieldUpdateTime - b.fieldUpdateTime)}
                    onSortEnd={({ oldIndex, newIndex }) => { onSortEnd(otherChoiceFields.sort((a, b) => a.fieldUpdateTime - b.fieldUpdateTime), oldIndex, newIndex); }}
                    axis="xy"
                    helperClass={styles.SortableHelper}
                  />

                  // otherChoiceFields.map((item) => {
                  //   console.log('============= item.choiceDescription', item.choiceDescription);
                  //   return (
                  //     <div className={styles.hasChoiceItem}>
                  //       <div className={styles.hasChoiceItemTitle}>{item.choiceDescription ?? item.description}</div>
                  //       <img className={styles.hasChoiceItemImg} src={deletePng} onClick={() => { onCancelItemFieldCheck(item); }} />
                  //     </div>
                  //   );
                  // })
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
      </div>
    );
  };
  //#endregion


  // 查询字段数据
  const otherSingleRules = allFields?.items?.flatMap((item) => item.children).filter((item) => item?.ruleCheck) ?? [];
  const choiceMuiltRules = allFields?.items?.filter((item) => item.children?.find((i) => i.cascaderChoiceRuleItems?.length > 0)).flatMap((item) => item.children).filter((item) => item.cascaderChoiceRuleItems?.length > 0).flatMap((item) => item.cascaderChoiceRuleItems) ?? [];
  const otherChoiceRules = [...otherSingleRules, ...choiceMuiltRules];

  //#region  Step 1

  // 查询字段选择
  const onCancelItemRuleCheck = (deletedItem) => {

    if (deletedItem.children.length > 0) { // 多层级的item删除


      const cancelNode = allFields?.items?.filter((item) => item.children?.find((i) => i.key == deletedItem.key));

      if (cancelNode?.length > 0) {
        const cancelChild = cancelNode[0].children.filter((i) => i.key == deletedItem.key);

        console.log('================== cancelChild cancelChild', JSON.stringify(cancelChild));

        if (cancelChild.length > 0) {

          const index = cancelChild[0].cascaderChoiceRuleItems.indexOf(deletedItem);
          cancelChild[0].cascaderChoiceRuleItems.splice(index, 1);
          cancelChild[0].cascaderChoiceRuleValues.splice(index, 1);
        }
      }
      setAllFields((preState) => { return cloneDeep(preState); });
      setActiveField(cloneDeep(activeField));
    } else {

      deletedItem.ruleCheck = false;
      setAllFields((preState) => { return { ...preState }; });
    }
  };

  const step1View = () => {

    return (
      <div className={styles.rulesChoice}>
        {getChoiceItemsView('ruleChoice')}
        <div className={styles.ruleHasChoices}>
          {
            otherChoiceRules && otherChoiceRules.length > 0 ?
              otherChoiceRules.map((item) => {
                return (
                  <div className={styles.hasChoiceItem}>
                    <div className={styles.hasChoiceItemTitle} title={item.choiceDescription && item.description.length > item.choiceDescription.length ? item.description : undefined}>{item.choiceDescription ?? item.description}</div>
                    <img className={styles.hasChoiceItemImg} src={deletePng} onClick={() => { onCancelItemRuleCheck(item); }} />
                  </div>
                );
              })
              : <div className={styles.empty}>请在上方选择自定义导出字段</div>
          }
        </div>
      </div>
    );
  };
  //#endregion


  //#region  Step 2

  const onTimeRangeChange = (_value, dateString) => {

    setSearchTimeRange(dateString);
  };

  const onDeleteRule = (ruleIndex) => {

    allRules.splice(ruleIndex, 1);
    setAllRules([...allRules]);
  };

  const onCopyClick = (ruleIndex) => {

    setAllRules([...allRules, cloneDeep(allRules[ruleIndex])]);
  };

  const getRuleItemType = (ruleItem) => {
    // 字符串、数字、'medical-img-noReference','medical-img-radio'
    if ([...utilNumType, ...utilStringType, ...utilYesNoType, 'medical-img-noReference', 'medical-img-radio'].includes(ruleItem.name?.choiceType ?? ruleItem.name?.type)) {
      return ruleItem.name?.choiceType ?? ruleItem.name?.type;
    } else {  // 其他从子item里拿类型
      const effectItems = ruleItem.name?.items?.filter((item) => [...utilNumType, ...utilStringType].includes(item.type));
      if (effectItems?.length > 0) {
        return effectItems[0].type;
      } else {
        return ruleItem.name?.choiceType ?? ruleItem.name?.type;
      }
    }
  };

  function isNumber(inputData) {

    const floatNumber = parseFloat(inputData).toString();
    if (floatNumber == 'NaN') { // 除掉空格情况
      return false;
    }
    // '1a  ' 能被转成 '1'
    if (floatNumber.length == inputData.length) {
      return true;
    } else {
      return false;
    }
  }

  const generateDIYOptionArray = (ruleItem, target?) => {
    if (target) {
      // 数字类型要求只能是数字, medical-img-noReference选择的操作符在numberOperationType中，也算数字类型
      if (utilNumType.includes(getRuleItemType(ruleItem)) || ('medical-img-noReference' == getRuleItemType(ruleItem) && numberOperationType.includes(ruleItem.operation))) {
        if (isNumber(target)) {
          return [{
            value: target,
            description: target,
          }];
        } else {
          return [];
        }
      } else {
        return [{
          value: target,
          description: target,
        }];
      }
    } else {
      return [];
    }
  };

  const handleSelectSearch = async (ruleItem, target?) => {

    if (!ruleItem?.name) { // 如果没选查询item，不能搜索
      return;
    }
    // 如果是银
    // 'medical-img-noReference';medical-img-radio
    if (getRuleItemType(ruleItem) == 'medical-img-noReference') {
      ruleItem.optionArray = generateDIYOptionArray(ruleItem, target);
    } else if (getRuleItemType(ruleItem) == 'medical-img-radio') {
      ruleItem.optionArray = [{
        value: '阴',
        description: '阴',
      }, {
        value: '阳',
        description: '阳',
      }];
    } else {
      const res = await api.query.fetchKvScope({ kp: ruleItem.name.name, target, sourceType: ResearchSourceType });

      console.log('=============== handleSelectSearch res', res);
      // 搜索
      if (res?.values?.length > 0) {
        ruleItem.optionArray = res.values;
      } else {
        ruleItem.optionArray = generateDIYOptionArray(ruleItem, target);
      }

      console.log('=============== handleSelectSearch res', ruleItem.optionArray);
    }
    setAllRules(cloneDeep(allRules));
  };

  const handleSelectNameChange = async (ruleItem, value) => {

    const filterRuleItems = otherChoiceRules.filter((item) => `${item.key}_zsh_${item.choiceDescription ?? item.description}` == value);
    if (filterRuleItems.length > 0) {
      ruleItem.name = filterRuleItems[0];
      if ([...utilNumType, ...utilYesNoType, 'medical-img-noReference', 'medical-img-radio'].includes(getRuleItemType(ruleItem))) {
        ruleItem.operation = '='; // 数字、medical-img-noReference', 'medical-img-radio'类型 默认是=
      } else if (utilStringType.includes(getRuleItemType(ruleItem))) {
        ruleItem.operation = '包含'; // 默认值
      } else {
        ruleItem.operation = '无'; // 默认值
      }

      // 清空旧值
      ruleItem.value = '';
      ruleItem.min = '';
      ruleItem.max = '';
      ruleItem.optionArray = [];
      ruleItem.unit = '';
      ruleItem.uid = '';
      ruleItem.description = '';
    }

    await handleSelectSearch(ruleItem);
    setAllRules(cloneDeep(allRules));

    console.log(`selected allRule ${JSON.stringify(allRules)}`);
  };

  const handleSelectOperationChange = (ruleItem, value) => {

    console.log(`handleSelectOperationChange value ${JSON.stringify(value)}`);
    // 当字符串类型改为数字类型时，value和optionArray情空
    if (stringOperationType.includes(ruleItem.operation) && numberOperationType.includes(value)) {
      ruleItem.value = '';
      ruleItem.optionArray = [];
      ruleItem.description = '';
    }
    ruleItem.operation = value;
    setAllRules(cloneDeep(allRules));
    console.log(`selected allRule ${JSON.stringify(allRules)}`);
  };

  const canRangeValueChanged = (ruleItem, min, max) => {
    // 数字类型要求只能是数字, medical-img-noReference选择的操作符在numberOperationType中，也算数字类型
    if (min && min != '' && max && max != '') {
      if (utilNumType.includes(getRuleItemType(ruleItem)) || ('medical-img-noReference' == getRuleItemType(ruleItem) && numberOperationType.includes(ruleItem.operation))) {

        if (Number(min) >= Number(max)) {
          message.error('选择范围最小值应小于最大值');
          return false;
        }
      }
    }
    return true;
  };

  const handleSelectMinChange = (ruleItem, description) => {

    const opts = ruleItem.optionArray.filter((opt) => (opt.description || opt.value) == description);
    if (opts.length > 0) {

      console.log(`handleSelectValueChange opts ${JSON.stringify(opts[0])}`);
      const { value, unit, uid } = opts[0];

      if (canRangeValueChanged(ruleItem, value, ruleItem.max)) {
        ruleItem.min = value;
        ruleItem.unit = unit || ruleItem.unit;
        ruleItem.uid = uid;

        setAllRules(cloneDeep(allRules));
        console.log(`selected allRule ${JSON.stringify(allRules)}`);
      }
    }
  };

  const handleSelectMaxChange = (ruleItem, description) => {

    const opts = ruleItem.optionArray.filter((opt) => (opt.description || opt.value) == description);
    if (opts.length > 0) {

      console.log(`handleSelectValueChange opts ${JSON.stringify(opts[0])}`);
      const { value, unit, uid } = opts[0];

      if (canRangeValueChanged(ruleItem, ruleItem.min, value)) {
        ruleItem.max = value;
        ruleItem.unit = unit || ruleItem.unit;
        ruleItem.uid = uid;

        setAllRules(cloneDeep(allRules));
        console.log(`selected allRule ${JSON.stringify(allRules)}`);
      }
    }
  };

  const handleSelectValueChange = (ruleItem, desc) => {

    const opts = ruleItem.optionArray.filter((opt) => (opt.description || opt.value) == desc);
    if (opts.length > 0) {

      console.log(`handleSelectValueChange opts ${JSON.stringify(opts[0])}`);
      const { value, unit, uid, description } = opts[0];

      ruleItem.value = value;
      ruleItem.unit = unit || ruleItem.unit;
      ruleItem.uid = uid;
      ruleItem.description = description;

      setAllRules(cloneDeep(allRules));
      console.log(`selected allRule ${JSON.stringify(allRules)}`);
    }
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
          rule.items.map((ruleItem, itemIndex) => {

            return (
              <div className={styles.item} key={JSON.stringify(ruleItem.time)}>
                <Select className={styles.name} value={ruleItem.name ? `${ruleItem.name.key}_zsh_${ruleItem.name.choiceDescription ?? ruleItem.name.description}` : ''} onChange={(value) => handleSelectNameChange(ruleItem, value)}>
                  {
                    otherChoiceRules?.map((choiceRuleItem) => {
                      return <Option key={`${choiceRuleItem.key}_zsh_${choiceRuleItem.choiceDescription ?? choiceRuleItem.description}`} value={`${choiceRuleItem.key}_zsh_${choiceRuleItem.choiceDescription ?? choiceRuleItem.description}`}>{choiceRuleItem.choiceDescription ?? choiceRuleItem.description}</Option>;
                    })
                  }
                </Select>
                {
                  getRuleItemType(ruleItem) == 'medical-img-noReference' ?
                    <Select className={styles.operation} value={ruleItem.operation ?? ''} onChange={(value) => handleSelectOperationChange(ruleItem, value)}>
                      {
                        [...numberOperationType, ...stringOperationType].map((choiceRuleOperation) => {
                          return <Option key={choiceRuleOperation} value={choiceRuleOperation}>{choiceRuleOperation}</Option>;
                        })
                      }
                    </Select>
                    :
                    <>
                      {
                        utilNumType.includes(getRuleItemType(ruleItem)) ?
                          <Select className={styles.operation} value={ruleItem.operation ?? ''} onChange={(value) => handleSelectOperationChange(ruleItem, value)}>
                            {
                              numberOperationType.map((choiceRuleOperation) => {
                                return <Option key={choiceRuleOperation} value={choiceRuleOperation}>{choiceRuleOperation}</Option>;
                              })
                            }
                          </Select>
                          : <Input className={styles.operation} value={ruleItem.operation} disabled></Input>
                      }
                    </>
                }
                {
                  rangNumberOperationType.includes(ruleItem.operation) ?
                    <>
                      <Select className={styles.value} showSearch value={ruleItem.min ? `${ruleItem.min}${ruleItem.unit}` : ''} onChange={(value) => handleSelectMinChange(ruleItem, value)} onSearch={(value) => handleSelectSearch(ruleItem, value)}>
                        {
                          ruleItem.optionArray?.map((opt) => {
                            return <Option key={`${opt.description || opt.value}`} value={`${opt.description || opt.value}`}>{`${opt.description || opt.value}`}</Option>;
                          })
                        }
                      </Select>
                      -
                      <Select className={styles.value} showSearch value={ruleItem.max ? `${ruleItem.max}${ruleItem.unit}` : ''} onChange={(value) => handleSelectMaxChange(ruleItem, value)} onSearch={(value) => handleSelectSearch(ruleItem, value)}>
                        {
                          ruleItem.optionArray?.map((opt) => {
                            return <Option key={`${opt.description || opt.value}`} value={`${opt.description || opt.value}`}>{`${opt.description || opt.value}`}</Option>;
                          })
                        }
                      </Select>
                    </>
                    :
                    <Select className={styles.value} showSearch value={ruleItem.description ? ruleItem.description : ruleItem.value ? `${ruleItem.value}${ruleItem.unit}` : ''} onChange={(value) => handleSelectValueChange(ruleItem, value)} onSearch={(value) => handleSelectSearch(ruleItem, value)}>
                      {
                        ruleItem.optionArray?.map((opt) => {
                          return <Option key={`${opt.description || opt.value}`} value={`${opt.description || opt.value}`}>{`${opt.description || opt.value}`}</Option>;
                        })
                      }
                    </Select>
                }
                {
                  itemIndex == 0 ?
                    <>
                      <div className={styles.add} onClick={() => onAddItem(ruleIndex, itemIndex)}>
                        <img src={addPng} className='w-16 h-16 ml-10' />
                        <div className='ml-4'>增加</div>
                        <div className={`ml-4 ${styles.addRuleTips}`}>*同组之间为 且 关系</div>
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

  const onAddRule = () => {

    setAllRules([...allRules, {
      items: [
        { ...defaultItem },
      ],
    }]);
  };

  const onDisabledDate = (current) => {
    // Can not select days before today and today

    console.log('======== current', current);
    return current && current > moment().endOf('minute');
  };

  const step2View = () => {
    return (
      <div className={styles.rulesBuild}>
        {/* 查询时间范围和查询对象 */}

        <div className='flex flex-row ml-65 mt-30 mb-30'>
          <div className='mr-10'>查询时间范围:</div>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onTimeRangeChange}
            disabledDate={onDisabledDate}
            value={searchTimeRange?.length == 2 ? [moment(searchTimeRange[0]), moment(searchTimeRange[1])] : []}
          />
        </div>

        <div className={styles.step3ruleHasChoices}>
          {
            otherChoiceRules && otherChoiceRules.length > 0 ?
              otherChoiceRules.map((item) => {
                return (
                  <div className={styles.hasChoiceItem}>
                    <div className={styles.hasChoiceItemTitle} title={item.choiceDescription && item.description.length > item.choiceDescription.length ? item.description : undefined}>{item.choiceDescription ?? item.description}</div>
                  </div>
                );
              })
              : <div className={styles.empty}>请在上方选择自定义导出字段</div>
          }
        </div>

        {
          allRules.map((rule, index) => {
            return getRuleView(rule, index);
          })
        }
        <div className='flex flex-row'>
          <div className={`flex flex-row ${styles.addRule}`} onClick={onAddRule}>
            <div>+</div>
            <div className='ml-4'>增加多组规则</div>
          </div>
          <div className={`ml-4 ${styles.ruleTips}`}>*不同组规则之间为 或 关系</div>
        </div>

      </div>
    );
  };
  //#endregion


  const onNextStepClick = async () => {

    if (currentStep == 0) {

      const checkedSearchs = searchRangeItems.filter((item) => item.checked);
      if (checkedSearchs?.length == 0) {
        message.error('请选择您要查询的范围');
        return;
      }
    }
    if (currentStep == 1 && otherChoiceRules.length == 0) {  //查询字段不能为空
      message.error('请选择您要查询的字段');
      return;
    }

    // 查询字段修改后，
    if (currentStep == 1) {
      for (const rule of allRules) {

        const choiceItems = rule.items.filter((item) => otherChoiceRules.find(choiceRule => `${choiceRule.key}_zsh_${choiceRule.choiceDescription ?? choiceRule.description}` == `${item.name?.key}_zsh_${item.name?.choiceDescription ?? item.name?.description}`));
        rule.items = choiceItems;
      }
      const newRules = allRules.filter((rule) => rule.items?.length > 0);
      console.log('============== newRules newRules', JSON.stringify(newRules));
      if (newRules.length > 0) {
        setAllRules(newRules);
      } else {
        setAllRules([
          {
            items: [
              { ...defaultItem },
            ],
          },
        ]);
      }
    }

    if (currentStep == 2) { // 构造出来的查询条件需要

      for (const rule of allRules) {
        for (const item of rule.items) {
          if (!item.name) {
            message.error('请补全您的查询条件');
            return;
          }

          if (rangNumberOperationType.includes(item.operation) && (item.min == '' || item.max == '')) {

            console.log('=============== 1 item', JSON.stringify(item));
            console.log('=============== 2', rangNumberOperationType.includes(item.operation), (item.min == '' || item.max == ''));
            message.error('请补全您的查询条件 1');
            return;
          }

          if ((numberOperationType.filter((type) => !rangNumberOperationType.includes(type))).includes(item.operation) && item.value == '') {

            console.log('=============== 3 item', JSON.stringify(item));
            console.log('=============== 3', numberOperationType.includes(item.operation), item.value == '');
            message.error('请补全您的查询条件 3');
            return;
          }

          if (stringOperationType.includes(item.operation) && item.value === '') {

            console.log('=============== 2 item', JSON.stringify(item));
            console.log('=============== 2', stringOperationType.includes(item.operation), item.value == '');
            message.error('请补全您的查询条件 2');
            return;
          }
        }
      }
      const otherSingleFields = allFields?.items?.flatMap((item) => item.children).filter((item) => item?.fieldCheck) ?? [];
      const searchField = [...otherSingleFields, ...choiceMuiltItems].sort((a, b) => a.fieldUpdateTime - b.fieldUpdateTime);
      const rules = transformQueryPageAllRuleToFetchQueryIdRules(allRules, searchTimeRange, projectSid, allFields, searchRangeItems, searchField);

      if (rules) {

        const params: any = {
          rules: rules,
          meta: {
            sourceType: 4,
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
          },
        };
        const head = await api.query.fetchQueryId(params);
        dispatch({
          type: 'query/setQueryHead',
          payload: head.tableHead,
        });
        setResultKey(head.resultKey);
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const onPreStepClick = () => {

    // 如果是查询结果页面返回上一页，清空历史数据
    if (currentStep == 3) {

      console.log('============= currentStep===');
      queryResultRef.current.setQueryStop();
      setResultKey(undefined);
      // dispatch({
      //   type: 'query/setIsQueryStop',
      // });
    }
    setCurrentStep(currentStep - 1);
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
        step0View()
      }
      {
        currentStep == 1 &&
        step1View()
      }
      {
        currentStep == 2 &&
        step2View()
      }
      {
        currentStep == 3 &&
        <QueryResult
          ref={queryResultRef}
          param={{ query: { resultKey } }}
        />
      }
      <div className={styles.bottom_steps}>
        {
          currentStep != 0 && <div className={styles.pre_step} onClick={onPreStepClick}>上一步</div>
        }
        {
          currentStep < 3 && <div className={styles.next_step} onClick={onNextStepClick}>下一步</div>
        }
      </div>
    </div>
  );
}

export default Query;
