import React, { FC, useState, useEffect } from 'react';
import { Space, Form, Input, Select, Button } from 'antd';
import EditIndex from '@/components/EditIndex';
import { getReferenceTitle } from 'xzl-web-shared/dist/utils/tool';

const { Option } = Select;

interface IProps {
  item: any;
  form: any;
  onSuccess: (p: TIndexItem) => void;
}

const RenderItem: FC<IProps> = (props) => {
  const { item, form, onSuccess } = props;
  const [list, setList] = useState<any[]>([]);
  const [indexItem, setIndexItem] = useState<any>(item);
  useEffect(() => {
    // const
    console.log('RenderItem', indexItem);
    if (indexItem.referenceList) {
      setList(indexItem.referenceList);
    } else {
      // 用于初始化一个空组件
      setList((prev) => [...prev, { value: '', key: +new Date() }]);
    }
  }, [indexItem.referenceList]);
  const handleEditIndex = (param: TIndexItem) => {
    setIndexItem((prev: any) => ({ ...prev, ...param }));
    form.setFieldsValue({
      [`${indexItem.formIndex}_name`]: param.name,
      [`${indexItem.formIndex}_abbreviation`]: param.abbreviation,
    });
    onSuccess({ ...indexItem, ...param });
  };
  return (
    <div className="flex w-full">
      <Form.Item initialValue={indexItem.name} name={`${indexItem.formIndex}_name`} style={{ width: 100 }}>
        <Input disabled readOnly />
      </Form.Item>
      <div className="mx-10">
        <Form.Item
          initialValue={indexItem.abbreviation}
          name={`${indexItem.formIndex}_abbreviation`}
          style={{ width: 75 }}
        >
          <Input disabled readOnly />
        </Form.Item>
      </div>
      <div>
        {list.map((_item, index) => (
          <Form.Item noStyle key={_item.key}>
            <Space align="baseline" style={{ display: 'flex' }}>
              <Form.Item
                name={`${indexItem.formIndex}_${index}_indexValue`}
                rules={[{ required: true, message: '请输入参考值' }]}
              >
                <Input placeholder="请输入参考值" />
              </Form.Item>
              {indexItem?.references?.length > 0 && (
                <>
                  <Form.Item name={`${indexItem.formIndex}_${index}_reference`}>
                    <Select style={{ width: 200 }} placeholder="请选择参考值类型">
                      {indexItem.references?.map((reference: TReference) => (
                        <Option key={`${indexItem.formIndex}_${reference.id}`} value={reference.id}>
                          {`${reference.note || ''} ${getReferenceTitle(reference)} ${
                            reference.unit || ''
                          }`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </>
              )}
              <Form.Item name={`${indexItem.formIndex}_valueCount`}>
                <Input type="hidden" />
              </Form.Item>
              <Form.Item name={`${indexItem.formIndex}_referenceList`}>
                <Input type="hidden" />
              </Form.Item>
              {!indexItem.referenceList && (
                <Form.Item>
                  {index === 0 && (
                    <Space>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => {
                          setList((prev) => [...prev, { value: '', key: +new Date() }]);
                          form.setFieldsValue({
                            [`${indexItem.formIndex}_valueCount`]: list.length + 1,
                          });
                        }}
                      >
                        添加更多
                      </Button>
                      <EditIndex initFormVal={indexItem} onSuccess={handleEditIndex} source="imgEditIndex">
                        <Button type="primary" ghost>
                          编辑
                        </Button>
                      </EditIndex>
                    </Space>
                  )}
                  {index > 0 && (
                    <Button
                      danger
                      onClick={() => {
                        setList((prev) => prev.filter((p) => p.key !== _item.key));
                      }}
                    >
                      删除
                    </Button>
                  )}
                </Form.Item>
              )}
            </Space>
          </Form.Item>
        ))}
      </div>
    </div>
  );
};

export default RenderItem;
