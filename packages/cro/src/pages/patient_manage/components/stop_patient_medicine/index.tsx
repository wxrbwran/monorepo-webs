import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Input, Button, message } from 'antd';
import * as api from '@/services/api';
import { useSelector, useDispatch } from 'umi';

const StopPatientMedicine: FC = (props) => {
  const { children, changeSuccess, record } = props;
  const [showModal, setshowModal] = useState(false);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);


  const onFinish = (values) => {
    console.log('=========== 停止试验', values.etcNotes);
    const params = {
      projectNsId,
      sid: record.sid,
      status: 1003,
      exitReason: 1,
      exitDesc: values.etcNotes,
    };
    api.patientManage.patchPatientStatus(params).then(() => {
      message.success('操作成功');
      if (changeSuccess) {
        changeSuccess();
      }
    });
  };
  return (
    <span>
      <span onClick={() => setshowModal(true)}>{children}</span>
      <DragModal
        visible={showModal}
        title="停止此患者试验"
        width={500}
        wrapClassName="ant-modal-wrap-center"
        onCancel={() => setshowModal(false)}
        maskClosable
        footer={null}
      >
        <Form
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="退出原因"
            name="etcNotes"
            rules={[{ required: true, message: '请输入退出原因!' }]}
          >
            <Input.TextArea placeholder='请输入退出原因' rows={5} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={() => setshowModal(false)} className='mr-10'>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </DragModal>
    </span>
  );
};

export default StopPatientMedicine;
