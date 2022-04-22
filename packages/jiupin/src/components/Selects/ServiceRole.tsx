import React from 'react';
import { Select, Form } from 'antd';
import { useSelector } from 'umi';

const { Option } = Select;
function ServiceRole() {
  const { roleList } = useSelector((state: IState) => state.personnel);
  console.log('roleList', roleList);
  return (
    <div>
      <Form.Item name="viewRole" style={{ width: 150, marginRight: 15 }} label="角色">
        <Select placeholder="全部角色">
          <Option value="">全部角色</Option>
          {
            roleList?.map((item: { id: string; name: string; }) => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))
          }
        </Select>
      </Form.Item>
    </div>
  );
}
export default ServiceRole;
