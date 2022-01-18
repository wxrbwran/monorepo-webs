import React, { useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Input, Tooltip, Button, message } from 'antd';
import { history, useSelector } from 'umi';
import * as api from '@/services/api';
import guide from '@/assets/img/follow-table/guide.png';
import { IQuestions, Ioptions } from '@/utils/consts';
import AddTopic from './components/add_topic';
import QuestionChoice from './components/question_choice';
import QuestionText from './components/question_text';
import QuestionDdtk from './components/question_ddtk';
import { IState } from 'typings/global';
import PlanModal from '@/components/PlanModal';
import ScalePlanDetailEcho from '@/components/Scale/ScalePlanDetailEcho';

import './index.scss';
import { getUrlPreFix, IRuleDoc, IRules } from '@/pages/subjective_table/util';

interface IProps {
  location: {
    query: {
      id: string;
      isTemp?: string;
      tempId?: string;
      modifyTemp?: string;
      groupId?: string;
      scaleId?: string;
    };
    pathname: string;
  };
  scaleType: 'CRF' | 'SUBJECTIVE' | 'VISIT_CRF' | 'VISIT_SUBJECTIVE';
}
function ScaleTableCreate({ location, scaleType }: IProps) {

  const [formTit, setFormTit] = useState('');
  const [subTit, setSubTit] = useState('');
  const [questions, setQuestions] = useState<IQuestions[]>([]); //修改题目填写题目时一直变化的questions
  const [alfterQuestions, setAlfterQuestions] = useState<IQuestions[]>([]); // 修改完点击”确定“后的questions
  const [originQue, setOriginQue] = useState<IQuestions[]>([]); // 修改完但点了”取消“后questions
  const [editIndex, setEditIndex] = useState(0);
  // const [plans, setPlans] = useState([]);
  const [ruleDoc, setRuleDoc] = useState<IRuleDoc>();

  const [loading, setLoading] = useState(false);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const groupId = location.query.groupId;
  const scaleId = location.query.scaleId;

  // 随访表标题
  const handleFormTit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTit(e.target.value);
  };
  // 随访表副标题
  const handleFormSubTit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubTit(e.target.value);
  };
  // 添加题
  const handleAddQuestion = (addItem: any) => {
    const currentEdit = questions.length;
    setQuestions([...questions, addItem]);
    // 新添加的题目选项卡为编辑状态
    setEditIndex(currentEdit);
    setOriginQue([...questions, addItem]);
  };
  useEffect(() => {
    if (location.query.tempId) {
      //调接口反显
      api.subjective.scaleTemplateDtail(location.query.tempId).then((res: any) => {
        setFormTit(res.name);
        setQuestions(res.questions);
      });
    }
    // 编辑
    if (groupId) {
      api.subjective.getSubjectiveScaleDetail(groupId).then((res: any) => {
        setFormTit(res.name);
        setSubTit(res.subtitle);
        setQuestions(res.questions);
        // setPlans(res.plans);
        setOriginQue(res.questions);
        setEditIndex(res.questions.length - 1);

        setRuleDoc(res.ruleDoc);

        // setRuleDoc(res.ruleDoc);
        // setScaleId(res.scaleId);
        // setFromName(res.name);

      });
    }
  }, []);
  // 保存输入的问题
  const handleSaveStem = (ev: React.ChangeEvent<HTMLInputElement>, quesIndex: number) => {
    questions[quesIndex].detail.stem = ev.target.value;
    originQue[quesIndex].detail.stem = ev.target.value;
    setQuestions([...questions]);
    setOriginQue([...originQue]);
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
  const checkOptionsValue = (options: Ioptions[]) => {
    const validOptions: Ioptions[] = [];
    options.forEach((item: Ioptions) => {
      if (item.content) {
        validOptions.push(item);
      }
    });
    return validOptions;
  };
  //修改模板
  const handleTempModify = (tit: string) => {
    api.subjective
      .scaleTemplateModify({ name: tit, id: location.query.tempId, questions })
      .then(() => {
        message.success('修改成功');
        history.push('/template');
      });
  };
  //创建模板
  const handleTempCreate = (tit: string) => {
    setLoading(true);
    api.subjective.postScaleTemplate({ name: tit, questions }).then(() => {
      setLoading(false);
      message.success('添加成功');
      history.push('/template');
    });
  };
  //创建量表
  const handleCreate = (params: any, tit: string) => {
    setLoading(true);
    const apiName = groupId ? 'patchScale' : 'addScale';

    api.subjective[apiName](params).then(() => {
      // message.success('添加成功');
      setLoading(false);
      history.push(`/${getUrlPreFix(scaleType)}/detail?name=${tit}`);
    }).catch(() => {
      setLoading(false);
    });
  };
  const handleSubmit = () => {

    // 周注释
    if (!formTit.trim()) {
      message.error('请输入表单标题!');
      return false;
    }
    // if (!subTit?.trim()) {
    //   message.error('请输入表单副标题!');
    //   return false;
    // }
    let isEmpty = false;
    for (let i = 0; i < questions.length; i++) {
      if (!(questions[i].detail.stem instanceof Array) && !questions[i].detail.stem?.trim()) {
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
        } else if (questions[i].type === 'COMPLETION' && typeof (questions[i].detail.stem) === 'string') {
          questions[i].detail.stem = questions[i].detail.stem?.split('「」');
        }
        questions[i].code = i + 1;
      }
    }
    console.log('questionsResult', questions);
    if (isEmpty) {
      return false;
    } else {
      const params = {
        name: formTit,
        // plans: [...plans],
        projectSid: window.$storage.getItem('projectSid'),
        type: scaleType,
        info: { questions },
        projectName: window.$storage.getItem('projectName'),
        projectNsId,
        subtitle: subTit,
      };
      if (location.query.modifyTemp) {
        handleTempModify(formTit);
        return false;
      }
      if (location.query.isTemp) {
        handleTempCreate(formTit);
        return false;
      }
      if (groupId) {
        params.scaleGroupId = groupId;
      }
      if (scaleId) {
        params.scaleId = scaleId;
      }
      if (!groupId) { // 说明是新增

        if (ruleDoc) {
          params.ruleDoc = ruleDoc;
          handleCreate(params, formTit);
        } else {
          const spanEl = document.getElementById('add_plan') as HTMLElement;
          spanEl.click();
        }
        // confirm({
        //   title: '您还没有配置发送计划，如果没有发送计划，量表将无法发送!',
        //   content: '确定完成吗？',
        //   centered: true,
        //   onOk() {
        //     handleCreate(params, formTit);
        //   },
        //   onCancel() {
        //     console.log('Cancel');
        //   },
        // });
      } else {
        handleCreate(params, formTit);
      }
    }
  };
  const addPlans = (params: { ruleDoc: IRules }) => {

    setRuleDoc(params.ruleDoc);
  };

  const handleSetEditIndex = (inx: number) => {
    setEditIndex(inx);
  };

  const titlePrex = () => {

    if (scaleType === 'CRF' || scaleType == 'VISIT_CRF') {
      return 'CRF';
    } else {
      return '主观';
    }
  };
  return (
    <div className="follow-table-create">
      <div className="left">
        <div className="title">
          <LeftOutlined onClick={() => history.goBack()} />
          <div className="text-box">
            <Tooltip placement="top" title="点击可进行编辑">
              <Input
                placeholder={`输入${titlePrex()}量表标题`}
                className="edit-input"
                value={formTit}
                onChange={handleFormTit}
              />
            </Tooltip>
          </div>
        </div>
        <div className="info">
          <Input
            placeholder={`输入${titlePrex()}量表副标题`}
            className="edit-input"
            value={subTit}
            onChange={handleFormSubTit}
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
                return <QuestionChoice {...props} />;
              } else if (['TEXT', 'END'].includes(item.type)) {
                return <QuestionText {...props} />;
              } else if (item.type === 'COMPLETION') {
                return <QuestionDdtk
                  {...props}
                  changeDdtkQues={changeDdtkQues}
                  handSaveDdtkModify={handSaveDdtkModify}
                  originQue={originQue}
                />;
              }
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
        {ruleDoc ? (
          <ScalePlanDetailEcho
            scaleType={scaleType}
            groupId={groupId}
            initRule={ruleDoc}
            addPlans={addPlans}
          />
        ) : (
          !location.query.isTemp && (
            <div className="send-plan">
              <p>请添加随访计划，我们将按计划发送量表</p>
              <span>
                <PlanModal title="添加发送计划" updatePlan={addPlans} infoIndex={0} scaleType={scaleType}>
                  <span id="add_plan">添加发送计划</span>
                </PlanModal>
              </span>
            </div>
          )
        )}

        <AddTopic
          handleAddQuestion={handleAddQuestion}
          addPlans={addPlans}
          location={location}
          scaleType={scaleType}
        />
      </div>
    </div>
  );
}

export default ScaleTableCreate;
