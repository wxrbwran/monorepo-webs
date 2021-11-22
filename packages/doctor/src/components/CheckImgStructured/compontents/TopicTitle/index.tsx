import React, { FC } from 'react';

interface IProps {
  number: string;
  btnText: string;
  handleAdd: (e: any) => void;
  btnChildren: React.ReactNode;
}
const TopicTitle: FC<IProps> = (props) => {
  const { number, btnText, handleAdd } = props;
  return (
    <div className="flex justify-between mb-5  structured-edit-wrap">
      <span className="text-lg font-bold">{number}. </span>
      <span
        className="text-blue-400 cursor-pointer"
        onClick={(e) => handleAdd(e)}
      >
        + {btnText}
      </span>
    </div>
  );
};

export default TopicTitle;
