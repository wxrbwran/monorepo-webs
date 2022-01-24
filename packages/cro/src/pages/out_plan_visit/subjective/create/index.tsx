import React from 'react';
import ScaleTableCreate from '@/components/Scale/ScaleTableCreate';

interface IProps {
  location: {
    query: {
      id: string;
      isTemp?: string;
      tempId?: string;
      modifyTemp?: string;
      groupId?: string;
    };
    pathname: string;
  };
}
function Create(props: IProps) {
  return <ScaleTableCreate {...props} scaleType='VISIT_SUBJECTIVE' />;
}

export default Create;
