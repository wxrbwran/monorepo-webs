import React, { useState, useEffect, ChangeEvent } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import {Radio, Input, Checkbox, Button, message} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { BorderOutlined, CloseOutlined } from '@ant-design/icons';
import * as api from '@/services/api';
import { IQuestions, Ioptions } from '@/utils/consts';
import './index.scss';

const { TextArea } = Input;
interface IProps {
  children: React.ReactElement;
  updateInfo: Function;
}
function CommonIssue({ children, updateInfo }: IProps) {
  const checkboxData = {
    "type": "RADIO",
    "detail": {
      "stem": "",
      "options": [
        {
          "content": "",
          "checked": false
        },
      ]
    }
  };
  const textData = {
    "type": 'TEXT',
    "detail": {
      "stem": '',
      "answer": ''
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('TEXT');
  const [questions, setQuestions] = useState<IQuestions>(textData);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setType('TEXT');
    setQuestions(textData);
    setTitle('');
  }, [showModal])

  const onChange = (e:any) => {
    setType(e.target.value);
    switch (e.target.value) {
      case 'RADIO':
        setQuestions(checkboxData);
        break;
      case 'TEXT':
        setQuestions(textData);
    }
  }

  // 保存输入的问题
  const handleSaveStem = (ev: React.FocusEvent<HTMLInputElement>) => {
    questions.detail.stem = ev.target.value;
    setQuestions({...questions});
  }

  // 删除选项
  const handleDelOptions = (oIndex: number) => {
    const newOptions = questions.detail.options.filter((item, index) => { return index !== oIndex });
    questions.detail.options = newOptions;
    setQuestions({...questions});
  }

  // 保存输入的选项   保存后不可再编辑，只能删除
  const handleSaveOption = (ev: React.FocusEvent<HTMLInputElement>, oIndex: number) => {
    const val = ev.target.value;
    if (val) {
      questions.detail.options[oIndex].content = val;
      setQuestions({...questions});
    }
  }

  // 添加选项 index表示第几题
  const handleAddOptions = () => {
    questions.detail.options.push({
      "content": "",
      "checked": false
    })
    setQuestions({...questions});
  }

  // 修改题型
  const handleChangeTx = (e:RadioChangeEvent) => {
    questions.type = e.target.value;
    setQuestions({...questions});
  }

  // 保存输入的问答题的答案
  const handleSaveAnswer = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    questions.detail.answer = ev.target.value;
    setQuestions({...questions});
  }

  const handleSubmit = () => {
    console.log('questions',questions);
    let isEmpty = false;
    if (!questions.detail.stem) {
      message.error('问题不能为空!')
      isEmpty = true;
    } else {
      if (['RADIO', 'CHECKBOX'].includes(questions.type)) {
        // 去掉空选项
        const options = checkOptionsValue(questions.detail.options);
        if (options.length === 0) {
          message.error('请至少添加一个选项!');
          isEmpty = true;
        } else {
          questions.detail.options = options;
        }
      }
      questions.code = 1;
    }
    if (isEmpty) {
      return false;
    } else {
      setLoading(true);
      const params = {
        title: title || questions.detail.stem,
        question: questions,
      }
      api.subjective.postCommonQuestion(params).then(res => {
        message.success('添加成功');
        setShowModal(!showModal);
        //更新常用问题列表
        updateInfo();
        setLoading(false);
      })
    }
  }

  const checkOptionsValue = (options: Ioptions[]) => {
    const validOptions: Ioptions[] = [];
    options.forEach((item: Ioptions) => {
      if(item.content) {
        validOptions.push(item);
      }
    })
    return validOptions;
  }

  const handleSaveTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>{children}</div>
			{showModal && (
        <DragModal
          visible={showModal}
          title='添加常用题'
          width={800}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
          className="common_issue"
        >
          <div className="type">
            <h3>选择题型</h3>
            <Radio.Group value={type} onChange={onChange}>
              <Radio value="TEXT">问答题</Radio>
              <Radio value="RADIO">选择题</Radio>
            </Radio.Group>
          </div>
          <Input
            placeholder='请输入自定义常用标题，不输入则为题目问题'
            onChange={handleSaveTitle}
          />
          <div className="topic-list">
            {
              type==='RADIO' && (
                <div className="topic-item">
                  <div className={['issue', !!questions.detail.stem ? '' : 'input-empty'].join(' ')}>
                    <Input
                      placeholder='1. 请输入问题'
                      value={questions.detail.stem}
                      onChange={handleSaveStem}
                    />
                  </div>
                  <div className="options-list">
                    {questions.detail.options.map((option, oIndex) => {
                      if (!!option.content) {
                        return (
                          <div className="item input-empty" key={oIndex}>
                            <Checkbox>{option.content}</Checkbox>
                            <CloseOutlined onClick={() => handleDelOptions(oIndex)} />
                          </div>
                        )
                      }else {
                        return (
                          <div className="item input-empty" key={oIndex}>
                            <BorderOutlined />
                            <Input placeholder={`选项${oIndex + 1}`} onBlur={(ev) => handleSaveOption(ev, oIndex)} />
                            <CloseOutlined onClick={() => handleDelOptions(oIndex)} />
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div className="choice-tx">
                    <div className="add-options" onClick={() => handleAddOptions()}>+添加选项</div>
                    <div>
                      <Radio.Group onChange={(e) => handleChangeTx(e)} defaultValue='RADIO'>
                        <Radio value="RADIO">单选</Radio>
                        <Radio value='CHECKBOX'>多选</Radio>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              )
            }
            {
              type==='TEXT' && (
                <div className="topic-item">
                  <div className={['issue', !!questions.detail.stem ? '' : 'input-empty'].join(' ')}>
                    <Input
                      placeholder='1. 请输入问题'
                      value={questions.detail.stem}
                      onChange={handleSaveStem}
                      style={{width: '100%'}}
                    />
                  </div>
                  <div className="answer-wrap">
                    <TextArea
                      placeholder="请输入"
                      value={questions.detail.answer}
                      onChange={(ev) => handleSaveAnswer(ev)}
                    />
                  </div>
                </div>
              )
            }
          </div>
          <div className="btn">
            <Button onClick={() => setShowModal(!showModal)}> 取消 </Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}> 完成 </Button>
          </div>
        </DragModal>
      ) }
    </>
  )
}

export default CommonIssue;
