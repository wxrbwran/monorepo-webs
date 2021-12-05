import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';

interface IProps {
  level: string;
}
const DeleteDepOrg: FC<IProps> = (props) => {
  const { children, level } = props;
  const [show, setShow] = useState<boolean>(false);
  // const handleSubmit = async () => {
  //   console.log(form);
  //   try {
  //     const values = await form.validateFields();
  //     console.log(values);
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };
  const isDepartment = level === 'department';
  const deleteText = isDepartment ? '科室' : '机构';
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
        title={`删除${deleteText}`}
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ type: 'primary', ghost: true }}
      >
        <div className="">
          <h3>{`确定删除${deleteText}？`}</h3>
          <div style={{ fontSize: 15, marginTop: 15 }}>
            {`删除时需保证${
              isDepartment ? '科室' : '机构内及下级机构'
            }内无医生、护士、患者才可以进行删除。`}
          </div>
        </div>
      </DragModal>
    </>
  );
};

export default DeleteDepOrg;
