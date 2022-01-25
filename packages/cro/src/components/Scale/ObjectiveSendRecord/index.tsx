import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import TableSendRecord from '@/components/Scale/TableSendRecord';

interface IProps {
  children: React.ReactElement;
  scaleId: string;
  ruleId: string;
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE' | 'OBJECTIVE' | 'VISIT_OBJECTIVE';
}

function SendRecord({ children, scaleId, ruleId, scaleType }: IProps) {

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
        <TableSendRecord scaleType={scaleType} ruleId={ruleId} scaleId={scaleId} />
      </DragModal>
    </div>
  );
}

export default SendRecord;
