import type { FC } from 'react';
import React from 'react';
import { message, Form } from 'antd';
import ModalForm from '@/components/DragModal/DragModalForm';
import FormCheckGroup from '@/components/FormCheckGroup';
import { formItemLayout } from 'xzl-web-shared/dist/utils/consts';

// import { useDispatch } from 'umi';
// import styles from './index.scss';

interface IProps {
  trigger: React.ReactElement;
  selectId: string[];
  refresh: () => void;
}
/* eslint-disable react/jsx-props-no-spreading */
const AssignDepartment: FC<IProps> = (props) => {
  const { trigger, selectId, refresh } = props;
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  return (
    <ModalForm
      title="分配科室"
      trigger={trigger}
      layout="horizontal"
      colon={false}
      {...formItemLayout}
      modalProps={{
        width: 520,
        okText: '完成',
      }}
      onFinish={async (values) => {
        console.log(values);
        console.log(selectId);
        message.success('分配成功');
        refresh();
        return true;
      }}
      form={form}
    >
      <FormCheckGroup
        label=""
        errorMsg="请选择科室"
        menus={[
          { id: 1, name: '心内科' },
          { id: 2, name: '心外科' },
          { id: 3, name: '儿科' },
        ]}
        form={form}
        name="department"
        labelField="name"
        valField="id"
      />
    </ModalForm>
  );
};

export default AssignDepartment;
