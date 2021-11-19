import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import * as api from '@/services/api';
import { IAddJcdItem } from '../type';
import { Form, Input, Button, message } from 'antd';

interface IProps {
  actionType: string;
  partMethod?: {
    part?: string;
    method?: string;
  };
  handleAddJcdTab: (data: IAddJcdItem) => void;
  updateCreateJcdNum: () => void;
}
const CreateJcd: FC<IProps> = (props) => {
  const { actionType, children, partMethod, handleAddJcdTab, updateCreateJcdNum } = props;
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [showModal, setShowModal] = useState(false);
  const doctorSid = window.$storage.getItem('sid');
  useEffect(() => {
    if (partMethod) {
      const { part, method } = partMethod;
      let jcdName = '';
      if (!!part) jcdName += part;
      if (!!method) jcdName += method;
      setFieldsValue({ ...partMethod, jcdName });
    }
  }, [partMethod, showModal]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (values) => {
    const params = {
      list: [
        {
          meta: {
            sid: doctorSid,
            source: 'DOCTOR',
            type: 'JCD',
            title: '检查单',
            createdTime: new Date().getTime(),
            ...values,
          },
        },
      ],
    };
    console.log('params', params);
    api.image.putImageTopicTemplate(params).then((res: any) => {
      message.success('添加成功');
      console.log('success', res);
      handleAddJcdTab({
        sid: doctorSid,
        source: 'DOCTOR',
        id: res.meta.id,
        ...values,
      });
      setShowModal(false);
      updateCreateJcdNum();
    }).catch(err => {
      message.error(err?.result || '添加失败');
    });
  };

  const rules = [{ required: true, message: '请输入' }];
  return (
    <div>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center new-header"
        zIndex={1011}
        width="600px"
        visible={showModal}
        title={actionType === 'add' ? '新建检查单' : '编辑检查单'}
        onCancel={() => setShowModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="ui-index-library__edit-index">
          <Form
            name="editIndex"
            onFinish={handleSubmit}
            form={form}
            preserve={false}
          >
            {/* 结构化添加图片类型和指标时才显示此项 */}
            <Form.Item
              name="part"
              rules={rules}
              label="检查部位"
            >
              <Input placeholder="请输入检查部位" />
            </Form.Item>
            <Form.Item
              name="method"
              rules={rules}
              label="检查方法"
            >
              <Input placeholder="请输入检查方法" />
            </Form.Item>
            <Form.Item
              name="jcdName"
              rules={rules}
              label="检查名称"
            >
              <Input placeholder="请输入检查名称" />
            </Form.Item>
            <Form.Item>
              <div className="common__btn">
                <Button onClick={() => setShowModal(false)} >
                  取消
                </Button>
                <Button htmlType="submit" type="primary" >
                  保存
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default CreateJcd;
