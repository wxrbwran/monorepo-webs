import React, { FC, useEffect, useState } from 'react';
import {
  Form, Input, InputNumber, DatePicker, Button, Select, message, Spin,
} from 'antd';
import moment from 'moment';
import { useDispatch } from 'umi';
import { DeleteOutlined } from '@ant-design/icons';
import * as api from '@/services/api';
import { BloodType2 } from '@/utils/tools';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import styles from './index.scss';

interface IItem {
  name: string;
  abbr: string;
  measuredAt: number | null
}
const { Option } = Select;
const LatestHealthUpload: FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();
  const { getFieldValue, setFieldsValue } = form;
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [date, setDate] = useState<number>();
  const sid = window.$storage.getItem('patientSid'); // 患者sid
  useEffect(() => {
    if (show) {
      setBtnLoading(false);
      const params = {
        sid,
      };
      api.medical.fetchMedicalRecord(params).then((res) => {
        const list: any = [];
        res.list.forEach((item: {measuredAt: number | null}) => {
          list.push({
            ...item,
            measuredAt: item.measuredAt ? moment(item.measuredAt) : null,
          });
        });
        setFieldsValue({ list });
        setDataLoading(false);
      });
    }
  }, [show]);
  const handleSubmit = (values: {list: IItem[]}) => {
    setBtnLoading(true);
    const list: any = [];
    values.list.forEach((item: IItem) => {
      let measuredAt: null | number = null;
      if (item.measuredAt) {
        if (['BP', 'HEART_RATE', ...Object.keys(BloodType2)].includes(item.abbr)) {
          measuredAt = new Date(item.measuredAt).getTime();
        } else {
          measuredAt = new Date(item.measuredAt).setHours(0, 0, 0, 0);
        }
      }
      list.push({
        ...item,
        measuredAt,
      });
    });
    const params = {
      list,
      sid,
    };
    api.medical.addCustomMedical(params).then(() => {
      message.success('添加成功');
      setShow(false);
      // 更新用药达标
      dispatch({
        type: 'currentPatient/fetchMedicalLast',
        payload: { sid },
      });
    }).catch((err) => {
      console.log(err);
      setShow(false);
      message.error(err?.result || '添加失败');
    });
  };
  const handleChange = (key?: number) => {
    console.log(date);
    setDate(+new Date());
    // form.validateFields([['list', name, 'measuredAt']]);
    // 解决新增加一条指标项，检测时间显示默认值后，实际getFieldValue获取的时间字段无值，导致明明有默认值，rules却进行校验“请输入”
    if (key && !getFieldValue('list')[key]?.measuredAt) {
      const list = getFieldValue('list');
      list[key].measuredAt = moment();
      setFieldsValue({ list });
    }
  };
  const addNew = (fun: Function) => {
    fun();
    const HEALTHLISTEl = document.getElementById('HEALTH_LIST');
    if (HEALTHLISTEl) {
      setTimeout(() => {
        HEALTHLISTEl.scrollTop = 999999;
      }, 300);
    }
  };
  const rules = [{ required: true, message: '请输入' }];
  const getRange = (abbr: string) => {
    switch (abbr) {
      case 'GLU_BEFORE_BREAKFAST':
        return { min: 1, max: 30 };
      case 'HEART_RATE':
        return { min: 20, max: 399 };
      case 'UA':
        return { min: 0, max: 1000 };
      default:
        return { min: 0 };
    }
  };
  const disabledDate = (current: any) => current && current > moment().endOf('day');

  return (
    <>
      <span onClick={() => setShow(true)}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center health_modal"
        width="730px"
        visible={show}
        title="采集指标"
        onCancel={() => setShow(false)}
        footer={null}
        className={styles.health_modal}
      >
        <div className={styles.health_upload}>
          <div className={`flex justify-around mb-15 ${styles.header}`}>
            <span>项目</span>
            <span>数值</span>
            <span>单位</span>
            <span>时间</span>
          </div>
          { dataLoading && <Spin size="large" className="w-full" /> }
          <Form
            name="latesHealthUpload"
            onFinish={handleSubmit}
            form={form}
            id="height42"
          >
            <Form.List
              name="list"
            >
              {(fields, { add, remove }) => (
                <>
                  <div className={styles.wrapper} id="HEALTH_LIST">
                    {fields.map(({
                      key, name,
                    }) => {
                      const hasAbbr = getFieldValue('list')[key]?.abbr;
                      const bPHigh = getFieldValue('list')[key]?.high;
                      const bPLow = getFieldValue('list')[key]?.low;
                      const hasVal = getFieldValue('list')[key]?.abbr === 'BP' ? bPLow : getFieldValue('list')[key]?.value;
                      const isShowTime = ['BP', 'HEART_RATE', ...Object.keys(BloodType2)].includes(hasAbbr);
                      return (
                        <div className={styles.cont_item} key={key}>
                          <div className="zb">
                            <Form.Item name={[name, 'name']} rules={hasAbbr ? [] : rules}>
                              {
                            getFieldValue('list')[key]?.name === '血糖' && hasAbbr ? (
                              <Form.Item name={[name, 'abbr']}>
                                <Select style={{ width: 110 }}>
                                  {
                                    Object.keys(BloodType2).map((bloodKey: string) => (
                                      <Option
                                        value={bloodKey}
                                        key={bloodKey}
                                      >
                                        {BloodType2[bloodKey]}
                                        血糖
                                      </Option>
                                    ))
                                  }
                                </Select>
                              </Form.Item>
                            ) : (
                              <Input placeholder="请输入指标" disabled={hasAbbr} />
                            )
                          }
                            </Form.Item>
                          </div>
                          <div className={hasAbbr === 'BP' ? 'bp' : styles.val}>
                            {
                            hasAbbr === 'BP' ? (
                              <>
                                <Form.Item name={[name, 'high']} rules={!bPLow ? [] : rules}>
                                  <InputNumber placeholder="收缩压" onChange={() => handleChange()} min={40} max={220} />
                                </Form.Item>
                                <span className="ml-5 mr-5">/</span>
                                <Form.Item name={[name, 'low']} rules={!bPHigh ? [] : rules}>
                                  <InputNumber placeholder="舒张压" onChange={() => handleChange()} min={40} max={220} />
                                </Form.Item>
                              </>
                            ) : (
                              <Form.Item name={[name, 'value']} rules={hasAbbr ? [] : rules}>
                                <InputNumber
                                  placeholder="实际值"
                                  onChange={() => handleChange(key)}
                                  min={getRange(hasAbbr)?.min}
                                  max={getRange(hasAbbr)?.max}
                                  step={['GLU_BEFORE_BREAKFAST', 'TC', 'TG', 'LDL_C'].includes(hasAbbr) ? 0.1 : 1}
                                />
                              </Form.Item>
                            )
                          }
                          </div>
                          <Form.Item name={[name, 'unit']} rules={hasAbbr ? [] : rules}>
                            <Input placeholder="单位" disabled={hasAbbr} />
                          </Form.Item>
                          <Form.Item name={[name, 'measuredAt']} rules={[{ required: hasVal, message: '请输入' }]}>
                            <DatePicker
                              placeholder="请选择检测时间"
                              disabledDate={disabledDate}
                              format={isShowTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'}
                              showTime={isShowTime ? { format: 'HH:mm' } : false}
                            />
                          </Form.Item>
                          {
                          !hasAbbr && (
                            <DeleteOutlined className={styles.del} onClick={() => remove(name)} />
                          )
                        }
                        </div>
                      );
                    })}
                  </div>
                  <Form.Item>
                    <Button type="link" className="text-sm pl-75" onClick={() => addNew(add)}>+添加新指标</Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div className="common__btn mt-0">
              <Button onClick={() => setShow(false)}> 取消 </Button>
              <Button htmlType="submit" type="primary" loading={btnLoading}> 确定 </Button>
            </div>
          </Form>
        </div>
      </DragModal>
    </>
  );
};

export default LatestHealthUpload;
