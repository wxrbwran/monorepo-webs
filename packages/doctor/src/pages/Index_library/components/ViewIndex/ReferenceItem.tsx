import React, { FC } from 'react';
import { getReferenceTitle } from 'xzl-web-shared/dist/utils/tool';
interface IProps {
  reference: TReference;
}

const ReferenceIten: FC<IProps> = (props) => {
  const { reference } = props;

  return (
    <div>{`${reference.note || ''} ${getReferenceTitle(reference)} ${reference.unit || ''}`}</div>
  );
};

export default ReferenceIten;
