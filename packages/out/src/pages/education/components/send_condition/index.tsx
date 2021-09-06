import React, { useEffect } from 'react';
import { Form, Select, Button, Space } from 'antd';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { staticType } from '../../const';
import ConditionVal from '../condition_val';
import styles from './index.scss';

const { Option } = Select;
interface IProps {
  form: Store;
  disabled: Record<string, boolean>
}

function SendCondition({ form, disabled }: IProps) {
  const { getFieldValue, setFieldsValue } = form;

  useEffect(() => {
    setFieldsValue({
      custom: [''],
      conditions: ['']
    });
  }, [])

  // const handleChangeType = (value: string) => {
  //   setFieldsValue({ custom: [''] });
  // }

  return (
    <Form.List name="conditions">
      {(fields, { add, remove }) => (
        <>
          <div className='flex justify-between items-center w-1/2 text-base'>
            <p className='font-bold text-base mb-15 mt-30'>·发送条件：</p>
            <Form.Item noStyle>
              <Button type="link" onClick={() => add()} className={styles.add}>
                <PlusSquareOutlined/>添加条件
              </Button>
            </Form.Item>
          </div>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'type']}
                fieldKey={[fieldKey, 'type']}
                // rules={[{ required: true, message: 'Missing first name' }]}
              >
                <Select
                  style={{ width: 290 }}
                  placeholder='请选择选项'
                >
                  {staticType.map(type => (
                    <Option
                      value={type.key}
                      key={type.key}
                      disabled={disabled[type.key]}
                    >
                      {type.value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <ConditionVal
                name={name}
                fieldKey={fieldKey}
                restField={{...restField}}
                type={getFieldValue('conditions')[name]?.type}
                form={form}
              />
              <DeleteOutlined
                className={styles.del}
                onClick={() => remove(name)}
              />
            </Space>
          ))}
        </>
      )}
    </Form.List>
  )
}

export default SendCondition;
