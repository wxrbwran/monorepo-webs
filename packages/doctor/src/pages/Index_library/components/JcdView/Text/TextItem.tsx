import React, { FC } from 'react';
import { Input, Space } from 'antd';
const TextItem: FC<{ item: TIndexItem; index: number }> = ({ item, children, index }) => {
  return (
    <div>
      <Space className="mb-10 flex items-center topic_title">
        <div className="font-bold text-base">{index + 1}.{item.question}</div>
        {children}
      </Space>
      <div className="pl-10">
        <Input.TextArea rows={4} value={item?.answer?.[0] || ''}></Input.TextArea>
      </div>
    </div>
  );
};

export default TextItem;
