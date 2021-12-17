import React, { FC, useState, useEffect } from 'react';
import { Space, Form, Input, Select, Button } from 'antd';
import { getReferenceTitle } from 'xzl-web-shared/dist/utils/tool';

const { Option } = Select;

interface IProps {
  item: any;
  form: any;
}

const RenderItem: FC<IProps> = (props) => {
  const { item, form } = props;
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    // const
    console.log('RenderItem', item);
    setList(prev => [...prev, { value: '', key: +new Date() }]);
  }, []);
  return (
    <div className="flex w-full">
      <Form.Item initialValue={item.name} name={`${item.formIndex}_name`} style={{ width: 100 }}>
        <Input disabled readOnly />
      </Form.Item>
      <div className="mx-10">
        <Form.Item
          initialValue={item.abbreviation}
          name={`${item.formIndex}_abbreviation`}
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
                name={`${item.formIndex}_${index}_indexValue`}
                rules={[{ required: true, message: '请输入参考值' }]}
              >
                <Input placeholder="请输入参考值" />
              </Form.Item>
              {item?.references?.length > 0 && (
                <>
                  <Form.Item name={`${item.formIndex}_${index}_reference`}>
                    <Select style={{ width: 200 }} placeholder="请选择参考值类型">
                      {item.references?.map((reference: TReference) => (
                        <Option key={`${item.formIndex}_${reference.id}`} value={reference.id}>
                          {`${reference.note || ''} ${getReferenceTitle(reference)} ${
                            reference.unit || ''
                          }`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </>
              )}
              <Form.Item name={`${item.formIndex}_valueCount`} initialValue={1}>
                <Input type="hidden" />
              </Form.Item>
              <Form.Item name={`${item.formIndex}_referenceList`} initialValue={item?.references}>
                <Input type="hidden" />
              </Form.Item>
              <Form.Item>
                {index === 0 && (
                  <Button
                    type="primary"
                    onClick={() => {
                      setList((prev) => [...prev, { value: '', key: +new Date() }]);
                      form.setFieldsValue({
                        [`${item.formIndex}_valueCount`]: list.length + 1,
                      });
                    }}
                    block
                  >
                    添加更多
                  </Button>
                )}
                {index > 0 && (
                  <Button
                    danger
                    onClick={() => {
                      setList((prev) => prev.filter((p) => p.key !== _item.key));
                    }}
                    block
                  >
                    删除
                  </Button>
                )}
              </Form.Item>
            </Space>
          </Form.Item>
        ))}
      </div>
    </div>
  );
};

export default RenderItem;
