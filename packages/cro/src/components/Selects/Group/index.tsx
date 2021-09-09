import React from 'react';
import { useSelector } from 'react-redux';
import { Select, Form, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';

const { Option } = Select;

function Group() {
  const commonSelectStyle = { width: 106, marginLeft: 10, height: 34 };
  const groupList = useSelector((state: Store) => state.project.objectiveGroup);

  return (
    <>
      <Form.Item noStyle name="patientGroupId">
        <Select
          defaultValue={""}
          style={commonSelectStyle}
        >
          <Option value="">全部分组</Option>
          {
            groupList.map((item: any) => {
              return (
                <Option key={item.groupId} value={item.groupId}>{item.groupName}</Option>
              )
            })
          }
        </Select>
      </Form.Item>
    </>
  );
}
export default Group;
