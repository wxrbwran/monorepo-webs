import React, { useState } from 'react';
import { Input, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { IQaItem } from '../type';

interface IProps {
  changeQues: (params: IQaItem, inx: number) => void;
  data: IQaItem;
  inx: number; // 第几个空
}
function CustomChoice(props: IProps) {
  const { changeQues, data, inx } = props;
  const [choiceData, setChoiceData] = useState(data);
  // 删除选项
  const handleDelOptions = (oIndex: number) => {
    const newOptions = choiceData.options!.filter(
      (quesItem: any, index: number) => {
        console.log(quesItem);
        return index !== oIndex;
      },
    );
    choiceData.options = newOptions;
    setChoiceData(choiceData);
    changeQues(choiceData, inx);
  };
  const handleAddOptions = () => {
    choiceData.options!.push('');
    setChoiceData(choiceData);
    changeQues(choiceData, inx);
  };

  // 输入时即时更新
  const handleSaveOption = (
    ev: React.FocusEvent<HTMLInputElement>,
    oIndex: number,
  ) => {
    choiceData.options![oIndex] = ev.target.value.trim();
    setChoiceData({ ...choiceData });
  };
  // 失去焦点时，传递给父组件，更新数据
  const handleBlur = (e: any, oIndex: number) => {
    data.options![oIndex] = e.target.value.trim();
    changeQues({ ...data }, inx);
  };
  return (
    <div
      className='topic-item'
      onClick={(e) => e.stopPropagation}
    >
      <div className="options-list">
        {choiceData.options!.map((option, oIndex) => {
          return (
            <div className="item input-empty" key={oIndex}>
              <Checkbox className='flex-1'></Checkbox>
              <Input
                placeholder={`选项${oIndex + 1}`}
                value={option}
                onChange={(ev) => handleSaveOption(ev, oIndex)}
                onBlur={(e) => handleBlur(e, oIndex)}
              />
              <CloseOutlined onClick={() => handleDelOptions(oIndex)} />
            </div>
          );
        })}
      </div>
      <div className="choice-tx">
        <div className="add-options" onClick={() => handleAddOptions()}>
          +添加选项
        </div>
      </div>
    </div>
  );
}

export default CustomChoice;
