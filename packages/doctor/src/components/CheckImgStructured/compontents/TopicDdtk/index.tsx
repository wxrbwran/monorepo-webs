import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { Input, message } from 'antd';
// import { ddtkData } from '../utils';
import { EditOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { IQuestions } from 'typings/imgStructured';
// import uuid from 'react-uuid';
import TopicAddBtn from '../TopicAddBtn';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[];
  isViewOnly: boolean;
  templateId: string; // 检查单模板id（单据id)
}
function Ddtk(props: IProps) {
  console.log('ddtkprops', props);
  const { changeCallbackFns, initData, isViewOnly, templateId } = props;
  const fetchInitData = () => {
    return initData.map(item => {
      return item.map(qaItem => {
        return {
          ...qaItem,
          isAdd: false,
        };
      });
    });
  };
  const [questions, setQuestions] = useState<IQuestions[][]>(initData ? fetchInitData() : []);
  const [editIndex, setEditIndex] = useState(-1); // 当前编辑第几题
  const [editCont, setEditCont] = useState(''); // 当前编辑的问题+答案 文本格式
  console.log(editCont, editIndex);
  const handleSave = () => new Promise((resolve) => {
    // resolve(fetchSubmitDataDdtk(questions, 1));
    resolve({
      data: questions,
      groupInx: 1,
    });
  });
  useEffect(() => {
    if (initData && isEmpty(questions)) {
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
  const findAnswerIndex = (qas: IQuestions[], inx: number, currAns: string) => {
    if (inx >= 0) {
      const newQa: IQuestions[] = JSON.parse(JSON.stringify(qas));
      // 如果存在这一项问答，并且有问题，那直接操作放入answer,否则向前继续寻找，直到找到为止
      if (newQa[inx] && newQa[inx]?.question) {
        if (newQa[inx]?.answer) {
          newQa[inx]?.answer?.push(currAns === '' ? null : currAns);
        } else {
          newQa[inx].answer = [currAns === '' ? null : currAns];
        }
        return newQa;
      } else {
        return findAnswerIndex(qas, inx - 1, currAns);
      }
    } else {
      message.error('请先输入问题再添加填空，请参考示例', 8);
      message.config({
        maxCount: 1,
      });
      return [];
    }

  };
  // const stringToArray = (str: string) => {
  //   // const str = '大小：「 1.5×1×1 」,边缘：「 清清清清10%，尚可* 」';
  //   const strArr = str.split('「');
  //   let qas: IQuestions[] = [];
  //   const editUuid = questions[editIndex][0].uuid;
  //   strArr.forEach((item: string, inx: number) => {
  //     console.log('itemmm', item);
  //     // 包含答案
  //     if (item.includes('」')){
  //       const a = item.split('」');
  //       // 存在答案：检索把答案放到对应的问题里
  //       if (a[0]) {
  //         qas = [ ...findAnswerIndex(qas, inx - 1, a[0].trim()) ];
  //       }
  //       // 存在问题:把问题push进去
  //       if (a[1]) {
  //         qas.push({ question: a[1], answer:[], question_type: 'COMPLETION', isAdd: true, uuid: editUuid });
  //       }
  //     } else {
  //       // 仅是问题
  //       qas.push({ question: item, answer: [], question_type: 'COMPLETION', isAdd: true, uuid: editUuid  });
  //     }
  //   });
  //   console.log('qqqqqqqqa', qas);
  //   return qas;
  // };

  // const changeSaveEdit = () => {
  //   if (!!editCont) {
  //     const editData = stringToArray(editCont);
  //     if (!isEmpty(editData)) {
  //       questions[editIndex] = editData;
  //       setQuestions(questions);
  //       setEditCont('');
  //       setEditIndex(999);
  //     }
  //   }
  // };

  // // 添加题
  // const handleAddTopic = (e: Event) => {
  //   e.stopPropagation();
  //   const inx = questions.length;
  //   setQuestions([...questions, [{ ...ddtkData, uuid: uuid() }]]);
  //   setEditIndex(inx);
  // };
  // 保存题（编辑问题或者添加）
  const handleSaveQuestion = (data: any, actionType: string, editInx?: number) => {
    console.log('save内容', data);
    console.log('edit add', actionType);
    console.log('如果是编辑，当前编辑项', editInx);
  };
  // 删除整道题
  const handleDelQuestion = (delInx: number) => {
    console.log('当前删除项', delInx);
    // e.stopPropagation();
    // const delParams = { userAddTopic, questions, tempKey, editIndex, questionsType: 'COMPLETION', tabKey };
    // handleDelUserTopic(delParams); // 处理用户新加问题多tab共享-del

    // questions.splice(inx, 1);
    // setQuestions([...questions]);
    // setEditCont('');
    // setEditIndex(999);
  };
  // 编辑题
  const handleClickEdit = (quesIndex: number) => {
    let editStr = '';
    questions[quesIndex].forEach(item => {
      let ansStr = '';
      item?.answer?.forEach(ansItem => ansStr += `「${ansItem ? ansItem : '  '}」`);
      editStr += item.question + ansStr;
    });
    setEditCont(editStr);
    setEditIndex(quesIndex);
  };

  console.log('------最新questionsddtk', questions);
  let count = 0;
  return (
    <div className="p-15 my-15">
      <div className='qa-wrap'>
        {
          questions.map((item, quesIndex: number) => {
            let isShow = true;
            if (isViewOnly) {
              isShow = false;
              count = count + 1;
              item.forEach(qaItem => {
                // 一个问题的有效答案
                const hasVals = qaItem.answer.filter(ansItem => !!ansItem?.trim());
                if (!isEmpty(hasVals)) { isShow = true;}
              });
              if (isShow) { count = count - 1;}
            }
            if (isShow) {
              return (
                <pre className={`${styles.ddtk} ${styles.done}` }  key={quesIndex}>
                  {
                    item[0]?.isAdd && (
                      <EditOutlined onClick={() => handleClickEdit(quesIndex)} />
                    )
                  }
                  {
                  <span className='mt-5'>{quesIndex - count + 1}.</span>
                  }
                  {
                    item.map((qaItem, qaInx) => (
                      <span key={qaInx}>
                        <span className={`mt-5 ${styles.ques_span}`}>{qaItem.question}</span>
                        <Input vlaue={qaItem.answer?.[0]} />
                        {/* {
                          qaItem?.answer?.map((ansItem, ansInx) => (
                            <span
                              key={ansInx}
                              className={styles.edit_span}
                              contentEditable={!isViewOnly}
                              suppressContentEditableWarning
                              onBlur={(e) => changeAnswer(e, quesIndex, qaInx, ansInx)}
                            >{ansItem ? ansItem : ''}</span>
                          ))
                        } */}
                      </span>
                    ))
                  }
                </pre>
              );
            }
          })
        }
        <TopicAddBtn
          topicType="COMPLETION"
          actionType="add"
          templateId={templateId}
          handleDelQuestion={handleDelQuestion}
          handleSaveQuestion={handleSaveQuestion}
        />
      </div>
    </div>
  );
}

export default Ddtk;
