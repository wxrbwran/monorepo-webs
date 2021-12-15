import type { FC } from 'react';
import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import DragModal from 'xzl-web-shared/dist/components/DragModal';

const FormItem = Form.Item;
const { Option } = Select;
const AddPatient: FC = (props) => {
  const { children } = props;
  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        width={570}
        visible={show}
        maskClosable
        okText="确定"
        cancelText="退出"
        onOk={form.submit}
        onCancel={() => setShow(!show)}
        centered
        title="添加患者"
        destroyOnClose
      >
        <Form
          layout="inline"
          form={form}
          onFinish={handleSubmit}
          preserve={false}
        >
          <FormItem
            label="手机"
            name="tel"
            rules={[
              { required: true, message: '请输入手机号!' },
              {
                pattern: /^(13|14|15|16|17|18)+\d{9}$/,
                message: '请填写正确的手机号码!',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="serviceLevel"
            label="级别"
            rules={[{ required: true }]}
          >
            <Select placeholder="级别" style={{ width: 200 }}>
              <Option value="NORMAL">普通患者</Option>
              <Option value="VIP">VIP</Option>
            </Select>
          </FormItem>
        </Form>
      </DragModal>
    </>
  );
};

export default AddPatient;
