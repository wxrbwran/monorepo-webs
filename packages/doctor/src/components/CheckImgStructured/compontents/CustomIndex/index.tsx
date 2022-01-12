import React, { FC, useEffect, useState, useMemo, useRef } from 'react';
import { Form, Button, message } from 'antd';
import { isEmpty, cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'umi';
import EditIndex from '@/components/EditIndex';
import CopyDocument from '@/pages/Index_library/components/CopyDocument';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';
import * as api from '@/services/api';
import SearchHospital from '@/components/SearchHospital';
import ItemDate from '../ItemDate';
import { formatSubmitItems, formatDataAddIndex } from './formatData';
import iconCopy from '@/assets/img/icon_copy_dj.png';
import IndexTable from '../IndexTable';

// 获取图片详情接口返回的格式 | 搜索单据或指标时返回的item格式
type ICheckTypes = IApiDocumentItem | ISearchDocumentItem;
type IApiParams = {
  sampleFrom: string; // 自己补充的必要属性
} & ICheckTypes &
TIndexItem;

// 获取图片详情接口返回的指标item | 搜索点击获取的指标item
type IIndexItemCustom = {
  formIndex: number; // 自己补充的必要属性，每个指标的固定key值
  referenceList: TReference[];
  originReferences?: TReference[];
  references?: TReference[];
} & IIndexItem;

interface IApiData {
  commonItems: IIndexItemCustom[];
  noCommonItems: IIndexItemCustom[];
}

interface IProps {
  handleDocumentsCallbackFns: (params: ICallbackFn) => void; // 图片审核大病历使用
  formKey: string; // 唯一性，【单据id+来源】
  level1Type: string; // 一级分类: 当前指标是化验单还是检查单类型，添加自定义指标时需要此参数
  firstIndex: string;
  // 原始的初始化数据, 用它里面的单据数据和来源，保存时需要这些数据信息
  apiParams: IApiParams;
  // 分类好的初始化数据
  initList: {
    commonItems: IIndexItem[];
    noCommonItems: IIndexItem[];
    orgAndTime: {
      orgId?: string;
      orgName?: string;
      measuredAt?: number;
      unknownReport?: boolean;
    };
  } | null;
  selectIndex?: any;
  isViewOnly: boolean;
  onCopySuccess: (param: TDocument, type: string) => void;
}

const CustomIndex: FC<IProps> = (props) => {
  const {
    handleDocumentsCallbackFns,
    formKey,
    initList,
    firstIndex,
    apiParams,
    selectIndex,
    isViewOnly,
    onCopySuccess,
  } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { validateFields, setFieldsValue, getFieldsValue } = form;
  const initApiData = {
    commonItems: [],
    noCommonItems: [],
  };
  const [apiData, setApiData] = useState<any>(initApiData);
  const [addIndexNum, setaddIndexNum] = useState(0);
  const [formInit, setFormInit] = useState({});
  const curDocument = useSelector((state: IState) => state.document.curDocument);
  const timeAndOrg = useRef({
    measuredAt: initList?.orgAndTime?.measuredAt || new Date().getTime(),
    unknownReport: initList?.orgAndTime?.unknownReport || false,
    orgId: initList?.orgAndTime?.orgId || null,
    orgName: initList?.orgAndTime?.orgName || null,
  });
  const sid = window.$storage.getItem('sid');

  // 把点击的指标移到第一行
  const formatFirshIndex = (commonItems: IIndexItemCustom[], noCommonItems: IIndexItemCustom[]) => {
    commonItems.forEach((item: IIndexItemCustom, index: number) => {
      if (firstIndex === item.id || firstIndex === item.indexId) {
        commonItems.splice(index, 1);
        commonItems.unshift(item);
      }
    });
    noCommonItems.forEach((item: IIndexItemCustom, index: number) => {
      if (firstIndex === item.id || firstIndex === item.indexId) {
        noCommonItems.splice(index, 1);
        commonItems.unshift(item);
      }
    });
    return {
      commonItems,
      noCommonItems,
    };
  };
  const fetchIndexDocumentIndex = async () => {
    const params = {
      documentId: apiParams.documentId,
      sourceSid: apiParams.sourceSid,
      sid,
    };
    const { list }: { list: IIndexItemCustom[] } = await api.indexLibrary.fetchIndexDocumentIndex(
      params,
    );
    console.log('-------33', list);
    const commonItems = list.filter((item) => item.common);
    const noCommonItems = list.filter((item) => !item.common);
    // 如果有指定首行展示哪个指标，这里移动到第一个
    const data: IApiData = firstIndex
      ? formatFirshIndex(commonItems, noCommonItems)
      : { commonItems, noCommonItems };
    // console.log('=====+2,initList没数据，请求接口时');
    console.log('999999999999', cloneDeep(formatDataAddIndex(data, addIndexNum)));
    setApiData(cloneDeep(formatDataAddIndex(data, addIndexNum)));
  };
  useEffect(() => {
    // 首次渲染
    if (isEmpty(apiData.commonItems) && isEmpty(apiData.noCommonItems)) {
      // console.log('curtomIndex2');
      if (initList) {
        // console.log('=====+1,initList有数据时', initList);
        setApiData(formatDataAddIndex(initList, addIndexNum));
      } else {
        console.log('curtomIndex3');
        fetchIndexDocumentIndex();
      }
    }
  }, [initList]);

  // 刷新单据
  useEffect(() => {
    const listener = async (id: string) => {
      console.log('apiParams.id', apiParams.documentId);
      console.log('id', id);
      if (apiParams.documentId === id) {
        form.resetFields();
        await fetchIndexDocumentIndex();
        message.success('已刷新单据');
      }
    };
    event.addListener('REFERSH_DOCUMENT_BY_ID', listener);
    return () => {
      event.removeListener('REFERSH_DOCUMENT_BY_ID', listener);
    };
  }, [apiParams]);

  useEffect(() => {
    // 第一行指标有变动时候(并且apiData有数据，可以防止首次渲染走这里)，移下位置
    if (firstIndex && apiData.commonItems.length > 0) {
      // 存一下form表单的值，渲染完了再设置回去
      const curFormData = getFieldsValue(true);
      const commonList = apiData.commonItems;
      const noCommonList = apiData.noCommonItems;
      // console.log('=====+3,firstIndex变化时');
      setApiData({
        ...formatFirshIndex(commonList, noCommonList),
      });
      setTimeout(() => {
        // 这里重新设置回去
        setFieldsValue({
          ...curFormData,
        });
      }, 300);
    }
  }, [firstIndex]);
  const handleSave = () =>
    new Promise((resolve, reject) => {
      const itemsLength =
        (apiData?.commonItems?.length || 0) + (apiData?.noCommonItems?.length || 0);
      validateFields()
        .then((values) => {
          // console.log('validateFields', values);
          // console.log('itemsLength', itemsLength);

          // console.log('apiParams', apiParams);

          // apiParams
          const { documentId, documentName, sampleFrom } = apiParams;
          const params: CommonData = {
            documentId,
            documentName,
            documentType: 'HYD',
            source: apiParams.source,
            sourceSid: apiParams.sourceSid,
            sampleFroms: [sampleFrom],
            ...timeAndOrg.current,
            indexList: formatSubmitItems(values, itemsLength),
          };
          // console.log('params22221', params);
          resolve(params);
        })
        .catch((err) => {
          reject(err);
        });
    });
  const handleInitForm = () => {
    let initForm = {};
    // 所有指标：常用指标和非常用指标
    const all: Array<IIndexItemCustom> = [
      ...(apiData.commonItems || []),
      ...(apiData.noCommonItems || []),
    ];
    // console.log('handleInitForm', all);
    all.forEach((item: IIndexItemCustom) => {
      const {
        id,
        name,
        formIndex,
        indexId,
        references,
        sourceSid,
        source,
        referenceList,
        originReferences,
      } = item;
      console.log('-----item', item);
      const referenceData: Record<string, any> = {};
      if (referenceList?.length > 0) {
        const keys: string[] = ['value', 'indexValue'];
        referenceList.forEach((reference: TReference, index: number) => {
          keys.forEach((k) => {
            if (reference[k]) {
              referenceData[`${formIndex}_${index}_${k}`] = reference[k];
            }
          });
          // 如果有referenceId，则表明指标有参考值，标记select组件选中此条
          if (reference.referenceId) {
            referenceData[`${formIndex}_${index}_reference`] = reference.referenceId;
          }
        });
      } else {
        references?.forEach((reference: TReference) => {
          if (reference.isDefault) {
            referenceData[`${formIndex}_0_reference`] = reference.id;
          }
        });
      }
      initForm = {
        ...initForm,
        [`${formIndex}_indexId`]: id || indexId, // 首次根据勾选的内容获取指标列表返回的是id，回显后端返回的是indexId
        [`${formIndex}_name`]: name,
        // [`${formIndex}_indexValue`]: value,
        [`${formIndex}_sourceSid`]: sourceSid,
        [`${formIndex}_source`]: source,
        [`${formIndex}_referenceList`]: originReferences || references,
        [`${formIndex}_valueCount`]: referenceList?.length || 1,
        ...referenceData,
      };
    });
    console.log('initForminitForminitForm+++++++++', initForm);
    setFormInit(initForm);
    setFieldsValue({
      ...initForm,
    });
  };
  useEffect(() => {
    console.log('-----===apiData', apiData);
    handleInitForm(); // 初始化表单
  }, [apiData]);
  useEffect(() => {
    if (handleDocumentsCallbackFns) {
      handleDocumentsCallbackFns({
        action: 'add',
        type: apiParams.sampleFrom + apiParams.documentName,
        fn: handleSave,
      });
    }
    return () => {
      if (handleDocumentsCallbackFns) {
        handleDocumentsCallbackFns({
          action: 'remove',
          type: apiParams.sampleFrom + apiParams.documentName,
        });
      }
    };
  }, [apiData]);
  const addIndexSuccess = (newItemData: any) => {
    // 保存一下用户已经输入的form表单值，在apiData渲染完之后，这里重新设置回去。解决添加新指标后丢失用户输入数据问题
    // 备注：由于上面监听了apiData的改变，只要此状态更新，就会走initForm方法（这里是为了把新添加的指标，也set一下，
    // 主要是设置一下隐藏域indexIdNew的值。由于handleInitForm里的apiData是最原始的数据，所以会丢失用记输入的数据。
    // 所以这里需要重新设置回去）
    const curFormData = getFieldsValue(true);
    const newApiData = {
      ...apiData,
      commonItems: [newItemData, ...apiData.commonItems],
    };
    const newAddInx = addIndexNum + 1;
    setaddIndexNum((pre) => pre + 1);
    // console.log('=====+4,当前页面添加了新的指标时');
    setApiData({ ...formatDataAddIndex(newApiData, newAddInx) });
    setTimeout(() => {
      // 这里重新设置回去
      setFieldsValue({
        ...curFormData,
      });
    }, 300);
  };
  useEffect(() => {
    // 点击搜索的， 如果当前指标列表中不存在此指标数据，则添加进来，否则这里不做处理
    if (selectIndex) {
      const isHasIndex = [...apiData.commonItems, ...apiData.noCommonItems].filter(
        (item) => item.id === selectIndex.id || item.indexId === selectIndex.indexId,
      );
      if (isHasIndex.length === 0) {
        addIndexSuccess(selectIndex);
      }
    }
  }, [selectIndex]);
  const renderItem = useMemo(
    () => (subName?: string) => {
      const param: any = { apiData, isViewOnly, getFieldsValue, formInit };
      if (subName) {
        param.subName = subName;
      }
      return <IndexTable {...param} form={form} />;
    },
    [apiData, formInit, isViewOnly],
  );

  const handleSetTimeAndOrg = (newItem: any) => {
    const params = {
      ...timeAndOrg.current,
      ...newItem,
    };
    timeAndOrg.current = params;
  };
  const handleSetHospital = (_key: string, val: any) => {
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

  const handleCopyDocument = (param: TDocument) => {
    console.log('handleCopyDocument', param);
    const doc = {
      ...param,
      documentId: param.id,
      documentName: param.name,
    };
    if (onCopySuccess) {
      dispatch({
        type: 'document/setCurDocument',
        payload: doc,
      });
      onCopySuccess(doc, 'copy');
    }
  };

  return (
    <div className="relative">
      <div className="flex text-sm justify-between items-center mb-10 structured-edit-wrap">
        {!(isViewOnly && !initList?.orgAndTime?.orgName) ? (
          <div className="flex" style={{ flex: '0 0 47%' }}>
            <div className="font-medium mr-5" style={{ flex: '0 0 63px', lineHeight: '25px' }}>
              检查机构:
            </div>
            <SearchHospital
              placeholder="请输入检查机构"
              callback={handleSetHospital}
              fieldName="hospital"
              style={{ flex: 1, maxWidth: '78%' }}
              defaultValue={{
                hospitalId: initList?.orgAndTime?.orgId,
                hospitalName: initList?.orgAndTime?.orgName,
              }}
            />
          </div>
        ) : (
          <div></div>
        )}
        <ItemDate
          isViewOnly={isViewOnly}
          setReporttime={(time: number | null) => handleSetTimeAndOrg({ measuredAt: time })}
          setUnknow={(unknownReport: boolean) => handleUnknownReport(unknownReport)}
          // 如果是回显，就直接取回显的时间，没有就设置当前时间
          initReportTime={initList?.orgAndTime?.measuredAt || new Date().getTime()}
          isUnknownTime={initList?.orgAndTime?.unknownReport}
          type="HYD"
        />
      </div>
      {apiParams.source === 'DOCTOR' && apiParams.sourceSid === sid && !isViewOnly && !initList && (
        <div className="mb-10">
          <EditIndex
            onSuccess={addIndexSuccess}
            source="imgAddIndex"
            documentId={apiParams.documentId}
            sampleFrom={apiParams.sampleFrom}
          >
            <Button type="link" className="text-sm">
              +添加新指标
            </Button>
          </EditIndex>
        </div>
      )}
      {!initList &&
        (apiParams.source === 'SYSTEM' ||
          (apiParams.source === 'DOCTOR' && apiParams.sourceSid !== sid)) && (
          <div className="mb-10">
            <CopyDocument type="HYD" onSuccess={handleCopyDocument} document={curDocument}>
              <Button
                className="flex items-center text-sm"
                icon={<img src={iconCopy} className="w-16 mr-2" />}
              >
                复制并修改单据
              </Button>
            </CopyDocument>
          </div>
      )}
      <Form name={`custom_${formKey}`} form={form}>
        {renderItem()}
      </Form>
    </div>
  );
};

export default CustomIndex;
