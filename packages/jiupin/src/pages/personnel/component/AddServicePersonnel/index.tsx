import type { FC } from 'react';
import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Input, Select, message } from 'antd';
import { useSelector } from 'umi';
import { debounce } from 'lodash';

const FormItem = Form.Item;

interface IProps {
  refresh: () => void;
}
const { Option } = Select;
const AddServicePersonnel: FC<IProps> = (props) => {
  const { children, refresh } = props;
  const { roleList } = useSelector((state: IState) => state.personnel);
  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  const initialValues: Store = {};
  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const params = {
          ...values,
          sid: window.$storage.getItem('sid'),
          nsId: window.$storage.getItem('nsId'),
          role: 'test.qWGyBe',
        };
        console.log(params);
        await window.$api.personnel.putTeamWorker(params);
        message.success('新增成功');
        setShow(false);
        refresh();
      })
      .catch((err) => console.log(err));
  };

  let modalProps: Store = {
    okText: '确定',
    cancelText: '取消',
    onOk: form.submit,
    onCancel: () => setShow(!show),
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      {
        <DragModal
        {...modalProps}
        width={520}
        visible={show}
        maskClosable
        centered
        title="新增人员"
        destroyOnClose
      >
        <Form
          colon={false}
          onFinish={debounce(handleSubmit, 300)}
          form={form}
          initialValues={initialValues}
          preserve={true}
          {...layout}
        >
          <div>
            <FormItem label="姓 名:" name="name" rules={[{ required: true, message: '请输入姓名!' }]}>
              <Input placeholder="请输入" type="text" />
            </FormItem>
            <FormItem label="手机号:" name="tel" rules={[{ required: true, message: '请输入手机号!' }]}>
              <Input placeholder="请输入" type="text" />
            </FormItem>
            <FormItem label="角 色:" name="roleTagId" rules={[{ required: true, message: '请选择角色!' }]}>
              <Select placeholder="请选择" style={{ width: 120 }}>
                {
                  roleList?.map((item: { id: string;name: string }) => (
                    <Option id={item.id} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </FormItem>
          </div>
        </Form>
      </DragModal>
      }

    </>
  );
};

AddServicePersonnel.defaultProps = { mode: 'add' };

export default AddServicePersonnel;
