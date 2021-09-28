import React, { useState, useEffect } from 'react';
import delIcon from '@/assets/img/doctor_patients/delete-icon.svg';
import styles from './index.scss';
import { Input, message } from 'antd';
import TopicTitle from '../TopicTitle';
import { ddtkData, ddtkExample as example } from '../utils';
import { EditOutlined } from '@ant-design/icons';
import { isEmpty, debounce } from 'lodash';
import { IQuestions } from 'typings/imgStructured';


const { TextArea } = Input;
interface IQues {
  isAdd: boolean; // add 新加
  qa: IQuestions[]
}
interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[][];
  isViewOnly: boolean;
}
function Ddtk(props: IProps) {
  console.log('ddtkprops', props);
  const { changeCallbackFns, initData, isViewOnly } = props;
  const fetchInitData = () => {
    return initData.map(item => {
      return {
        isAdd: false,
        qa: item,
      };
    });
  };
  const [cursorIndex, setCursorIndex] = useState(0); // 光标位置
  const [questions, setQuestions] = useState<IQues[]>(initData ? fetchInitData() : []);
  const [editIndex, setEditIndex] = useState(-1); // 当前编辑第几题
  const [editCont, setEditCont] = useState(''); // 当前编辑的问题+答案 文本格式

  const handleSave = () => new Promise((resolve) => {
    // resolve(fetchSubmitDataDdtk(questions, 1));
    resolve({
      data: questions,
      groupInx: 1,
    });
  });
  useEffect(() => {
    if (initData) {
      setQuestions( fetchInitData());
    }
  }, [initData]);
  useEffect(() => {
    if (changeCallbackFns) {
      changeCallbackFns({
        type: 'COMPLETION',
        fn: handleSave,
      });
    }
  }, [questions]);

  // @ts-ignore
  const findAnswerIndex = (qa: IQuestions[], inx: number, currAns: string) => {
    if (inx >= 0) {
      const newQa: IQuestions[] = JSON.parse(JSON.stringify(qa));
      // 如果存在这一项问答，并且有问题，那直接操作放入answer,否则向前继续寻找，直到找到为止
      if (newQa[inx] && newQa[inx]?.question) {
        if (newQa[inx]?.answer) {
          newQa[inx]?.answer?.push(currAns);
        } else {
          newQa[inx].answer = [currAns];
        }
        return newQa;
      } else {
        return findAnswerIndex(qa, inx - 1, currAns);
      }
    } else {
      message.error('请先输入问题再添加填空，请参考示例', 8);
      return [];
    }

  };
  const stringToArray = (str: string) => {
    // const str = '大小：「 1.5×1×1 」,边缘：「 清清清清10%，尚可* 」';
    const strArr = str.split('「');
    let qa: IQuestions[] = [];
    strArr.forEach((item: string, inx: number) => {
      console.log('itemmm', item);
      // 包含答案
      if (item.includes('」')){
        const a = item.split('」');
        // 存在答案：检索把答案放到对应的问题里
        if (a[0]) {
          qa = [ ...findAnswerIndex(qa, inx - 1, a[0]) ];
          console.log('qaa2', qa);
        }
        // 存在问题:把问题push进去
        if (a[1]) {
          qa.push({ question: a[1], answer:[], question_type: 'COMPLETION' });
        }
      } else {
        // 仅是问题
        qa.push({ question: item, answer: [], question_type: 'COMPLETION' });
      }
    });
    console.log('qqqqqqqqa', qa);
    return qa;
  };

  const changeSaveEdit = () => {
    if (editIndex !== 999 && editIndex !== -1) {
      if (!!editCont) {
        const editData = stringToArray(editCont);
        if (!isEmpty(editData)) {
          questions[editIndex].qa = editData;
          setQuestions(questions);
          setEditCont('');
          setEditIndex(999);
        }
      } else {
        questions.pop();
        setQuestions(questions);
        setEditIndex(999);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('click', changeSaveEdit);
    return () => {
      window.removeEventListener('click', changeSaveEdit);
    };
  }, [editCont, editIndex]);
  // 保存当前点击的位置
  const handleSaveIndex = () => {
    const dom =  document.getElementsByClassName('edit_input')[0];
    // @ts-ignore
    setCursorIndex(dom?.selectionStart);
  };
  // 添加填空符
  const handleAddSymbol = () => {
    const oldQuestion = editCont;
    let newCont = editCont + '「  」';
    if (cursorIndex) {
      newCont = oldQuestion.slice(0, cursorIndex) + '「  」' + oldQuestion.slice(cursorIndex);
    }
    setEditCont(newCont);
  };
  // 编辑时保存输入的内容： 内容变化时，保存光标位置
  const handleChangeVal = (ev: any ) => {
    setCursorIndex(ev.target.value.length);
    setEditCont(ev.target.value);
  };
  // 展示时：保存输入的回答quesInx:第几组题，qaInx组里面的第几个问题,ansInx问题里的第几个答案
  const changeAnswer = (e: any, quesInx: number, qaInx: number, ansInx: number) => {
    // @ts-ignore
    questions[quesInx].qa[qaInx].answer[ansInx] = e.target.innerText as string;
    setQuestions(questions);
  };
  // 添加题
  const handleAddTopic = (e: Event) => {
    e.stopPropagation();
    const inx = questions.length;
    setQuestions([...questions, { ...ddtkData }]);
    setEditIndex(inx);
  };
  // 删除整道题
  const handleDelQuestion = (e: Event, inx: number) => {
    e.stopPropagation();
    questions.splice(inx, 1);
    setQuestions([...questions]);
    setEditCont('');
    setEditIndex(999);
  };
  // 编辑题
  const handleClickEdit = (quesIndex: number) => {
    let editStr = '';
    questions[quesIndex].qa.forEach(item => {
      let ansStr = '';
      item?.answer?.forEach(ansItem => ansStr += `「${ansItem}」`);
      editStr += item.question + ansStr;
    });
    setEditCont(editStr);
    setEditIndex(quesIndex);
  };
  console.log('------最新questions', questions);
  let count = 0;
  return (
    <div className="border p-15 my-15">
      <TopicTitle number="一" handleAdd={debounce(handleAddTopic, 300)} btnText='添加新的多段填空' />
      <div className='qa-wrap'>
        {
          questions.map((item, quesIndex: number) => {
            let isShow = true;
            if (isViewOnly) {
              item.qa.forEach(qaItem => {
                qaItem.answer.forEach(ansItem => {
                  isShow = false;
                  if (!!ansItem || !ansItem?.trim()) { isShow = true; }
                });
                if (!isShow) { count++; }
              });
            }
            if (isShow) {
              if (editIndex === quesIndex) {
                return (
                  <div
                    className={`topic-item ${styles.ddtk} ${styles.edit}`}
                    onClick={(e) => e.stopPropagation()}
                    key={quesIndex}
                    // onClick={() => setEditIndex(quesIndex)}
                  >
                    <div className="flex justify-end items-center mb-15">
                      <div className={styles.add_btn} onClick={() => handleAddSymbol()}>+ 添加填空项</div>
                      <img className="ml-10" src={delIcon} onClick={(e: any) => handleDelQuestion(e, quesIndex)} />
                    </div>
                    <div>
                      <span>示例:</span>
                      {
                        example.map(exItem => (
                          <span key={exItem.q}>
                            <span className="ml-15">{exItem.q}:</span>
                            <span className="border w-74 inline-block px-5 rounded">{exItem.a}</span>
                          </span>
                        ))
                      }
                    </div>
                    <div className="answer-wrap">
                      <pre style={{ position: 'relative' }}>
                        <div>{editCont}</div>
                        <TextArea
                          placeholder="请按照示例输入问题和答案"
                          value={editCont}
                          onChange={(ev: any) => handleChangeVal(ev)}
                          onClick={handleSaveIndex}
                          className='edit_input'
                        />
                      </pre>
                    </div>

                  </div>
                );
              }
              return (
                <pre className={`${styles.ddtk} ${styles.done}` }  key={quesIndex}>
                  {
                    item.isAdd && (
                      <EditOutlined onClick={() => handleClickEdit(quesIndex)} />
                    )
                  }
                  {
                  <span className='mt-5'>{quesIndex - count + 1}.</span>
                  }
                  {
                    item.qa.map((qaItem, qaInx) => (
                      <span key={qaInx}>
                        <span className='mt-5'>{qaItem.question}</span>
                        {
                          qaItem?.answer?.map((ansItem, ansInx) => (
                            <span
                              key={ansInx}
                              className={styles.edit_span}
                              contentEditable={!isViewOnly}
                              suppressContentEditableWarning
                              onBlur={(e) => changeAnswer(e, quesIndex, qaInx, ansInx)}
                            >{ansItem}</span>
                          ))
                        }
                      </span>
                    ))
                  }
                </pre>
              );
            }
          })
        }
      </div>
    </div>

  );
}

export default Ddtk;
