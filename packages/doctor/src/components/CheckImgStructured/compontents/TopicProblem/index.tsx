import React, { useState, useEffect } from 'react';
import delIcon from '@/assets/img/doctor_patients/delete-icon.svg';
import { Input, message } from 'antd';
import { IQuestions } from 'typings/imgStructured';
import TopicTitle from '../TopicTitle';
import { EditOutlined } from '@ant-design/icons';
import { isEmpty, cloneDeep, debounce } from 'lodash';
import { textData, handleDelUserTopic, handleEditUserTopic, watchUserTopicChange } from '../utils';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import { IState } from 'packages/doctor/typings/model';

const { TextArea } = Input;
interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[];
  isViewOnly: boolean;
  tempKey: string;
  tabKey: string;
}
function TopicProblem(props: IProps) {
  const { changeCallbackFns, initData, isViewOnly, tempKey, tabKey } = props;
  const userAddTopic = useSelector((state: IState) => state.structured);
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
  useEffect(() => {
    const newQues = watchUserTopicChange(userAddTopic, questions, tempKey, tabKey, ['TEXT']);
    console.log('newQues232', newQues);
    if (newQues) {
      setQuestions(cloneDeep(newQues));
    }
  }, [userAddTopic]);
  const changeEditIndex = () => {
    if (editIndex !== -1 && editIndex !== 999) {
      if (!isEmpty(questions)) {
        const { question, answer } = questions[editIndex];
        // 如果问题和答案都是空，则删除此项
        if (question.trim() === '' && (isEmpty(answer) || !answer?.[0])) {
          handleDelUserTopic({ userAddTopic, questions, tempKey, editIndex, tabKey }); // 通知其它同类型tab删除此问题-del
          questions.splice(editIndex, 1);
          setQuestions([...questions]);
          setEditIndex(999);
        } else if (question.trim() === '') {
          message.error('请输入问题');
        } else {
          const params = {
            userAddTopic,
            questions: [...questions],
            tempKey,
            editIndex,
            tabKey,
            questionsType: 'TEXT',
          };
          handleEditUserTopic(params);
          setEditIndex(999);
        }
      }
    }
  };
  useEffect(() => {
    window.addEventListener('click', changeEditIndex);
    return () => {
      window.removeEventListener('click', changeEditIndex);
    };
  }, [editIndex, questions]);
  const handleDelStem = (inx: number) => {
    handleDelUserTopic( { userAddTopic, questions, tempKey, editIndex, tabKey }); // 通知其它同类型tab删除此问题-del

    questions.splice(inx, 1);
    setQuestions([...questions]);
    setEditIndex(999);
  };
  const handleAddTopic = (e: Event) => {
    e.stopPropagation();
    const inx = questions.length;
    setQuestions([...questions, { ...cloneDeep(textData), uuid: uuid() }]);
    setEditIndex(inx);
  };
  const handleClickItem = (e: Event, inx: number) => {
    e.stopPropagation();
    setEditIndex(inx);
  };
  const handleSaveStem = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    questions[quesIndex].question = ev.target.value;
    setQuestions([...questions]);
  };
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
      <TopicTitle number="三" handleAdd={debounce(handleAddTopic, 300)} btnText='添加新的问答题' />
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
                  {
                    isEdit ? (
                      <>
                        <div className="bg-gray-50 mb-5 p-8">
                          <div className="mr-40 pl-5">示例：影像表现</div>
                          <div className="border p-5"> 膀胱充盈良好，膀胱充盈良好 </div>
                        </div>
                        <div className={`issue ${!!item.question ? '' : 'input-empty'} pl0`}>
                          <span className="issue__index">{quesIndex - emptyAnsNum + 1}、</span>
                          <Input
                            placeholder="请输入问题"
                            value={item.question}
                            onChange={(ev: any) => handleSaveStem(ev, quesIndex)}
                          />
                          <img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} />
                        </div>
                      </>
                    ) : (
                      <>
                        {
                          item.isAdd && <EditOutlined onClick={(e: any) => handleClickItem(e, quesIndex)} />
                        }
                        <div className="pl-12">{quesIndex - emptyAnsNum + 1}、{item.question}</div>
                      </>
                    )
                  }
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
