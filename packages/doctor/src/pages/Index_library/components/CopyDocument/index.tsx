import React, { FC, useState, useEffect } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
// import { useSelector } from 'umi';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { documentType } from 'xzl-web-shared/dist/utils/consts';
import event from 'xzl-web-shared/dist/utils/events/eventEmitter';
import * as api from '@/services/api';


interface IProps {
  type: string;
  onSuccess: (params: Record<string, string>) => void;
  document: TIndexItem
}
const CopyDocument: FC<IProps> = (props) => {
  const { type, document, children, onSuccess } = props;
  // console.log('record', record);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const curDocument = useSelector((state: IState) => state.document.curDocument);
  const [form] = Form.useForm();
  const sid = window.$storage.getItem('sid');

  useEffect(() => {
    if (document) {
      form.setFieldsValue({ ...document });
    }
  }, [document]);

  const toggleShowModal = () => {
    setShowModal(false);
  };
  const handleSave = async (values: any) => {
    // console.log(values);
    setLoading(true);
    let params = {
      ...values,
      type,
      source: 'DOCTOR',
      sourceSid: sid,
      wcId: window.$storage.getItem('wcId'),
    };
    try {
      if (type === 'HYD') {
        params.fromDocumentId = document?.id;
        params.fromSid = document?.sourceSid;
        const res = await api.indexLibrary.copyIndexDocument(params);
        // console.log("copy hyd", res);
        event.emit('refershMenu', res);
        if (onSuccess) {
          // 结构化时复制单据回传
          onSuccess(res);
        }
      } else if (['JCD', 'OTHER'].includes(type)) {
        const res = await api.indexLibrary.copyImageTemplate({
          id: document?.id,
          source: 'DOCTOR',
          ...values,
        });
        event.emit('refershMenu', {
          id: res.meta.id,
          jcdName: params.jcdName,
          title: type,
        });
      }
      message.success('复制成功');
      // onSuccess({});
      setShowModal(false);
    } catch (err: any) {
      message.error(err?.result || '复制失败');
    } finally {
      setLoading(false);
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
    <div className="inline-block">
      <span onClick={() => setShowModal(true)}>{children}</span>
      <DragModal
        title="复制单据"
        footer={null}
        width={600}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        destroyOnClose
      >
        <div>
          <Form {...layout} form={form} name="basic" onFinish={handleSave}>
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
                <Button loading={loading} className="finish" htmlType="submit" type="primary">
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

export default CopyDocument;
