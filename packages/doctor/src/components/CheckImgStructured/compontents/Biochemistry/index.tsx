import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';
import { history } from 'umi';
import { isEmpty } from 'lodash';
import * as api from '@/services/api';
import styles from './index.scss';
import ItemRadio from '../ItemRadio';
import ItemInput from '../ItemInput';
import ItemDate from '../ItemDate';
import formatSubmitItems from './formatData';
import CustomValue from '../CustomValue';

interface IProps {
  handleCallbackFns: (params: ICallbackFn) => void; // 图片审核大病历使用
  imageType: string;
  initList: IImgTypeListItem | boolean;
}

function Biochemistry({ handleCallbackFns, imageType, initList }: IProps) {
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue, getFieldValue } = form;
  const initApiData = {
    items: [],
    imageTypeStatus: 'NORMAL',
    imageType,
  };
  const [apiData, setApiData] = useState<IImgTypeListItem>(initApiData);

  useEffect(() => {
    console.log('initList', initList);
    if (initList) {
      setApiData({ ...(initList as IImgTypeListItem) });
    } else {
      const { imageId } = history.location.query;
      const params = {
        imageId,
        patientSid: window.$storage.getItem('patientSid'),
        imageType,
      };
      api.image.fetchImageIndex(params).then((res) => {
        console.log(33322222222, res);
        // setData(res);
        setApiData({ ...res.list[0] });
      });
    }
  }, [initList]);
  const handleInitForm = () => {
    let initForm: CommonData = {
      imageTypeStatus: apiData!.imageTypeStatus || 'NORMAL',
      measuredAt: apiData!.measuredAt || new Date().getTime(),
      customItems: apiData?.customItems || [],
    };
    // 时间不详
    if (initList && !(initList as IImgTypeListItem)?.measuredAt) {
      delete initForm.measuredAt;
    }
    if (!isEmpty(apiData.items)) {
      apiData!.items.forEach((item: IImgTypeItems, index: number) => {
        const {
          indexId, name, abbreviation, value, unit, unitList,
        } = item;
        initForm = {
          ...initForm,
          [`${index}_indexId`]: indexId,
          [`${index}_name`]: name,
          [`${index}_abbreviation`]: abbreviation,
          [`${index}_value`]: value,
          [`${index}_unit`]: unit || unitList?.[0].unit,
        };
      });
    }

    setFieldsValue({
      ...initForm,
    });
  };
  const handleSave = () => new Promise((resolve, reject) => {
    validateFields().then((values) => {
      const params: CommonData = {
        imageType,
        imageTypeStatus: values.imageTypeStatus,
        measuredAt: values.measuredAt,
        customItems: values.customItems,
      };
      if (apiData.items) {
        params.items = formatSubmitItems(values, apiData.items.length);
      }
      resolve(params);
    }).catch((err) => {
      reject(err);
    });
  });
  useEffect(() => {
    handleInitForm(); // 初始化表单
    if (handleCallbackFns) {
      handleCallbackFns({
        action: 'add',
        type: imageType,
        fn: handleSave,
      });
    }
    return () => {
      if (handleCallbackFns) {
        handleCallbackFns({
          action: 'remove',
          type: imageType,
        });
      }
    };
  }, [apiData]);

  const renderItem = useMemo(() => () => {
    let showDom: any = null;
    if (apiData.items) {
      switch (imageType) {
        case 'BCG':
          showDom = apiData.items.map((item, index) => (
            <ItemRadio
              setFieldsValue={setFieldsValue}
              getFieldValue={getFieldValue}
              data={item}
              itemInx={index}
              key={item.indexId}
              imageType={imageType}
            />
          ));
          break;
        case 'NCG':
          showDom = apiData.items.map((item, index) => {
            if (['WBC', 'RBC'].includes(item.abbreviation)) {
              return <ItemInput
                data={item}
                itemInx={index}
                key={item.indexId}
                imageType={imageType}
              />;
            }
            return <ItemRadio
              setFieldsValue={setFieldsValue}
              getFieldValue={getFieldValue}
              data={item}
              itemInx={index}
              key={item.indexId}
              imageType={imageType}
            />;
          });
          break;
        default:
          showDom = apiData?.items.map((item, index) => (
            <ItemInput data={item} itemInx={index} key={item.indexId} imageType={imageType} />
          ));
          break;
      }
    }
    return showDom;
  }, [apiData.items]);
  return (
    <div className={styles.biochemistry}>
      <Form
        name={`biochemistry_${imageType}`}
        // onFinish={handleSubmit}
        form={form}
        // id="height42"
      >
        <ItemDate
          setFieldsValue={setFieldsValue}
          // 如果是回显，就直接取回显的时间，没有就设置当前时间
          initDate={initList ? (initList as IImgTypeListItem)?.measuredAt : new Date().getTime()}
          isUnknownTime={initList && !(initList as IImgTypeListItem)?.measuredAt}
        />
        <CustomValue getFieldValue={getFieldValue} />
        {renderItem()}
      </Form>
    </div>
  );
}

export default Biochemistry;
