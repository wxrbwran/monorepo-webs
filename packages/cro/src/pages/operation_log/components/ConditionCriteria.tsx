import React, { FC } from 'react';

interface IProps {
  contData: {
    excludeStandard: {
      type?: string;
      customize: string[];
    }
    joinStandard?: {
      type: string;
      customize: string[];
    }
  };
}
enum Tit {
  excludeStandard = '排除标准',
  joinStandard = '纳入标准',
}
const ConditionCriteria: FC<IProps> = ({ contData }) => {
  return (
    <div>
      {
        Object.keys(contData).map(key => (
          <div key={key}>
            <div className='font-bold my-5'>{Tit[key]}</div>
            {
              contData[key]?.customize ? (
                <div>
                  {
                    contData[key]?.customize.map(item => <div key={item}>{item}</div>)
                  }
                </div>
              ) : <div>无</div>
            }
          </div>
        ))
      }
    </div>
  );
};

export default ConditionCriteria;
