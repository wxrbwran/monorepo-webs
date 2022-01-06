import React, { FC } from 'react';
import TableSendRecord from '@/components/Scale/TableSendRecord';
import { useLocation } from 'umi';



const SendRecord: FC = () => {

  const location: any = useLocation();
  return (
    <div>
      <TableSendRecord source="crf" scaleGroupId={location.query.id} />
    </div>
  );
};

export default SendRecord;
