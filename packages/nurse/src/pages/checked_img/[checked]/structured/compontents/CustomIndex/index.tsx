import React, {
  FC, useEffect, useState, useMemo,
} from 'react';
import { Form } from 'antd';
import {
  IApiDocumentItem, IIndexItem, ISearchDocumentItem,
} from 'typings/imgStructured';
import { isEmpty } from 'lodash';
import * as api from '@/services/api';
import { formatSubmitItems, formatDataAddIndex } from './formatData';
import IndexTable from '../IndexTable';
import styles from './index.scss';

// 获取图片详情接口返回的格式 | 搜索单据或指标时返回的item格式
type ICheckTypes = IApiDocumentItem | ISearchDocumentItem;
type IApiParams = {
  sampleFrom: string; // 自己补充的必要属性
} & ICheckTypes;

// 获取图片详情接口返回的指标item | 搜索点击获取的指标item
type IIndexItemCustom = {
  formIndex: number; // 自己补充的必要属性，每个指标的固定key值
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
  initList:{
    commonItems: IIndexItem[],
    noCommonItems:IIndexItem[]
  } | null;
  selectIndex?: any;
  isViewOnly: boolean;
}

const CustomIndex: FC<IProps> = (props) => {
  const {
    handleDocumentsCallbackFns, formKey, initList, level1Type, firstIndex, apiParams, selectIndex, isViewOnly,
  } = props;
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue, getFieldsValue } = form;
  const initApiData = {
    commonItems: [],
    noCommonItems: [],
  };
  const [apiData, setApiData] = useState<IApiData>(initApiData);
  const [addIndexNum, setaddIndexNum] = useState(0);
  const [formInit, setFormInit] = useState({});
  // 把点击的指标移到第一行
  const formatFirshIndex = (commonItems: IIndexItemCustom[], noCommonItems:IIndexItemCustom[]) => {
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
  useEffect(() => {
    // 首次渲染
    if (isEmpty(apiData.commonItems) && isEmpty(apiData.noCommonItems)) {
      if (initList) {
        console.log('=====+1,initList有数据时');
        setApiData(formatDataAddIndex(initList, addIndexNum));
      } else {
        const params = {
          documentId: apiParams.documentId,
          sampleFroms: [apiParams.sampleFrom],
          source: 'SYSTEM',
        };
        api.indexLibrary.fetchIndexDocumentIndex(params).then(
          ({ list }: { list: IIndexItemCustom[] }) => {
            const commonItems = list.filter((item) => item.common);
            const noCommonItems = list.filter((item) => !item.common);
            // 如果有指定首行展示哪个指标，这里移动到第一个
            const data: IApiData = firstIndex
              ? formatFirshIndex(commonItems, noCommonItems) : {
                commonItems,
                noCommonItems,
              };
            console.log('=====+2,initList没数据，请求接口时');
            setApiData({ ...formatDataAddIndex(data, addIndexNum) });
          },
        );
      }
    }
  }, [initList]);

  useEffect(() => {
    // 第一行指标有变动时候(并且apiData有数据，可以防止首次渲染走这里)，移下位置
    if (firstIndex && apiData.commonItems.length > 0) {
      // 存一下form表单的值，渲染完了再设置回去
      const curFormData = getFieldsValue(true);
      const commonList = apiData.commonItems;
      const noCommonList = apiData.noCommonItems;
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
  const handleSave = () => new Promise((resolve, reject) => {
    const itemsLength = (apiData?.commonItems?.length || 0) + (apiData?.noCommonItems?.length || 0);
    validateFields().then((values) => {
      // apiParams
      const {
        documentId, documentName, sampleFrom,
      } = apiParams;
      const params: CommonData = {
        documentId,
        documentName,
        documentType: level1Type,
        sampleFroms: [sampleFrom],
        indexList: formatSubmitItems(values, itemsLength),
      };
      console.log('params22221', params);
      resolve(params);
    }).catch((err) => {
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
    all.forEach((item: IIndexItemCustom) => {
      const {
        id, name, value, units, unit, formIndex, advices, indexId, sourceSid, source,
      } = item;
      initForm = {
        ...initForm,
        [`${formIndex}_indexId`]: id || indexId, // 首次根据勾选的内容获取指标列表返回的是id，回显后端返回的是indexId
        [`${formIndex}_name`]: name,
        [`${formIndex}_value`]: value,
        [`${formIndex}_minValue`]: advices?.[0] === 'empty' ? null : advices?.[0],
        [`${formIndex}_maxValue`]: advices?.[1] === 'empty' ? null : advices?.[1],
        [`${formIndex}_unit`]: unit || units?.[0],
        [`${formIndex}_sourceSid`]: sourceSid,
        [`${formIndex}_source`]: source,
      };
    });
    setFormInit(initForm);
    setFieldsValue({
      ...initForm,
    });
  };
  useEffect(() => {
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
    // 备注：由于上面监听了apiData的改变，只要此状态更新，就会走initForm方法（这里是为了把新添加的指标，也set一下，主
    // 要是设置一下隐藏域indexIdNew的值。由于handleInitForm里的apiData是最原始的数据，所以会丢失用记输入的数据。所以这里需要重新设置回去）
    const curFormData = getFieldsValue(true);
    const newApiData = {
      ...apiData,
      commonItems: [newItemData, ...apiData.commonItems],
    };
    const newAddInx = addIndexNum + 1;
    setaddIndexNum((pre) => pre + 1);
    console.log('=====+4,当前页面添加了新的指标时');
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
      const isHasIndex = [...apiData.commonItems, ...apiData.noCommonItems]
        .filter((item) => item.id === selectIndex.id || item.indexId === selectIndex.indexId);
      if (isHasIndex.length === 0) {
        addIndexSuccess(selectIndex);
      }
    }
  }, [selectIndex]);
  const renderItem = useMemo(() => (subName?: string) => {
    const param: any = { apiData, isViewOnly, getFieldsValue, formInit };
    if (subName) { param.subName = subName; }
    return <IndexTable {...param} />;
  }, [apiData, formInit, isViewOnly]);

  return (
    <div className={`${styles.biochemistry} relative`}>
      <Form
        name={`custom_${formKey}`}
        form={form}
      >
        {renderItem()}
      </Form>
    </div>
  );
};

export default CustomIndex;
