import React, { FC, useState, useEffect } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { debounce } from 'lodash';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { documentType } from 'xzl-web-shared/dist/utils/consts';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';
import * as api from '@/services/api';

interface IProps {
  type: string;
  mode: 'add' | 'edit';
  onSuccess?: (params: Record<string, string>) => void;
  record?: TIndexItem
}
const AddEditDocument: FC<IProps> = (props) => {
  const { type, mode, record, children, onSuccess } = props;
  // console.log('record', record);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const sid = window.$storage.getItem('sid');
  // console.log('添加record', record);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({ ...record });
    }
  }, [record]);

  const toggleShowModal = () => {
    setshowModal(false);
  };
  const handleSave = async (values: any) => {
    // console.log(values);
    let params = {
      ...values,
      type: type,
      source: 'DOCTOR',
      sourceSid: sid,
      wcId: window.$storage.getItem('wcId'),
      creatorSid: sid,
    };
    try {
      if (type === 'HYD') {
        let res = {};
        if (mode === 'add') {
          res = await api.indexLibrary.putIndexDocument(params);
        } else {
          params.id = record?.id;
          res = await api.indexLibrary.patchIndexDocument(params);
        }
        event.emit('refershMenu', { ...res, type: 'HYD' });
        if (onSuccess) {
          onSuccess(res);
        }
      } else if (['JCD', 'OTHER'].includes(type)) {
        params = {
          ...params,
          sid: params.sourceSid,
          creatorSid: params.sourceSid,
          createdTime: +new Date(),
          title: type,
        };
        let res = {};
        if (mode === 'add') {
          // console.log('params', params);
          res = await api.indexLibrary.putImageTemplate({
            list: [
              {
                meta: params,
              },
            ],
          });

        } else {
          res = await api.indexLibrary.patchImageTemplate({
            id: record?.id,
            ...params,
          });
        }
        event.emit('refershMenu', {
          id: res?.meta?.id || record?.id,
          jcdName: params.jcdName,
          title: type,
          ...params,
        });
      }
      message.success('保存成功');
      setshowModal(false);
    } catch (err: any) {
      message.error(err?.result || '保存失败');
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
      <span onClick={() => setshowModal(true)}>{children}</span>
      <DragModal
        title={mode === 'add' ? '添加' : '编辑'}
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
            form={form}
            name="basic"
            onFinish={debounce(handleSave, 300)}
            preserve={false}
            id="height42"
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
                  label={`${documentType[type]}名称`}
                  name="jcdName"
                  rules={[{ required: true, message: `请输入${documentType[type]}名称!` }]}
                >
                  <Input placeholder={`请输入${documentType[type]}名称`} />
                </Form.Item>
              </>
            )}
            {type === 'JCD' && (
              <>
                <Form.Item label="检查部位" name="part">
                  <Input placeholder="请输入检查部位" />
                </Form.Item>
                <Form.Item label="检查方法" name="method">
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

export default AddEditDocument;
