import React, { useState } from 'react';
import type { IQuestions } from '../../../const';
import delIcon from '@/assets/img/delete-icon.svg';
import styles from './index.scss';
import { Input } from 'antd';

const { TextArea } = Input;
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
function questionGapFilling(props: IProps) {
  const {questions, changeQues, quesIndex, editIndex, item, handleSaveStem, handleDelStem, setEditIndex} = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cursorIndex, setCursorIndex] = useState();

  // 保存当前点击的位置
  const handleSaveIndex = () => {
    const dom =  document.getElementsByClassName(`ddtk_${quesIndex}`)[0];
    // @ts-ignore
    dom?.focus();
    // @ts-ignore
    setCursorIndex(dom?.selectionStart);
  }
  // 添加填空符
  const handleAddSymbol = () => {
    const oldStem = questions[quesIndex].detail.stem;
    let newCont = `${questions[quesIndex].detail.stem  }＿＿＿`;
    if (cursorIndex) {
      newCont = `${oldStem.slice(0, cursorIndex)  }＿＿＿${  oldStem.slice(cursorIndex)}`;
    }
    questions[quesIndex].detail.stem =  newCont ;
    changeQues([...questions]);
  }
  const handleChangeVal = (ev: React.ChangeEventHandler<HTMLTextAreaElement>) => {
    // 内容变化时，保存光标位置
    setCursorIndex(ev.target.value.length);
    handleSaveStem(ev, quesIndex);
  }
  return (
    <div
      className={`topic-item ${styles.ddtk} ${(editIndex === quesIndex) ? 'edit' : ''}`}
      onClick={() => setEditIndex(quesIndex)}
    >
      <div className={styles.del}><img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} /></div>
      <div className="answer-wrap">

        <pre style={{position: 'relative'}}>
          <div>{item.detail.stem}</div>
          <TextArea
            placeholder="请输入"
            value={item.detail.stem}
            onChange={(ev) => handleChangeVal(ev)}
            onClick={handleSaveIndex}
            className={`ddtk_${quesIndex}`}
          />
        </pre>
      </div>
      <div className={styles.add_btn} onClick={handleAddSymbol}>+ 添加填空符</div>
    </div>
  )
}

export default questionGapFilling;
