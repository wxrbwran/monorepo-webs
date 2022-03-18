import React, { FC } from 'react';
import { IdiagnosisItem } from 'typings/imgStructured';
import dayjs from 'dayjs';

interface IProps {
  initData: IdiagnosisItem;
}
const DiagnosesToView: FC<IProps> = ({ initData }) => {
  const { attachedInfo: { diagnosisAt, hospitalName }, name } = initData;
  return (
    <>
      <div className='mb-15 text-sm flex'>
        <div className='text-gray-500 w-70 mr-15'>诊断：</div>
        <div>{name}</div>
      </div>
      <div className='mb-15 text-sm flex'>
        <div className='text-gray-500 w-70 mr-15'>诊断日期：</div>
        <div>{diagnosisAt ? dayjs(diagnosisAt).format('YYYY年MM月DD') : '--'}</div>
      </div>
      <div className='mb-15 text-sm flex'>
        <div className='text-gray-500 w-70 mr-15'>诊断医院：</div>
        <div>{hospitalName || '--'}</div>
      </div>
    </>
  );
};

export default DiagnosesToView;
