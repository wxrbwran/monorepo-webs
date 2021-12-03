import React, { useState } from 'react';
import { IQuestions } from '@/utils/consts';
import delIcon from '@/assets/img/follow-table/delete-icon.svg';
import DdtkModal from '../ddtk_modal';
import styles from './index.scss';
import { Input, Button } from 'antd';

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
  changeDdtkQues: (newQues: IQuestions[]) => void;
  handSaveDdtkModify: () => void;
  originQue: IQuestions[];
}
function questionGapFilling(props: IProps) {
  const { questions, quesIndex, editIndex, item, handleSaveStem, handleDelStem, setEditIndex, changeDdtkQues, handSaveDdtkModify, scaleType } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cursorIndex, setCursorIndex] = useState();
  const getStemString = (stem) => {
    let newStem = stem;
    if (stem instanceof Array) {
      newStem = '';
      stem.forEach((i, idx) => {
        if (idx !== stem.length - 1) {
          newStem = newStem + i + '「」';
        } else {
          newStem += i;
        }
      });
    }
    return newStem;
  };
  // 保存当前点击的位置
  const handleSaveIndex = () => {
    const dom = document.getElementsByClassName(`ddtk_${quesIndex}`)[0];
    // @ts-ignore
    dom?.focus();
    // @ts-ignore
    setCursorIndex(dom?.selectionStart);
  };
  // 添加填空符
  const handleAddSymbol = () => {
    let oldStem = getStemString(questions[quesIndex].detail.stem);
    let newCont = oldStem + '「」';
    if (cursorIndex) {
      newCont = oldStem.slice(0, cursorIndex) + '「」' + oldStem.slice(cursorIndex);
    }
    questions[quesIndex].detail.stem = newCont;
    changeDdtkQues([...questions]);
    console.log('newnewnew', [...questions]);
  };
  const handleChangeVal = (ev: React.ChangeEventHandler<HTMLTextAreaElement>) => {
    // 内容变化时，保存光标位置
    setCursorIndex(ev.target.value.length);
    handleSaveStem(ev, quesIndex);
  };
  const showInx = scaleType !== 'CRF';
  return (
    <div
      className={`topic-item ${styles.ddtk} ${(editIndex === quesIndex) ? 'edit' : ''}`}
      onClick={() => setEditIndex(quesIndex)}
    >
      <div className={styles.del}><img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} /></div>
      <div className="answer-wrap">
        {showInx && <span className="issue__index ml-8 mt-27">{quesIndex + 1}、</span>}
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
      <div className="flex justify-between">
        <div className={styles.add_btn} onClick={handleAddSymbol}>+ 添加填空符</div>
        <Button type="primary" ghost>
          <DdtkModal
            questions={questions}
            changeQues={changeDdtkQues}
            quesIndex={quesIndex}
            item={item}
            handSaveDdtkModify={handSaveDdtkModify}
            originQue={props.originQue}
          ><span>修改填空题型</span></DdtkModal>
        </Button>
      </div>
    </div>
  );
}

export default questionGapFilling;
