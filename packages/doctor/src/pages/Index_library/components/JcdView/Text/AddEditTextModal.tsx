import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Popconfirm, Button } from 'antd';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { handleQuestions } from '../utils';

interface IProps {
  id: string;
  type: string;
  mode: string;
  onSuccess: () => void;
  question?: TIndexItem;
  position: number;
  title?: TIndexItem;
  // group: string;
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
    isAdd: false,
    sid,
    action: 'ADD',
    creatorSid: sid,
  };

  useEffect(() => {
    if (question) {
      let tmp: TIndexItem = { ...question, isAdd: false, action: 'ALTER' };
      if (question.answer && question.answer.length > 0) {
        tmp.answer = question.answer[0];
      }
      form.setFieldsValue(tmp);
    }
  }, [question]);

  const handleSave = async (values: any) => {
    const params = {
      meta: { id },
      data: [
        {
          ...fixedData,
          uuid: question?.uuid || +new Date() + Math.random(),
          createdTime: question?.createdTime || +new Date(),
          question: values.question,
          answer: [values.answer],
          group: `3-${position}`,
        },
      ],
    };
    handleQuestions({
      params,
      fn: { setLoading, setShowModal, onSuccess },
    });
  };

  const handleDeleteQuestions = async () => {
    const params = {
      meta: { id },
      data: [{ ...question, action: 'DELETE' }],
    };
    handleQuestions({
      params,
      fn: { setLoading, setShowModal, onSuccess },
    });
  };

  return (
    <div>
      <span onClick={() => setShowModal(true)}>{children}</span>
      {mode === 'ALTER' && (
        <Popconfirm
          cancelButtonProps={{ size: 'small' }}
          okButtonProps={{ size: 'small' }}
          title="确认删除吗"
          onConfirm={handleDeleteQuestions}
        >
          <Button danger ghost size="small">
            删除
          </Button>
        </Popconfirm>
      )}
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
