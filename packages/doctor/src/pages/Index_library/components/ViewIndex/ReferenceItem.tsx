import React, { FC } from 'react';
import { yinYangMap } from 'xzl-web-shared/src/utils/consts';
interface IProps {
  reference: TReference;
}

const ReferenceIten: FC<IProps> = (props) => {
  const { reference } = props;
  const getReferenceValDesc = () => {
    const { type, value, secondValue } = reference;
    switch (type) {
      case 'RANGE':
        return `${value}-${secondValue}`;
      case 'GT':
        return `>${value}`;
      case 'LT':
        return `<${secondValue}`;
      case 'AROUND':
        return `${value}±${secondValue}`;
      case 'RADIO':
        return `${yinYangMap[value as string]}`;
      case 'OTHER':
        return `${value}`;
    }
  };
  return <div>{`${reference.note || ''} ${getReferenceValDesc()} ${reference.unit || ''}`}</div>;
};

export default ReferenceIten;
