/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'umi';
import {
  Form, Checkbox, Radio, message, Input,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SelectValue } from 'antd/lib/select';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import { btnRender } from '@/utils/button';
import { radioList, pRadioList, diaList } from '@/utils/tools';
import * as api from '@/services/api';
import DateInput from '../DateInput';
import ExtraDiagSelect from '../ExtraDiagSelect';
import styles from './index.scss';

const RadioGroup = Radio.Group;
interface Iprops {
  children: React.ReactElement;
}
interface IExtra {
  diseaseId: string;
  diseaseName: string;
  since: string;
  diseaseCure: string;
}
let uuid = 0;
function OtherDiaEdit({ children }: Iprops) {
  const dispatch = useDispatch();
  const infos = useSelector((state: IPatient) => state.detail.infos);
  const { otherDiagnosis } = infos;
  const patientSid = window.$storage.getItem('patientSid');
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [extraDiag, setExtraDiag] = useState<number[]>([]);
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;
  console.log(date);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    const extra: IExtra[] = otherDiagnosis ? otherDiagnosis.extraDisease : [];
    if (extra.length > 0) {
      let initData: CommonData = {};
      const newExtraDiag: number[] = [];
      extra.forEach((item, index) => {
        newExtraDiag.push(index);
        const {
          diseaseId, diseaseName, since, diseaseCure,
        } = item;
        initData = {
          ...initData,
          [`disease_${index}`]: {
            diseaseId,
            diseaseName,
          },
          [`since_${index}`]: since,
          [`diseaseCure_${index}`]: diseaseCure,
        };
      });
      setFieldsValue({ ...otherDiagnosis, ...initData });
      setExtraDiag([...newExtraDiag]);
      uuid = extra.length - 1;
    } else {
      setFieldsValue({ ...otherDiagnosis });
    }
  };

  const changeDiag = (key: string, e: CheckboxChangeEvent) => {
    setFieldsValue({
      [key]: e.target.checked ? 'SICK' : 'WELL',
    });
    // setFieldsValue并不会引起DOM更新，手动更新date，纯属为了让DOM同步更新，因为DOM中用到了getFieldValue
    setDate(new Date());
  };

  const add = () => {
    uuid++;
    setExtraDiag([...extraDiag, uuid]);
  };
  const changeDiagnose = (values: SelectValue, option: any, key: string) => {
    console.log(values);
    const diseaseInfo = {
      diseaseId: option.value,
      diseaseName: option.title,
    };
    setFieldsValue({
      [key]: diseaseInfo,
    });
    setDate(new Date());
  };

  const removeExtraItem = (item: number) => {
    const newExtraDiag = extraDiag.filter((i) => i !== item);
    setExtraDiag([...newExtraDiag]);
  };

  const handleSubmit = (values) => {
    const extraArray: IExtra[] = [];
    extraDiag.forEach((item) => {
      if (values[`disease_${item}`]) {
        extraArray.push({
          diseaseId: values[`disease_${item}`].diseaseId,
          diseaseName: values[`disease_${item}`].diseaseName,
          since: values[`since_${item}`],
          diseaseCure: values[`diseaseCure_${item}`],
        });
      }
      delete values[`disease_${item}`];
      delete values[`since_${item}`];
      delete values[`diseaseCure_${item}`];
    });
    const params = {
      otherDiagnosis: { ...values, extraDisease: extraArray },
      wcId: window.$storage.getItem('patientWcId'),
      sid: window.$storage.getItem('patientSid'),
      roleType: window.$storage.getItem('roleId'),
    };
    api.medical.updateDisease(params).then(() => {
      message.success('添加成功');
      setShowModal(false);
      dispatch({
        type: 'detail/fetchMedicalRecord',
        payload: patientSid,
      });
      form.resetFields();
    });
  };

  return (
    <>
      <div className="rightAddbtn patientEditBtn" onClick={toggleShowModal}>
        {children}
      </div>
      {showModal && (
        <DragModal
          wrapClassName="ant-modal-wrap-center"
          width="580px"
          visible={showModal}
          title="其他诊断"
          onCancel={() => {
            setShowModal(false);
          }}
          footer={null}
          className="modal"
        >
          <Form
            name="baseInfo"
            // initialValues={otherDiagnosis}
            onFinish={handleSubmit}
            form={form}
          >
            {diaList.map((item) => (
              <div className={item.key === 'pylori' ? 'list_item pylori' : 'list_item'} key={item.key}>
                <Form.Item name={item.key}>
                  <Checkbox
                    defaultChecked={otherDiagnosis && otherDiagnosis[item.key] === 'SICK'}
                    onChange={(e) => changeDiag(item.key, e)}
                  >
                    {item.value}
                  </Checkbox>
                </Form.Item>
                <div className="info">
                  {item.key !== 'pylori' && (
                    <Form.Item name={`${item.key}Since`}>
                      <DateInput
                        disabled={getFieldValue(item.key) === 'WELL' || !getFieldValue(item.key)}
                        months={+(otherDiagnosis ? otherDiagnosis[`${item.key}Since`] : '')}
                      />
                    </Form.Item>
                  )}
                  {
                    // 幽门螺旋杆菌
                    item.key !== 'pylori' ? (
                      <Form.Item name={`${item.key}Cure`}>
                        <RadioGroup
                          disabled={getFieldValue(item.key) === 'WELL' || !getFieldValue(item.key)}
                        >
                          {radioList.map((radio) => (
                            <Radio key={radio.value} value={radio.value}>
                              {radio.title}
                            </Radio>
                          ))}
                        </RadioGroup>
                      </Form.Item>
                    ) : (
                      <Form.Item name="pyloriStatus" style={{ marginTop: -15 }}>
                        <RadioGroup
                          disabled={getFieldValue(item.key) === 'WELL' || !getFieldValue(item.key)}
                        >
                          {pRadioList.map((radio) => (
                            <Radio key={radio.value} value={radio.value}>
                              {radio.title}
                            </Radio>
                          ))}
                        </RadioGroup>
                      </Form.Item>
                    )
                  }
                </div>
              </div>
            ))}
            {extraDiag.map((extraItem) => {
              const disease = getFieldValue(`disease_${extraItem}`);
              const since = getFieldValue(`since_${extraItem}`);
              return (
                <React.Fragment key={extraItem}>
                  <div className={styles.disease}>
                    <Form.Item name={`disease_${extraItem}`}>
                      <Input type="hidden" />
                    </Form.Item>
                    <ExtraDiagSelect
                      disease={disease}
                      changeDiagnose={(value: SelectValue, option: any) => changeDiagnose(value, option, `disease_${extraItem}`)}
                    />
                    <DeleteOutlined
                      onClick={() => {
                        removeExtraItem(extraItem);
                      }}
                    />
                  </div>
                  <div className="info" style={{ marginBottom: 5 }}>
                    <Form.Item name={`since_${extraItem}`}>
                      <DateInput months={+since} disabled={!disease} />
                    </Form.Item>
                    <Form.Item name={`diseaseCure_${extraItem}`}>
                      <RadioGroup disabled={!disease}>
                        {radioList.map((radio) => (
                          <Radio key={radio.value} value={radio.value}>
                            {radio.title}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </Form.Item>
                  </div>
                </React.Fragment>
              );
            })}
            <div onClick={add} className={styles.add}>
              {' '}
              <PlusOutlined />
              {' '}
              添加其他诊断
            </div>
            <Form.Item>
              {btnRender({
                okText: '保存',
                cancelText: '取消',
                htmlType: 'submit',
                onCancel: () => {
                  setShowModal(!showModal);
                },
              })}
            </Form.Item>
          </Form>
        </DragModal>
      )}
    </>
  );
}

export default OtherDiaEdit;
