import React, { FC, useEffect, useState } from 'react';
import { ITopicQaItemApi } from 'typings/imgStructured';
import { cloneDeep, isEmpty } from 'lodash';
import { IQaItem } from '@/components/CheckImgStructured/compontents/type';
import { formatTempDdtk } from '@/components/CheckImgStructured/compontents/utils';
import dayjs from 'dayjs';

interface IProps {
  initData: IQaItem[];
}
interface IInitTopic {
  COMPLETION: IQaItem[][];
  CHOICE: IQaItem[];
  COMPLETION_SENIOR:  IQaItem[][];
  TEXT:  IQaItem[];
}
const Topic: FC<IProps> = ({ initData }) => {
  const initEmptyData: { [key: string]: IQaItem[] } = { COMPLETION: [], CHOICE: [], TEXT: [], COMPLETION_SENIOR: [] };
  const fetchInitData = (data: IQaItem[]) => {
    let initD: { [key: string]: IQaItem[] } = cloneDeep(initEmptyData);
    data.forEach(item => {
      switch (item.question_type) {
        case 'TEXT':
        case 'COMPLETION':
          initD[item.question_type].push(item);
          break;
        case 'RADIO':
        case 'CHECKBOX':
          initD.CHOICE.push(item);
          break;
        case 'INLINE_COMPLETION':
        case 'INLINE_RADIO':
        case 'INLINE_CHECKBOX':
        case 'INLINE_DATE':
          initD.COMPLETION_SENIOR.push(item);
          break;
        default:
          break;
      }
    });
    const choiceList = initD.CHOICE.filter(i => !isEmpty(i.answer));
    const testList = initD.TEXT.filter(i => !isEmpty(i.answer));
    // 问题组中，多个问答，过滤掉没答案的item
    const ddtkSeniorList: IQaItem[][] = [];
    formatTempDdtk(initD.COMPLETION_SENIOR)
      .filter(qaList => qaList.find(qa => !isEmpty(qa.answer)))
      .map(item =>{
        ddtkSeniorList.push(item.filter((qa, inx) => !isEmpty(qa.answer) || inx === 0));
      });

    const completionList: IQaItem[][] = [];
    formatTempDdtk(initD.COMPLETION)
      .filter(qas => qas.find(qa => !isEmpty(qa.answer)))
      .map(item =>{
        completionList.push(item.filter((qa, inx) => !isEmpty(qa.answer) || inx === 0));
      });
    console.log('========initD', {
      COMPLETION: completionList,
      CHOICE: choiceList,
      TEXT: testList,
      COMPLETION_SENIOR: ddtkSeniorList,
    });


    return {
      COMPLETION: completionList,
      CHOICE: choiceList,
      TEXT: testList,
      COMPLETION_SENIOR: ddtkSeniorList,
    };
  };
  const [initTopic, setinitTopic] = useState<IInitTopic>(initData ? fetchInitData(initData) : cloneDeep(initEmptyData));
  useEffect(() => {
    setinitTopic(fetchInitData(initData));
  }, [initData]);
  console.log('initTopic99999', initTopic);
  return (
    <div className='text-sm'>
      {
        initTopic.COMPLETION.map((groups, i) => (
          groups.map((qaItem, qaInx) => {
            return qaInx === 0 ? (
              <div>{i + 1}. {qaItem.question}</div>
            ) : (
              <div>
                <span>{qaItem.question}: </span>
                <span>{qaItem.answer[0]}</span>
              </div>
            );
          })
        ))
      }
      {
       initTopic.CHOICE.map((iChoice, i) => (
        <div key={iChoice.question + i}>
          <div>{initTopic.COMPLETION.length + i + 1}. {iChoice.question}</div>
          <div>{iChoice.answer.join('、')}</div>
        </div>
       ))
      }
      {
        initTopic.TEXT.map((IText, i) => (
          <div key={IText.question + i}>
            <div>{initTopic.COMPLETION.length + initTopic.CHOICE.length + i + 1}.{IText.question}</div>
            <div>{IText.answer.join('、')}</div>
          </div>
        ))
      }
      {
        initTopic.COMPLETION_SENIOR.map((groups, i) => (
          <pre key={i} className='whitespace-pre-wrap'>
            {initTopic.COMPLETION.length + initTopic.CHOICE.length + initTopic.TEXT.length + i + 1}
            {
              groups.map((qaItem: IQaItem, qaInx: number) => {
                return (
                  <span key={qaItem.question + qaItem.uuid} className="mb-10">
                    <span> {qaItem.question} </span>
                    <span>
                      {
                        qaItem.question_type === 'INLINE_DATE' ? dayjs(Number(qaItem.answer[0])).format('YYYY-MM-DD') : qaItem.answer.join('、')
                      }
                    </span>
                  </span>
                );
              })
            }
          </pre>
        ))
      }
    </div>
  );
};

export default Topic;
