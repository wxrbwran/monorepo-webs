import React, { FC } from 'react';
import TableSendRecord from '@/components/Scale/TableSendRecord';
import { useLocation } from 'umi';
import { useSelector } from 'react-redux';

const SendRecord: FC = () => {

  const location: any = useLocation();

  const objectiveScaleList = useSelector((state: IState) => state.project.objectiveScaleList);

  return (
    <div>
      <TableSendRecord scaleType='SUBJECTIVE' scaleGroupId={location.query.id} />
    </div>
  );
};

export default SendRecord;
