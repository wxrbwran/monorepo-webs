import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import { useSelector, useLocation } from 'umi';
import { IVal } from '@/utils/consts';
import { typeList, IGroup, sexList, IQuestions } from '@/utils/consts';
import * as api from '@/services/api';
import ScaleTableDetailEcho from '@/components/ScaleTableDetailEcho';
import ScalePlanDetailEcho from '@/components/ScalePlanDetailEcho';
// frequency // 频率
import './index.scss';
interface IProps {
  scaleType: string;
}
interface ILocation {
  query: {
    id: string;
  }
}
function ScaleTableDetail({ scaleType }: IProps) {
  const location: ILocation = useLocation();
  const [groupId, setGroupId] = useState('');
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [plans, setPlans] = useState([]);

  const [scaleId, setScaleId] = useState('');
  const [fromName, setFromName] = useState('');
  const apiName = scaleType === 'CRF' ? 'getCrfScale' : 'getSubjectiveScale';
  useEffect(() => {
    const id = location.query.id;
    if (groupId !== id) {
      setGroupId(id);
      if(!!id){
        api.subjective[apiName](id).then((res) => {
          setQuestions(res.questions);
          setPlans(res.plans);
          setScaleId(res.scaleId);
          setFromName(res.name)
        })
      }
    }
  }, [location.query.id]);

  return (
    <div className="follow-table-detail">
      <div className="left">
        <ScaleTableDetailEcho scaleType={scaleType} scaleName={fromName} questions={questions} />
      </div>
      <div className="right table-plan">
        <ScalePlanDetailEcho scaleType={scaleType} scaleId={scaleId} initPlans={plans} />
      </div>
    </div>
  )
}

export default ScaleTableDetail;
