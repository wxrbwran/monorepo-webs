import type { FC } from 'react';
import React, { useState, useLayoutEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Input } from 'antd';
import { debounce } from 'lodash';

const FormItem = Form.Item;

interface IProps {
  mode?: string;
  refresh: () => void;
}

const AddEditRole: FC<IProps> = (props) => {
  const { children, mode, refresh } = props;

  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  const text = mode === 'edit' ? '编辑角色' : '新增角色';
  const initialValues: Store = {};
  useLayoutEffect(() => {
    if (mode === 'edit' && show) {
      // initialValues.name = info?.name;
      // const labelType = departmentType.filter((type) => {
      //   const typeKey = type.key.toLowerCase();
      //   return info.labels.includes(typeKey);
      // })?.[0]?.key;
      // console.log(labelType);
      // initialValues.labelType = labelType;
    }
  }, [show]);
  const handleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        // const params = { ...values };
        // if (mode === 'edit') {
        //   params.id = (info as Department).id;
        // } else if (mode === 'add') {
        //   params.nsId = window.$storage.getItem('nsId');
        // }
        // console.log(params);
        // await window.$api.org.addOrEditDepartment(params);
        // message.success(`${text}成功`);
        // dispatch({
        //   type: 'org/getOrgMenu',
        //   payload: {
        //     nsId: window.$storage.getItem('nsId'),
        //     sid: window.$storage.getItem('sid'),
        //   },
        // });
        // setShow(false);
        // refresh();
      })
      .catch((err) => console.log(err));
  };

  let modalProps: Store = {
    okText: '确定',
    cancelText: '退出',
    onOk: form.submit,
    onCancel: () => setShow(!show),
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
        title={text}
        destroyOnClose
      >
        <Form
          colon={false}
          onFinish={debounce(handleSubmit, 300)}
          form={form}
          initialValues={initialValues}
          preserve={true}
        >
          <div>
            <FormItem label="角色名称" name="name" rules={[{ required: true, message: '请输入角色名称!' }]}>
              <Input placeholder="请输入" type="text" />
            </FormItem>
          </div>
        </Form>
      </DragModal>
      }

    </>
  );
};

AddEditRole.defaultProps = { mode: 'add' };

export default AddEditRole;
