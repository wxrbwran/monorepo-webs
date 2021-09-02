import React, { useState } from 'react';
import {
  Button, Form, Input, message,
} from 'antd';
import { useDispatch, useParams } from 'umi';
import { debounce } from 'lodash';
import DragModal from '@/components/DragModal';
import { getIssueParams } from '@/utils/utils';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
}
export default ({ children }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const { sid } = useParams<{sid: string}>();
  const dispatch = useDispatch();
  const handleShowModal = () => {
    setShowModal(true);
  };
  const onFinish = (values: any) => {
    const { remind } = values;
    const params = getIssueParams(JSON.stringify({ advice: remind }), 165);
    window.$api.issue.postDoctorRemind(params).then(() => {
      message.success('发送医嘱成功');
      setShowModal(false);
      dispatch({
        type: 'issue/fetchIssueHistory',
        payload: {
          objectId: sid,
        },
      });
    }).catch((err: any) => {
      console.log('err', err);
      message.error('发送医嘱失败');
    });
  };
  return (
    <div className={styles.remind}>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        title="医生提醒"
        footer={null}
        width={770}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
      >
        <div className={styles.remind_cont}>
          <Form
            name="basic"
            onFinish={debounce(onFinish, 300)}
          >
            <Form.Item
              label="提醒及建议"
              name="remind"
              rules={[{ required: true, message: '请输入医嘱!' }]}
              className={styles.name}
            >
              <Input.TextArea rows={6} placeholder="请输入医嘱" />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">发送</Button>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};
