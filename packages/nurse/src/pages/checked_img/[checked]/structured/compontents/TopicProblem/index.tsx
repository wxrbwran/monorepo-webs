import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { IQuestions } from 'typings/imgStructured';
import TopicTitle from '../TopicTitle';
import { isEmpty } from 'lodash';

const { TextArea } = Input;
interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[];
  isViewOnly: boolean;
  tempKey: string;
  tabKey: string;
}
function TopicProblem(props: IProps) {
  const { changeCallbackFns, initData, isViewOnly } = props;
  console.log('initDatatext', initData);
  const [questions, setQuestions] = useState<IQuestions[]>(initData ? initData : []);
  const handleSave = () => new Promise((resolve) => {
    resolve({
      data: questions.filter(item => !!item.question.trim()),
      groupInx: 3,
    });
  });
  useEffect(() => {
    if (initData && isEmpty(questions)) {
      setQuestions(initData);
    }
  }, [initData]);
  useEffect(() => {
    if (changeCallbackFns) {
      changeCallbackFns({
        type: 'TEXT',
        fn: handleSave,
      });
    }
  }, [questions]);

  // 当前编辑的tab，问题和答案都要存到redux中，当渲染时，会根据如果问题的tabkey与当前一致，会采用redux中的答案
  const handleSaveAnswer = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    ev.stopPropagation();
    questions[quesIndex].answer = [ev.target.value];
    setQuestions([...questions]);
  };
  console.log('最新question text', questions);
  let emptyAnsNum = 0;
  return (
    <div className="border p-15 my-15">
      <TopicTitle number="三" />
      <div className="qa-wrap">
        {
          questions.map((item, quesIndex: number) => {
            let isShow = true;
            if (isViewOnly && !item.answer[0]?.trim()) {
              isShow = false;
              ++emptyAnsNum;
            }
            return (
              isShow ? (
                <div
                  className='topic-item-show'
                  key={quesIndex}
                  onClick={(e) => e.stopPropagation()}
                >
                  <>
                    <div className="pl-12">{quesIndex - emptyAnsNum + 1}、{item.question}</div>
                  </>
                  <div className="answer-wrap">
                    <TextArea
                      placeholder="请输入"
                      onChange={(ev: any) => handleSaveAnswer(ev, quesIndex)}
                      value={item.answer?.[0]}
                      disabled={isViewOnly}
                    />
                  </div>
                </div>
              ) : <></>
            );
          })
        }
      </div>
    </div>
  );
}

export default TopicProblem;
