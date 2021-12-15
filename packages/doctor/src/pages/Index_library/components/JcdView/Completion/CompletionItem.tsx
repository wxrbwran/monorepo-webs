
import React, { FC } from 'react';
import { Space } from 'antd';
interface IProps {
  item: TIndexItem;
}

const CompletionItem: FC<IProps> = (props) => {
  const { item, children } = props;
  const { group } = item;
  const groupNumberSize = (): number => {
    return group?.split('-').length || 0;
  };
  const curPosition = () => {
    const groupNumber = group?.split('-');
    return groupNumber?.[groupNumber.length - 1];
  };

  return (
    <div>
      {groupNumberSize() === 2 && (
        <Space className="mb-10">
          <h2 className="font-bold text-base">{item.question}</h2>
          {children}
        </Space>
      )}
      {groupNumberSize() >= 3 && (
        <div className="mb-20">
          <span>{`${curPosition()}. ${item.question}: ${item.answer?.[0] || ''}`}</span>
        </div>
      )}
    </div>
  );
};
export default CompletionItem;

