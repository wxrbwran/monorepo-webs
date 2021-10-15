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
    // resolve(fetchSubmitData(questions, 3));
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
    if (newQues) {
      setQuestions(cloneDeep(newQues));
    }
  }, [userAddTopic]);
  const changeEditIndex = () => {
    if (editIndex !== -1 && editIndex !== 999) {
      if (!isEmpty(questions)) {
        const { question, answer } = questions[editIndex];
        // 如果问题和答案都是空，则删除此项
        if (question.trim() === '' && isEmpty(answer)) {
          questions.splice(editIndex, 1);
          setQuestions(questions);
          handleEditUserTopic(userAddTopic, cloneDeep(questions), tempKey, editIndex, tabKey); // 处理用户新加问题多tab共享 -add/edit
          setEditIndex(999);
        } else if (question.trim() === '') {
          message.error('请输入问题');
        } else {
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
  }, [editIndex]);
  const handleDelStem = (inx: number) => {
    console.log(inx);
    // questions.splice(inx, 1);
    // setQuestions([...questions]);
    handleDelUserTopic(userAddTopic, questions, tempKey, editIndex ); // 处理用户新加问题多tab共享-del
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
    handleEditUserTopic(userAddTopic, cloneDeep(questions), tempKey, editIndex, tabKey); // 处理用户新加问题多tab共享 -add/edit
    setQuestions([...questions]);
  };
  const handleSaveAnswer = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    questions[quesIndex].answer = [ev.target.value];
    setQuestions([...questions]);
  };
  console.log('最新question', questions);
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
