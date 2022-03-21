import React, { FC } from 'react';
import RichText from '@/components/RichText';

interface IProps {
  contData: {
    fileCont: string;
    name: string;
  };
}
const RichTextDiff: FC<IProps> = ({ contData }) => {
  return (
    <div>
      <div className="mb-20 p-5" style={{ border: '1px solid #d9d9d9' }}>
        {contData.name}
      </div>
      <div className='border mt-20' style={{ border: '1px solid black' }}>
        <RichText
          handleChange={() => {}}
          readonly={true}
          value={contData.fileCont}
          style={{ height: '600px' }}
        />
      </div>
    </div>
  );
};

export default RichTextDiff;
