import React, { useState, useEffect } from 'react';
import { Checkbox, Radio, Divider } from 'antd';
import { isEmpty, cloneDeep } from 'lodash';
import TopicAddBtn from '../TopicAddBtn';
import { IQaItem } from '../type';
import styles from './index.scss';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQaItem[] | undefined;
  isViewOnly: boolean;
  templateId: string;
  isShowEdit: boolean; // 是否首次结构化
}
// saveAddQa
function TopicChoice(props: IProps) {
  console.log('choiceProps', props);
  const { changeCallbackFns, initData, isViewOnly, templateId, isShowEdit } = props;
  const [questions, setQuestions] = useState<IQaItem[]>([]);
  const [valuableQas, setValuableQas] = useState<IQaItem[]>([]);
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
      const hasVal: IQaItem[] = initData.filter(qaItem => !isEmpty(qaItem.answer));
      setValuableQas(hasVal);
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
  const handleChangeOptions = (e: any, item: IQaItem, quesInx: number) => {
    if (item.question_type === 'RADIO') {
      questions[quesInx].answer = [e.target.value];
    } else {
      questions[quesInx].answer = e;
    }
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
  console.log('最新questions---choice', questions);
  const editProps = {
    templateId,
    handleDelQuestion,
    handleSaveQuestion,
    isShowEdit,
    topicType: 'RADIO',
  };
  return (
    <div className={styles.choice}>
      {(isViewOnly || !isShowEdit) && <Divider dashed />}
      <div className="qa-wrap relative">
      {isViewOnly && <div className={styles.mask}></div>}
      {
        (isViewOnly ? valuableQas : questions).map((item: IQaItem, quesIndex: number) => (
          <div key={item.question} className="relative ">
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
            {
              item.question_type === 'RADIO' ? (
                <Radio.Group
                  onChange={(e: Event) => handleChangeOptions(e, item, quesIndex)}
                  value={item.answer?.[0]}
                >
                  {
                    item.options!.map((option, optionInx) => (
                      <Radio key={optionInx} value={option}>{option}</Radio>
                    ))
                  }
                </Radio.Group>
              ) : (
                <Checkbox.Group
                  options={item.options}
                  onChange={(e: Event) => handleChangeOptions(e, item, quesIndex)}
                  value={item.answer}
                />
              )
            }
          </div>
        ))
      }
      </div>
      <TopicAddBtn
        {...editProps}
        actionType="add"
      />
     {(isViewOnly || !isShowEdit) && <Divider dashed />}
    </div>
  );
}
export default TopicChoice;
