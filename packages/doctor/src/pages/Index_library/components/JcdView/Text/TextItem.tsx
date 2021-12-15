import React, { FC } from 'react';
import { Input, Space } from 'antd';
const TextItem: FC<{ item: TIndexItem; index: number }> = ({ item, children }) => {
  return (
    <div>
      <Space className="mb-10">
        <h2 className="font-bold text-base">{item.question}</h2>
        {children}
      </Space>
      <div className="pl-10">
        <Input.TextArea rows={4} value={item?.answer?.[0] || ''}></Input.TextArea>
      </div>
    </div>
  );
};

export default TextItem;
