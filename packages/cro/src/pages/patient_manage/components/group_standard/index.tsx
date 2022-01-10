import React, { useState, useEffect } from 'react';
import { useSelector } from 'umi';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { findIndex } from '@/utils/tools';
import { IStandard, sexList } from '@/utils/consts';
import { isEmpty } from 'lodash';
import './index.scss';

interface IProps {
  type: string;
}
function GroupStandard({ type }: IProps) {
  const projDetail = useSelector((state:{ project: { projDetail: IProjDetail } })=>state.project.projDetail);
  const [isShowStandard, setIsShowStandard] = useState<boolean>(false);
  const [showStandard, setShowStandard] = useState<IStandard>({});

  const handleShowStandard = () => {
    setIsShowStandard(true);
  };
  useEffect(() => {
    if (type === 'join') {
      setShowStandard(projDetail.detail?.joinStandard);
    } else {
      setShowStandard(projDetail.detail?.excludeStandard);
    }
  }, [type]);

  return (
    <>
      <span className="group-standard-show-btn" onClick={handleShowStandard}>
        {
          type === 'join' ? '纳入标准' : '排除标准'
        }
      </span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="800px"
        visible={isShowStandard}
        title={type === 'join' ? '纳入标准' : '排除标准'}
        onCancel={() => setIsShowStandard(false)}
        footer={null}
      >
        {
          isEmpty(showStandard) ? '暂未设置标准' : (
            <div className='group-standard-show'>
              {
                showStandard.age && (
                  <div className="item">
                    <span className="tit">{findIndex(showStandard, 'age')}. <b>年龄:</b></span>
                    <span className="value">{showStandard.age.lowerAge}-{showStandard.age.upperAge}</span>
                  </div>
                )
              }
              {
                [0, 1].includes(showStandard.gender) && (
                  <div className="item">
                    <span className="tit">{findIndex(showStandard, 'gender')}. <b>性别:</b></span>
                    <span className="value">
                      {sexList[showStandard.gender]}
                    </span>
                  </div>
                )
              }
              {
                showStandard.medicineName && (
                  <div className="item">
                    <span className="tit">{findIndex(showStandard, 'medicineName')}. <b>用药:</b></span>
                    <span className="value">{showStandard.medicineName.join()}</span>
                  </div>
                )
              }
              {
                showStandard.diagnoseName && (
                  <div className="item">
                    <span className="tit">{findIndex(showStandard, 'diagnoseName')}. <b>诊断:</b></span>
                    <span className="value">{showStandard.diagnoseName.join()}</span>
                  </div>
                )
              }
              {
                showStandard.customize && (
                  <div className="item">
                    {
                      showStandard.customize.map((item:string, idx:number) => {
                        return (
                          <p key={item} className="value">{findIndex(showStandard, 'customize') + idx}. {item}</p>
                        );
                      })
                    }
                  </div>
                )
              }
            </div>
          )
        }
      </DragModal>
    </>
  );
}

export default GroupStandard;
