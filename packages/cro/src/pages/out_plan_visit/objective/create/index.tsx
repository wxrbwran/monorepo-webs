import React from 'react';
import ObjectiveCreate from '@/components/Scale/ObjectiveCreate';

interface IProps {
  children: React.ReactElement[];
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
}
function Create({ location }: IProps) {
  return (
    <ObjectiveCreate location={location} />
  );
}

export default Create;
