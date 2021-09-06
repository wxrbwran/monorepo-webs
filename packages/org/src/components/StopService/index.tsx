import React, { FC, useState } from 'react';
import DragModal from '@/components/DragModal';
// import { Button } from 'antd';

const StopService: FC = (props) => {
  const { children } = props;
  // const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        width={770}
        visible={show}
        maskClosable
        okText="确定停用"
        cancelText="再想想"
        onOk={() => {}}
        onCancel={() => setShow(!show)}
        centered
        title="确定停用？"
      >
        <div className="">
          <p>一旦停用，医院下医生账号均失效，患者与医生解除关系，确定停用？</p>
          <div style={{ fontSize: 15, marginTop: 37 }}>
            温馨提示：如果要停用机构，必须该机构下边没有科室，医生，护士，
            患者的情况下才可以停用或者将其分配之后再进行停用
          </div>
        </div>
      </DragModal>
    </>
  );
};

export default StopService;
