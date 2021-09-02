import React from 'react';
import { Form, Input } from 'antd';

function EditTextArea() {
  return (
    <>
      <div className="form_item_area">
        <Form.Item
          label="个人简介"
          name="biography"
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
        <Form.Item
          label="擅长领域"
          name="expertise"
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
      </div>
      <div className="form_item_area">
        <Form.Item
          label="科研成果"
          name="achievement"
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
        >
          <Input.TextArea
            className="item"
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
      </div>
      <div className="form_item_area">
        <Form.Item
          label="第一执业医院简介"
          name="firstProfessionBrief"
        >
          <Input.TextArea
            className="item"
            autoSize={{ minRows: 2, maxRows: 2 }}
            style={{ width: '395' }}
          />
        </Form.Item>
      </div>
    </>
  );
}

export default EditTextArea;
