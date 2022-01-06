import React from 'react';
import ObjectiveDetail from '@/components/Scale/ObjectiveDetail';

interface IProps {
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
}

function Detail({ location }: IProps) {
  return (
    <ObjectiveDetail location={location} />
  );
}

export default Detail;
