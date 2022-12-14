import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';
import { IQuestions } from '@/utils/consts';
import * as api from '@/services/api';
import ScaleTableDetailEcho from '@/components/Scale/ScaleTableDetailEcho';
import ScalePlanDetailEcho from '@/components/Scale/ScalePlanDetailEcho';
// frequency // 频率
import './index.scss';
interface IProps {
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE' | 'OBJECTIVE' | 'VISIT_OBJECTIVE';
}
interface ILocation {
  query: {
    id: string;
  };
}
function ScaleTableDetail({ scaleType }: IProps) {
  const location: ILocation = useLocation();
  const [groupId, setGroupId] = useState('');
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [ruleDoc, setRuleDoc] = useState();

  const [scaleId, setScaleId] = useState('');
  const [fromName, setFromName] = useState('');
  const [subTit, setSubTit] = useState('');
  useEffect(() => {
    const id = location.query.id;
    if (groupId !== id) {
      setGroupId(id);
      if (!!id) {
        api.subjective.getSubjectiveScaleDetail(id).then((res) => {

          setQuestions(res.questions);
          setRuleDoc(res.ruleDoc);
          setScaleId(res.scaleId);
          setFromName(res.name);
          setSubTit(res.subtitle);
        });
      }
    }
  }, [location.query.id]);

  return (
    <div className="follow-table-detail">
      <div className="left">
        <ScaleTableDetailEcho
          scaleType={scaleType}
          scaleName={fromName}
          questions={questions}
          groupId={location.query.id}
          subTit={subTit}
          scaleId={scaleId}
          ruleDoc={ruleDoc}
        />
      </div>
      <div className="right table-plan">
        <ScalePlanDetailEcho
          scaleType={scaleType}
          scaleId={scaleId}
          initRule={ruleDoc}
          scaleName={fromName}
        />
      </div>
    </div>
  );
}

export default ScaleTableDetail;
