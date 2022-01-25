import React from 'react';
import SubjectReply from '@/components/Scale/SubjectReply';

interface IProps {
  location: {
    query: {
      id: string;
    }
  };
  scaleType: string;
}
function Reply({ location }: IProps) {
  return (
    <SubjectReply location={location} scaleType="subjective" />
  );
}
export default Reply;
