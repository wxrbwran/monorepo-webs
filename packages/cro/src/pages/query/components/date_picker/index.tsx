import React, { useState } from 'react';
import moment from 'moment';
import { Form, Select, DatePicker, Input } from 'antd';
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
function DateTypePicker({ currentField, setFieldsValue }: IProps) {
  const [operator, setOperator] = useState('');

  const handleChangeOperator = (val: string) => {
    setOperator(val);
  }

  const datePickerStyle = {height: 34, margin: '0 5px' }

  // end-event.MAIN_ENDPOINT_0 取最后一位”0“
  const kIdx = currentField.key.split('_')[currentField.key.split('_').length-1];

  const handleSetFieldsVal = (val: any, key: string, operator: string) => {
    console.log('moment()', +new Date(val.startOf('day')));
    if(['>', '<'].includes(operator) || ['min', 'max'].includes(key)){
      const date = +new Date(val.startOf('day'))
      setFieldsValue({
        [`${currentField.name}_${key}_${kIdx}`]: date
      });
    } else if (operator === '=' ) {
      setFieldsValue({
        // [`${currentField.name}_operator_${kIdx}`]: '<>',
        [`${currentField.name}_min_${kIdx}`]: +new Date(val.startOf('day')),
        [`${currentField.name}_max_${kIdx}`]: +new Date(val.endOf('day')),
      });
    }
  }

  const disabledDate = (current: any) => {
    return current && current > moment().endOf('day');
  }

  return (
    <>
      <FormItem
        name={`${currentField.name}_operator_${kIdx}`}
        noStyle
        initialValue=''
      >
        <Select onChange={handleChangeOperator}>
          <Option value=''>全部时间</Option>
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
        operator === '=' && (
          <>
            <Form.Item
              name={`${currentField.name}_operator_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name={`${currentField.name}_min_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name={`${currentField.name}_max_${kIdx}`}
              noStyle
            >
              <Input type="hidden" />
            </Form.Item>
            <DatePicker
              key={`${currentField.name}_operator_${kIdx}`}
              style={datePickerStyle}
              onChange={(momentDate) => handleSetFieldsVal(momentDate, 'value', operator)}
              disabledDate={disabledDate}
            />
          </>
        )
      }
      {
        ['>', '<'].includes(operator) && (
          <>
            <Form.Item name={`${currentField.name}_value_${kIdx}`} noStyle>
              <Input type="hidden" />
            </Form.Item>
            <DatePicker
              key={`${currentField.name}_value_${kIdx}`}
              style={datePickerStyle}
              onChange={(momentDate) => handleSetFieldsVal(momentDate, 'value', operator)}
              disabledDate={disabledDate}
            />
          </>
        )
      }
      {
        operator === '<>' && (
          <>
            <Form.Item name={`${currentField.name}_min_${kIdx}`} noStyle>
              <Input type="hidden" />
            </Form.Item>
            <DatePicker
              style={datePickerStyle}
              key={`${currentField.name}_min_${kIdx}`}
              onChange={(momentDate) => handleSetFieldsVal(momentDate, 'min', operator)}
              disabledDate={disabledDate}
            />
            -
            <Form.Item name={`${currentField.name}_max_${kIdx}`} noStyle>
              <Input type="hidden" />
            </Form.Item>
            <DatePicker
              key={`${currentField.name}_max_${kIdx}`}
              style={datePickerStyle}
              onChange={(momentDate) => handleSetFieldsVal(momentDate, 'max', operator)}
              disabledDate={disabledDate}
            />
          </>
        )
      }
    </>
  )
}

export default DateTypePicker;
