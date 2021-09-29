import React, { useEffect } from 'react';
import { Form, Select, Button, InputNumber } from 'antd';
import { sendType } from '../../const';
import styles from './index.scss';

const FormItem = Form.Item;
const { Option } = Select;

interface IProps {
  form: Store;
}

function SendFrequency({ form }: IProps) {
  // const [type, setType] = useState('CUSTOM');
  const { setFieldsValue, getFieldValue } = form;

  useEffect(() => {
    setFieldsValue({ custom: [''] });
  }, []);

  const handleChangeType = () => {
    // setType(value);
    setFieldsValue({ custom: [''] });
  };

  return (
    <>
      <p className='font-bold text-base mb-15 mt-30'>·发送频率：</p>
      <div className='flex justify-start items-start'>
      <FormItem
        name={'frequencyType'}
        noStyle
        initialValue='once'
      >
        <Select style={{ width: 180 }} onChange={handleChangeType}>
          {sendType.map(item => (
            <Option
              value={item.key}
              key={item.key}
            >
              {item.value}
            </Option>
          ))}
        </Select>
      </FormItem>
      <div className='ml-50'>
        {
          getFieldValue('frequencyType') === 'once' ? (
            <Form.List
              name="custom"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      required={false}
                      key={field.key}
                      className={styles.add_item}
                    >
                      <div className={styles.add_item_left}>
                        <span>第</span>
                        <Form.Item
                          noStyle
                          {...field}
                          rules={[{ required: true, message: '请完善发送频率' }]}
                        >
                          <InputNumber
                            min={1}
                            max={9999}
                          />
                        </Form.Item>
                        <span>天发送一次</span>
                      </div>
                      {!index ? (
                        <Button size="large" onClick={() => add()} style={{ width: 66 }}>添加更多</Button>
                      ) : <Button size="large" onClick={() => remove(field.name)} style={{ width: 66 }} >删除</Button>}
                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>
          ) : (
            <Form.List name="custom">
              {(fields) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key}>
                      <span className='mr-8'>每</span>
                      <Form.Item
                        noStyle
                        {...field}
                        rules={[{ required: true, message: '请完善发送频率' }]}
                      >
                        <InputNumber
                          style={{ width: 50 }}
                          min={1}
                          max={9999}
                        />
                      </Form.Item>
                      <span className='ml-8'>天下发一次</span>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          )
        }
      </div>
    </div>
    </>
  );
}

export default SendFrequency;
