import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { sendAt, senderFileName, patientName } from '@/utils/columns';

const SendDetail: FC = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [tableOptions, settableOptions] = useState({ pageAt: 0, pageSize: 10 });
  console.log(settableOptions);
  const handleShow = () => {
    setShowModal(true);
  };
  const col = [patientName, sendAt, senderFileName];
  return (
    <div>
      <span onClick={handleShow}>{children}</span>
      <DragModal
        title="发送详情"
        footer={null}
        width={1000}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
      >
        <XzlTable
          request={window.$api.publicizi?.sendDetail}
          depOptions={tableOptions}
          // noPagination={true}
          columns={col}
          dataKey="sendList"
          tableOptions={{
            rowSelection: false,
            // pagination: false,
          }}
        />
      </DragModal>
    </div>
  );
};

export default SendDetail;
