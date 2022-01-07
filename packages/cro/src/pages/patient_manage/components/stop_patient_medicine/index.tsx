import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Input, Button } from 'antd';

const StopPatientMedicine: FC = (props) => {
  const { children } = props;
  const [showModal, setshowModal] = useState(false);
  const onFinish = (values) => {
    console.log(values);
    // const params = {
    //   projectNsId,
    //   sid: record.sid,
    //   status: 1003,
    //   exitReason: 1,
    // };
    // api.patientManage.patchPatientStatus(params).then(() => {
    //   message.success('操作成功');
    //   refreshList();
    // });
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
