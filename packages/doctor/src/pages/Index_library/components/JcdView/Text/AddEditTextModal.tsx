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
          title="???????????????"
          onConfirm={handleDeleteQuestions}
        >
          <Button danger ghost size="small">
            ??????
          </Button>
        </Popconfirm>
      )}
      <DragModal
        title="???????????????"
        width={700}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={form.submit}
        okButtonProps={{ loading }}
        destroyOnClose
      >
        <div>
          <div className="sample mb-10 p-10">
            <p>?????????????????????</p>
            <p className="ml-40">??????????????????</p>
          </div>
          <Form form={form} onFinish={handleSave}>
            <Form.Item label="??????" name="question" rules={[{ required: true }]}>
              <Input placeholder="???????????????" />
            </Form.Item>
            <Form.Item label="??????" name="answer">
              <Input placeholder="???????????????" />
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default AddEditText;
