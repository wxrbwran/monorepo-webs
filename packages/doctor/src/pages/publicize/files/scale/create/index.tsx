import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Input, Tooltip, Button, message } from 'antd';
import { history, useSelector, useLocation } from 'umi';
import * as api from '@/services/api';
import guide from '@/assets/img/suifang/guide.png';
import type { IQuestions, Ioptions } from '../../../const';
import AddTopic from './components/add_topic';
import QuestionChoice from './components/question_choice';
import QuestionText from './components/question_text';
import QuestionDdtk from './components/question_ddtk';
import { useDispatch } from 'umi';
import { isArray } from 'lodash';

import './index.scss';

interface IProps {
  location: {
    query: {
      id: string;
    };
    pathname: string;
  };
  scaleType: string; // 区分来源 crf或主观量表
}
interface IParams {
  fromSid: string;
  operatorSid: string;
  question: [];
  subTitle: string;
  title: string;
}
function SuifangCreate({ location, scaleType }: IProps) {
  const initSf = useSelector((state: IState) => state.suifang);
  console.log('initSf', initSf);
  console.log('useParams', useLocation());
  const { type } = useLocation().query;
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);
  const initQuestion = () => {
    if (initSf.question) {
      return initSf.question.map((item) => {
        const newItem = { ...item };
        if (item.type === 'COMPLETION' && isArray(item.detail.stem)) {
          newItem.detail.stem = item.detail.stem.join('「」');
        }
        return newItem;
      });
    }
    return [];
  };
  const [formTit, setFormTit] = useState(initSf.title || '');
  const [questions, setQuestions] = useState<IQuestions[]>(initQuestion); //修改题目填写题目时一直变化的questions
  const [alfterQuestions, setAlfterQuestions] = useState<IQuestions[]>([]); // 修改完点击”确定“后的questions
  const [originQue, setOriginQue] = useState<IQuestions[]>(initQuestion); // 修改完但点了”取消“后questions
  const [editIndex, setEditIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subTit, setSubTit] = useState(initSf.subTitle || '');
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({
        type: 'suifang/saveCurrentEditScale',
        payload: {},
      });
    };
  }, [initSf]);
  // const { projectNsId } = useSelector((state: IState) => state.project.projDetail)
  // 随访表标题
  const handleFormTit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTit(e.target.value);
  };
  // 添加题
  const handleAddQuestion = (addItem: any) => {
    const currentEdit = questions.length;
    setQuestions([...questions, addItem]);
    // 新添加的题目选项卡为编辑状态
    setEditIndex(currentEdit);
    setOriginQue([...questions, addItem]);
  };
  // 保存输入的问题
  const handleSaveStem = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    questions[quesIndex].detail.stem = ev.target.value;
    setQuestions([...questions]);
  };
  // 删除问题
  const handleDelStem = (quesIndex: number) => {
    const newQuestions = questions.filter((_item, index) => {
      return index !== quesIndex;
    });
    setQuestions([...newQuestions]);
    setOriginQue([...newQuestions]);
    setEditIndex(-1); // 设置当前编辑未选中
  };
  const changeQues = (newQues: any) => {
    setQuestions([...newQues]);
  };
  const changeDdtkQues = (newQues: any) => {
    setAlfterQuestions([...newQues]);
    setOriginQue([...newQues]);
  };
  const handSaveDdtkModify = () => {
    setQuestions([...alfterQuestions]);
    setOriginQue([...alfterQuestions]);
  };

  // 创建量表
  const handleCreate = (params: IParams) => {
    setLoading(true);
    api.education.addPublicizeScale(params).then(() => {
      message.success('添加成功');
      setLoading(false);
      history.goBack();
    });
  };
  const handleEdit = (params: IParams) => {
    setLoading(true);
    api.education.patchPublicizeScale(params).then(() => {
      message.success('修改成功');
      setLoading(false);
      history.goBack();
    });
  };
  const checkOptionsValue = (options: Ioptions[]) => {
    const validOptions: Ioptions[] = [];
    options.forEach((item: Ioptions) => {
      if (item.content) {
        validOptions.push(item);
      }
    });
    return validOptions;
  };

  const handleSubmit = () => {
    if (!formTit.trim() || !subTit.trim()) {
      message.error('请输入表单标题及副标题!');
      return false;
    }
    let isEmpty = false;
    console.log('questions', questions);
    for (let i = 0; i < questions.length; i++) {
      if (typeof questions[i].detail.stem === 'string' && !questions[i].detail.stem?.trim()) {
        message.error('问题不能为空!');
        isEmpty = true;
        break;
      } else {
        if (['RADIO', 'CHECKBOX'].includes(questions[i].type)) {
          // 的选项： 去掉空选项
          const options = checkOptionsValue(questions[i].detail.options);
          const optionsCont: string[] = [];
          let isRepeat = false;
          options.forEach((item) => {
            if (optionsCont.includes(item.content)) {
              isRepeat = true;
            }
            optionsCont.push(item.content);
          });
          if (isRepeat) {
            message.error('存在重复选项');
            isEmpty = true;
            break;
          }
          if (options.length === 0) {
            message.error('请至少添加一个选项!');
            isEmpty = true;
            break;
          } else {
            questions[i].detail.options = options;
          }
        } else if (questions[i].type === 'COMPLETION') {
          questions[i].detail.stem = questions[i].detail.stem?.split('「」');
        }
        questions[i].code = i + 1;
      }
    }
    if (isEmpty) {
      return false;
    }
    if (initSf.id) {
      const params = {
        id: initSf.id,
        question: questions,
        title: formTit,
        subTitle: subTit,
      };
      handleEdit(params);
      return true;
    }
    const params = {
      // fromSid: window.$storage.getItem('orgSid'),
      operatorSid: window.$storage.getItem('sid'),
      operatorWcId: window.$storage.getItem('wcId'),
      ownershipSid: currentOrgInfo.sid,
      question: questions,
      title: formTit,
      subTitle: subTit,
      type: type === 'accompany' ? 0 : 1, //0：随访表 1：CRF量表
    };
    handleCreate(params);
    return true;
  };

  const handleSetEditIndex = (inx: number) => {
    setEditIndex(inx);
  };
  console.log('questions333s', questions);
  return (
    <div className="follow-table-create">
      <div className="left">
        <div className="title">
          <LeftOutlined onClick={() => history.goBack()} />
          <div className="text-box">
            <Tooltip placement="top" title="点击可进行编辑">
              <Input
                placeholder={`输入${type === 'crf' ? 'CRF量' : '随访'}表标题`}
                className="edit-input"
                value={formTit}
                onChange={handleFormTit}
              />
            </Tooltip>
          </div>
        </div>
        <div className="info">
          <Input
            placeholder="输入副标题"
            style={{ width: '200px' }}
            defaultValue={subTit}
            onChange={(e) => setSubTit(e.target.value)}
          />
        </div>
        <div className="cont">
          {/* 引导添加题目 */}
          {questions.length === 0 && (
            <div className="guide">
              <img src={guide} alt="" />
            </div>
          )}
          <div className="topic-list">
            {questions.map((item, quesIndex) => {
              const props = {
                questions,
                changeQues,
                editIndex,
                quesIndex,
                handleSaveStem,
                handleDelStem,
                item,
                setEditIndex: handleSetEditIndex,
                scaleType,
              };
              if (['RADIO', 'CHECKBOX'].includes(item.type)) {
                return <QuestionChoice {...props} key={item.type} />;
              }
              if (['TEXT', 'END'].includes(item.type)) {
                return <QuestionText {...props} key={item.type} />;
              }
              if (item.type === 'COMPLETION') {
                return <QuestionDdtk
                  {...props}
                  key={quesIndex}
                  changeDdtkQues={changeDdtkQues}
                  handSaveDdtkModify={handSaveDdtkModify}
                  originQue={originQue}
                />;
              }
              return true;
            })}
          </div>
        </div>
        {questions.length > 0 && (
          <div className="save-btn">
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              完成
            </Button>
          </div>
        )}
      </div>
      <div className="right">
        <AddTopic handleAddQuestion={handleAddQuestion} location={location} />
      </div>
    </div>
  );
}

export default SuifangCreate;
