import React from 'react';
import ScaleTableCreate from '@/components/Scale/ScaleTableCreate';

interface IProps {
  location: {
    query: {
      id: string;
      isTemp?: string;
      tempId?: string;
      modifyTemp?: string;
    };
    pathname: string;
  };
}
function Create(props: IProps) {
  return <ScaleTableCreate {...props} scaleType="CRF" />;
}

export default Create;
