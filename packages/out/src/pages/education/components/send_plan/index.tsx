import React from 'react';
import { Form, Select } from 'antd';
import SendFrequency from '../send_frequency';
import SendCondition from '../send_condition';
import SendGroup from '../send_group';
import styles from './index.scss';

const { Option } = Select;
interface IProps {
  disabled: Record<string, boolean>;
  form: Store;
}
function SendPlan({ disabled, form }: IProps) {

  return (
    <div className={styles.send_plan}>
      <p className='font-bold text-base mb-15 mt-30'>·起始发送时间：</p>
      <Form.Item noStyle name={'time'} initialValue='ADMISSION_TIME'>
        <Select style={{ width: 300 }}>
          <Option
            value='ADMISSION_TIME'
            key='ADMISSION_TIME'
          >
            患者与医院内医生绑定后第二天上午九点
          </Option>
        </Select>
      </Form.Item>
      <SendFrequency form={form}/>
      <SendCondition form={form} disabled={disabled}/>
      <SendGroup form={form}/>
    </div>
  )
}

export default SendPlan;
