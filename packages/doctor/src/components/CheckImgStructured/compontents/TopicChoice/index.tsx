import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Radio, message } from 'antd';
import delIcon from '@/assets/img/doctor_patients/delete-icon.svg';
import { RadioChangeEvent } from 'antd/lib/radio';
import { BorderOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import TopicTitle from '../TopicTitle';
import { checkboxData } from '../utils';
import { IQuestions } from 'typings/imgStructured';
import { isEmpty, cloneDeep, debounce } from 'lodash';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQuestions[] | undefined;
  isViewOnly: boolean;
}
function TopicChoice({ changeCallbackFns, initData, isViewOnly }: IProps) {
  console.log('choice', initData);
  console.log('xxg', initData ? initData : []);
  const [questions, setQuestions] = useState<IQuestions[]>(initData ? initData : []);
  const [editIndex, setEditIndex] = useState(-1);
  const handleSave = (a) => new Promise((resolve) => {
    console.log('hhhhh232', a);
    // resolve(fetchSubmitData(questions, 2));
    resolve({
      data: questions,
      groupInx: 2,
    });
  });
  useEffect(() => {
    if (initData) {
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
  const changeEditIndex = () => {
    console.log('hhhhhhh12');
    if (editIndex !== -1 && editIndex !== 999) {
      if (!isEmpty(questions)) {
        const addOptions = questions[editIndex].options!.filter(option => !!option);
        questions[editIndex].options = addOptions;
        // 如果问题和选项都 空，则删除添加的此项
        if (isEmpty(addOptions) && !questions[editIndex].question.trim()) {
          questions.splice(editIndex, 1);
          setQuestions([...questions]);
          setEditIndex(999);
        } else if (!questions[editIndex].question.trim()) {
          message.error('请输入问题');
        } else {
          setQuestions([...questions]);
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
  // 保存输入的问题
  const handleSaveStem = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    // const oldQues = JSON.parse(JSON.stringify(questions));
    questions[quesIndex].question = ev.target.value;
    setQuestions([...questions]);
  };
  // 删除选项
  const handleDelStem = (inx: number) => {
    questions.splice(inx, 1);
    setQuestions([...questions]);
    setEditIndex(999);
  };
  const handleDelOptions = (quesIndex: number, optionIndex: number, option?: string) => {
    const { options, answer } = questions[quesIndex];
    // 过滤掉删除的option, answer也过滤掉此项
    if (option) {
      questions[quesIndex].options = options!.filter((item: string) => item !== option);
      questions[quesIndex].answer = answer!.filter((item: string) => item !== option);
    } else {
      questions[quesIndex].options = options!.filter((item: string, inx: number) => {
        console.log(item);
        return inx !== optionIndex;
      });
    }
    setQuestions([...questions]);
  };
  // 添加选项 index表示第几题
  const handleAddOptions = (quesIndex: number) => {
    questions[quesIndex].options!.push('');
    setQuestions([...questions]);
  };
  // 修改题型
  const handleChangeTx = (e:RadioChangeEvent, quesIndex: number) => {
    questions[quesIndex].question_type = e.target.value;
    questions[quesIndex].answer = [];
    setQuestions([...questions]);
  };


  // 保存输入的选项   保存后不可再编辑，只能删除
  const handleSaveOption = (ev: any, quesIndex: number, oIndex: number) => {
    const val = ev.target.value;
    if (val.trim()) {
      if (questions[quesIndex].options!.includes(val)) {
        message.error('存在相同选项');
      } else {
        questions[quesIndex].options![oIndex] = val;
        setQuestions([...questions]);
      }
    }
  };

  // 设置当前点击项为编辑状态
  const handleEditItem = (e: any, inx: number) => {
    e.stopPropagation();
    setEditIndex(inx);
  };
  // 勾选操作---编辑状态勾选
  const handleChecked = (e: any, item:IQuestions, quesInx: number, option: string) => {
    let { answer } = questions[quesInx];
    if (item.question_type === 'RADIO') {
      answer = e.target.checked ? [option] : [];
    } else {
      if (e.target.checked) {
        answer.push(option);
      } else {
        answer = answer.filter(ansItem => ansItem !== option);
      }
    }
    questions[quesInx].answer = answer;
    setQuestions([...questions]);
  };
  // 勾选操作---显示状态勾选
  const handleChangeOptions = (e: any, item: IQuestions, quesInx: number) => {
    if (item.question_type === 'RADIO') {
      questions[quesInx].answer = [e.target.value];
    } else {
      questions[quesInx].answer = e;
    }
    setQuestions([...questions]);
  };

  const handleAddTopic = (e: Event) => {
    e.stopPropagation();
    const inx = questions.length;
    setQuestions([...questions, { ...cloneDeep(checkboxData) }]);
    setEditIndex(inx);
  };

  console.log('最新questions', questions);
  let emptyAnsNum = 0;
  return (
    <div className="border p-15 my-15">
      <TopicTitle number="二" handleAdd={debounce(handleAddTopic, 300)} btnText='添加新的选择题' />
      {
        questions.map((item: IQuestions, quesIndex: number) => {
          let isShow = true;
          if (isViewOnly && isEmpty(item.answer)) {
            isShow = false;
            ++emptyAnsNum;
          }
          if (isShow) {
            if (editIndex === quesIndex) {
              return (
                <div
                  className="topic-item edit"
                  key={quesIndex}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-gray-50 py-3 mb-5">
                    <span className="mr-40 pl-5">示例: 肺动脉端</span>
                    <Radio.Group>
                      <Radio value={1}>突出</Radio>
                      <Radio value={2}>不突出</Radio>
                    </Radio.Group>
                    <span className="ml-30">（{item.question_type === 'RADIO' ? '单选' : '多选'}）</span>
                  </div>
                  <div className={['issue', !!item.question ? '' : 'input-empty', 'pl0'].join(' ')}>
                    <Input
                      placeholder={`${quesIndex + 1}.请输入问题`}
                      value={item.question}
                      onChange={(ev: any) => handleSaveStem(ev, quesIndex)}
                    />
                    <img className="issue__delete" src={delIcon} onClick={() => handleDelStem(quesIndex)} />
                  </div>
                  <div className="options-list">
                    {item.options!.map((option, oIndex) => {
                      if (!!option) {
                        return (
                          <div className="item input-empty" key={oIndex}>
                            <Checkbox
                              onChange={(e: Event) => handleChecked(e, item, quesIndex, option)}
                              checked={item.answer.includes(option)}
                            >{option}</Checkbox>
                            <CloseOutlined onClick={() => handleDelOptions(quesIndex, oIndex, option)} />
                          </div>
                        );
                      } else {
                        return (
                          <div className="item input-empty" key={oIndex}>
                            <BorderOutlined />
                            <Input
                              placeholder={`选项${oIndex + 1}`}
                              onBlur={(ev: Event) => handleSaveOption(ev, quesIndex, oIndex)}
                            />
                            <CloseOutlined onClick={() => handleDelOptions(quesIndex, oIndex)} />
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className="choice-tx">
                    <div className="add-options" onClick={() => handleAddOptions(quesIndex)}>+添加选项</div>
                    <div>
                      <Radio.Group onChange={(e: HTMLDivElement) => handleChangeTx(e, quesIndex)} defaultValue={item.question_type}>
                        <Radio value="RADIO">单选</Radio>
                        <Radio value='CHECKBOX'>多选</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={quesIndex} className="mb-10 pl-12 relative topic-item-show">
                {
                  item.isAdd && (
                    <EditOutlined onClick={(e: Event) => handleEditItem(e, quesIndex)} />
                  )
                }
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
            );
          }
        })
      }
    </div>
  );
}

export default TopicChoice;
