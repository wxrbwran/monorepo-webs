import React from 'react';
import CrfReply from '@/components/Scale/CrfReply';
interface IProps {
  location: {
    query: {
      id: string;
    }
  };
}
function Reply({ location }: IProps) {
  return (
    <CrfReply location={location} scaleType='CRF' />
  );
}
export default Reply;
