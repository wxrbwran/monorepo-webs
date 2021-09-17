import React, { useState } from 'react';
import { IQuestions } from '@/utils/consts';
import delIcon from '@/assets/img/follow-table/delete-icon.svg';
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
  scaleType: string;
}
function questionGapFilling(props: IProps) {
  const { questions, changeQues, quesIndex, editIndex, item, handleSaveStem, handleDelStem, setEditIndex } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cursorIndex, setCursorIndex] = useState();

  const getStemString = (stem) => {
    let newStem = stem;
    if (stem instanceof Array){
      newStem = '';
      stem.forEach((i, idx) => {
        if (idx !== stem.length - 1){
          newStem = newStem + i + '＿＿＿';
        }
      });
    }
    return newStem;
  };
  // 保存当前点击的位置
  const handleSaveIndex = () => {
    const dom =  document.getElementsByClassName(`ddtk_${quesIndex}`)[0];
    // @ts-ignore
    dom?.focus();
    // @ts-ignore
    setCursorIndex(dom?.selectionStart);
  };
  // 添加填空符
  const handleAddSymbol = () => {
    let oldStem = getStemString(questions[quesIndex].detail.stem);
    let newCont = oldStem + '＿＿＿';
    if (cursorIndex) {
      newCont = oldStem.slice(0, cursorIndex) + '＿＿＿' + oldStem.slice(cursorIndex);
    }
    questions[quesIndex].detail.stem =  newCont ;
    changeQues([...questions]);
  };
  const handleChangeVal = (ev: React.ChangeEventHandler<HTMLTextAreaElement>) => {
    // 内容变化时，保存光标位置
    setCursorIndex(ev.target.value.length);
    handleSaveStem(ev, quesIndex);
  };
  return (
    <div
      className={`topic-item ${styles.ddtk} ${(editIndex === quesIndex) ? 'edit' : ''}`}
      onClick={() => setEditIndex(quesIndex)}
    >
      <div className={styles.del}><img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} /></div>
      <div className="answer-wrap">

        <pre style={{ position: 'relative' }}>
          <div>{getStemString(item.detail.stem)}</div>
          <TextArea
            placeholder="请输入"
            value={getStemString(item.detail.stem)}
            onChange={(ev) => handleChangeVal(ev)}
            onClick={handleSaveIndex}
            className={`ddtk_${quesIndex}`}
          />
        </pre>
      </div>
      <div className={styles.add_btn} onClick={handleAddSymbol}>+ 添加填空符</div>
    </div>
  );
}

export default questionGapFilling;
