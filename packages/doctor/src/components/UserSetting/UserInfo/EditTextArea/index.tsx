import React from 'react';
import { Form, Input } from 'antd';
import styles from '../UserInfoEdit/index.scss';

function EditTextArea() {
  return (
    <div className={styles.form_list}>
        <Form.Item
          label="个人简介"
          name="biography"
          className={styles.left_input}
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
        <Form.Item
          label="擅长领域"
          name="expertise"
          className={styles.right_input}
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
        <Form.Item
          label="科研成果"
          name="achievement"
          className={styles.left_input}
        >
          <Input.TextArea
            className="item"
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
        <Form.Item
          label="会议讲课"
          name="meetingLecture"
          className={styles.right_input}
        >
          <Input.TextArea
            className="item"
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
      <Form.Item
        label="第一执业医院简介"
        name="firstProfessionBrief"
        className={styles.left_input}
      >
        <Input.TextArea
          className="item"
          autoSize={{ minRows: 2, maxRows: 2 }}
          style={{ width: '395' }}
        />
      </Form.Item>
    </div>
  );
}

export default EditTextArea;
