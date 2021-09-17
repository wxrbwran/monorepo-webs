import React, {
  FC, useState, useMemo, useRef,
} from 'react';
import { Tabs, Popconfirm } from 'antd';
// import { IDocmentItem, IDocmentItemApi } from 'typings/checkimg';
import {
  IApiDocumentItem, IApiIndexItem, IIndexItem, ISearchDocumentItem,
} from 'typings/imgStructured';
import { CloseOutlined } from '@ant-design/icons';
import SubType from '../SubType';
import SearchTypeIndex from '../SearchTypeIndex';
import CustomIndex from '../CustomIndex';
import styles from './index.scss';
// 此组件具体到，化验单或检查单panel
const { TabPane } = Tabs;
interface IProps {
  // imageId: string;
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
    inspectionCallbackFns, setCallbackFns, level1Type, initData,
  } = props;
  console.log('initDddd', initData);
  const activeType1 = useRef();
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

  // 搜索框：点击下拉框的数据【来源+单据来源】, type === 'add'表示是新添加的大分类+指标
  const handleSelectTypeIndex = (params: ISearchDocumentItem, type?: string) => {
    console.log(type);
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
          // 新勾选的指标数据，传递到指标列表组件，有则移位，无则视为添加
          // 添加情况1：新添加的大分类+指标
          // 添加情况2：此图片结构化保存后，又在这个分类下加了新指标，这会获取回显是没有新加的指标的，搜索到新指标并点击时的情况
          // @ts-ignore
          selectIndex: {
            ...params,
            indexId: params.id,
          },
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
    activeType1.current = params.documentId + params.sampleFrom;
    setActiveType(params.documentId + params.sampleFrom);
    console.log('===-2');
    setCheckTypes([...newCheckTypes]);
  };
  const handleCallbackFns = ({ type, fn, action }: ICallbackFn) => {
    if (action === 'add') {
      inspectionCallbackFns[type] = fn;
    } else if (action === 'remove') {
      delete inspectionCallbackFns[type];
    }
    setCallbackFns(inspectionCallbackFns);
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
  const handleRemoveType = (targetItem: ICheckTypesItem | ISearchDocumentItem) => {
    const targetKey = targetItem.documentId + targetItem.sampleFrom;
    const newCheckTypes = checkTypes.filter((item: ICheckTypesItem | ISearchDocumentItem) => (
      item.documentId + item.sampleFrom) !== targetKey);
    setCheckTypes(newCheckTypes);
    if (activeType1.current === targetKey && newCheckTypes.length > 0) {
      activeType1.current = newCheckTypes[0].documentId + newCheckTypes[0].sampleFrom;
      setActiveType(newCheckTypes[0].documentId + newCheckTypes[0].sampleFrom);
      console.log('===-3');
    }
  };
  const renderTabPane = useMemo(() => () => checkTypes.map(
    (item: ICheckTypesItem | ISearchDocumentItem) => (
      <TabPane
        tab={`${item.documentName}`}
        key={`${item.documentId}${item.sampleFrom}`}
        forceRender
        closeIcon={
          <Popconfirm
            title=" 关闭后，标签内全部指标数据将清空，请确认?"
            onConfirm={() => handleRemoveType(item)}
            okText="确认"
            cancelText="取消"
          >
            <CloseOutlined />
          </Popconfirm>
        }
      >
        <CustomIndex
          handleCallbackFns={handleCallbackFns}
          formKey={`${item.documentId}${item.sampleFrom}`}
          level1Type={level1Type}
          firstIndex={item.firstIndex as string}
          initList={getInitList(item)}
          selectIndex={item?.selectIndex}
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
  const handleActiveTab = (tab: string) => {
    console.log('===-1');
    activeType1.current = tab;
    setActiveType(tab);
  };
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
                // imageId={imageId}
                documentType={level1Type}
              />
              <Tabs
                activeKey={activeType}
                onChange={(tab: string) => handleActiveTab(tab)}
                type="editable-card"
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
