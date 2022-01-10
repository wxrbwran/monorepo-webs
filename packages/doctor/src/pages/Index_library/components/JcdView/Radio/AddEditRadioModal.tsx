import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Radio, Checkbox, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { createFormListProps } from 'xzl-web-shared/dist/utils/consts';
import { handleQuestions, handleQuestionAnswer, filterNotNew, setDelete } from '../utils';
interface IProps {
  id: string;
  mode: string;
  onSuccess: () => void;
  title?: TIndexItem;
  questions?: TIndexItem[];
  position: number;
}

interface IForm {
  title?: string;
  questions?: TIndexItem[];
}

const AddEditRadio: FC<IProps> = (props) => {
  const { id, onSuccess, title, questions, mode, children } = props;
  // console.log('record', record);
  console.log('=====radio', props);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>('RADIO');
  const [_, setCount] = useState<number>(0);
  const samples = [{ value: '1', label: '形态' }, { value: '2', label: '大小' }];
  const [form] = Form.useForm();
  // const curDocument = useSelector((state: IState) => state.document.curDocument);
  const sid = window.$storage.getItem('sid');
  const position = mode === 'ADD' ? props.position : props.title?.group?.split('-')[1];
  const fixedData = {
    // isAdd: false,
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
          group: `2-${position}`,
          question_type: type,
          uuid: +new Date() + Math.random(),
        }
        : {
          ...title,
          question_type: type,
          question: values.title,
          // isAdd: false,
          action: 'ALTER',
        };
    const params = {
      meta: { id },
      data: [
        titlePart,
        ...values.questions
          .filter(filterNotNew)
          .map(handleQuestionAnswer)
          .map((q: TIndexItem) => {
            q.question_type = type;
            return q;
          }),
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
      data: [
        { ...title, action: 'DELETE' },
        ...(questions as TIndexItem[])
          .map(setDelete),
      ],
    };
    handleQuestions({
      params,
      fn: { setLoading, setShowModal, onSuccess },
    });
  };
  const handleDeleteQuestion = (index: number) => {
    const values = form.getFieldsValue();
    values.questions.filter((q: TIndexItem) => q.action !== 'DELETE')[index].action = 'DELETE';
    setCount((prev) => prev + 1);
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
          <div className="flex mb-10 p-10">
            <p>示例：肺动脉端</p>
            <div>
              {type === 'RADIO' && <Radio.Group disabled options={samples}></Radio.Group>}
              {type === 'CHECKBOX' && <Checkbox.Group disabled options={samples}></Checkbox.Group>}
            </div>
          </div>
          <Form form={form} onFinish={handleSave}>
            <Form.Item label="题目" name="title" rules={[{ required: true }]}>
              <Input placeholder="请输入题目" />
            </Form.Item>
            <Form.List name="questions">
              {(fields, { add }) => (
                <>
                  {fields
                    .filter((_f, index) => {
                      console.log('index', index);
                      const values = form.getFieldsValue();
                      return values.questions?.[index]?.action !== 'DELETE';
                    })
                    .map((field, index) => (
                      <Space align="baseline" className="mb-10" key={field.key}>
                        <Form.Item
                          {...field}
                          noStyle={true}
                          name={[field.name, 'question']}
                          fieldKey={[field.fieldKey, 'question']}
                          rules={[{ required: true, message: '请输入选项' }]}
                        >
                          <Input placeholder="请输入选项" style={{ width: 280 }} />
                        </Form.Item>
                        <DeleteOutlined onClick={() => handleDeleteQuestion(index)} />
                        <Form.Item
                          {...createFormListProps(field, 'uuid')}
                          initialValue={+new Date() + Math.random()}
                          className="hidden"
                        >
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item
                          {...createFormListProps(field, 'group')}
                          initialValue={`2-${position}-${fields.length}`}
                          className="hidden"
                        >
                          <Input type="hidden" />
                        </Form.Item>
                        {/* 标记这条为前端新增 */}
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
                  <div>
                    <Button onClick={() => add()}>添加选项</Button>
                  </div>
                </>
              )}
            </Form.List>
          </Form>
          <div className="mt-10">
            <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
              <Radio value="RADIO">单选</Radio>
              <Radio value="CHECKBOX">多选</Radio>
            </Radio.Group>
          </div>
        </div>
      </DragModal>
    </div>
  );
};

export default AddEditRadio;
