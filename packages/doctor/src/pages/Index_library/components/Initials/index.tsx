import React, { FC, useState, useEffect } from 'react';
import '../../index.scss';

interface IProps {
  initialCallback: (key: string) => void;
  indexId: string;
}
const Initials: FC<IProps> = (props) => {
  const { indexId, initialCallback } = props;
  const [activeKey, setKey] = useState('全部');
  const initialsList = ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const handleSelectKey = (key: string) => {
    setKey(key);
    initialCallback(key);
  };
  useEffect(() => {
    // 切换图片类型时，reset筛选
    setKey('全部');
  }, [indexId]);
  return (
    <div className="search-start">
      <div>按指标名称首字母查询：</div>
      <div className="keyword">
        {
          initialsList.map((item: string) => (
            <span
              className={activeKey === item ? 'active' : ''}
              key={item}
              onClick={() => handleSelectKey(item)}
            >
              {item}
            </span>
          ))
        }
      </div>
    </div>
  );
};

export default Initials;
