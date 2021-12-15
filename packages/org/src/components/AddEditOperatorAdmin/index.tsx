import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import { Form, Input, Radio, Checkbox, Row, Col } from 'antd';
import { useSelector } from 'umi';
import { formItemLayout } from 'xzl-web-shared/dist/src/utils/consts';
// import styles from './index.scss';

const FormItem = Form.Item;

interface IProps {
  mode?: string;
  info?: Store;
}

const AddEditOperatorAdmin: FC<IProps> = (props) => {
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
  const departmentsGroup = departments.map((dep) => (
    <Col span={8} key={dep.id}>
      <Checkbox value={dep.id} key={dep.id}>
        {dep.name}
      </Checkbox>
    </Col>
  ));
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
      <DragModal visible={show} centered title="添加护士管理员" {...modalProps} destroyOnClose>
        <Form
          colon={false}
          form={form}
          onFinish={handleSubmitOperator}
          initialValues={info}
          {...formItemLayout}
        >
          <FormItem name="admin_type" label="管理员类型">
            <Radio.Group>
              <Radio value="department">科室护士管理员</Radio>
              <Radio value="organization">机构护士管理员</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem name="tel" label="手机号">
            <Input />
          </FormItem>
          <FormItem name="name" label="姓名">
            <Input />
          </FormItem>
          <FormItem name="sex" label="性别">
            <Radio.Group>
              <Radio value="MALE">男</Radio>
              <Radio value="FEMALE">女</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem name="departmentIds" label="管理科室">
            <Checkbox.Group>
              <Row>{departmentsGroup}</Row>
            </Checkbox.Group>
          </FormItem>
          <FormItem name="username" label="管理员账号">
            <Input />
          </FormItem>
        </Form>
      </DragModal>
    </>
  );
};
AddEditOperatorAdmin.defaultProps = { mode: 'ADD', info: {} };
export default AddEditOperatorAdmin;
