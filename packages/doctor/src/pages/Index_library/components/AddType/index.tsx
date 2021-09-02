import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, message,
} from 'antd';
import { debounce } from 'lodash';
import DragModal from '@/components/DragModal';
import * as api from '@/services/api';

interface IProps {
  imageType: string;
  onSuccess: () => void;
}
const AddType: FC<IProps> = (props) => {
  const { imageType, onSuccess } = props;
  const [showModal, setshowModal] = useState(false);
  // 点击添加
  const handleAddBtn = () => {
    setshowModal(true);
  };
  console.log(32);
  const toggleShowModal = () => {
    setshowModal(false);
  };
  const handleSave = (values: any) => {
    console.log(values);
    const params = {
      ...values,
      type: imageType,
      source: 'DOCTOR',
      sourceSid: window.$storage.getItem('sid'),
      wcId: window.$storage.getItem('wcId'),
    };
    api.indexLibrary.putIndexDocument(params).then(() => {
      message.success('添加成功');
      onSuccess();
      setshowModal(false);
    }).catch((err) => {
      message.error(err?.result || '添加失败');
    });
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const submitLayout = {
    wrapperCol: { span: 24 },
  };
  return (
    <div>
      <span><PlusOutlined onClick={handleAddBtn} /></span>
      <DragModal
        title="添加"
        footer={null}
        width={600}
        visible={showModal}
        onCancel={() => setshowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        destroyOnClose
      >
        <div>
          <Form
            {...layout}
            name="basic"
            onFinish={debounce(handleSave, 300)}
            id="height42"
            draggable
          >
            <Form.Item
              label={`${imageType === 'HYD' ? '化验' : '检查'}单名称`}
              name="name"
              rules={[{ required: true, message: '请输入!' }]}
            >
              <Input placeholder={`请输入${imageType === 'HYD' ? '化验' : '检查'}单名称`} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }} {...submitLayout}>
              <div className="common__btn">
                <Button onClick={toggleShowModal}>取消</Button>
                <Button className="finish" htmlType="submit" type="primary">保存</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default AddType;
