import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { message } from 'antd';
import { isEmpty } from 'lodash';
import { IQuestions } from 'typings/imgStructured';
import TopicTitle from '../TopicTitle';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[];
  isViewOnly: boolean;
}
function Ddtk(props: IProps) {
  console.log('ddtkprops', props);
  const { changeCallbackFns, initData, isViewOnly } = props;
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

  // 展示时：保存输入的回答quesInx:第几组题，qaInx组里面的第几个问题,ansInx问题里的第几个答案
  const changeAnswer = (e: any, quesInx: number, qaInx: number, ansInx: number) => {
    // @ts-ignore
    questions[quesInx][qaInx].answer[ansInx] = e.target.innerText as string;
    setQuestions(questions);
  };

  console.log('------最新questions', questions);
  let count = 0;
  return (
    <div className="border p-15 my-15">
      <TopicTitle number="一" />
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
                  <span className='mt-5'>{quesIndex - count + 1}.</span>
                  }
                  {
                    item.map((qaItem, qaInx) => (
                      <span key={qaInx}>
                        <span className={`mt-5 ${styles.ques_span}`}>{qaItem.question}</span>
                        {
                          qaItem?.answer?.map((ansItem, ansInx) => (
                            <span
                              key={ansInx}
                              className={styles.edit_span}
                              contentEditable={!isViewOnly}
                              suppressContentEditableWarning
                              onBlur={(e) => changeAnswer(e, quesIndex, qaInx, ansInx)}
                            >{ansItem ? ansItem : ''}</span>
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
