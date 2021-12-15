import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import XzlTable from 'xzl-web-shared/dist/src/components/XzlTable';
import { sendAt, senderFileName, patientName } from '@/utils/columns';

interface IProps {
  actionType: number;
  startTime: number;
  ruleId: string;
  sourceType: number;
}
const SendDetail: FC<IProps> = (props) => {
  const { children, actionType, startTime, ruleId, sourceType } = props;
  const [showModal, setShowModal] = useState(false);
  const [tableOptions, settableOptions] = useState({ pageAt: 1, pageSize: 10, actionType, startTime, ruleId, sourceType });
  console.log(settableOptions);
  const handleShow = () => {
    setShowModal(true);
    console.log('sourceType333', sourceType);
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
          request={window.$api.education?.getPublicizSendInfo}
          depOptions={tableOptions}
          // noPagination={true}
          columns={col}
          dataKey={actionType === 0 ? 'sendInfoList' : 'todoSendInfoList'}
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
