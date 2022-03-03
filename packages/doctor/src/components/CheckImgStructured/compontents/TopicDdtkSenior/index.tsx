import React, { useState, useEffect, useMemo } from 'react';
import styles from './index.scss';
import { isEmpty, cloneDeep } from 'lodash';
import { IQaItem } from '../type';
import TopicAddBtn from '../TopicAddBtn';
import { formatTempDdtk } from '../utils';
import { searchHighLight } from '@/utils/utils';
import { DatePicker, Select } from 'antd';
import moment from 'moment';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQaItem[];
  isViewOnly: boolean;
  templateId: string; // 检查单模板id（单据id)
  isShowEdit: boolean; // 是否首次结构化
  lightKeyWord: string;
}
const { Option } = Select;
function DdtkSenior(props: IProps) {
  console.log('ddtkprops', props);
  const { changeCallbackFns, initData, isViewOnly, templateId, isShowEdit, lightKeyWord } = props;
  const [qasGroups, setQasGroups] = useState<IQaItem[][]>([]);
  const [valuableQas, setValuableQas] = useState<IQaItem[][]>([]);
  const handleSave = () => new Promise((resolve) => {
    // resolve(fetchSubmitDataDdtk(questions, 1));
    resolve({
      data: qasGroups,
      groupInx: 1,
    });
  });
  useEffect(() => {
    if (initData) {
      const qaGroups = formatTempDdtk(initData);
      setQasGroups(cloneDeep(qaGroups));
      console.log('qaGroupsqaGroups', qaGroups);
      if (isViewOnly) {
        // 过滤出有填写答案的问题组
        const hasValWt = qaGroups.filter(qas => qas.find(qa => !isEmpty(qa.answer)));
        // 问题组中，多个问答，过滤掉没答案的item
        const qas: IQaItem[][] = [];
        hasValWt.map(item =>{
          qas.push(item.filter((qa, inx) => !isEmpty(qa.answer) || inx === 0));
        });
        console.log('=======qas', qas);
        setValuableQas(cloneDeep(qas));
      }
    }
  }, [initData]);
  useEffect(() => {
    if (changeCallbackFns) {
      changeCallbackFns({
        type: 'COMPLETION_SENIOR',
        fn: handleSave,
      });
    }
  }, [qasGroups]);

  // 保存题（编辑问题或者添加）
  const handleSaveQuestion = (data: any, actionType: string, editIndex?: number) => {
    console.log('save内容', data);
    console.log('edit add', actionType);
    console.log('如果是编辑，当前编辑项', editIndex);
    if (actionType === 'add') {
      setQasGroups([...qasGroups, [...data]]);
    } else if (actionType === 'edit' && editIndex !== undefined) {
      qasGroups[editIndex] = [...data];
      setQasGroups(cloneDeep(qasGroups));
    }
  };
  // 删除整道题
  const handleDelQuestion = (editIndex: number) => {
    qasGroups.splice(editIndex, 1);
    setQasGroups(cloneDeep(qasGroups));
  };

  const handleChangeAnswer = (e: any, groupInx: number, qaInx: number, type: string) => {
    console.log('val111', e);
    let val: any = e;
    if (type === 'INLINE_DATE') {
      val = [moment(e).valueOf()];
    } else if (type === 'INLINE_RADIO') {
      val = [e];
    } else if (type === 'INLINE_COMPLETION' ) {
      val = [e.target.innerText as string];
    }
    console.log('val', val);
    qasGroups[groupInx][qaInx].answer = val;
  };
  const renderAnswerType = (qaItem: IQaItem, quesIndex: number, qaInx: number) => {
    const t = qaItem.question_type;
    switch (t) {
      case 'INLINE_RADIO':
      case 'INLINE_CHECKBOX':
        return (
          isViewOnly ? (
            qaItem.answer.map((ansItem, ansInx) => <span key={ansItem}>{ansItem}{ansInx === qaItem.answer.length - 1 ? '' : '、'}</span>)
          ) : (
            <Select
              style={{ width: 120 }}
              placeholder="请选择"
              onChange={(e) => handleChangeAnswer(e, quesIndex, qaInx, t)}
              { ...(t === 'INLINE_CHECKBOX' ? { mode: 'multiple', defaultValue: qaItem.answer } : { defaultValue:qaItem.answer?.[0] }) }
              allowClear
            >
              {
                qaItem.options!.map(itemO => <Option key={itemO} value={itemO}>{itemO}</Option>)
              }
            </Select>
          )
        );
      case 'INLINE_DATE':
        return (
          isViewOnly ? <span>{moment(Number(qaItem.answer?.[0])).format('YYYY-MM-DD') }</span>
            : <DatePicker
                onChange={(e) => handleChangeAnswer(e, quesIndex, qaInx, t)}
                defaultValue={!isEmpty(qaItem.answer) ? moment(Number(qaItem.answer?.[0])) : undefined}
              />
        );
      default:
        return <span
          className={isViewOnly ? `${styles.edit_span} ${styles.no_border}` : styles.edit_span}
          contentEditable={!isViewOnly}
          suppressContentEditableWarning
          onBlur={(e) => handleChangeAnswer(e, quesIndex, qaInx, t)}
        >{qaItem.answer?.[0]}</span>;
    }
  };
  const renderQuestion = useMemo(() => (quesText: string) => {
    return searchHighLight(quesText, lightKeyWord);
  }, [lightKeyWord]);
  console.log('------最新questionsddtk', qasGroups);
  console.log('isViewOnly', isViewOnly);
  console.log('valuableQas ddtk', valuableQas);
  const editProps = {
    templateId,
    handleDelQuestion,
    handleSaveQuestion,
    isShowEdit,
    topicType: 'COMPLETION_SENIOR',
  };
  return (
    <div className="mt-15">
      <div className='qa-wrap'>
        {
          (isViewOnly ? valuableQas : qasGroups).map((qas, quesIndex: number) => (
            <div className="flex topic_title" style={{ alignItems: 'flex-start' }} key={qas[0].question + qas[0].uuid}>
              <span className='mr-5 pt-5'>{quesIndex + 1}.</span>
              <pre className={styles.ddtk_senior}  key={quesIndex}>
                {
                  qas.map((qaItem: IQaItem, qaInx: number) => {
                    return (
                      <span key={qaItem.question + qaItem.uuid} className="mb-10">
                        <span
                          className={`mt-5 ${styles.ques_span}`}
                          dangerouslySetInnerHTML={{ __html: renderQuestion(qaItem.question) }}
                        >
                        </span>
                        <span className={isViewOnly ? 'mx-8 px-3 border' : ''}>
                          {
                            (qaInx !== (qas.length - 1) || isViewOnly) && (
                              renderAnswerType(qaItem, quesIndex, qaInx)
                            )
                          }
                        </span>
                      </span>
                    );
                  })
                }
              </pre>
              <TopicAddBtn
                actionType="edit"
                initData={qas}
                editGroupInx={quesIndex}
                {...editProps}
              />
            </div>
          ))
        }
        <TopicAddBtn
          actionType="add"
          {...editProps}
        />
      </div>
    </div>
  );
}

export default DdtkSenior;
