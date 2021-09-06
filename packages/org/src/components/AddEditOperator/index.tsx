import React, { FC, useState } from 'react';
import DragModal from '@/components/DragModal';
import { Form, Input, Radio, Checkbox, Row, Col } from 'antd';
import { useSelector } from 'umi';
import { formItemLayout } from '@/utils/consts';
// import styles from './index.scss';

const FormItem = Form.Item;

interface IProps {
  mode?: string;
  info?: Store;
}

const AddEditOperator: FC<IProps> = (props) => {
  const { children, info } = props;
  const departments = useSelector((state: IState) => state.org.currentOrg.departments);
  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  const handleSubmitOperator = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((err) => console.log(err));
  };

  const modalProps = {
    width: 520,
    onCancel: () => setShow(!show),
    onOk: handleSubmitOperator,
    okText: <span>添加护士</span>,
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <div
        style={{ display: 'inline' }}
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        {children}
      </div>
      <DragModal visible={show} centered title="添加护士" {...modalProps} destroyOnClose>
        <Form
          colon={false}
          form={form}
          onFinish={handleSubmitOperator}
          initialValues={info}
          {...formItemLayout}
        >
          <FormItem name="name" label="姓名">
            <Input />
          </FormItem>
          <FormItem label="手机号" name="tel" rules={[{ required: true }]}>
            <Input />
          </FormItem>
          <Form.Item name="sex" label="性别">
            <Radio.Group>
              <Radio value="MALE">男</Radio>
              <Radio value="FEMALE">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="department" label="科室">
            <Checkbox.Group>
              <Row>
                {departments.map((dep) => (
                  <Col span={8} key={dep.id}>
                    <Checkbox value={dep.id} key={dep.id}>
                      {dep.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </DragModal>
    </>
  );
};
AddEditOperator.defaultProps = { mode: 'ADD', info: {} };
export default AddEditOperator;
