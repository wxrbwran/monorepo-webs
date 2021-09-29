import React, { FC, useState, useEffect } from 'react';
import {
  Form, InputNumber, Select, Input,
} from 'antd';
import openIcon from '@/assets/img/showNocommon.png';
import closeIcon from '@/assets/img/closeNocommon.png';
import HiddenItems from '../HiddenItems';
import styles from '../CustomIndex/index.scss';

const { Option } = Select;
interface IProps {
  apiData: any;
  subName?: string;
  isViewOnly: boolean;
  getFieldsValue: (key: string) => void;
  formInit: CommonData;
}

const IndexTable: FC<IProps> = (props) => {
  const { apiData, subName, isViewOnly, getFieldsValue, formInit } = props;
  const [showAll, setshowAll] = useState(isViewOnly);
  console.log('formInit', formInit);
  useEffect(() => {
    setshowAll(isViewOnly);
  }, [isViewOnly]);
  const renderItem = (type: string) => {
    // 有subName的是有子分类的情况，inx是为了索引唯一使用
    let showDom: any = null;
    let indexListAll: CommonData = {};
    indexListAll = apiData;
    showDom = indexListAll[type].map((item: CommonData, index: number) => {
      console.log('isViewOnly', isViewOnly);
      console.log('88888849', getFieldsValue(`${item.formIndex}_value`) );
      console.log(323, formInit[`${item.formIndex}_value`]);
      // console.log(9999, getFieldsValue(`${item.formIndex}_minValue`));
      // 查看时，隐藏空值的~~~*********
      let isShow = true;
      if (isViewOnly) {
        // 值和参考值只要有一个有效，就显示，否则不显示
        isShow = formInit[`${item.formIndex}_value`] || formInit[`${item.formIndex}_maxValue`] || formInit[`${item.formIndex}_minValue`];
      }
      return (
        isShow ? (
          <div
            className={`${styles.item} ${styles.cont} ${type === 'noCommonItems' ? styles.bg_gray : ''}`}
            key={item.formIndex}
          >
            <div>{indexListAll[type][index].name}</div>
            <div>{indexListAll[type][index]?.abbreviation || '--'}</div>
            <Form.Item name={`${item.formIndex}_value`}>
              <InputNumber width={80} />
            </Form.Item>
            <Form.Item name={`${item.formIndex}_unit`}>
              {
                indexListAll[type][index]?.units?.length > 0 ? (
                  <Select style={{ maxWidth: 80 }}>
                    {
                      item.units?.map((unit: string) => (
                        <Option key={unit} value={unit}>{unit}</Option>
                      ))
                    }
                  </Select>
                ) : '--'
              }
            </Form.Item>
            <div className="flex items-start" style={{ minWidth: 170, paddingTop: 10 }}>
              <Form.Item name={`${item.formIndex}_minValue`} noStyle>
                <InputNumber />
              </Form.Item>
              <span className="mr-10 ml-10">-</span>
              <Form.Item name={`${item.formIndex}_maxValue`} noStyle>
                <InputNumber />
              </Form.Item>
            </div>
            {
              subName && (
                <Form.Item name={`${item.formIndex}_subCategoryName`} noStyle><Input type="hidden" /></Form.Item>
              )
            }
            <HiddenItems inx={item.formIndex} />
          </div>
        ) : <></>
      );
    });
    return showDom;
  };

  return (
    <div className={`${styles.list_wrap} structured-edit-wrap`}>
      <div className={`${styles.item} ${styles.bg_gray} ${styles.header}`}>
        <div>名称</div>
        <div>缩写</div>
        <div>数值</div>
        <div>单位</div>
        <div>参考值</div>
      </div>
      {renderItem('commonItems')}
      <div style={{ display: showAll ? 'block' : 'none' }}>
        {renderItem('noCommonItems')}
      </div>
      {
        !isViewOnly && (
          <div className={styles.open_btn} onClick={() => setshowAll(!showAll)}>
            {`点击${showAll ? '收起' : '展开'}不常用指标`}
            <img className="w-14 h-14" src={showAll ? closeIcon : openIcon} alt="" />
          </div>
        )
      }

    </div>
  );
};

export default IndexTable;
