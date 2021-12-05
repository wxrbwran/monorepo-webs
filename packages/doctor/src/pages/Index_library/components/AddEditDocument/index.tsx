import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, message,
} from 'antd';
import { debounce } from 'lodash';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { DocumentType } from 'xzl-web-shared/src/utils/consts';
import * as api from '@/services/api';

interface IProps {
  type: string;
  mode: 'add' | 'edit';
  onSuccess: (params: Record<string, string>) => void;
  record?: TIndexItem
}
const AddType: FC<IProps> = (props) => {
  const { type, onSuccess, mode, record } = props;
  const [showModal, setshowModal] = useState(false);
  // 点击添加
  const handleAddBtn = () => {
    setshowModal(true);
  };
  console.log(32);
  const toggleShowModal = () => {
    setshowModal(false);
  };
  const handleSave = async (values: any) => {
    console.log(values);
    let params = {
      ...values,
      type: type,
      source: 'DOCTOR',
      sourceSid: window.$storage.getItem('sid'),
      wcId: window.$storage.getItem('wcId'),
    };
    try {
      if (type === 'HYD') {
        if (mode === 'add') {
          await api.indexLibrary.putIndexDocument(params);
        } else {
          params.id = record.id;
          await api.indexLibrary.patchIndexDocument(params);
        }
      } else if (['JCD', 'OTHER'].includes(type)) {
        params = {
          ...params,
          sid: params.sourceSid,
          createdTime: +new Date(),
          title: type,
          jcdName: params.name,
        };
        if (mode === 'add') {
          console.log('params', params);
          await api.indexLibrary.putImageTemplate({
            list: [
              {
                meta: params,
              },
            ],
          });
        } else {
          await api.indexLibrary.patchImageTemplate({
            id: record.id,
            ...params,
          });
        }
      }
      message.success('添加成功');
      onSuccess({});
      setshowModal(false);
    } catch (err: any) {
      message.error(err?.result || '添加失败');
    }
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
      <span>
        <PlusOutlined onClick={handleAddBtn} />
      </span>
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
            {type === 'HYD' && (
              <>
                <Form.Item
                  label="化验单名称"
                  name="name"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input placeholder="请输入化验单名称" />
                </Form.Item>
                <Form.Item
                  label="样本来源"
                  name="sampleFrom"
                  rules={[{ required: true, message: '请输入!' }]}
                >
                  <Input placeholder="请输入样本来源" />
                </Form.Item>
              </>
            )}
            {type !== 'HYD' && (
              <>
                <Form.Item
                  label={`${DocumentType[type]}名称`}
                  name="name"
                  rules={[{ required: true, message: `请输入${DocumentType[type]}名称!` }]}
                >
                  <Input placeholder={`请输入${DocumentType[type]}名称`} />
                </Form.Item>
              </>
            )}
            {type === 'JCD' && (
              <>
                <Form.Item label="检查部位" name="part">
                  <Input placeholder="请输入检查部位" />
                </Form.Item>
                <Form.Item
                  label="检查方法"
                  name="method"
                >
                  <Input placeholder="请输入检查方法" />
                </Form.Item>
              </>
            )}

            <Form.Item style={{ textAlign: 'center' }} {...submitLayout}>
              <div className="common__btn">
                <Button onClick={toggleShowModal}>取消</Button>
                <Button className="finish" htmlType="submit" type="primary">
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

export default AddType;
