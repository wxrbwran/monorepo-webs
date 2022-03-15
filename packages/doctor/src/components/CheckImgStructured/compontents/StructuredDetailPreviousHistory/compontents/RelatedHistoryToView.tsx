import React, { FC } from 'react';
import { illnessName, smokingLevel, drinkLevel } from '@/utils/transformMedicalRecordData';
import { Divider } from 'antd';

interface familyMembers {
  hypertension: boolean, // 高血压
  hyperlipemia: boolean, // 高脂血
  hyperglycemia: boolean, // 高血糖
  coronary: boolean, // 冠心病
  peripheralVascular: boolean, // 外周血管病
  gout: boolean, // 痛风
  tumour: boolean // 肿瘤
}
interface IProps {
  initData: {
    familyHistory: 'SICK' | 'WELL'; // 是否有家族史
    fatherFamilyHistory: familyMembers | null;
    motherFamilyHistory: familyMembers | null;
    brotherFamilyHistory: familyMembers | null;
    smoking: 'SICK' | 'WELL'; // 吸烟：SICK生病的
    smokingSince: string; // 吸烟时间
    smokingLevel: 'LEVEL_ONE' | 'LEVEL_TWO' | 'LEVEL_THREE' | 'LEVEL_FOUR'; // 1-5,5-10, 10-20, 20以上
    quitSmoking: 'QUITED' | 'REMAIN'; //  已戒烟  未戒烟
    quitSmokingSince: string; // 戒烟多少年
    drinking: 'SICK' | 'WELL'; // 饮酒：SICK生病的  WELL好的
    drinkingSince: string;
    drinkingLevel: 'LEVEL_ONE' | 'LEVEL_TWO' | 'LEVEL_THREE'; // 少量，多量，超量
    quitDrinking: 'QUITED' | 'REMAIN'; //  已戒酒  未戒酒
    quitDrinkingSince: string;
    allergy: 'SICK' | null; // 过敏史
    allergyInfo: string; // 过敏详情描述
  };
}
const RelatedHistoryToView: FC<IProps> = ({ initData }) => {
  const d = initData;
  console.log('dddddd232', d);
  const renderMemberHis = (data) => {
    let text = '';
    Object.keys(data).forEach(key => {
      if (data[key]) {
        text += illnessName?.[key] || '';
      }
    });
    return text;
  };
  return (
    <>
      {
        d.familyHistory === 'SICK' ? (
          <>
            <div className='w-70 mb-10 text-sm'>家族史</div>
              <div className='mb-10 text-sm flex'>
                <div className='text-gray-500 w-70 mr-15'>父亲：</div>
                <div> { !!d.fatherFamilyHistory ? renderMemberHis(d.fatherFamilyHistory) : '无'}  </div>
              </div>
              <div className='mb-10 text-sm flex'>
                <div className='text-gray-500 w-70 mr-15'>母亲：</div>
                <div> { !!d.motherFamilyHistory ? renderMemberHis(d.motherFamilyHistory)  : '无'} </div>
              </div>
              <div className='text-sm flex'>
                <div className='text-gray-500 w-70 mr-15'>兄弟姐妹：</div>
                <div> { !!d.brotherFamilyHistory ? renderMemberHis(d.brotherFamilyHistory) : '无'}  </div>
              </div>
          </>
        ) : <div className='text-sm flex' style={{ width: '50%' }}>
        <div className='text-gray-500 w-70 mr-15'>家族史：</div>
        <div>无</div>
      </div>
      }
      <Divider dashed />
      {
        d.smoking === 'SICK' ? (
          <>
            <div className='flex'>
              <div className='mb-10 text-sm flex' style={{ width: '50%' }}>
                <div className='text-gray-500 w-70 mr-15'>吸烟史：</div>
                <div> { d.smokingSince || '--'} 年 </div>
              </div>
              <div className='mb-10 text-sm flex'>
                <div className='text-gray-500 w-70 mr-15'>吸烟情况：</div>
                <div> { smokingLevel?.[d.smokingLevel]} </div>
              </div>
            </div>
            <div className='flex'>
              <div className='text-sm flex' style={{ width: '50%' }}>
                <div className='text-gray-500 w-70 mr-15'>戒烟情况：</div>
                <div> { d.quitSmoking === 'QUITED' ? '已戒烟' : '未戒烟'}</div>
              </div>
              {
                d.quitSmoking === 'QUITED' && (
                <div className='text-sm flex'>
                  <div className='text-gray-500 w-70 mr-15'>戒烟：</div>
                  <div> { d.quitSmokingSince || '--' } 年</div>
                </div>
                )
              }
            </div>
          </>
        ) : <div className='text-sm flex' style={{ width: '50%' }}>
              <div className='text-gray-500 w-70 mr-15'>吸烟史：</div>
              <div>无</div>
            </div>
      }
      <Divider dashed />
      {
        d.drinking === 'SICK' ? (
          <>
            <div className='flex'>
              <div className='mb-10 text-sm flex' style={{ width: '50%' }}>
                <div className='text-gray-500 w-70 mr-15'>饮酒史：</div>
                <div> { d.drinkingSince || '--'} 年 </div>
              </div>
              <div className='mb-10 text-sm flex'>
                <div className='text-gray-500 w-70 mr-15'>饮酒情况：</div>
                <div> { smokingLevel?.[d.drinkingLevel]} </div>
              </div>
            </div>
            <div className='flex'>
              <div className='text-sm flex' style={{ width: '50%' }}>
                <div className='text-gray-500 w-70 mr-15'>戒酒情况：</div>
                <div> { d.quitDrinking === 'QUITED' ? '已戒烟' : '未戒烟'}</div>
              </div>
              {
                d.quitDrinking === 'QUITED' && (
                <div className='text-sm flex'>
                  <div className='text-gray-500 w-70 mr-15'>戒洒：</div>
                  <div> { d.quitDrinkingSince || '--'} 年</div>
                </div>
                )
              }
            </div>
          </>
        ) : <div className='text-sm flex' style={{ width: '50%' }}>
              <div className='text-gray-500 w-70 mr-15'>饮酒史：</div>
              <div>无</div>
            </div>
      }
      <Divider dashed />
      <div className='mb-10 text-sm flex' style={{ width: '50%' }}>
        <div className='text-gray-500 w-70 mr-15'>过敏史：</div>
        <div>{d.allergyInfo && d.allergy === 'SICK' ? d.allergyInfo : '无'}</div>
      </div>
    </>
  );
};

export default RelatedHistoryToView;
