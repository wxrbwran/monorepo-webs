import React, { FC, useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import DragModal from 'xzl-web-shared/src/components/DragModal';

import * as api from '@/services/api';

interface IProps {
  id: string;
  type: string;
  mode: string;
  onSuccess: () => void;
  question?: TIndexItem;
  position: number;
  title?: TIndexItem;
  group: string;
}

// interface IForm {
//   question?: string;
//   answer?: string;
// }

const AddEditText: FC<IProps> = (props) => {
  const { id, onSuccess, question, mode, children } = props;
  // console.log('record', record);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  // const curDocument = useSelector((state: IState) => state.document.curDocument);
  const sid = window.$storage.getItem('sid');
  const position = mode === 'ADD' ? props.position : props.question?.group?.split('-')[1];
  const fixedData = {
    question_type: 'TEXT',
    isAdd: true,
    sid,
    action: props.mode,
    creatorSid: sid,
  };

  useEffect(() => {
    if (question) {
      let tmp: TIndexItem = { ...question };
      if (question.answer && question.answer.length > 0) {
        tmp.answer = question.answer[0];
      }
      form.setFieldsValue(tmp);
    }
  }, [question]);

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      await api.indexLibrary.handleImageTemplate({
        meta: { id },
        data: [
          {
            ...fixedData,
            uuid: +new Date() + Math.random(),
            question: values.question,
            answer: [values.answer],
            group: `3-${position}`,
          },
        ],
      });
      message.success('操作成功');
      setShowModal(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      message.error(err?.result || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span onClick={() => setShowModal(true)}>{children}</span>
      <DragModal
        title="添加问答题"
        width={700}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={form.submit}
        okButtonProps={{ loading }}
        destroyOnClose
      >
        <div>
          <div className="sample mb-10 p-10">
            <p>示例：影像表现</p>
            <p className="ml-40">膀胱充盈良好</p>
          </div>
          <Form form={form} onFinish={handleSave}>
            <Form.Item label="题目" name="question" rules={[{ required: true }]}>
              <Input placeholder="请输入题目" />
            </Form.Item>
            <Form.Item label="答案" name="answer">
              <Input placeholder="请输入答案" />
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default AddEditText;
