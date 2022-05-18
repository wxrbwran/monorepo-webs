
import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { IChecked } from '../../index';
import checkChoicePng from '@/assets/img/query/check_choice.png';
import checkUnChoicePng from '@/assets/img/query/check_unchoice.png';
import { DoctorSourceType, transformDynamicToStatic } from '../../../query/util';
import { useSelector } from 'umi';
import styles from './index.scss';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';
interface IProps {
  currentField: any
  onValueChange: (items: IChecked[]) => void
  type: 'fieldChoice' | 'ruleChoice'
}

function FieldCard({ currentField, onValueChange, type }: IProps) {

  const formatData = currentField;
  // const [formatData, setFormatData] = useState<IChecked>(currentField);
  // const projectSid = window.$storage.getItem('projectSid');
  // const { projectRoleType, projectNsId, roleType } = useSelector((state: IState) => state.project.projDetail);

  const doctorSid = window.$storage.getItem('sid');
  const doctorNsId = window.$storage.getItem('nsId');
  const doctorRoleSid = window.$storage.getItem('roleId');

  const orgSid = window.$storage.getItem('orgSid');
  const orgRoleId = window.$storage.getItem('orgRole');


  const getChildChoiceItem = (item, elementArray, index, node) => {

    if (elementArray.length == index) { //无下一级了

      // console.log('==================最后一个 getChildChoiceItem ', JSON.stringify(item), item.children.length);
      return item;
    } else {
      const choiceItem = item.children.filter((i) => i.description == elementArray[index]);
      item.children = choiceItem;

      if (choiceItem.length > 0) {
        if (!choiceItem[0].name) {
          node.choiceType = choiceItem[0].type;
          // console.log('================ getChildChoiceItem item', JSON.stringify(node));
        }
        node.choiceDescription = `${node.choiceDescription ?? node.description}-${choiceItem[0].description}`;
        return getChildChoiceItem(choiceItem[0], elementArray, index + 1, node);
      } else {
        return;
      }
    }
  };

  // 单层选上了
  const onCheckChoice = (item) => {

    // choiceItemsRef.current = itemChainList;
    if (type == 'fieldChoice') {
      if (item.description == '姓名') {
        item.fieldCheck = true;
      } else {
        item.fieldCheck = !item.fieldCheck;
      }
      item.fieldUpdateTime = dayjs().valueOf() * 1000;
    } else {
      item.ruleCheck = !item.ruleCheck;
    }
    // setFormatData({ ...formatData });
    onValueChange({ ...formatData });
  };

  const reloadDynamicItem = async (targetOption) => {

    console.log('============= loadData loadData', doctorRoleSid, DoctorSourceType, targetOption.value, targetOption.parent);

    const itemsRes = await transformDynamicToStatic(targetOption.items[0], doctorSid, doctorRoleSid, doctorNsId, orgSid, orgRoleId, DoctorSourceType, targetOption.value, targetOption.parent);
    targetOption.items = [...itemsRes];

    // 对于结构化数据，需要自己组装children
    if (targetOption.name.includes('medical-img')) {

      targetOption.items.forEach((item) => {

        const reference_type = item.items.find((i) => i.name.includes('reference_type'));
        const note = item.items.find((i) => i.name.includes('note'));
        const noteDes = note?.assign?.value ?? '';
        const referenceValue = item.items.find((i) => i.name.includes('reference_value'));

        item.show = true;
        console.log('============= reference_type reference_type 结果', JSON.stringify(reference_type));
        if (reference_type?.assign?.value == 'OTHER') {  // 其他类型
          item.description = `${noteDes}${referenceValue?.assign?.value ?? ''}`;
          item.type = 'string';
        } else if (reference_type?.assign?.value == 'RANGE') {  // 范围 a-b  字符串

          const referenceSecondValue = item.items.find((i) => i.name.includes('reference_second_value'));
          const unit_value = item.items.find((i) => i.name.includes('unit_value'));

          console.log('notenotenotenote', JSON.stringify(note));
          item.description = `${noteDes}${referenceValue?.assign?.value ?? ''}~${referenceSecondValue?.assign?.value ?? ''}${unit_value?.assign?.value ?? ''}`;
          item.type = 'float';
        } else if (reference_type?.assign?.value == 'GT') {   // 大于

          const unit_value = item.items.find((i) => i.name.includes('unit_value'));

          item.description = `${noteDes}>${referenceValue?.assign?.value ?? ''}${unit_value?.assign?.value ?? ''}`;
          item.type = 'float';

        } else if (reference_type?.assign?.value == 'LT') {   // 小于

          const referenceSecondValue = item.items.find((i) => i.name.includes('reference_second_value'));
          const unit_value = item.items.find((i) => i.name.includes('unit_value'));

          item.description = `${noteDes}<${referenceSecondValue?.assign?.value ?? ''}${unit_value?.assign?.value ?? ''}`;
          item.type = 'float';

        } else if (reference_type?.assign?.value == 'AROUND') {   // 包裹 a±b

          const referenceSecondValue = item.items.find((i) => i.name.includes('reference_second_value'));
          const unit_value = item.items.find((i) => i.name.includes('unit_value'));

          item.description = `${noteDes}${referenceValue?.assign?.value ?? ''}±${referenceSecondValue?.assign?.value ?? ''}${unit_value?.assign?.value ?? ''}`;
          item.type = 'float';
        } else if (reference_type?.assign?.value == 'RADIO') {   // 单选 阴阳

          item.description = `${noteDes}${{
            'YANG': '阳',
            'YIN': '阴',
          }[referenceValue?.assign?.value] ?? ''}`;
          item.type = 'medical-img-radio';// 特色type
        } else {  // 没有参考值的情况

          item.description = `${noteDes}无参考值`;
          item.type = 'medical-img-noReference';
        }
      });
    }

    const concatChildrens = targetOption?.items ? targetOption.items?.filter(t => !!t.show).map((i: IField, idx: number) => ({
      key: `${i.name}_${idx}`,
      value: i.description,
      label: i.description,
      parent: targetOption?.description,
      parentName: targetOption?.name,
      children: [],
      isLeaf: !(i?.items && i?.items[0]?.type.includes('dynamic')),
      ...i,
    })) : [];
    targetOption.children = [...concatChildrens];


    console.log('============= loadData loadData targetOption', JSON.stringify(targetOption));

  };

  const loadData = async (selectedOptions) => {

    const targetOption = selectedOptions[selectedOptions.length - 1];

    console.log('============= loadData loadData', JSON.stringify(targetOption), targetOption?.items?.length > 0, targetOption?.items?.length > 0 && targetOption.items[0].type.includes('dynamic'));

    if (targetOption?.items?.length > 0 && targetOption.items[0].type.includes('dynamic')) {

      targetOption.loading = true;
      onValueChange({ ...formatData });


      await reloadDynamicItem(targetOption);

      targetOption.loading = false;
      onValueChange(cloneDeep(formatData));

      console.log('============= loading data 结果', JSON.stringify(targetOption));
    }


    // load options lazily
    // setTimeout(() => {
    // targetOption.loading = false;
    // targetOption.children = [
    //   {
    //     value: 'nanjing122312',
    //     label: 'Nanjing',
    //     children: [
    //       {
    //         value: 'zhonghuamen',
    //         label: 'Zhong Hua Men',
    //       },
    //     ],
    //   },
    // ];
    // // setOptions([...options]);
    // setFormatData({ ...formatData });
    // }, 300);
  };

  const onChange = async (value, selectedOptions, item) => {
    for (let options of selectedOptions) {
      const targetOption = options[options.length - 1];

      if (targetOption?.items?.length > 0 && targetOption.items[0].type.includes('dynamic')) {

        await reloadDynamicItem(targetOption);
      }
    }

    const itemChainList = [];

    const oldItems = item.cascaderChoiceItems;
    console.log('================= 旧 oldItems', oldItems);

    const cascaderChoiceValues = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index];

      const cloneItem = cloneDeep(item);
      delete cloneItem.items;
      delete cloneItem.cascaderChoiceRuleItems;
      delete cloneItem.cascaderChoiceRuleValues;
      delete cloneItem.cascaderChoiceItems;
      delete cloneItem.cascaderChoiceValues;

      const lastChildItem = getChildChoiceItem(cloneItem, element, 0, cloneItem);

      if (lastChildItem.children.length > 0) { // 还有下级可以选中了

        const nodeDescription = cloneItem.choiceDescription;
        for (let child of [...lastChildItem.children]) {

          lastChildItem.children = [child];
          cloneItem.choiceDescription = `${nodeDescription}-${child.description}`;
          cloneItem.choiceType = child.type;
          // 更新时间
          cascaderChoiceValues.push([...element, child.description]);
          itemChainList.push(cloneDeep(cloneItem));
        }
      } else {

        cascaderChoiceValues.push(element);
        itemChainList.push(cloneItem);
      }
    }

    if (type == 'fieldChoice') {
      itemChainList.forEach((itemChain, index) => {

        const oldItem = oldItems?.filter((oldTempItem) => oldTempItem.choiceDescription == itemChain.choiceDescription);
        if (oldItem?.length > 0) {
          item.fieldUpdateTime = dayjs().valueOf() * 1000;

          itemChain.fieldUpdateTime = oldItem[0].fieldUpdateTime;
        } else {  // 如果没找到，说明是新增的
          itemChain.fieldUpdateTime = dayjs().valueOf() * 1000 + index; // 防止同一时间时间相同
        }
      });

      item.cascaderChoiceItems = itemChainList;
      item.cascaderChoiceValues = cascaderChoiceValues;
    } else {
      item.cascaderChoiceRuleItems = itemChainList;
      item.cascaderChoiceRuleValues = cascaderChoiceValues;
    }
    onValueChange(cloneDeep(formatData));
  };

  const onItemClick = (item, pageAt) => {
    if (item.isLeaf == false && item.children.length == 0) { // 说明子节点是动态的，并且没有获取过，需要请求

      item.loading = true;
      onValueChange({ ...formatData });

      if (item?.items?.length > 0 && item.items[0].type.includes('dynamic')) {


        console.log('============= loading data');
        transformDynamicToStatic(item.items[0], doctorSid, doctorRoleSid, doctorNsId, orgSid, orgRoleId, DoctorSourceType, item.value).then((itemsRes) => {

          console.log('============= loading data 结果');
          // const a = itemsRes.slice(10 * pageAt, 10 * (pageAt + 1));
          item.items = [...itemsRes];
          console.log('============= loading data 结果', JSON.stringify(item.items));

          // medical-img
          const concatChildrens = item?.items ? item.items?.filter(t => !!t.show).map((i: IField, idx: number) => ({
            key: `${i.name}_${idx}`,
            value: i.description,
            label: i.description,
            parent: item?.description,
            parentName: item?.name,
            children: [],
            isLeaf: !(i?.items && i?.items[0]?.type.includes('dynamic')),
            ...i,
          })) : [];

          console.log('============= concatChildrens concatChildrens 结果', JSON.stringify(concatChildrens));

          // if (item.children.length < 100) {
          //   item.children = [...item.children, ...concatChildrens, {
          //     value: '加载更多',
          //     disabled: true,
          //     label: <button className='more' onClick={() => onItemClick(item, pageAt + 1)}>加载更多</button>,
          //   }];
          // } else {
          item.children = [...concatChildrens];
          // }
          item.loading = false;
          onValueChange({ ...formatData });

        }).catch((err) => {

          // message.error(err);
        });
      }
    }
  };

  return (
    <>
      <div className={`flex flex-row flex-wrap ${styles.fieldCard}`}>
        {
          formatData && formatData?.children?.map((item, index) => {
            // 对于结构化数据
            const noChild = item.children?.length == 0 && (((item.items?.length ?? 0) == 0 || !item?.items[0].type.includes('dynamic')));
            if (noChild) {
              return (
                <div className='flex flex-row items-center w-200 mt-15 mb-15 mr-15' onClick={() => { onCheckChoice(item); }}>
                  <img src={(type == 'fieldChoice' ? item.fieldCheck : item.ruleCheck) ? checkChoicePng : checkUnChoicePng} height="16" />
                  <div className='ml-10' title={item.choiceDescription ? item.description : undefined}>{
                    item.choiceDescription ?? item.description
                  } </div>
                </div>
              );
            } else {
              if (index == 0) {
                console.log('============== item.children item.children', item.children.length);
              }
              // styles.hasMoreCascader `${item.children.length % 10 > 0 ?  : ''
              // dropdownClassName={styles.hasMoreCascader} 
              return (
                <Cascader options={item.children} loadData={loadData} onChange={(value, selectedOptions) => onChange(value, selectedOptions, item)} multiple value={type == 'fieldChoice' ? item.cascaderChoiceValues : item.cascaderChoiceRuleValues}>
                  <div className='flex flex-row items-center w-200 mt-15 mb-15' onClick={() => onItemClick(item, 0)}>
                    <img src={(type == 'fieldChoice' ? item.fieldCheck : item.ruleCheck) ? checkChoicePng : checkUnChoicePng} height="16" />
                    <div className='ml-10'>{item.description}</div>
                    {
                      item.loading && <LoadingOutlined />
                    }
                  </div>
                </Cascader>
              );
            }
          })
        }
      </div>
    </>
  );
}

export default FieldCard;

