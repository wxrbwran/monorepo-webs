import React from 'react';
import type { IQuestions } from '../../../const';
import delIcon from '@/assets/img/delete-icon.svg';
import { Input } from 'antd';

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
const { TextArea } = Input;
function question_text(props: IProps) {
  const {quesIndex, editIndex, item, handleSaveStem, handleDelStem, setEditIndex} = props;
  return (
    <div
      className={`topic-item ${(editIndex === quesIndex) ? 'edit' : ''}`}
      key={quesIndex}
      onClick={() => setEditIndex(quesIndex)}
    >
      <div
        className={`issue ${item.detail.stem ? '' : 'input-empty'} ${item.type === 'END' ? 'end' : ''} 'pl0'`}
      >
        {
          item.type === 'END' && <span className="issue__end">终点事件</span>
        }
        <Input
          placeholder={`请输入问题`}
          value={item.detail.stem}
          onChange={(ev) => handleSaveStem(ev, quesIndex)}
        />
        <img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} />
      </div>
      <div className="answer-wrap">
        <TextArea
          placeholder="请输入"
        />
      </div>
    </div>
  )
}

export default question_text;
