import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import TableSendRecord from '@/components/TableSendRecord';

interface IProps {
  children: React.ReactElement;
  scaleId: string;
  ruleId: string;
}

function SendRecord({ children, scaleId, ruleId }: IProps) {

  const [showModal, setshowModal] = useState(false);
  const handleShowModal = () => {
    setshowModal(true);
  };
  console.log('ruleId============= SendRecord scaleId scaleId scaleId scaleId', scaleId);
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
        <TableSendRecord source="objective" ruleId={ruleId} scaleId={scaleId} />
      </DragModal>
    </div>
  );
}

export default SendRecord;
