import React, { FC, useEffect } from 'react';
import noDocument from '@/assets/img/doctor_patients/icon_nodocument.png';
import vague from '@/assets/img/doctor_patients/icon_vague.png';

interface IProps {
  tabKey: string;
  outType: string;
  inspectionCallbackFns: any; // 保存时候的回调
  imageId: string;
}
const Nodata: FC<IProps> = ({ tabKey, outType, inspectionCallbackFns, imageId }) => {
  useEffect(() => {
    inspectionCallbackFns[tabKey] = () => new Promise((resolve) => {
      resolve({
        imageId,
        outType,
        operatorId: window.$storage.getItem('sid'),
        sid: window.$storage.getItem('patientSid'),
        wcId: window.$storage.getItem('patientWcId'),
      });
    });
  }, []);
  const status: any = {
    'NOT_CLEAR': { icon: vague, text: '图片不清晰' },
    'NOT_HYD_JCD': { icon: noDocument, text: '非医学单据' },
  };
  return (
    <div className="flex flex-col items-center" style={{ marginTop: '30%' }}>
      <img className="w-100" src={status?.[outType]?.icon || noDocument} />
      <div>{status?.[outType]?.text || '暂无数据'}</div>
    </div>
  );
};

export default Nodata;
