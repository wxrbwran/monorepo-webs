import React, { useState, useEffect, useMemo } from 'react';
import { Checkbox, Divider } from 'antd';
import { isEmpty, cloneDeep } from 'lodash';
// import TopicAddBtn from '../TopicAddBtn';
import { IQaItem } from '../type';
import { searchHighLight } from '@/utils/utils';
import styles from './index.scss';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQaItem[] | undefined;
  templateId: string;
  isShowEdit: boolean; // 是否首次结构化
  lightKeyWord: string;
}
// saveAddQa
function TopicChoice(props: IProps) {
  console.log('choiceProps', props);
  const { changeCallbackFns, initData, templateId, isShowEdit, lightKeyWord } = props;
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
  const handleChangeOptions = (checkedValue: string[], item: IQaItem, quesInx: number) => {
    if (item.question_type === 'RADIO') {
      const curSelect = checkedValue.filter((v: string) => !questions[quesInx].answer.includes(v));
      questions[quesInx].answer = isEmpty(checkedValue) ? [] : curSelect;
    } else {
      questions[quesInx].answer = checkedValue;
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
  const renderQuestion = useMemo(() => (quesText: string) => {
    return searchHighLight(quesText, lightKeyWord);
  }, [lightKeyWord]);
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
      {<Divider dashed />}
      <div className="qa-wrap relative">
        {<div className={styles.mask}></div>}
        {
          (valuableQas).map((item: IQaItem, quesIndex: number) => (
            <div key={item.question} className="relative ">
              <div className="topic_title">
                <span>{quesIndex + 1}. </span>
                <span
                  className="mr-10"
                  dangerouslySetInnerHTML={{ __html: renderQuestion(item.question) }}></span>
                {/* <TopicAddBtn
                {...editProps}
                actionType="edit"
                initData={item}
                editGroupInx={quesIndex}
              /> */}
              </div>
              <div>
                <Checkbox.Group
                  className={item.question_type}
                  options={item.options}
                  onChange={(e: Event) => handleChangeOptions(e, item, quesIndex)}
                  value={item.answer}
                />
              </div>
            </div>
          ))
        }
      </div>
      {/* <TopicAddBtn
        {...editProps}
        actionType="add"
      /> */}
      {<Divider dashed />}
    </div>
  );
}
export default TopicChoice;
