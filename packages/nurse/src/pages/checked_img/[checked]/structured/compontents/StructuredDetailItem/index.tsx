import React, {
  FC, useState, useMemo, useRef, useEffect,
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
import SearchHospital from '@/components/SearchHospital';
import ItemDate from '../ItemDate';
import { isEmpty } from 'lodash';
import styles from './index.scss';
// 此组件具体到，化验单或检查单panel
const { TabPane } = Tabs;
interface IProps {
  imageId: string;
  outTypeAndInx: string;// 一级tab
  outType: string;
  initData: {
    documentList: IApiDocumentItem[];
    orgId: string;
    orgName: string;
    outType: string;
    unknownReport?: boolean;
    measuredAt?: number;
  };
  inspectionCallbackFns: any; // 保存时候的回调
  setCallbackFns: (params: { [type: string]: () => void }) => void; // 设置callback function
  isViewOnly: boolean;
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
    inspectionCallbackFns, setCallbackFns, outTypeAndInx, outType, initData, imageId, isViewOnly,
  } = props;
  console.log('initDddd', initData);
  const activeType1 = useRef('');
  let initSubType: string[] = [];
  const initCheckTypes: ICheckTypesItem[] = [];
  if (!isEmpty(initData)) {
    initData.documentList.forEach((item) => {
      initSubType.push(item.sampleFroms?.[0] as string);
      initCheckTypes.push({
        ...item,
        sampleFrom: item.sampleFroms?.[0],
        firstIndex: item.indexList?.[0]?.indexId,
      });
    });
    initSubType = [...new Set(initSubType)];
  } else {
    initSubType = ['血液'];
  }
  // 选择的【来源+单据来源】集合, tab使用
  const [checkTypes, setCheckTypes] = useState<ICheckTypes>(initCheckTypes || []);
  const [activeType, setActiveType] = useState<string>();
  const [sampleFroms, setSampleFroms] = useState<string[]>(initSubType);
  const documentsCallbackFns = useRef({});
  const timeAndOrg = useRef({
    measuredAt: initData?.measuredAt || new Date().getTime(),
    unknownReport: initData?.unknownReport,
    orgId: initData?.orgId,
    orgName: initData?.orgName,
  });

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
  useEffect(() => {
    console.log('level1Type', outTypeAndInx);
    inspectionCallbackFns[outTypeAndInx] = () => new Promise((resolve) => {
      Promise.all(Object.values(documentsCallbackFns.current)
        .map((fn) => fn())).then((documentList) => {
        // console.log('hospital', hospital);
        resolve({
          documentList,
          imageId,
          ...timeAndOrg.current,
          outType,
          operatorId: window.$storage.getItem('sid'),
          sid: window.$storage.getItem('patientSid'),
          wcId: window.$storage.getItem('patientWcId'),
        });
      });
    });
    // inspectionCallbackFns浅拷贝，不执行下面setCallbackFns， 也可以。
    setCallbackFns(inspectionCallbackFns);
    return () => {
      // 删除掉此tab要delete掉此项
      delete inspectionCallbackFns[outTypeAndInx];
      setCallbackFns(inspectionCallbackFns);
    };
  }, []);
  // 获取所有大分类数据list
  const handleDocumentsCallbackFns = ({ type, fn, action }: ICallbackFn) => {
    const fns: CommonData = documentsCallbackFns.current;
    if (action === 'add') {
      fns[type] = fn;
    } else if (action === 'remove') {
      delete fns[type];
    }
    documentsCallbackFns.current = { ...fns };
    // setDocumentsCallbackFns({ ...documentsCallbackFns });
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
          handleDocumentsCallbackFns={handleDocumentsCallbackFns}
          formKey={`${item.documentId}${item.sampleFrom}`}
          level1Type={outType}
          firstIndex={item.firstIndex as string}
          initList={getInitList(item)}
          selectIndex={item?.selectIndex}
        // 单据和来源等信息,加显时，接口返回的数组格式，需要处理取第一个元素即可，也只有一个元素
          apiParams={{
            ...item,
            sampleFrom: isMedicalIndexList(item)
              ? item.sampleFroms[0] : item.sampleFrom,
          }}
          isViewOnly={isViewOnly}
        />
      </TabPane>
    ),
  ), [checkTypes, isViewOnly, initData]);
  const handleActiveTab = (tab: string) => {
    console.log('===-1');
    activeType1.current = tab;
    setActiveType(tab);
  };
  const handleSetTimeAndOrg = (newItem: any) => {
    timeAndOrg.current = {
      ...timeAndOrg.current,
      ...newItem,
    };
  };
  const handleSetHospital = (key: string, val: any) => {
    console.log(11111112, key);
    console.log(val);
    // setHospital({ ...val });
    handleSetTimeAndOrg({
      orgId: val.hospitalId,
      orgName: val.hospitalName,
    });
  };
  const handleUnknownReport = (unknownReport: boolean) => {
    const params: CommonData = { unknownReport };
    if (unknownReport) {
      params.measuredAt = null;
    }
    handleSetTimeAndOrg(params);
  };
  return (
    <div className={styles.structure_detail_item}>
      <div className="flex text-sm justify-between items-center mb-10 structured-edit-wrap">
        <div className="flex" style={{ flex: '0 0 47%' }}>
          <div className="font-medium mr-5" style={{ flex: '0 0 63px' }}> 检查机构: </div>
          <SearchHospital
            placeholder="请输入检查机构"
            callback={handleSetHospital}
            fieldName="hospital"
            style={{ flex: 1, maxWidth: '78%' }}
            defaultValue={{
              hospitalId: initData?.orgId,
              hospitalName: initData?.orgName,
            }}
          />
        </div>
        <ItemDate
          setReporttime={(time: number | null) => handleSetTimeAndOrg({ measuredAt: time })}
          setUnknow={(unknownReport: boolean) => handleUnknownReport(unknownReport)}
          // 如果是回显，就直接取回显的时间，没有就设置当前时间
          initReportTime={initData?.measuredAt || new Date().getTime()}
          isUnknownTime={initData?.unknownReport}
          type="HYD"
        />
      </div>
          <div className="structured-edit-wrap">
            <SubType
              leve1Type={outType}
              handleChangeSubType={setSampleFroms}
              initSampleFrom={initSubType}
            />
          </div>
      {
          sampleFroms.length > 0 && (
            <>
              <div className="structured-edit-wrap">
                <SearchTypeIndex
                  sampleFroms={sampleFroms}
                  handleSelectTypeIndex={handleSelectTypeIndex}
                  // imageId={imageId}
                  documentType={outType}
                />
              </div>
              {
                checkTypes.length > 0 && (
                  <Tabs
                    activeKey={activeType}
                    onChange={(tab: string) => handleActiveTab(tab)}
                    type="editable-card"
                    hideAdd
                  >
                    {renderTabPane()}
                  </Tabs>
                )
              }
            </>
          )
        }
    </div>
  );
};

export default StructuredDetailItem;
