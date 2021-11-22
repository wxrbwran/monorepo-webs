import React, { useState, useEffect } from 'react';
import { Checkbox, Radio } from 'antd';
import { IQuestions } from 'typings/imgStructured';
import { isEmpty } from 'lodash';
import TopicAddBtn from '../TopicAddBtn';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[] | undefined;
  isViewOnly: boolean;
  templateId: string;
}
// saveAddQa
function TopicChoice(props: IProps) {
  console.log('choiceProps', props);
  const { changeCallbackFns, initData, isViewOnly, templateId } = props;
  const [questions, setQuestions] = useState<IQuestions[]>(initData ? initData : []);
  const handleSave = (a) => new Promise((resolve) => {
    console.log(a);
    // resolve(fetchSubmitData(questions, 2));
    resolve({
      data: questions.filter(item => !!item.question.trim()),
      groupInx: 2,
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
        type: 'RADIO_CHECKED',
        fn: (a) => handleSave(a),
      });
    }
  }, [questions]);

  // 勾选操作---显示状态勾选
  const handleChangeOptions = (e: any, item: IQuestions, quesInx: number) => {
    if (item.question_type === 'RADIO') {
      questions[quesInx].answer = [e.target.value];
    } else {
      questions[quesInx].answer = e;
    }
    setQuestions([...questions]);
  };

  const handleDelQuestion = () => {

  };
  const handleSaveQuestion = () => {

  };
  console.log('最新questions', questions);
  let emptyAnsNum = 0;
  return (
    <div className="p-15 my-15">
      {/* <TopicTitle number="二" handleAdd={debounce(handleAddTopic, 300)} btnText='添加新的选择题' /> */}
      <div className="qa-wrap">
      {
        questions.map((item: IQuestions, quesIndex: number) => {
          let isShow = true;
          if (isViewOnly) {
            if (isEmpty(item.answer) || !item.answer?.[0]?.trim()) {
              isShow = false;
              ++emptyAnsNum;
            }
          }
          if (isShow) {
            return (
              <div key={quesIndex} className="mb-10 pl-12 relative topic-item-show">
                <span>
                  <span>{quesIndex - emptyAnsNum + 1}. </span>
                  <span className="mr-10">{item.question}</span>
                </span>
                {
                  item.question_type === 'RADIO' ? (
                    <Radio.Group
                      onChange={(e: Event) => handleChangeOptions(e, item, quesIndex)}
                      value={item.answer[0]}
                    >
                      {
                        item.options!.map((option, optionInx) => (
                          <Radio key={optionInx} value={option} disabled={isViewOnly}>{option}</Radio>
                        ))
                      }
                    </Radio.Group>
                  ) : (
                    <Checkbox.Group
                      options={item.options}
                      onChange={(e: Event) => handleChangeOptions(e, item, quesIndex)}
                      value={item.answer}
                      disabled={isViewOnly}
                    />
                  )
                }
              </div>
            );
          }
        })
      }
      </div>
      <TopicAddBtn
        topicType="RADIO"
        actionType="add"
        templateId={templateId}
        handleDelQuestion={handleDelQuestion}
        handleSaveQuestion={handleSaveQuestion}
      />
    </div>
  );
}
export default TopicChoice;
