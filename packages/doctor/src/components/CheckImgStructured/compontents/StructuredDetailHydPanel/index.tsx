import React, {
  FC, useState, useMemo, useRef, useEffect,
} from 'react';
import { Tabs, Popconfirm } from 'antd';
import { useDispatch } from 'umi';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import SubType from '../SubType';
import SearchHYD from '../SearchHYD';
import CustomIndex from '../CustomIndex';

import { isEmpty } from 'lodash';
import styles from './index.scss';
// 此组件具体到，化验单或检查单panel
const { TabPane } = Tabs;
interface IProps {
  imageId: string;
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
}
// ICheckTypesItem保存过后init数据，接口返回的格式。ISearchDocumentItem是搜索时候接口返回的数据格式
type ICheckTypes = Array<ICheckTypesItem | ISearchDocumentItem>;
const StructuredDetailHydPanel: FC<IProps> = (props) => {
  const {
    hydCallbackFns, setHydCallbackFns, tabKey, outType, initData, imageId, isViewOnly,
  } = props;
  const activeType1 = useRef('');
  let initSubType: string[] = [];
  const initCheckTypes: ICheckTypesItem[] = [];
  if (!isEmpty(initData)) {
    initData.documentList.forEach((item) => {
      initSubType.push('其他');
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
  const dispatch = useDispatch();

  const handleCurDocument = (doc: TDocument) => {
    dispatch({
      type: 'document/setCurDocument',
      payload: doc,
    });
  };

  // 搜索框：点击下拉框的数据【来源+单据来源】, type === 'add'表示是新添加的大分类+指标
  const handleSelectTypeIndex = (params: ISearchDocumentItem, _type?: string) => {
    // console.log('handleSelectTypeIndex', params, _type);
    // console.log('checkTypes', checkTypes);
    let newCheckTypes: ICheckTypes = [];
    let isNew = true;
    // 唯一性根据这两个指标确定： 图片大分类+子分类
    checkTypes.forEach((item: ICheckTypesItem | ISearchDocumentItem, index) => {
      if (item.documentId === params.documentId) {
        // console.log(item);
        isNew = false;
        handleCurDocument({
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
        },
      ];
    } else if (isNew && _type === 'copy') {
      newCheckTypes = [...checkTypes, { ...params }];
    }
    activeType1.current = params.documentId + params.sampleFrom;
    setActiveType(params.documentId + params.sampleFrom);
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
          imageId,
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
      const commonList = list.filter((indexItem) => indexItem.common);
      const noCommonList = list.filter((indexItem) => !indexItem.common);
      return {
        orgAndTime: {
          orgId: item.orgId,
          orgName: item.orgName,
          measuredAt: item.measuredAt,
          unknownReport: item.unknownReport,
        },
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
    }
  };
  const handleRefershDocument = (e: React.MouseEvent, id: string): void => {
    e.stopPropagation();
    console.log(id);
    event.emit('REFERSH_DOCUMENT_BY_ID', id);
  };
  const renderTabPane = useMemo(() => () => checkTypes.map(
    (item: ICheckTypesItem | ISearchDocumentItem) => {
      console.log('item', item);
      let prefix = '[官方]';
      const sid = window.$storage.getItem('sid');
      if (item.sourceSid === sid) {
        prefix = '[自己]';
      } else if (item.sourceSid !== sid && item.source === 'DOCTOR') {
        prefix = '[医生]';
      }
      return (
        <TabPane
          tab={
            <span>
              {!isViewOnly && (
                <SyncOutlined
                  className="relative top-2"
                  onClick={(e: React.MouseEvent) => handleRefershDocument(e, item.documentId)}
                />
              )}
              {prefix}
              {item.documentName}
            </span>
          }
          key={`${item.documentId}${item.sampleFrom}`}
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
  const handleActiveTab = (tab: string) => {
    // console.log('checkTypes', checkTypes);
    // console.log('tab', tab);
    activeType1.current = tab;
    setActiveType(tab);
    const doc = checkTypes.filter(c => tab.includes(c.documentId))[0];
    handleCurDocument({
      id: doc.documentId,
      name: doc.documentName,
      sampleFrom: doc.sampleFrom,
    });
  };

  return (
    <div className={styles.structure_detail_item}>
      <div className="structured-edit-wrap">
        <SubType
          leve1Type={'HYD'}
          handleChangeSubType={setSampleFroms}
          initSampleFrom={initSubType}
        />
      </div>
      {sampleFroms.length > 0 && (
        <>
          <div className="structured-edit-wrap">
            <SearchHYD
              sampleFroms={sampleFroms}
              handleSelectTypeIndex={handleSelectTypeIndex}
              // imageId={imageId}
              documentType={outType}
            />
          </div>
          {checkTypes.length > 0 && (
            <Tabs
              activeKey={activeType}
              onChange={(tab: string) => handleActiveTab(tab)}
              type="editable-card"
              hideAdd
            >
              {renderTabPane()}
            </Tabs>
          )}
        </>
      )}
    </div>
  );
};

export default StructuredDetailHydPanel;
