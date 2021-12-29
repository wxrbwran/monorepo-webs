import React, { FC } from 'react';
import { message, Form, Button } from 'antd';
import ModalForm from '@/components/DragModal/DragModalForm';
import BindPhone from '@/components/BindPhone';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { formItemLayout } from 'xzl-web-shared/dist/utils/consts';

// import { useDispatch } from 'umi';
// import styles from './index.scss';

interface IProps {
  trigger: React.ReactElement;
}
/* eslint-disable react/jsx-props-no-spreading */
const ChangePwd: FC<IProps> = (props) => {
  const { trigger } = props;
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const triggerEle = (
    <Button type="link" style={{ padding: 0 }}>
      去绑定
    </Button>
  );
  return (
    <div>
      <ModalForm
        title="修改密码"
        trigger={trigger}
        layout="horizontal"
        {...formItemLayout}
        modalProps={{
          width: 570,
          okText: '完成',
          wrapClassName: 'hide_modalform_cancel',
        }}
        onFinish={async (values) => {
          console.log(values);
          message.success('提交成功');
          return true;
        }}
        form={form}
      >
        <ProForm.Group>
          <ProFormText
            width="lg"
            rules={[{ required: true }]}
            name="oldPassword"
            label="原密码"
            placeholder="请输入原密码"
          />
          <ProFormText
            width="lg"
            rules={[{ required: true }]}
            name="password"
            label="新密码"
            placeholder="请输入新密码"
          />
          <ProFormText
            width="lg"
            rules={[{ required: true }]}
            name="password2"
            label="确认密码"
            placeholder="请确认密码"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: 32,
              lineHeight: '32px',
            }}
          >
            <span>您的账号暂未绑定手机号，</span>
            <BindPhone trigger={triggerEle} />
          </div>
        </ProForm.Group>
      </ModalForm>
    </div>
  );
};

export default ChangePwd;
