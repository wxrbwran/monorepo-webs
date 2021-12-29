import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { useSelector } from 'umi';
import { Checkbox } from 'antd';

const AssignDepartment: FC = (props) => {
  const { children } = props;
  const departments = useSelector((state: IState) => state.org.currentOrg.departments);
  // const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  const handleChangeDepartmrnt = (value) => {
    console.log(value);
  };
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        width={520}
        visible={show}
        maskClosable
        onOk={() => {}}
        onCancel={() => setShow(!show)}
        centered
        title="重新分配科室"
      >
        <Checkbox.Group onChange={handleChangeDepartmrnt}>
          {departments.map((dep: Department) => (
            <Checkbox
              // disabled={val.id === this.state.departmentId}
              key={dep.id}
              value={dep.id}
            >
              {dep.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </DragModal>
    </>
  );
};

export default AssignDepartment;
