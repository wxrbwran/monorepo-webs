import React, {
  FC, useState, useMemo, useRef, useEffect,
} from 'react';
import { Tabs, Popconfirm, Button, message } from 'antd';
import { useDispatch } from 'umi';
import { CloseOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';
import SearchDocument from '../SearchDocument';
import AddEditDocument from '@/pages/Index_library/components/AddEditDocument';
import SubType from '../SubType';
import SearchHYD from '../SearchHYD';
import CustomIndex from '../CustomIndex';
import { getSource } from '../utils';
import uuid from 'react-uuid';

import { isEmpty, cloneDeep } from 'lodash';
import styles from './index.scss';
import { IApiDocumentItem, ISearchDocumentItem } from 'typings/imgStructured';

// 此组件具体到，化验单或检查单panel
const { TabPane } = Tabs;
interface IProps {
  // imageId: string;
  tabKey: string;// 一级tab
  outType: string;
  initData: {
    documentList: IApiDocumentItem[];
    orgId: string;
    orgName: string;
    outType: string;
    unknownReport?: boolean;
    measuredAt?: number;
  };
  hydCallbackFns: any; // 保存时候的回调
  setHydCallbackFns: (params: { [type: string]: () => void }) => void; // 设置callback function
  isViewOnly: boolean;
}
// 渲染时需要这两个字段

interface ICheckTypesItem extends IApiDocumentItem {
  sampleFrom: string;
  firstIndex: string;
  orgId?: string;
  orgName?: string;
  measuredAt?: number;
  unknownReport?: boolean;
  tabKey?: string;
}
// ICheckTypesItem保存过后init数据，接口返回的格式。ISearchDocumentItem是搜索时候接口返回的数据格式
type ICheckTypes = Array<ICheckTypesItem | ISearchDocumentItem>;
const StructuredDetailHydPanel: FC<IProps> = (props) => {
  const {
    hydCallbackFns, setHydCallbackFns, tabKey, outType, initData, isViewOnly,
  } = props;
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
        tabKey: uuid(),
      });
    });
    initSubType = [...new Set(initSubType)];
  } else {
    initSubType = ['血液'];
  }
  console.log('initSubType', initSubType);
  // 选择的【来源+单据来源】集合, tab使用
  const [checkTypes, setCheckTypes] = useState<ICheckTypes>(initCheckTypes || []);
  const [activeType, setActiveType] = useState<string>();
  const [sampleFroms, setSampleFroms] = useState<string[]>(initSubType);
  const documentsCallbackFns = useRef({});
  const dispatch = useDispatch();
  const doctorSid = window.$storage.getItem('sid');

  const handleCurDocument = (doc: TDocument) => {
    dispatch({
      type: 'document/setCurDocument',
      payload: doc,
    });
  };

  // 搜索框：点击下拉框的数据【来源+单据来源】, type === 'add'表示是新添加的大分类+指标
  const handleSelectTypeIndex = (params: ISearchDocumentItem, _type?: string) => {
    console.log('handleSelectTypeIndex', params, _type);
    const newUuid: string = uuid();
    // console.log('checkTypes', checkTypes);
    let newCheckTypes: ICheckTypes = [];
    let isNew = true;
    // 唯一性根据这两个指标确定： 图片大分类+子分类
    checkTypes.forEach((item: ICheckTypesItem | ISearchDocumentItem, index) => {
      if (item.documentId === params.documentId) {
        // console.log(item);
        isNew = false;
        handleCurDocument({
          ...item,
          id: item.documentId,
          name: item.documentName,
          sampleFrom: item.sampleFrom,
        });
        newCheckTypes = [...checkTypes];
        if (params.type !== 'DOCUMENT') {
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
            tabKey: newUuid,
          };
        }
      }
    });
    // 如果是新添加的大分类，则直接push进去
    if (isNew && _type !== 'copy') {
      newCheckTypes = [
        ...checkTypes,
        {
          ...params,
          firstIndex: params.id,
          tabKey: newUuid,
        },
      ];
      handleCurDocument({
        ...params,
        id: params.documentId,
        name: params.documentName,
        sampleFrom: params.sampleFrom,
      });
    } else if (isNew && _type === 'copy') {
      newCheckTypes = [...checkTypes, { ...params, tabKey: newUuid }];
    }
    activeType1.current = newUuid;
    setActiveType(newUuid);
    setCheckTypes([...newCheckTypes]);
  };
  useEffect(() => {
    // console.log('level1Type', tabKey);
    hydCallbackFns[tabKey] = () => new Promise((resolve) => {
      Promise.all(Object.values(documentsCallbackFns.current)
        .map((fn) => fn())).then((documentList) => {
        // console.log('hospital', hospital);
        resolve({
          documentList,
          // imageId,
          outType,
          operatorId: window.$storage.getItem('sid'),
          sid: window.$storage.getItem('patientSid'),
          wcId: window.$storage.getItem('patientWcId'),
        });
      });
    });
    // hydCallbackFns浅拷贝，不执行下面setHydCallbackFns， 也可以。
    setHydCallbackFns(hydCallbackFns);
    return () => {
      // 删除掉此tab要delete掉此项
      delete hydCallbackFns[tabKey];
      setHydCallbackFns(hydCallbackFns);
    };
  }, []);
  // 获取所有大分类数据list
  const handleDocumentsCallbackFns = ({ type, fn, action }: ICallbackFn) => {
    console.log('=====type', type);
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
    console.log('getInitList', item);
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
      const commonList = list; //.filter((indexItem) => indexItem.common);
      // const noCommonList = list.filter((indexItem) => !indexItem.common);
      return {
        orgAndTime: {
          orgId: item.orgId,
          orgName: item.orgName,
          measuredAt: item.measuredAt,
          unknownReport: item.unknownReport,
        },
        commonItems: commonList,
        noCommonItems: [],
      };
    }
    return null;
  };
  const handleActiveTab = (tab: string) => {
    console.log('checkTypes111', checkTypes);
    // console.log('tab', tab);
    if (tab != 'deactivation') {
      activeType1.current = tab;
      console.log('tab1111', tab);
      setActiveType(tab);
      const doc = checkTypes.filter(c => tab === c.tabKey)[0];
      handleCurDocument({
        ...doc,
        id: doc.documentId,
        name: doc.documentName,
        sampleFrom: doc.sampleFrom,
      });
    }
  };
  const handleRemoveType = (targetItem: ICheckTypesItem | ISearchDocumentItem) => {
    const targetKey = targetItem.tabKey;
    const newCheckTypes = checkTypes.filter((item: ICheckTypesItem | ISearchDocumentItem) => item.tabKey !== targetKey);
    setCheckTypes(newCheckTypes);
    if (activeType1.current === targetKey && newCheckTypes.length > 0) {
      activeType1.current = newCheckTypes[0].documentId + newCheckTypes[0].sampleFrom;
      // setActiveType(newCheckTypes[0].tabKey);
      handleActiveTab(newCheckTypes[0].tabKey!);
    }
  };
  const handleRefershDocument = (e: React.MouseEvent, id: string): void => {
    const newUUid =  uuid();
    e.stopPropagation();
    console.log(id);
    const refreshCur = checkTypes.filter(item => item.documentId === id)[0];
    refreshCur.tabKey = newUUid;
    setCheckTypes(cloneDeep(checkTypes));
    setActiveType(newUUid);
    message.success('已刷新单据');
    // event.emit('REFERSH_DOCUMENT_BY_ID', id);
  };
  const handleEditName = (hydInfo: { id: string; name: string }) => {
    checkTypes.forEach(item => {
      if (item.documentId === hydInfo.id) {
        item.documentName = hydInfo.name;
      }
    });
    setCheckTypes(cloneDeep(checkTypes));
  };
  console.log('checkTypes1212', checkTypes);
  const renderTabPane = useMemo(() => () => checkTypes.map(
    (item: ICheckTypesItem | ISearchDocumentItem) => {
      console.log('item888', item);
      return (
        <TabPane
          closable={!isViewOnly}
          tab={
            <span className="flex items-center">
              {!isViewOnly &&
                !getInitList(item) && (
                  <SyncOutlined
                    className="relative top-2"
                    onDoubleClick={(e: React.MouseEvent) =>
                      handleRefershDocument(e, item.documentId)
                    }
                  />
              )}
              {item.sourceSid === doctorSid && !item.indexList ? (
                <AddEditDocument
                  mode="edit"
                  record={item}
                  type="HYD"
                  clickEvent="onDoubleClick"
                  onSuccess={handleEditName}
                >
                  <>
                    <span
                      dangerouslySetInnerHTML={{ __html: getSource(item.source, item.sourceSid) }}
                    ></span>
                    {item.documentName}
                  </>
                </AddEditDocument>
              ) : (
                <>
                  <span
                    dangerouslySetInnerHTML={{ __html: getSource(item.source, item.sourceSid) }}
                  ></span>
                  {item.documentName}
                </>
              )}
            </span>
          }
          key={`${item.tabKey}`}
          forceRender
          closeIcon={
            <Popconfirm
              title="关闭后，标签内全部指标数据将清空，请确认?"
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
            level1Type={'HYD'}
            firstIndex={item.firstIndex as string}
            initList={getInitList(item)}
            onCopySuccess={handleSelectTypeIndex}
            selectIndex={item?.selectIndex}
            // 单据和来源等信息,加显时，接口返回的数组格式，需要处理取第一个元素即可，也只有一个元素
            apiParams={{
              ...item,
              sampleFrom: isMedicalIndexList(item) ? item.sampleFroms[0] : item.sampleFrom,
            }}
            isViewOnly={isViewOnly}
          />
        </TabPane>
      );
    },
  ), [checkTypes, isViewOnly, initData]);

  const addIndexSuccess = (newItemData) => {
    console.log('====gxxx', newItemData);
    handleSelectTypeIndex({
      ...newItemData,
      documentId: newItemData.id,
      documentName: newItemData.name,
      type: 'DOCUMENT',
      id: null,
    });
  };

  return (
    <div className={styles.structure_detail_item}>
      {
        !isViewOnly && (
          <div className="structured-edit-wrap">
            <SubType
              leve1Type={'HYD'}
              handleChangeSubType={setSampleFroms}
              initSampleFrom={initSubType}
            />
          </div>
        )
      }
      {sampleFroms.length > 0 && (
        <>
          {
            !isViewOnly && (
              <div className="structured-edit-wrap">
                <SearchHYD
                  sampleFroms={sampleFroms}
                  handleSelectTypeIndex={handleSelectTypeIndex}
                  // imageId={imageId}
                  documentType={outType}
                />
              </div>
            )
          }
          <div className={styles.hyd_tab_wrap}>
            {
              !isViewOnly && (
                <div className="flex justify-end absolute top-5 -right-10 z-99">
                  <AddEditDocument mode="add" type="HYD" onSuccess={addIndexSuccess}>
                    <Button type="link" className="text-sm">
                      +创建新的单据模版
                    </Button>
                  </AddEditDocument>
                </div>
              )
            }
            {checkTypes.length > 0 && (
              <Tabs
                activeKey={activeType}
                onChange={(tab: string) => handleActiveTab(tab)}
                type="editable-card"
                addIcon={
                  <SearchDocument mode="search" type="HYD"
                    handleSelectTypeIndex={handleSelectTypeIndex}
                    documentType={outType}
                  >
                    <PlusOutlined />
                  </SearchDocument>
                }
              >
                {renderTabPane()}
              </Tabs>
            )}
            {
              isEmpty(checkTypes) && (
                <div className={styles.empty_wrap}>
                  暂无化验单，请添加
                </div>
              )
            }
          </div>
        </>
      )
      }
    </div >
  );
};

export default StructuredDetailHydPanel;
