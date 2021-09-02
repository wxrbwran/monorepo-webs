import React from 'react';

import RelatedHistory from '@/components/RelatedHistory';
import PatientBaseInfo from '../PatientBaseInfo';

interface IProps {
  handleCallbackFns: (params: ICallbackFn) => void; // 图片审核大病历使用
  imageType: string;
}
function Dbl({ handleCallbackFns, imageType }: IProps) {
  return (
    <div style={{ maxWidth: 600 }}>
      <PatientBaseInfo handleCallbackFns={handleCallbackFns} imageType={imageType} />
      <div className="modal">
        <RelatedHistory handleCallbackFns={handleCallbackFns} />
      </div>
    </div>
  );
}

export default Dbl;
