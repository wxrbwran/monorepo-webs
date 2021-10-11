import React, { FC, useEffect, useRef, useState } from 'react';
import TopicBaseInfo from '../TopicBaseInfo';
import TopicChoice from '../TopicChoice';
import TopicProblem from '../TopicProblem';
import TopicDdtk from '../TopicDdtk';
import styles from './index.scss';
import { isEmpty, cloneDeep } from 'lodash';
import { ITmpList, ITopicQaItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import { formatTempDdtk, fetchInitData } from '../../utils';

interface IProps {
  outTypeAndInx: string;
  outType: string;
  hydCallbackFns: any; // 保存时候的回调
  setHydCallbackFns: (params: { [type: string]: () => void }) => void;
  imageId: string;
  initData: {
    data: ITopicQaItemApi[],
    meta: {
      id: string;
      createdTime: number;
    }
  };
  templatePart: ITmpList;
  tempAll: ITmpList;
  isViewOnly: boolean;
  // templateData: ITopicTemplateItemApi[];
}

const StructuredDetailTopic: FC<IProps> = (props) => {
  const { initData, outTypeAndInx, hydCallbackFns, setHydCallbackFns, isViewOnly,
    imageId, outType, tempAll, templatePart } = props;
  const initTmp: ITopicTemplateItemApi[][] = [[], [], [], []];
  // 编辑：后增加的模板问题
  const [templateTopic, setTempTopic] = useState<ITopicTemplateItemApi[][]>(initTmp);

  // 模板-s
  const formatTemplate = () => {
    // 如果初始数据为空，表示第一次打开，模板使用全部。否则模板使用上次添加后添加的模板
    const concatTemp = isEmpty(initData) ? (tempAll[outType] || []) : (templatePart?.[outType] || []);
    const topicArr: any[][] = initTmp;
    concatTemp.forEach(item => {
      // console.log('29329832', item);
      const qa = {
        question: item.question,
        answer: item.answer,
        question_type: item.question_type,
      };
      switch (item.question_type) {
        case 'BASE':
          topicArr[0].push(qa);
          break;
        case 'COMPLETION':
          topicArr[1].push({
            ...qa,
            group: item.group,
            uuid: item.uuid,
          });
          break;
        case 'RADIO':
        case 'CHECKBOX':
          topicArr[2].push({
            ...qa,
            options: item?.options || [],
          });
          break;
        case 'TEXT':
          topicArr[3].push(qa);
          break;
        default:
          break;
      }
    });
    console.log('topicArr', topicArr);
    setTempTopic(cloneDeep(topicArr));
  };
  // 模板-e
  const [initTopic, setinitTopic] = useState(initData ? fetchInitData(initData) : []);
  const topicCallbackFns = useRef({});
  useEffect(() => {
    setinitTopic(fetchInitData(initData));
    formatTemplate();
  }, [initData]);
  useEffect(() => {
    hydCallbackFns[outTypeAndInx] = (clickSaveTime: number) => new Promise((resolve) => {
      Promise.all(Object.values(topicCallbackFns.current)
        .map((fn) => fn())).then((topicList) => {
        resolve({
          // data: topicList.flat(1), // 数组扁平化
          data: topicList,
          meta: {
            imageId,
            sid: window.$storage.getItem('patientSid'),
            createdTime: clickSaveTime,
            title: outType,
            id: initData?.meta?.id || null,
          },
        });
      });
    });
    setHydCallbackFns(hydCallbackFns);
    return () => {
      // 删除掉此tab要delete掉此项
      delete hydCallbackFns[outTypeAndInx];
      setHydCallbackFns(hydCallbackFns);
    };
  }, []);
  const changeTopicCallbackFns = ({ type, fn }: ICallbackFn ) => {
    const fns: CommonData = topicCallbackFns.current;
    fns[type] = fn;
    topicCallbackFns.current = { ...fns };
  };

  const subProps = { changeCallbackFns: changeTopicCallbackFns, isViewOnly };
  const dataAndTemp = (inx: number) => {
    if (inx === 1) {
      const ddtk = formatTempDdtk(templateTopic?.[1]);
      console.log('处理后的模板数据格式', ddtk);
      return (initTopic?.[inx] || []).concat(ddtk);
    }
    return (initTopic?.[inx] || []).concat((templateTopic?.[inx] || []));
  };
  return (
    <div className={`${styles.topic_list}`}>
      <TopicBaseInfo outType={outType} initData={[...initTopic?.[0] || []]} {...subProps} />
      <TopicDdtk initData={dataAndTemp(1)} {...subProps} />
      <TopicChoice initData={dataAndTemp(2)} {...subProps} />
      <TopicProblem initData={dataAndTemp(3)} {...subProps} />
    </div>
  );
};

export default StructuredDetailTopic;
