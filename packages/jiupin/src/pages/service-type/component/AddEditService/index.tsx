import type { FC } from 'react';
import React, { useState, useLayoutEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Input, message } from 'antd';
import { debounce } from 'lodash';

const FormItem = Form.Item;

interface IProps {
  mode?: string;
  refresh: () => void;
  initData?: {
    name: string;
    id: string;
  };
}

const AddEditService: FC<IProps> = (props) => {
  const { children, mode, refresh, initData } = props;

  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  const text = mode === 'edit' ? '编辑服务' : '新增服务';
  const initialValues: Store = {};
  const sid = window.$storage.getItem('sid');
  useLayoutEffect(() => {
    if (mode === 'edit' && show) {
      initialValues.name = initData?.name;
      console.log('34343', initialValues);
    }
  }, [show]);
  const handleSubmit = async () => {
    console.log(3232);
    form
      .validateFields()
      .then(async (values) => {
        if (mode === 'add') {
          const params = {
            'creatorId': sid, //登录者sid
            'doctorSid': sid, //登录者sid
            'orgSid': sid, //登录者sid
            'orgNsId': window.$storage.getItem('nsId'), //登录者nsid
            'goodsDetailList': [
              {
                'goodsCategory': 'NINE_LIVE_HEALTH_CARD', //写死
                'goodsDurationType': 'VIP_YEAR', //写死
                'price': 0, //写死
                'doctorRole': window.$storage.getItem('role'), //登录者角色
                'name': values.name, //名称
              },
            ],
          };
          await window.$api.service.putGoods(params);
        } else {
          await window.$api.service.postGoods({ id: initData?.id, name: values.name });
        }
        message.success(`${text}成功`);
        refresh();
        setShow(false);
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
            <FormItem label="服务名称" name="name" rules={[{ required: true, message: '请输入服务名称!' }]}>
              <Input placeholder="请输入" type="text" />
            </FormItem>
          </div>
        </Form>
      </DragModal>
      }

    </>
  );
};

AddEditService.defaultProps = { mode: 'add' };

export default AddEditService;
