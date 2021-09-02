import React from 'react';
import { Form, Input } from 'antd';

interface IProps {
  inx: number;
}
function HiddenItems({ inx }: IProps) {
  const getItem = (name: string) => (
    <Form.Item name={`${inx}_${name}`} noStyle><Input type="hidden" /></Form.Item>
  );
  return (
    <>
      {getItem('indexId')}
      {getItem('name')}
      {getItem('sourceSid')}
      {getItem('source')}
    </>
  );
}

export default HiddenItems;
