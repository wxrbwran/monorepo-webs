import React from 'react';
import { AdviceTitle } from '@/utils/tools';
import DiffTable from '../DiffTable';
import DiffText from '../DiffText';

interface IProps {
  category: number;
  newMedicine: IAdjustMedicinePlan[];
  advice?: string | undefined | null;
  showAdvice?: boolean;
  sourceRole?: string;
}

function DiffShow(props: IProps) {
  const {
    category, newMedicine, advice, showAdvice, sourceRole,
  } = props;
  const roleId = window.$storage.getItem('roleId') || '';
  return (
    <div>
      <DiffTable newMedicine={newMedicine} simple={false} />
      {
        showAdvice && (
          <div>
            <h3>{ sourceRole ? AdviceTitle[sourceRole] : AdviceTitle[roleId] }</h3>
            <div>{advice || '无'}</div>
          </div>
        )
      }
      <DiffText category={category} newMedicine={newMedicine} />
      <DiffTable newMedicine={newMedicine} simple />
    </div>
  );
}

export default DiffShow;
