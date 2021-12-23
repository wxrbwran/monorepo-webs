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
  const [record, setRecord] = useState(apiData);
  console.log('formInit', formInit);
  useEffect(() => {
    setshowAll(isViewOnly);
  }, [isViewOnly]);

  useEffect(() => {
    setRecord(apiData);
  }, [apiData]);

  const handleChangeRecord = (param: TIndexItem) => {
    console.log('param', param);
    console.log('record', record);

    const isCommon = param.common;
    const tmp: any = { ...record };
    // const changedItem = [...tmp.commonItems, ...tmp.noCommonItems]
    //   .filter((i: TIndexItem) => i.id === param.id);
    // console.log('changedItem', changedItem);


    const commonItems = tmp.commonItems.filter((i: TIndexItem) => i.id !== param.id);
    console.log('commonItems', commonItems);

    const noCommonItems = tmp.noCommonItems.filter((i: TIndexItem) => i.id !== param.id);
    console.log('noCommonItems', noCommonItems);

    if (isCommon) {
      commonItems.push(param);
    } else {
      noCommonItems.push(param);
    }
    console.log('{ commonItems, noCommonItems }', { commonItems, noCommonItems });

    setRecord({ commonItems, noCommonItems });
  };

  const renderItem = (type: string) => {
    // 有subName的是有子分类的情况，inx是为了索引唯一使用
    return record[type].map((item: CommonData, _index: number) => {
      // 如果存在originReferences字段，表明是回显
      if (item?.originReferences?.length > 0) {
        item.references = item.originReferences.map((r) => {
          r.id = r.referenceId;
          return r;
        });
      }
      return (
        <div key={item.formIndex}>
          <RenderItem item={item} form={form} onSuccess={handleChangeRecord} />
          {subName && (
            <Form.Item name={`${item.formIndex}_subCategoryName`} noStyle>
              <Input type="hidden" />
            </Form.Item>
          )}
          <HiddenItems inx={item.formIndex} />
        </div>
      );
    });
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
