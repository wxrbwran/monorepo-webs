import React from 'react';
import { IQuestions } from '@/utils/consts';
import delIcon from '@/assets/img/follow-table/delete-icon.svg';
import { Input, Checkbox } from 'antd';

interface IProps {
  questions: IQuestions[];
  changeQues: (newQues: IQuestions[]) => void;
  handleSaveStem: (e: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => void;
  handleDelStem: (quesIndex: number) => void;
  setEditIndex: (inx: number) => void;
  quesIndex: number;
  editIndex: number;
  item: IQuestions;
  scaleType: string;
}
const { TextArea } = Input;
function QuestionText(props: IProps) {
  const { questions, changeQues, quesIndex, editIndex, item, handleSaveStem, handleDelStem, setEditIndex, scaleType } = props;
  const showInx = scaleType !== 'CRF';

  const changeRequired = (e: any) => {
    questions[quesIndex].detail.required = e.target.checked;
    changeQues([...questions]);
  };
  return (
    <div
      className={`topic-item ${(editIndex === quesIndex) ? 'edit' : ''}`}
      key={quesIndex}
      onClick={() => setEditIndex(quesIndex)}
    >
      <div
        className={`issue ${!!item.detail.stem ? '' : 'input-empty'} ${item.type === 'END' ? 'end' : ''} ${showInx ? '' : 'pl0'}`}
      >
        {
          item.type === 'END' && <span className="issue__end">终点事件</span>
        }
        {showInx && <span className="issue__index">{quesIndex + 1}、</span>}
        <Input
          placeholder={`${showInx ? quesIndex + 1 + '、' : ''}请输入问题`}
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
      <div className="text-checkbox">
        <Checkbox checked={item.detail.required} onChange={(e) => changeRequired(e)}>必填</Checkbox>
      </div>
    </div>
  );
}

export default QuestionText;
