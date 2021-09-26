import React, { useState } from 'react';
import { Form, Select, InputNumber, Spin, message } from 'antd';
import * as api from '@/services/api';
import styles from './index.scss';
import type { SelectValue } from 'antd/lib/select';

const { Option } = Select;
let timer: any = null;
interface IProps {
  name: number;
  fieldKey: number;
  restField: object;
  type: string;
  form: Store;
}
interface Ikey {
  uid: number;
  value: string;
}
function ConditionVal({ name, fieldKey, restField, type, form }: IProps) {
  const { getFieldValue, setFieldsValue } = form;
  const [fetching, setFetchStatus] = useState(false);// 搜索是否显示loading
  const [diagnosisList, setDiagnosis] = useState([]);// 获取诊断

  // 获取诊断
  const fetchDiagnosis = (value: string, kp: string) => {
    if (value !== '') {
      setFetchStatus(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        api.education.fetchKvScope({ target: value, kp }).then((res) => {
          console.log('res', res);
          const { values } = res;
          if (values.length > 0) {
            setDiagnosis(values);
          } else {
            message.info('没有该诊断信息!');
          }
        })
          .catch((err: { result: string }) => {
            console.log('err', err);
          });
        setFetchStatus(false);
      }, 800);
    }
  };

  const handleChange = (_value: SelectValue, e: { key: string }) => {
    // setFieldsValue({ custom: [''] });
    const conditions = getFieldValue('conditions');
    conditions[name].id = e.key;
    setFieldsValue({ ...conditions });
  };
  return (
    <>
      {
        type === 'age' && (
          <div className={styles.con_val}>
            <span className={styles.label}>范围：</span>
            <Form.Item
              {...restField}
              name={[name, 'min']}
              fieldKey={[fieldKey, 'min']}
              // noStyle
              rules={[{ required: true, message: '请输入开始值' }]}
            >
              <InputNumber min={1}/>
            </Form.Item>
            <span className='mx-16'>-</span>
            <Form.Item
              {...restField}
              name={[name, 'max']}
              fieldKey={[fieldKey, 'max']}
              // noStyle
              rules={[{ required: true, message: '请输入结束值' }]}
            >
              <InputNumber min={1}/>
            </Form.Item>
          </div>
        )
      }
      {
        type === 'sex' && (
          <div className={styles.con_val}>
            <span className={styles.label}>性别：</span>
            <Form.Item
              {...restField}
              name={[name, 'value']}
              fieldKey={[fieldKey, 'value']}
              // noStyle
              rules={[{ required: true, message: '请输选择性别' }]}
            >
              <Select
                style={{ width: 237 }}
                placeholder='请选择性别'
              >
                <Option value='男'>男</Option>
                <Option value='女'>女</Option>
              </Select>
            </Form.Item>
          </div>
        )
      }
      {
        type === 'diagnosis' && (
          <div className={styles.con_val}>
            <span className={styles.label}>诊断：</span>
            <Form.Item
              {...restField}
              name={[name, 'value']}
              fieldKey={[fieldKey, 'value']}
              // noStyle
              rules={[{ required: true, message: '请输选择诊断信息' }]}
            >
              <Select
                showSearch
                allowClear
                placeholder="请输入诊断"
                style={{ width: 237, height:  40 }}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={(value) => fetchDiagnosis(value, 'diagnose.disease')}
                onChange={(value, e) => handleChange(value, e)}
              >
                {diagnosisList.map((item: Ikey) => (
                  <Option
                    key={item.uid}
                    value={item.value}
                    title={item.value}
                  >
                    {item.value}
                  </Option>
                ))
                }
              </Select>
            </Form.Item>
          </div>
        )
      }
      {
        type === 'treatment' && (
          <div className={styles.con_val}>
            <span className={styles.label}>处理：</span>
            <Form.Item
              {...restField}
              name={[name, 'value']}
              fieldKey={[fieldKey, 'value']}
              // noStyle
              rules={[{ required: true, message: '请选择处理信息' }]}
            >
              <Select
                showSearch
                allowClear
                placeholder="请输入处理方式"
                style={{ width: 237 }}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={(value) => fetchDiagnosis(value, 'diagnose.treatment')}
                onChange={(value, e) => handleChange(value, e)}
              >
                {diagnosisList.map((item: Ikey) => (
                  <Option
                    key={item.uid}
                    value={item.value}
                    title={item.value}
                  >
                    {item.value}
                  </Option>
                ))
                }
              </Select>
            </Form.Item>
          </div>
        )
      }
    </>
  );
}

export default ConditionVal;
