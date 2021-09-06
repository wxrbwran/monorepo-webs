import React, { FC } from 'react';
import { message, Form } from 'antd';
import ModalForm from '@/components/DragModal/DragModalForm';
import { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { formItemLayout } from '@/utils/consts';

// import { useDispatch } from 'umi';
// import styles from './index.scss';

interface IProps {
  trigger: React.ReactElement;
}
/* eslint-disable react/jsx-props-no-spreading  */
/* eslint-disable no-confusing-arrow  */

const BindPhone: FC<IProps> = (props) => {
  const { trigger } = props;
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  return (
    <div>
      <ModalForm
        title="绑定手机号"
        trigger={trigger}
        layout="horizontal"
        {...formItemLayout}
        modalProps={{
          width: 570,
          okText: '确认绑定',
          wrapClassName: 'hide_modalform_cancel',
        }}
        onFinish={async (values) => {
          console.log(values);
          message.success('提交成功');
          return true;
        }}
        form={form}
      >
        <ProFormCaptcha
          width="md"
          name="tel"
          label="手机号码"
          rules={[
            {
              required: true,
              message: '请输入手机号码',
            },
          ]}
          placeholder="请输入手机号码"
          captchaTextRender={(timing, count) => (timing ? `${count} 获取验证码` : '获取验证码')}
          onGetCaptcha={async (mobile) => {
            console.log('mobile', mobile);
            if (!/^[1-9]\d{10}$/.test(mobile)) {
              message.warning('请输入正确的手机号');
              return;
            }
            // await post('base.smsSend', {
            //   mobile,
            //   template: 'login',
            // });
            message.success('验证码已发送，请注意查收');
          }}
        />
        <ProFormText
          width="md"
          rules={[{ required: true }]}
          name="vcode"
          label="验证码"
          placeholder="请输入验证码"
        />
      </ModalForm>
    </div>
  );
};

export default BindPhone;
