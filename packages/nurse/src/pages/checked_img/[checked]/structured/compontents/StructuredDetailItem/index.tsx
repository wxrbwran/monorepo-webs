import React, { FC, useState, useMemo } from 'react';
import { Tabs } from 'antd';
// import { IDocmentItem, IDocmentItemApi } from 'typings/checkimg';
import {
  IApiDocumentItem, IApiIndexItem, IIndexItem, ISearchDocumentItem,
} from 'typings/imgStructured';
import SubType from '../SubType';
import SearchTypeIndex from '../SearchTypeIndex';
import CustomIndex from '../CustomIndex';
import styles from './index.scss';
// 此组件具体到，化验单或检查单panel
const { TabPane } = Tabs;
interface IProps {
  imageId: string;
  level1Type: string; // 一级tab：HYD或JCD
  initData: IApiDocumentItem[];
  inspectionCallbackFns: any; // 保存时候的回调
  setCallbackFns: (params: {[type: string]: () => void}) => void; // 设置callback function
}
// 渲染时需要这两个字段

interface ICheckTypesItem extends IApiDocumentItem {
  sampleFrom: string;
  firstIndex: string;
}
// ICheckTypesItem保存过后init数据，接口返回的格式。ISearchDocumentItem是搜索时候接口返回的数据格式
type ICheckTypes = Array<ICheckTypesItem | ISearchDocumentItem>;
const StructuredDetailItem: FC<IProps> = (props) => {
  const {
    inspectionCallbackFns, setCallbackFns, level1Type, imageId, initData,
  } = props;
  console.log('initDddd', initData);
  let initSubType: string[] = [];
  const initCheckTypes: ICheckTypesItem[] = [];
  if (initData) {
    initData.forEach((item) => {
      initSubType.push(item.sampleFroms?.[0] as string);
      initCheckTypes.push({
        ...item,
        sampleFrom: item.sampleFroms?.[0],
        firstIndex: item.indexList?.[0]?.indexId,
      });
    });
    initSubType = [...new Set(initSubType)];
  } else {
    initSubType = level1Type === 'HYD' ? ['血液'] : [];
  }
  // 选择的【来源+单据来源】集合, tab使用
  const [checkTypes, setCheckTypes] = useState<ICheckTypes>(initCheckTypes || []);
  const [activeType, setActiveType] = useState<string>();
  const [sampleFroms, setSampleFroms] = useState<string[]>(initSubType);

  // 搜索框：点击下拉框的数据【来源+单据来源】
  const handleSelectTypeIndex = (params: ISearchDocumentItem) => {
    let newCheckTypes: ICheckTypes = [];
    let isNew = true;
    // 唯一性根据这两个指标确定： 图片大分类+子分类
    checkTypes.forEach((item: ICheckTypesItem | ISearchDocumentItem, index) => {
      if ((item.documentName === params.documentName) && (item.sampleFrom === params.sampleFrom)) {
        isNew = false;
        newCheckTypes = [...checkTypes];
        // 如果此分类已经存在，那修改下首行指标id
        newCheckTypes[index] = {
          ...item,
          firstIndex: params.id,
        };
      }
    });
    // 如果是新添加的大分类，则直接push进去
    if (isNew) {
      newCheckTypes = [
        ...checkTypes,
        {
          ...params,
          firstIndex: params.id,
        },
      ];
    }
    setCheckTypes([...newCheckTypes]);
    setActiveType(params.documentId + params.sampleFrom);
  };
  const handleCallbackFns = ({ type, fn, action }: ICallbackFn) => {
    if (action === 'add') {
      inspectionCallbackFns[type] = fn;
    } else if (action === 'remove') {
      delete inspectionCallbackFns[type];
    }
    setCallbackFns(inspectionCallbackFns);
  };
  const handleRemoveType = (targetKey: any) => {
    const newCheckTypes = checkTypes.filter((item: ICheckTypesItem | ISearchDocumentItem) => (
      item.documentId + item.sampleFrom) !== targetKey);
    setCheckTypes(newCheckTypes);
    if (activeType === targetKey) {
      setActiveType(newCheckTypes[0].documentId + newCheckTypes[0].sampleFrom);
    }
  };
  function isMedicalIndexList(arg: ICheckTypesItem | ISearchDocumentItem): arg is ICheckTypesItem {
    return (arg as ICheckTypesItem).indexList !== undefined;
  }
  const getInitList = (item: ICheckTypesItem | ISearchDocumentItem) => {
    // 有indexList表示是回显数据
    if (isMedicalIndexList(item)) {
      const { documentId, documentName } = item;
      const list: IIndexItem[] = [];
      item.indexList.forEach((indexItem: IApiIndexItem) => (
        list.push({
          ...indexItem,
          documentId,
          documentName,
          sampleFrom: item.sampleFroms[0],
          id: indexItem.indexId,
        })
      ));
      const commonList = list.filter((indexItem) => indexItem.common);
      const noCommonList = list.filter((indexItem) => !indexItem.common);
      return {
        commonItems: commonList,
        noCommonItems: noCommonList,
      };
    }
    return null;
  };
  const renderTabPane = useMemo(() => () => checkTypes.map(
    (item: ICheckTypesItem | ISearchDocumentItem) => (
      <TabPane
        tab={`${item.documentName}`}
        key={`${item.documentId}${item.sampleFrom}`}
        forceRender
      >
        <CustomIndex
          handleCallbackFns={handleCallbackFns}
          formKey={`${item.documentId}${item.sampleFrom}`}
          level1Type={level1Type}
          firstIndex={item.firstIndex as string}
          initList={getInitList(item)}
        // 单据和来源等信息,加显时，接口返回的数组格式，需要处理取第一个元素即可，也只有一个元素
          apiParams={
          {
            ...item,
            sampleFrom: isMedicalIndexList(item)
              ? item.sampleFroms[0] : item.sampleFrom,
          }
        }
        />
      </TabPane>
    ),
  ), [checkTypes]);
  return (
    <div className={styles.structure_detail_item}>
      <SubType
        leve1Type={level1Type}
        handleChangeSubType={setSampleFroms}
        initSampleFrom={initSubType}
      />
      {
          sampleFroms.length > 0 && (
            <>
              <SearchTypeIndex
                sampleFroms={sampleFroms}
                handleSelectTypeIndex={handleSelectTypeIndex}
                imageId={imageId}
                documentType={level1Type}
              />
              <Tabs
                activeKey={activeType}
                onChange={(tab: string) => setActiveType(tab)}
                type="editable-card"
                onEdit={handleRemoveType}
                hideAdd
              >
                {renderTabPane()}
              </Tabs>
            </>
          )
        }
    </div>
  );
};

export default StructuredDetailItem;
