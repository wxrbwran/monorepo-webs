import React, { useState } from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
interface IProps {
  currentField: {
    level: string;
    type: string;
    name: string;
    key: string;
    description: string;
    assign: any;
    items: {
      type: string;
    }[]
  },
  setFieldsValue: (params: object) => void;
}

const FormItem = Form.Item;
const { Option } = Select;
function NumberPicker({ currentField, setFieldsValue }: IProps) {
  const [operator, setOperator] = useState('');

  const handleChangeOperator = (val: string) => {
    setOperator(val);
  };



  const commonStyle = { height: 34, width: 70, margin: '0 5px', lineHeight: '34px', fontSize: '14px' };

  console.log('currentField666', currentField);
  // const isDynamic = currentField.items?.filter(item => ['date', 'timestamp', 'int'].includes(item.type)).length === 2

  // end-event.MAIN_ENDPOINT_0 取最后一位”0“
  const kIdx = currentField.key.split('_')[currentField.key.split('_').length - 1];

  const handleSetFieldsVal = (val: any, key: string) => {
    setFieldsValue({
      [`${currentField.name}_${key}_${kIdx}`]: val,
    });
  };

  return (
    <>
      {
        ['高压', '低压'].includes(currentField.description) && (
          <span style={{ marginRight: '8px' }}>{currentField.description}: </span>
        )
      }

      <FormItem
        name={`${currentField.name}_operator_${kIdx}`}
        noStyle
        initialValue=''
      >
        <Select onChange={handleChangeOperator}>
          <Option value=''>全部数值</Option>
          <Option value='>'>大于</Option>
          <Option value='='>等于</Option>
          <Option value='<'>小于</Option>
          <Option value='<>'>区间</Option>
        </Select>
      </FormItem>
      {
        !operator && (
          <>
            <Form.Item
              name={`${currentField.name}_operator_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <FormItem
              name={`${currentField.name}_value_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </FormItem>
          </>
        )
      }
      {
        operator === '<>' && (
          <>
            <FormItem
              name={`${currentField.name}_min_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </FormItem>
            <InputNumber
              style={commonStyle}
              key={`${currentField.name}_min_${kIdx}`}
              onChange={(val) => handleSetFieldsVal(val, 'min')}
              min={0}
            />
            -
            <FormItem
              name={`${currentField.name}_max_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </FormItem>
            <InputNumber
              style={commonStyle}
              key={`${currentField.name}_max_${kIdx}`}
              onChange={(val) => handleSetFieldsVal(val, 'max')}
              min={0}
            />
          </>
        )
      }
      {
        ['>', '=', '<'].includes(operator) && (
          <>
            <FormItem
              name={`${currentField.name}_value_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </FormItem>
            <InputNumber
              style={commonStyle}
              key={`${currentField.name}_value_${kIdx}`}
              onChange={(val) => handleSetFieldsVal(val, 'value')}
              min={0}
            />
          </>
        )
      }
      {
        currentField.assign.unit && !!operator && (
          <>
            <FormItem
              name={`${currentField.name}_unit_${kIdx}`}
              noStyle
              initialValue={currentField.assign.unit}
            >
              <Input type="hidden" />
            </FormItem>
            {currentField.assign.unit}
          </>
        )
      }
      {/* {
        isDynamic && (
          <FormItem
            name={`${currentField.name}.uid_value_${kIdx}`}
            noStyle
            initialValue={currentField.description}
          >
              <Input type="hidden" />
          </FormItem>
        )
      } */}
      {/* <FormItem
        name='unit'
        noStyle
      >
        <Select defaultValue="mmHg" style={{ minWidth: 74 }}>
          <Option value='mmHg'>mmHg</Option>
          <Option value='mg'>mg</Option>
          <Option value='g'>g</Option>
        </Select>
      </FormItem> */}
    </>
  );
}

export default NumberPicker;
