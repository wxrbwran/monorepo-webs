import React, { FC } from 'react';

interface IProps {
  contData: any;
}
const CroServiceDiff: FC<IProps> = ({ contData }) => {
  console.log('contDatacro', contData);
  const renderItem = (data, tit: string) => {
    return (
      <div>
        <div className=' my-10 '>{tit}</div>
        {
          data.map(item => (
            <div className='flex p-10 mb-15' key={item.id} style={{ boxShadow: '0 0 5px 0 rgb(0 0 0 / 13%)' }}>
              <img className='w-50 h-50 mr-10' src={item.avatarUrl} />
              <div>
                <div>{item.name}</div>
                <div>{item.orgs[0].name}</div>
              </div>
          </div>
          ))
        }
        {
          data.length === 0 && <div>无</div>
        }
      </div>
    );
  };

  return (
    <div>
      <div>
        {renderItem(contData.SELF, '研究者')}
        {renderItem(contData.CRC, 'CRC')}
        {renderItem(contData.CRA, 'CRA')}
        {renderItem(contData.PM, 'PM')}
      </div>
    </div>
  );
};

export default CroServiceDiff;
