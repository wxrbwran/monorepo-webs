import React, { FC } from 'react';
import dayjs from 'dayjs';
import { ITreatmentDataItem } from 'typings/imgStructured';
import { isEmpty } from 'lodash';
interface IProps {
  initData: ITreatmentDataItem;
}
const TreatmentToView: FC<IProps> = ({ initData }) => {
  console.log('TreatmentToViewinitData', initData);
  const { hospitalInfo, treatmentName, stentInfos } = initData;
  return (
    <>
      <div className='mb-15 text-sm flex'>
        <div className='text-gray-500 w-70 mr-15'>诊断：</div>
        <div>{treatmentName}</div>
      </div>
      {
        isEmpty(stentInfos) ? (
          <>
            <div className='mb-15 text-sm flex'>
              <div className='text-gray-500 w-70 mr-15'>诊断日期：</div>
              <div>{hospitalInfo?.diagnosisAt ? dayjs(hospitalInfo.diagnosisAt).format('YYYY年MM月DD') : '--'}</div>
            </div>
            <div className='mb-15 text-sm flex'>
              <div className='text-gray-500 w-70 mr-15'>诊断医院：</div>
              <div>{hospitalInfo?.hospitalName || '--'}</div>
            </div>
          </>
        ) : (
          <div>
            {
              stentInfos.map((item, inx) => (
                <div key={item.location + inx}>
                  <div className='mb-15 text-sm flex'>
                      <div className='text-gray-500 w-70 mr-15'>位置：</div>
                      <div>{item.location}</div>
                  </div>
                  {
                    item.stentDataList.map(((stentItem, i) => (
                      <div className='mb-15 text-sm flex' key={stentItem.stentId + i }>
                        <div className='flex' style={{ width: '50%' }}>
                          <div className='text-gray-500 w-70 mr-15'>支架名称：</div>
                          <div>{stentItem.stentName}</div>
                        </div>
                        <div className='flex'>
                          <div className='text-gray-500 w-70 mr-15'>支架尺寸：</div>
                          <div>{stentItem.stentSize}</div>
                        </div>
                      </div>
                    )))
                  }
                  <div className='mb-15 text-sm flex'>
                    <div className='text-gray-500 w-70 mr-15'>治疗日期：</div>
                    <div>{dayjs(item.hospitalInfo.diagnosisAt).format('YYYY年MM月DD')}</div>
                  </div>
                  <div className='mb-15 text-sm flex'>
                    <div className='text-gray-500 w-70 mr-15'>治疗医院：</div>
                    <div>{item.hospitalInfo?.hospitalName || '--'}</div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }

    </>
  );
};

export default TreatmentToView;
