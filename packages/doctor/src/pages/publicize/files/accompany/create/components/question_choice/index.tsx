import React from 'react';
import { Input, Checkbox, Radio } from 'antd';
import delIcon from '@/assets/img/suifang/delete-icon.svg';
import type { RadioChangeEvent } from 'antd/lib/radio';
import { BorderOutlined, CloseOutlined } from '@ant-design/icons';
import type { IQuestions } from '../../../../../const';

interface IProps {
  questions: IQuestions[];
  changeQues: (newQues: IQuestions[]) => void;
  handleSaveStem: (e: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => void;
  handleDelStem: (quesIndex: number) => void;
  setEditIndex: (inx: number) => void;
  quesIndex: number;
  editIndex: number;
  item: IQuestions;
}
function QuestionChoice(props: IProps) {
  const { questions, changeQues, quesIndex, editIndex, item, handleSaveStem, handleDelStem, setEditIndex } = props;
  // 删除选项
  const handleDelOptions = (qIndex: number, oIndex: number) => {
    const newOptions = questions[qIndex].detail.options.filter((quesItem: any, index: number) => {
      console.log(quesItem);
      return index !== oIndex;
    });
    questions[quesIndex].detail.options = newOptions;
    changeQues([...questions]);
  };
  // 添加选项 index表示第几题
  const handleAddOptions = (qIndex: number) => {
    // const newOptions = questions;
    questions[qIndex].detail.options.push({
      'content': '',
      'checked': false,
    });
    changeQues([...questions]);
  };
  // 修改题型
  const handleChangeTx = (e: RadioChangeEvent, qIndex: number) => {
    console.log(33, e.target.value);
    console.log(questions[qIndex]);
    questions[qIndex].type = e.target.value;
    changeQues([...questions]);
  };


  // 保存输入的选项   保存后不可再编辑，只能删除
  const handleSaveOption = (ev: React.FocusEvent<HTMLInputElement>, qIndex: number, oIndex: number) => {
    const val = ev.target.value;
    if (val.trim()) {
      questions[qIndex].detail.options[oIndex].content = val;
      changeQues([...questions]);
    }
  };

  const changeRequired = (e: any) => {
    questions[qIndex].detail.required = e.target.checked;
    changeQues([...questions]);
  };
  return (
    <div
      className={`topic-item ${(editIndex === quesIndex) ? 'edit' : ''}`}
      key={quesIndex}
      onClick={() => setEditIndex(quesIndex)}
    >
      <div className={['issue', item.detail.stem ? '' : 'input-empty', 'pl0'].join(' ')}>
        <Input
          placeholder={'请输入问题'}
          value={item.detail.stem}
          onChange={(ev) => handleSaveStem(ev, quesIndex)}
        />
        <img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} />
      </div>
      <div className="options-list">
        {item.detail.options.map((option, oIndex) => {
          if (option.content) {
            return (
              <div className="item input-empty" key={oIndex}>
                <Checkbox>{option.content}</Checkbox>
                <CloseOutlined onClick={() => handleDelOptions(quesIndex, oIndex)} />
              </div>
            );
          }
          return (
              <div className="item input-empty" key={oIndex}>
                <BorderOutlined />
                <Input placeholder={`选项${oIndex + 1}`} onBlur={(ev) => handleSaveOption(ev, quesIndex, oIndex)} />
                <CloseOutlined onClick={() => handleDelOptions(quesIndex, oIndex)} />
              </div>
          );

        })}
      </div>
      <div className="choice-tx">
        <div className="add-options" onClick={() => handleAddOptions(quesIndex)}>+添加选项</div>
        <div>
          <Checkbox onChange={(e) => changeRequired(e)} checked={item.detail.required}>必填</Checkbox>
          <Radio.Group onChange={(e) => handleChangeTx(e, quesIndex)} defaultValue={item.type}>
            <Radio value="RADIO">单选</Radio>
            <Radio value='CHECKBOX'>多选</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}

export default QuestionChoice;
