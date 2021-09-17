import React from 'react';
import { Form, Input, Radio } from 'antd';

const FormItem = Form.Item;
/* eslint-disable react/jsx-props-no-spreading */
export const telItem = (props: Store) => (
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
    <Input {...props} />
  </FormItem>
);

export const nameItem = (props) => (
  <FormItem name="name" label="姓名" rules={[{ required: true }]}>
    <Input {...props} />
  </FormItem>
);

export const sexItem = (
  <Form.Item name="sex" label="性别" rules={[{ required: true }]}>
    <Radio.Group>
      <Radio value="MALE">男</Radio>
      <Radio value="FEMALE">女</Radio>
    </Radio.Group>
  </Form.Item>
);
