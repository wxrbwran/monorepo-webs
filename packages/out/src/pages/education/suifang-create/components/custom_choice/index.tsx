import React from 'react';
import { Input, Checkbox } from 'antd';
import { BorderOutlined, CloseOutlined } from '@ant-design/icons';
import { IQuestions } from '@/utils/consts';

interface IProps {
  questions: IQuestions[];
  changeQues: (newQues: IQuestions[]) => void;
  quesIndex: number;
  item: IQuestions;
  optionIdx: number;
}
function CustomChoice(props: IProps) {
  const {
    questions,
    changeQues,
    quesIndex,
    item,
    optionIdx,
  } = props;
  // 删除选项
  const handleDelOptions = (oIndex: number) => {
    const newOptions = questions[quesIndex].detail.content[optionIdx].options.filter(
      (quesItem: any, index: number) => {
        console.log(quesItem);
        return index !== oIndex;
      },
    );
    questions[quesIndex].detail.content[optionIdx].options = newOptions;
    changeQues([...questions]);
  };
  // 添加选项 index表示第几题
  const handleAddOptions = () => {
    // const newOptions = questions;
    questions[quesIndex].detail.content[optionIdx].options.push({
      content: '',
      checked: false,
    });
    changeQues([...questions]);
  };

  // 保存输入的选项   保存后不可再编辑，只能删除
  const handleSaveOption = (
    ev: React.FocusEvent<HTMLInputElement>,
    oIndex: number,
  ) => {
    const val = ev.target.value;
    if (val.trim()) {
      questions[quesIndex].detail.content[optionIdx].options[oIndex].content = val;
      changeQues([...questions]);
    } else {
      questions[quesIndex].detail.content[optionIdx].options[oIndex].content = '';
      changeQues([...questions]);
    }
  };
  console.log('item.detail.options', item);
  return (
    <div
      className='topic-item'
      key={quesIndex}
    >
      <div className="options-list">
        {item.detail.content[optionIdx].options.map((option, oIndex) => {
          if (!!option.content) {
            return (
              <div className="item input-empty" key={oIndex}>
                <Checkbox className='flex-1'></Checkbox>
                <Input placeholder={`选项${oIndex + 1}`} value={option.content} onChange={(ev) => handleSaveOption(ev, oIndex)} />
                <CloseOutlined onClick={() => handleDelOptions(oIndex)} />
              </div>
            );
          } else {
            return (
              <div className="item input-empty" key={oIndex}>
                <BorderOutlined />
                <Input
                  placeholder={`选项${oIndex + 1}`}
                  onBlur={(ev) => handleSaveOption(ev, oIndex)}
                />
                <CloseOutlined onClick={() => handleDelOptions(oIndex)} />
              </div>
            );
          }
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
