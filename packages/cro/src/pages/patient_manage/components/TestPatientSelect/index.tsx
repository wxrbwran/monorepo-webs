import React from 'react';
import { useSelector } from 'react-redux';
import { Select, Form } from 'antd';

interface IState {
  project: {
    objectiveGroup: {
      groupId: string;
      groupName: string;
    }[];
  }
}
const { Option } = Select;
function TestPatientSelect() {
  const commonSelectStyle = { width: 106, marginLeft: 10, height: 34 };
  const groupList = useSelector((state: Store) => state.project.objectiveGroup);
  return (
    <>
      <Form.Item noStyle name="status">
        <Select
          defaultValue={""}
          style={commonSelectStyle}
        >
          <Option value="">全部状态</Option>
          <Option value={1003}>结束</Option>
          <Option value={1002}>进行中</Option>
        </Select>
      </Form.Item>
      <Form.Item noStyle name="group">
        <Select
          defaultValue={""}
          style={commonSelectStyle}
        >
          <Option value="">全部分组</Option>
          {
            groupList.map((item: IGroupList) => {
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
export default TestPatientSelect;
