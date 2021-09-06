import type { FC } from 'react';
import React from 'react';
import { Form } from 'antd';
import ModalForm from '@/components/DragModal/DragModalForm';
import { formItemLayout } from '@/utils/consts';

// import { useDispatch } from 'umi';
// import styles from './index.scss';

type IProps = {
  trigger: React.ReactElement;
  handleDelete: () => void;
};
const MoveOutHospital: FC<IProps> = (props) => {
  const { trigger, handleDelete } = props;
  const [form] = Form.useForm();

  return (
    <ModalForm
      title="确定移出？"
      trigger={trigger}
      layout="horizontal"
      colon={false}
      {...formItemLayout}
      modalProps={{
        width: 570,
        okText: '完成',
      }}
      onFinish={async () => handleDelete()}
      form={form}
    >
      <p className="text-center text-red-500">这是一个不可逆的操作，请谨慎对待！</p>
    </ModalForm>
  );
};

export default MoveOutHospital;
