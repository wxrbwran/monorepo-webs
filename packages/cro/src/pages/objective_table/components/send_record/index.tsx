import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import TableSendRecord from '@/components/TableSendRecord';

interface IProps {
  children: React.ReactElement;
  scaleGroupId: string;
}

function SendRecord({ children, scaleGroupId }: IProps) {
  const [showModal, setshowModal] = useState(false)
  const handleShowModal = () => {
    setshowModal(true)
  }
  return (
    <div>
      <div onClick={handleShowModal}>{children}</div>
      <DragModal
        visible={showModal}
        title='发送记录'
        width={800}
        wrapClassName="ant-modal-wrap-center"
        onCancel={() => setshowModal(false)}
        maskClosable
        footer={null}
      >
        <TableSendRecord source="objective" scaleGroupId={scaleGroupId}  />
      </DragModal>
    </div>
  );
};

export default SendRecord;
