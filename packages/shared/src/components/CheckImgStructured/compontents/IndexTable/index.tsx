import React, { FC, useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import HiddenItems from '../HiddenItems';
import RenderItem from './components/RenderItem';
import './index.css';

interface IProps {
  apiData: any;
  subName?: string;
  form: any;
  getFieldsValue: (key: string) => void;
  formInit: CommonData;
  lightKeyWord: string;
}

const IndexTable: FC<IProps> = (props) => {
  const { apiData, subName, form, lightKeyWord } = props;

  const [showAll, setshowAll] = useState(true);
  const [record, setRecord] = useState(apiData);

  useEffect(() => {
    setRecord(apiData);
  }, [apiData]);

  const handleChangeRecord = (param: TIndexItem) => {
    // console.log('param', param);
    // console.log('record', record);

    const isCommon = param.common;
    const tmp: any = { ...record };
    // const changedItem = [...tmp.commonItems, ...tmp.noCommonItems]
    //   .filter((i: TIndexItem) => i.id === param.id);
    // console.log('changedItem', changedItem);

    const commonItems = tmp.commonItems.filter((i: TIndexItem) => i.id !== param.id);
    // console.log('commonItems', commonItems);

    const noCommonItems = tmp.noCommonItems.filter((i: TIndexItem) => i.id !== param.id);
    // console.log('noCommonItems', noCommonItems);

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
      if (item?.referenceList.length === 0
        || !item?.referenceList.find(r => r.indexValue !== undefined)) {
        return null;
      }
      return (
        <div key={item.formIndex}>
          <RenderItem item={item} lightKeyWord={lightKeyWord} form={form} onSuccess={handleChangeRecord} />
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
    <div className={'structured-edit-wrap hyd_form'}>
      {renderItem('commonItems')}
      <div style={{ display: showAll ? 'block' : 'none' }}>{renderItem('noCommonItems')}</div>
    </div>
  );
};

export default IndexTable;
