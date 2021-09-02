import React, { useState, ChangeEvent } from 'react';
import {
  Input, Button, notification, message,
} from 'antd';
import { useDispatch, useParams } from 'umi';
import { getIssueParams } from '@/utils/utils';
import styles from '../index.scss';

interface IProps {
  refresh: () => void;
  data:IIssueList;
}

const { TextArea } = Input;
function Remind({ refresh, data }: IProps) {
  const dispatch = useDispatch();
  const { sid } = useParams<{sid: string}>();
  const lowerAdvice = data.body.content?.advice;
  const [advice, setAdvice] = useState(data.body.content?.advice);
  /* status: 0-> 同意, 1->忽略, 2-> 修改 */
  const handleConfirmEdit = (status: number) => {
    const msg = ['同意', '忽略', '修改并同意'];
    notification.open({
      className: 'confirm__notification',
      message: '问题审核',
      description: `待审核问题:${data.body.msg} 已${msg[status]}`,
    });
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAdvice(e.currentTarget.value);
  };
  const handleSubmit = () => {
    const params = {
      ...getIssueParams(JSON.stringify({ advice }), 165),
      id: data.id,
      state: advice === lowerAdvice ? 1 : 5, // 同意为1，修改是5
    };
    window.$api.issue.postDoctorRemind(params).then(() => {
      if (advice === lowerAdvice) {
        handleConfirmEdit(0);
      } else {
        handleConfirmEdit(2);
      }
      refresh();
      dispatch({
        type: 'issue/fetchIssueHistory',
        payload: {
          objectId: sid,
        },
      });
    }).catch((err: any) => {
      console.log('err', err);
      message.error('操作失败');
    });
  };
  return (
    <div className={styles.remind}>
      {/* <div className={styles.text}>{data.body.content}</div> */}
      <div className={styles.title}>发送患者:</div>
      <TextArea
        rows={6}
        onChange={handleChange}
        value={advice}
      />
      <div className={styles.btn_wrap}>
        <Button onClick={handleSubmit}>发送患者及下级医生</Button>
        {/* <Popconfirm
          title="确定忽略此条信息?"
          onConfirm={() => handleConfirmEdit(1)}
          okText="确认忽略"
          cancelText="再想想"
          placement="topRight"
          overlayClassName="confirm_ignore"
        >
          <Button danger>取消本次提醒</Button>
        </Popconfirm> */}
      </div>
    </div>
  );
}

export default Remind;
