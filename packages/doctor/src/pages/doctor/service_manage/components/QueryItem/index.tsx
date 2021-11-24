import React, { FC } from 'react';
import { Form, Input } from 'antd';

const QueryItem: FC = () => {
  const keywords = [
    { name: 'name', placeholder: '姓名' },
    { name: 'tel', placeholder: '手机号' },
    { name: 'role_tag', placeholder: '角色' },
    { name: 'practice_areas', placeholder: '执业医院' },
    { name: 'having_hospital', placeholder: '所在线上医院和项目机构' },
    { name: 'having_department', placeholder: '科室' },
  ];
  return (
    <>
     {
       keywords.map(item => (
        <Form.Item noStyle name={item.name}>
          <Input placeholder={item.placeholder} />
        </Form.Item>
       ))
     }
    </>
  );
};

export default QueryItem;
