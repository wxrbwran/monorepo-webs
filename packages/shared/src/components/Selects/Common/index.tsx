import React from 'react';
import { Checkbox, Form } from 'antd';

function Common() {
  // const commonSelectStyle = {
  //   width: 106, marginLeft: 10, height: 34, marginRight: 10,
  // };
  return (
    <Form.Item noStyle name="common">
      <Checkbox.Group>
        <Checkbox value="true">
          常用
        </Checkbox>
        <Checkbox value="false">
          不常用
        </Checkbox>
      </Checkbox.Group>
    </Form.Item>
  );
}
export default Common;
