import React, { FC, useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { createFormListProps } from 'xzl-web-shared/dist/utils/consts';
import { handleQuestions, handleQuestionAnswer, filterNotNew, setDelete } from '../utils';
import uuid from 'react-uuid';
interface IProps {
  id: string;
  type: string;
  mode: string;
  onSuccess: () => void;
  questions?: TIndexItem[];
  title?: TIndexItem;
}

interface IForm {
  title?: string;
  questions?: TIndexItem[];
}

const AddEditCompletion: FC<IProps> = (props) => {
  const { id, onSuccess, title, questions, mode, children } = props;
  console.log('=====1101props', props);
  // console.log('record', record);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const curUuid = useRef(title?.uuid || uuid());
  // const curDocument = useSelector((state: IState) => state.document.curDocument);
  const sid = window.$storage.getItem('sid');
  const samples = ['形态', '大小'];
  const position = 1;
  const fixedData = {
    question_type: 'COMPLETION',
    isAdd: false,
    sid,
    action: mode,
    creatorSid: sid,
  };

  useEffect(() => {
    let tmp: IForm = {};
    if (title) {
      tmp.title = title.question;
    }
    if (questions && questions.length > 0) {
      tmp.questions = questions.map((q: TIndexItem) => {
        const tmpQuestion = { ...q };
        if (tmpQuestion.answer && tmpQuestion.answer.length > 0) {
          tmpQuestion.answer = tmpQuestion.answer[0];
        }
        tmpQuestion.action = 'ALTER';
        tmpQuestion.isAdd = false;
        tmpQuestion.isNew = 'no';
        return tmpQuestion;
      });
    }
    form.setFieldsValue(tmp);
  }, [questions, title]);

  const handleSave = async (values: any) => {
    const titlePart =
      mode === 'ADD'
        ? {
          ...fixedData,
          question: values.title,
          answer: [],
          group: `1-${position}`,
          uuid: curUuid.current,
        }
        : {
          ...title,
          question: values.title,
          isAdd: false,
          action: 'ALTER',
        };
    const params = {
      meta: { id },
      data: [{ ...titlePart }, ...values.questions.filter(filterNotNew).map(
        (item, inx) => handleQuestionAnswer(item, title?.createdTime, inx),
      )],
    };
    handleQuestions({
      params,
      fn: { setLoading, setShowModal, onSuccess },
    });
  };
  const handleDeleteQuestions = async () => {
    const params = {
      meta: { id },
      data: [
        { ...title, action: 'DELETE' },
        ...(questions as TIndexItem[]).map(setDelete),
      ],
    };
    // console.log("params", params);
    handleQuestions({
      params,
      fn: { setLoading, setShowModal, onSuccess },
    });
  };

  const handleDeleteQuestion = (index: number) => {
    console.log('handleDeleteQuestion', index);
    const values = form.getFieldsValue();
    values.questions
      .filter((q: TIndexItem) => q.action !== 'DELETE')[index].action = 'DELETE';
    setCount(prev => prev + 1);
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
        title="添加多段填空题"
        width={700}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={form.submit}
        okButtonProps={{ loading }}
        destroyOnClose
      >
        <div>
          <div className="sample mb-10 p-10">
            <p>示例：肝脏描述</p>
            {samples.map((s: string, index: number) => (
              <div className="sample-item ml-20 mt-10  flex" key={s}>
                <div>{index + 1}. 形态 </div>
                <div className="inline-block input ml-10">
                  <Input disabled={true} className="ml-10" size="small" />
                </div>
              </div>
            ))}
          </div>
          <Form form={form} onFinish={handleSave}>
            <Form.Item  noStyle name="title" rules={[{ required: true }]}>
              <Input placeholder="请输入题目" />
            </Form.Item>
            <Form.List name="questions">
              {(fields, { add }) => (
                <>
                  <div className="hidden">{count}</div>
                  {fields
                    .filter((_f, index) => {
                      console.log('index', index);
                      const values = form.getFieldsValue();
                      return values.questions?.[index]?.action !== 'DELETE';
                    })
                    .map((field, index) => (
                      <Space align="baseline" className="mt-10" key={field.key}>
                        <div>{index + 1}.</div>
                        <Form.Item
                          {...field}
                          noStyle={true}
                          name={[field.name, 'question']}
                          fieldKey={[field.fieldKey, 'question']}
                          rules={[{ required: true, message: '请输入问题' }]}
                        >
                          <Input placeholder="请输入问题" style={{ width: 280 }} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          noStyle={true}
                          name={[field.name, 'answer']}
                          fieldKey={[field.fieldKey, 'answer']}
                        >
                          <Input placeholder="答案" style={{ width: 280 }} />
                        </Form.Item>
                        <DeleteOutlined onClick={() => handleDeleteQuestion(index)} />
                        <Form.Item
                          {...createFormListProps(field, 'uuid')}
                          initialValue={curUuid.current}
                          className="hidden"
                        >
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item
                          {...createFormListProps(field, 'group')}
                          initialValue={`1-${position}-${fields.length}`}
                          className="hidden"
                        >
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item
                          {...createFormListProps(field, 'isNew')}
                          initialValue={'yes'}
                          className="hidden"
                        >
                          <Input type="hidden" />
                        </Form.Item>
                        {Object.keys(fixedData).map((key) => (
                          <Form.Item
                            {...createFormListProps(field, key)}
                            className="hidden"
                            initialValue={fixedData[key]}
                          >
                            <Input type="hidden" />
                          </Form.Item>
                        ))}
                      </Space>
                    ))}
                  <Button type="link" onClick={() => add()}>+ 添加问题</Button>
                </>
              )}
            </Form.List>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default AddEditCompletion;
/*

*/
