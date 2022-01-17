import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Form, Input, Button, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'umi';
import * as api from '@/services/api';

const GetMedicTime: FC = (props) => {
  const { children, record, isStop, changeSuccess } = props;
  const [showModal, setshowModal] = useState(false);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);

  const onFinish = (values) => {

    const param = {
      patientId: record.sid,
      projectNsId: projectNsId,
    };

    if (record?.ioLocationConfig?.stopMedTime) {
      param.stopMedTime = record.ioLocationConfig.stopMedTime;
    }
    if (record?.ioLocationConfig?.startMedTime) {
      param.startMedTime = record.ioLocationConfig.startMedTime;
    }

    if (isStop) {
      param.stopMedTime = values.time.valueOf();
    } else {
      param.startMedTime = values.time.valueOf();
    }

    api.patientManage.patchPatientMedTimeStatus(param).then(() => {

      setshowModal(false);
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
        title={isStop ? '设置停止此项目用药日期' : '设置给药时间'}
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
            name="time"
            rules={[{ required: true, message: '请选择时间!' }]}
          >
            <DatePicker className='w-full h-40' showTime={{ format: 'HH:mm' }}
            />
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

export default GetMedicTime;
