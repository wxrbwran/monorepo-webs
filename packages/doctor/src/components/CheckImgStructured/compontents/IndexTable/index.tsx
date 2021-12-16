import React, { FC, useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import openIcon from '@/assets/img/showNocommon.png';
import closeIcon from '@/assets/img/closeNocommon.png';
import HiddenItems from '../HiddenItems';
import RenderItem from './components/RenderItem';
interface IProps {
  apiData: any;
  subName?: string;
  isViewOnly: boolean;
  form: any;
  getFieldsValue: (key: string) => void;
  formInit: CommonData;
}

const IndexTable: FC<IProps> = (props) => {
  const { apiData, subName, isViewOnly, formInit, form } = props;
  const [showAll, setshowAll] = useState(isViewOnly);
  // console.log('formInit', formInit);
  useEffect(() => {
    setshowAll(isViewOnly);
  }, [isViewOnly]);

  const renderItem = (type: string) => {
    // 有subName的是有子分类的情况，inx是为了索引唯一使用
    let showDom: any = null;
    let indexListAll: CommonData = {};
    indexListAll = apiData;
    // console.log('indexListAll', indexListAll);
    showDom = indexListAll[type].map((item: CommonData, _index: number) => {
      // 查看时，隐藏空值的~~~*********
      let isShow = true;
      if (isViewOnly) {
        // 值和参考值只要有一个有效，就显示，否则不显示
        isShow = formInit[`${item.formIndex}_value`] || formInit[`${item.formIndex}_maxValue`] || formInit[`${item.formIndex}_minValue`];
      }
      if (!isShow) {
        return null;
      }
      return (
        <div key={item.formIndex}>
          <RenderItem item={item} form={form} />
          {subName && (
            <Form.Item name={`${item.formIndex}_subCategoryName`} noStyle>
              <Input type="hidden" />
            </Form.Item>
          )}
          <HiddenItems inx={item.formIndex} />
        </div>
      );
    });
    return showDom;
  };

  return (
    <div className="structured-edit-wrap">
      {renderItem('commonItems')}
      <div style={{ display: showAll ? 'block' : 'none' }}>{renderItem('noCommonItems')}</div>
      {!isViewOnly && (
        <div className="flex justify-center" onClick={() => setshowAll(!showAll)}>
          {`点击${showAll ? '收起' : '展开'}不常用指标`}
          <img className="w-14 h-14 relative top-2" src={showAll ? closeIcon : openIcon} alt="" />
        </div>
      )}
    </div>
  );
};

export default IndexTable;
