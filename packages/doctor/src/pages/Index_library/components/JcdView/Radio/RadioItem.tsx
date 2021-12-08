
import React, { FC } from 'react';
import { Radio, Checkbox, Space } from 'antd';

const CompletionItem:FC<{ item: TIndexItem, index: number }> = (props) => {
  const { item } = props;
  const { group } = item;
  const groupNumberSize = () => {
    return group?.split('-').length || 0;
  };
  // const  curPosition = () => {
  //   const groupNumber = group?.split('-');
  //   return groupNumber?.[groupNumber.length - 1] || 0
  // }
  return (
    <div>
      {groupNumberSize() === 2 && (
        <Space>
          <h2 className="font-bold text-base mb-10">
            {item.question}
          </h2>
        </Space>
      )}
      {groupNumberSize() >= 3 && (
        <div className="mb-20">
          {item.question_type === 'RADIO' && <Radio>{item.question}</Radio>}
          {item.question_type === 'CHECKBOX' && <Checkbox>{item.question}</Checkbox>}
        </div>
      )}
    </div>
  );
};

export default CompletionItem;
