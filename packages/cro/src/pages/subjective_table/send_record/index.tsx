import React, { FC } from 'react';
import TableSendRecord from '@/components/TableSendRecord';
import { useLocation } from 'umi';
import { useSelector } from 'react-redux';

const SendRecord: FC = () => {

  const location: any = useLocation();

  const objectiveScaleList = useSelector((state: IState) => state.project.objectiveScaleList);

  console.log('ruleId============= SendRecord subjective ruleId objectiveScaleList scaleGroupId', JSON.stringify(objectiveScaleList));

  // useEffect(() => {
  //   const id = location.query.id;
  //   api.subjective.getSubjectiveScaleDetail(id).then((res) => {

  //     res.ruleDoc.rules[0].id
  //   });
  // }, [location.query.id]);



  console.log('ruleId============= SendRecord subjective location', JSON.stringify(location.query.ruleId));
  return (
    <div>
      <TableSendRecord source="subjective" scaleGroupId={location.query.id} />
    </div>
  );
};

export default SendRecord;
