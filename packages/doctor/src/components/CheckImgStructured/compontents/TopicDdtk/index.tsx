import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { isEmpty, cloneDeep } from 'lodash';
import { IQaItem, IMeta } from '../type';
import TopicAddBtn from '../TopicAddBtn';
import { formatTempDdtk } from '../utils';

interface IProps {
  changeCallbackFns: (params: ICallbackFn) => void;
  initData: IQaItem[];
  isViewOnly: boolean;
  templateId: string; // 检查单模板id（单据id)
  meta: IMeta;
  isShowEdit: boolean; // 是否首次结构化
}
function Ddtk(props: IProps) {
  console.log('ddtkprops', props);
  const { changeCallbackFns, initData, isViewOnly, templateId, isShowEdit } = props;
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
    if (initData && isEmpty(qasGroups)) {
      const qaGroups = formatTempDdtk(initData);
      setQasGroups(cloneDeep(qaGroups));
      if (isViewOnly) {
        // 过滤出有填写答案的问题组
        const hasValWt = qaGroups.filter(qas => qas.find(qa => !isEmpty(qa.answer)));
        // 问题组中，多个问答，过滤掉没答案的item
        const qas: IQaItem[][] = [];
        hasValWt.map(item =>{
          qas.push(item.filter((qa, inx) => !isEmpty(qa.answer) || inx === 0));
        });
        setValuableQas(cloneDeep(qas));
      }
    }
  }, [initData]);
  useEffect(() => {
    if (changeCallbackFns) {
      changeCallbackFns({
        type: 'COMPLETION',
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

  const handleChangeAnswer = (e: any, groupInx: number, qaInx: number) => {
    console.log('val111', e);
    qasGroups[groupInx][qaInx].answer = [e.target.innerText as string];
  };
  console.log('------最新questionsddtk', qasGroups);
  console.log('isViewOnly', isViewOnly);
  console.log('valuableQas ddtk', valuableQas);
  const editProps = {
    templateId,
    handleDelQuestion,
    handleSaveQuestion,
    isShowEdit,
    topicType: 'COMPLETION',
  };
  return (
    <div className="mt-15">
      <div className='qa-wrap'>
        {
          (isViewOnly ? valuableQas : qasGroups).map((qas, quesIndex: number) => (
            <div className={`${styles.ddtk} ${styles.done}` }  key={quesIndex}>
              {
                qas.map((qaItem: IQaItem, qaInx: number) => {
                  return qaInx === 0 ? (
                      <div key={qaItem?.question} className="topic_title">
                        <span>{quesIndex + 1}.</span>
                        {qaItem?.question || '填空题'}
                        <TopicAddBtn
                          actionType="edit"
                          initData={qas}
                          editGroupInx={quesIndex}
                          {...editProps}
                        />
                      </div>
                  ) : (
                    <div key={qaItem.question} className="ml-20 mb-10">
                      <span className={styles.order_number}>{qaInx}</span>
                      <span className={`mt-5 ${styles.ques_span}`}>
                        {qaItem.question}
                      </span>
                      {
                        <span
                          className={isViewOnly ? `${styles.edit_span} ${styles.no_border}` : styles.edit_span}
                          contentEditable={!isViewOnly}
                          suppressContentEditableWarning
                          onBlur={(e) => handleChangeAnswer(e, quesIndex, qaInx)}
                        >{qaItem.answer?.[0]}</span>
                      }
                    </div>
                  );
                })
              }
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

export default Ddtk;
