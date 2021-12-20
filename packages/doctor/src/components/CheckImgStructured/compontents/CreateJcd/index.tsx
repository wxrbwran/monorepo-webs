import React, { FC, useState, useEffect } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import * as api from '@/services/api';
import { IAddJcdItem } from '../type';
import { msg } from '../utils';
import { Form, Input, Button } from 'antd';

interface IProps {
  actionType: string;
  initData: {
    part?: string;
    method?: string;
    jcdName?: string; // 编辑时会有此参数，添加时没有。添加时由外面的part+method组合
  };
  templateId?: string; // 编辑是传，模板id
  onSuccess: (data: IAddJcdItem) => void;
  outType: string;
  updateCreateJcdNum: () => void;
}
const CreateJcd: FC<IProps> = (props) => {
  const { actionType, children, initData, onSuccess, updateCreateJcdNum, templateId, outType } = props;
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [showModal, setShowModal] = useState(false);
  const doctorSid = window.$storage.getItem('sid');
  useEffect(() => {
    if (initData) {
      if (actionType === 'add') {
        const { part, method } = initData;
        let jcdName = '';
        if (!jcdName) {
          if (!!part) jcdName += part;
          if (!!method) jcdName += method;
        }
        setFieldsValue({ ...initData, jcdName });
      } else {
        setFieldsValue({ ...initData });
      }
    }
  }, [initData, showModal]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (values) => {
    if (actionType === 'add') {
      const params = {
        list: [
          {
            meta: {
              creatorSid: doctorSid,
              sid: doctorSid,
              source: 'DOCTOR',
              title: outType, // 根据title来区分  JCD   OTHER
              createdTime: new Date().getTime(),
              ...values,
            },
          },
        ],
      };
      api.image.putImageTopicTemplate(params).then((res: any) => {
        msg('添加成功');
        onSuccess({
          sid: doctorSid,
          source: 'DOCTOR',
          id: res.meta.id,
          ...values,
        });
        setShowModal(false);
        updateCreateJcdNum();
      }).catch((err: any) => {
        msg(err?.result || '添加失败', 'error');
      });
    } else {
      const params = {
        id: templateId,
        ...values,
      };
      api.image.patchImageTemplateName(params).then(() => {
        msg('编辑成功');
        onSuccess({
          id: templateId,
          ...values,
        });
        setShowModal(false);
        updateCreateJcdNum();
      }).catch((err: any) => {
        msg(err?.result || '编辑失败', 'error');
      });
    }

  };

  const rules = [{ required: true, message: '请输入' }];
  const clickProp = actionType === 'add' ? { onClick: handleShowModal } : { onDoubleClick: handleShowModal };
  return (
    <>
      <span { ...clickProp }>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center new-header"
        zIndex={1011}
        width="600px"
        visible={showModal}
        title={`${actionType === 'add' ? '新建' : '编辑'}${outType === 'JCD' ? '检查单' : '其他医学单据'}`}
        onCancel={() => setShowModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="ui-index-library__edit-index">
          <Form
            name="editIndex"
            onFinish={handleSubmit}
            form={form}
            preserve={false}
          >
            {
              outType === 'JCD' && (
                <>
                  <Form.Item
                    name="part"
                    rules={rules}
                    label="检查部位"
                    hidden={actionType === 'edit'}
                  >
                    <Input placeholder="请输入检查部位" />
                  </Form.Item>
                  <Form.Item
                    name="method"
                    rules={rules}
                    label="检查方法"
                    hidden={actionType === 'edit'}
                  >
                    <Input placeholder="请输入检查方法" />
                  </Form.Item>
                </>
              )
            }
            <Form.Item
              name="jcdName"
              rules={rules}
              label={outType === 'JCD' ? '检查名称' : '单据名称'}
            >
              <Input placeholder={`请输入${outType === 'JCD' ? '检查' : '单据'}名称`} />
            </Form.Item>
            <Form.Item>
              <div className="common__btn">
                <Button onClick={() => setShowModal(false)} >
                  取消
                </Button>
                <Button htmlType="submit" type="primary" >
                  保存
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </>
  );
};

export default CreateJcd;
