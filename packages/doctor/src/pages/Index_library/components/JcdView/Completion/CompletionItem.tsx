
import React, { FC } from 'react';
import { Space, Input } from 'antd';
interface IProps {
  groupQas: TIndexItem[];
  inx: number;
}

const CompletionItem: FC<IProps> = (props) => {
  const { groupQas, children, inx } = props;
  return (
    <div>
      {
        groupQas.map((item, index: number) => {
          return index === 0 ? (
            <Space className="mb-10 flex items-center topic_title" key={item.uuid! + item.question!}>
              <div className="font-bold text-base">{inx + 1}.{item.question}</div>
              {children}
            </Space>
          ) : (
            <div className="mb-20 flex pl-30" key={item.uuid! + item.question!}>
              <span className="border rounded-lg border-gray-600 h-16 px-2 inline-block mt-3" style={{ lineHeight: '14px' }}>{index}</span>
              <span>{`. ${item.question}`}</span>
              <div className="w-106 ml-10 rounded-md"><Input style={{ height: '32px' }} placeholder="请输入答案" /></div>
            </div>
          );
        })
      }
    </div>
  );
};
export default CompletionItem;

