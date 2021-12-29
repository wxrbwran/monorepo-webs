
import React, { FC } from 'react';
import { Radio, Checkbox, Space } from 'antd';

const CompletionItem:FC<{ item: TIndexItem, index: number }> = (props) => {
  const { item, children, index } = props;
  return (
    <div>
      <Space className="mb-10 flex items-center topic_title">
        <div className="font-bold text-base ">{index + 1}.{item.question}</div>
        {children}
      </Space>
      <div className="mb-20">
        {item.question_type === 'RADIO' && (
          <Radio.Group>
            {
              item?.options?.map(o => <div><Radio value={o}>{o}</Radio></div>)
            }
          </Radio.Group>
        )}
        {item.question_type === 'CHECKBOX' && (
          item?.options?.map(o => <div><Checkbox>{o}</Checkbox></div>)
        )}
      </div>
    </div>
  );
};

export default CompletionItem;
