import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { IQuestions } from 'typings/imgStructured';
import { EditOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import TopicAddBtn from '../TopicAddBtn';

const { TextArea } = Input;
interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[];
  isViewOnly: boolean;
  templateId: string;
}
function TopicProblem(props: IProps) {
  const { changeCallbackFns, initData, isViewOnly, templateId } = props;
  console.log('initDatatext', initData);
  const [questions, setQuestions] = useState<IQuestions[]>(initData ? initData : []);
  const [editIndex, setEditIndex] = useState(-1);
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

  const handleClickItem = (e: Event, inx: number) => {
    e.stopPropagation();
    setEditIndex(inx);
  };

  const handleSaveAnswer = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    ev.stopPropagation();
    questions[quesIndex].answer = [ev.target.value];
    setQuestions([...questions]);
  };
  const handleDelQuestion = () => {

  };
  const handleSaveQuestion = () => {

  };
  console.log('最新question text', questions);
  let emptyAnsNum = 0;
  return (
    <div className="p-15 my-15">
      {/* <TopicTitle number="三" handleAdd={debounce(handleAddTopic, 300)} btnText='添加新的问答题' /> */}
      <div className="qa-wrap">
        {
          questions.map((item, quesIndex: number) => {
            const isEdit = editIndex === quesIndex;
            let isShow = true;
            if (isViewOnly && !item.answer[0]?.trim()) {
              isShow = false;
              ++emptyAnsNum;
            }
            return (
              isShow ? (
                <div
                  className={`${(isEdit) ? 'edit topic-item' : ' topic-item-show'}`}
                  key={quesIndex}
                  onClick={(e) => e.stopPropagation()}
                >
                  <>
                    {
                      item.isAdd && <EditOutlined onClick={(e: any) => handleClickItem(e, quesIndex)} />
                    }
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
      <TopicAddBtn
        topicType="TEXT"
        actionType="add"
        templateId={templateId}
        handleDelQuestion={handleDelQuestion}
        handleSaveQuestion={handleSaveQuestion}
      />
    </div>
  );
}

export default TopicProblem;
