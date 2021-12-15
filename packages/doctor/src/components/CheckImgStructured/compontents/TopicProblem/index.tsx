import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { IQuestions } from 'typings/imgStructured';
import { isEmpty, cloneDeep } from 'lodash';
import TopicAddBtn from '../TopicAddBtn';
import { IQaItem } from '../type';

const { TextArea } = Input;
interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[];
  isViewOnly: boolean;
  templateId: string;
  isFirstEdit: boolean;
}
function TopicProblem(props: IProps) {
  const { changeCallbackFns, initData, isViewOnly, templateId, isFirstEdit } = props;
  console.log('initDatatext', initData);
  const [questions, setQuestions] = useState<IQuestions[]>(initData ? initData : []);
  const [valuableQas, setValuableQas] = useState<IQaItem[]>([]);
  const handleSave = () => new Promise((resolve) => {
    resolve({
      data: questions.filter(item => !!item.question.trim()),
      groupInx: 3,
    });
  });
  useEffect(() => {
    if (initData && isEmpty(questions)) {
      setQuestions(initData);
      setValuableQas(initData.filter(qaItem => !isEmpty(qaItem.answer)));
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

  const handleSaveAnswer = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    ev.stopPropagation();
    questions[quesIndex].answer = [ev.target.value];
    setQuestions([...questions]);
  };
  const handleDelQuestion = (editIndex: number) => {
    questions.splice(editIndex, 1);
    setQuestions(cloneDeep(questions));
  };
  const handleSaveQuestion = (data: IQaItem, actionType: string, editIndex?: number) => {
    if (actionType === 'add') {
      setQuestions([...questions, data]);
    } else if (actionType === 'edit' && editIndex !== undefined) {
      questions[editIndex] = data;
      setQuestions(cloneDeep(questions));
    }
  };
  const editProps = {
    templateId,
    isFirstEdit,
    handleDelQuestion,
    handleSaveQuestion,
    topicType: 'TEXT',
  };
  console.log('最新question text', questions);

  return (
    <div>
      {
        (isViewOnly ? valuableQas : questions).map((item, quesIndex: number) => (
          <div
            className="mb-15"
            key={item.question}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="topic_title">
              <span>{quesIndex + 1}. </span>
              <span className="mr-10">{item.question}</span>
              <TopicAddBtn
                {...editProps}
                actionType="edit"
                initData={item}
                editGroupInx={quesIndex}
              />
            </div>
            <div className="answer-wrap">
              <TextArea
                placeholder="请输入"
                onChange={(ev: any) => handleSaveAnswer(ev, quesIndex)}
                value={item.answer?.[0]}
                disabled={isViewOnly}
              />
            </div>
          </div>
        ))
      }
      <TopicAddBtn
        {...editProps}
        actionType="add"
      />
    </div>
  );
}

export default TopicProblem;
