import React, { useState } from 'react';
import {
  Form, Input, Radio, InputNumber, Button, message,
} from 'antd';
import { debounce } from 'lodash';
import DragModal from '@/components/DragModal';
import Calendar from '@/components/Calendar';
import Region, { IRegion } from '@/components/Region';
import * as api from '@/services/api';
import styles from './index.scss';

interface Iprops {
  children: React.ReactElement;
  partientSubject: ISubject;
  refresh: () => void;
}

function BaseInfosEdit({ children, partientSubject, refresh }: Iprops) {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleSubmit = (values: any) => {
    console.log(values);
    const params = {
      id: partientSubject?.id,
      ...values,
    };
    api.base.patchOtherInfo(params).then(() => {
      message.success('保存成功');
      setShowModal(false);
      refresh();
    });
  };
  const handleSetFieldsVal = (key: string, val: any) => {
    console.log(val);
    setFieldsValue({
      [key]: new Date(val).getTime(),
    });
  };
  const initFormVal:CommonData = {
    ...partientSubject,
  };

  const getRegion = (region: IRegion) => {
    setFieldsValue({
      ...region,
    });
  };

  const baseSex: CommonData = {
    男: 1,
    女: 0,
    保密: 2,
  };

  return (
    <div>
      <span onClick={handleShowModal}>{children}</span>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="675px"
            visible={showModal}
            title="基本资料"
            onCancel={() => setShowModal(false)}
            footer={null}
          >
            <div className={styles.edit_info}>
              <Form
                name="baseInfo"
                initialValues={initFormVal}
                onFinish={debounce(handleSubmit, 300)}
                form={form}
                id="height42"
              >
                <Form.Item
                  label="姓名"
                  name="name"
                >
                  <Input placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item
                  label="性别"
                  name="sex"
                >
                  <Radio.Group>
                    {
                      Object.keys(baseSex).map((item: string) => (
                        <Radio value={baseSex[item]} key={item}>{item}</Radio>
                      ))
                    }
                  </Radio.Group>
                </Form.Item>
                <div className={styles.measurements}>
                  <Form.Item
                    label="身高"
                    name="height"
                  >
                    <InputNumber
                      step={1}
                      precision={0}
                      min={1}
                    />
                  </Form.Item>
                  <span>CM</span>
                  <Form.Item
                    label="体重"
                    name="weight"
                  >
                    <InputNumber
                      step={1}
                      precision={0}
                      min={1}
                    />
                  </Form.Item>
                  <span>KG</span>
                  <Form.Item
                    label="腰围"
                    name="waistline"
                  >
                    <InputNumber
                      step={1}
                      precision={0}
                      min={1}
                    />
                  </Form.Item>
                  <span>CM</span>
                </div>
                <Form.Item
                  label="生日"
                  name="birthday"
                >
                  <Input type="hidden" />
                  <Form.Item noStyle>
                    <Calendar
                      needInit={false}
                      value={initFormVal.birthday}
                      onChange={(dateString) => handleSetFieldsVal('birthday', dateString)}
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item
                  label="联系方式"
                  name="tel"
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="民族"
                  name="ethnicity"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="现住址"
                  name="provinceName"
                >
                  <Input type="hidden" />
                  <Form.Item noStyle>
                    <Region getRegion={getRegion} initData={initFormVal} />
                  </Form.Item>
                </Form.Item>
                <div style={{ display: 'none' }}>
                  <Form.Item label="" name="cityName">
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item label="" name="cityCode">
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item label="" name="townName">
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item label="" name="townCode">
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item label="" name="provinceCode">
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item label="" name="address">
                    <Input type="hidden" />
                  </Form.Item>
                </div>
                <Form.Item
                  label="详细地址"
                  name="detailAddress"
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <div className="common__btn">
                    <Button onClick={() => setShowModal(false)}>取消</Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="finish"
                    >
                      确定
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </DragModal>
        )
      }
    </div>
  );
}

export default BaseInfosEdit;
