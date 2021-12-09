import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Radio, Checkbox, Button, message, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { createFormListProps } from 'xzl-web-shared/src/utils/consts';

import * as api from '@/services/api';

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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<string>('RADIO');
  const [count, setCount] = useState<number>(0);
  const samples = [{ value: '1', label: '形态' }, { value: '2', label: '大小' }];
  const [form] = Form.useForm();
  // const curDocument = useSelector((state: IState) => state.document.curDocument);
  const sid = window.$storage.getItem('sid');
  const position = mode === 'ADD' ? props.position : props.title?.group?.split('-')[1];
  const fixedData = {
    // isAdd: false,
    sid,
    action: 'ADD',
    creatorSid: sid,
  };

  useEffect(() => {
    let tmp: IForm = {};
    if (title) {
      tmp.title = title.question;
    }
    if (questions && questions.length > 0) {
      tmp.questions = questions.map((q: TIndexItem) => {
        if (q.answer && q.answer.length > 0) {
          q.answer = q.answer[0];
        }
        q.action = 'ALTER';
        q.isNew = 'no';
        return q;
      });
    }
    form.setFieldsValue(tmp);
  }, [questions, title]);

  const handleSave = async (values: any) => {
    setLoading(true);
    console.log('handleSave', values);
    try {
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
            question: values.title,
            // isAdd: false,
            action: 'ALTER',
          };
      await api.indexLibrary.handleImageTemplate({
        meta: { id },
        data: [
          titlePart,
          ...values.questions
            .filter((q: TIndexItem) => !(q.action === 'DELETE' && q.isNew === 'yes'))
            .map((q: TIndexItem) => {
              if (!Array.isArray(q.answer)) {
                q.answer = (q.answer as string | undefined) ? [q.answer as string] : [];
              }
              if (q.action === 'ADD') {
                q.createdTime = +new Date();
                // q.isAdd = true;
              }
              q.question_type = type;
              return q;
            }),
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
  const handleDeleteQuestion = (index: number) => {
    console.log('handleDeleteQuestion', index);
    const values = form.getFieldsValue();
    values.questions.filter((q: TIndexItem) => q.action !== 'DELETE')[index].action = 'DELETE';
    setCount((prev) => prev + 1);
    console.log(count);
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
            <Radio.Group value={type} onChange={(e: RadioChangeEvent) => setType(e.target.value)}>
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
