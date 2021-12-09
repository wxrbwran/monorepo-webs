
import React, { FC } from 'react';
import { Radio, Checkbox, Space } from 'antd';

const CompletionItem:FC<{ item: TIndexItem, index: number }> = (props) => {
  const { item, children } = props;
  const { group } = item;
  const groupNumberSize = () => {
    return group?.split('-').length || 0;
  };
  const selectGroup = group?.split('-');
  const groupName = `${selectGroup?.[0]}${selectGroup?.[1]}`;
  return (
    <div>
      {groupNumberSize() === 2 && (
        <Space className="mb-10">
          <h2 className="font-bold text-base ">{item.question}</h2>
          {children}
        </Space>
      )}
      {groupNumberSize() >= 3 && (
        <div className="mb-20">
          {item.question_type === 'RADIO' && <Radio name={groupName}>{item.question}</Radio>}
          {item.question_type === 'CHECKBOX' && (
            <Checkbox name={groupName}>{item.question}</Checkbox>
          )}
        </div>
      )}
    </div>
  );
};

export default CompletionItem;
