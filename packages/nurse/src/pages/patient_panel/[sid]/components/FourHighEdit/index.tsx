import React, { useState } from 'react';
import { useSelector, useDispatch } from 'umi';
import DragModal from '@/components/DragModal';
import { btnRender } from '@/utils/button';
import {
  Form, Checkbox, Select, message,
} from 'antd';
import * as api from '@/services/api';
import { hyperList } from '@/utils/tools';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import DateInput from '../DateInput';

const { Option } = Select;
interface Iprops {
  children: React.ReactElement;
}
function FourHigh({ children }: Iprops) {
  const dispatch = useDispatch();
  const infos = useSelector((state: IPatient) => state.detail.infos);
  const patientSid = window.$storage.getItem('patientSid');
  const { fourHighInfo } = infos;
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;
  console.log(date);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    setFieldsValue({ ...fourHighInfo });
  };

  const changeDisease = (key: string, e: CheckboxChangeEvent) => {
    setFieldsValue({
      [key]: e.target.checked ? 'SICK' : 'WELL',
    });
    // setFieldsValue并不会引起DOM更新，手动更新date，纯属为了让DOM同步更新，因为DOM中用到了getFieldValue
    setDate(new Date());
  };

  const handleSubmit = (values) => {
    const params = {
      fourHighInfo: { ...values },
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
          title="四大代谢"
          onCancel={() => setShowModal(false)}
          footer={null}
          className="modal"
        >
          <Form
            name="baseInfo"
            // initialValues={fourHighInfo}
            onFinish={handleSubmit}
            form={form}
            className="height42"
          >
            {hyperList.map((item) => (
              <div className="list_item" key={item.key}>
                <Form.Item name={item.key}>
                  <Checkbox
                    defaultChecked={fourHighInfo && fourHighInfo[item.key] === 'SICK'}
                    onChange={(e) => changeDisease(item.key, e)}
                  >
                    {item.value}
                  </Checkbox>
                </Form.Item>
                <div style={{ display: 'flex' }}>
                  <Form.Item name={`${item.key}Since`}>
                    <DateInput
                      disabled={getFieldValue(item.key) === 'WELL' || !getFieldValue(item.key)}
                      months={+(fourHighInfo ? fourHighInfo[`${item.key}Since`] : '')}
                    />
                  </Form.Item>
                  <Form.Item name={`${item.key}Pharmacy`}>
                    <Select
                      disabled={getFieldValue(item.key) === 'WELL' || !getFieldValue(item.key)}
                      style={{ width: 100, marginLeft: 10 }}
                    >
                      <Option value="REGULAR">规律用药</Option>
                      <Option value="IRREGULAR">间断用药</Option>
                      <Option value="NONE">未用药</Option>
                      <Option value="UNKNOWN">不详</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            ))}
            <Form.Item style={{ marginTop: 42 }}>
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

export default FourHigh;
