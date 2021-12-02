import React, { FC, useEffect, useRef, useState } from 'react';
import TopicBaseInfo from '../TopicBaseInfo';
import TopicChoice from '../TopicChoice';
import TopicProblem from '../TopicProblem';
import TopicDdtk from '../TopicDdtk';
import styles from './index.scss';
// import { fetchInitData } from '../utils';
import { IJcdTabItem, IQaItem } from '../type';
import { cloneDeep } from 'lodash';
import * as api from '@/services/api';

interface IProps {
  jcdCallbackFns: any; // 保存时候的回调
  setJcdCallbackFns: (params: { [type: string]: () => void }) => void;
  imageId: string;
  initData: IJcdTabItem;
  isViewOnly: boolean;
  outType: string; //JCT  OTHER
}

const StructuredJcdTabItem: FC<IProps> = (props) => {
  console.log('gggprops', props);
  const { initData, jcdCallbackFns, setJcdCallbackFns, isViewOnly, imageId, outType } = props;
  const { tabKey } = initData.meta;
  const initEmptyData: { [key: string]: IQaItem[] } = { COMPLETION: [], CHOICE: [], TEXT: [], BASE: [] };
  const fetchInitData = (data: IQaItem[]) => {
    let initD: { [key: string]: IQaItem[] } = cloneDeep(initEmptyData);
    data.forEach(item => {
      switch (item.question_type) {
        case 'TEXT':
        case 'BASE':
        case 'COMPLETION':
          initD[item.question_type].push(item);
          break;
        case 'RADIO':
        case 'CHECKBOX':
          initD.CHOICE.push(item);
          break;
        default:
          break;
      }
    });
    console.log('========initD', initD);
    return initD;
  };
  const [initTopic, setinitTopic] = useState(initData.data ? fetchInitData(initData.data) : cloneDeep(initEmptyData));
  const topicCallbackFns = useRef({});
  useEffect(() => {
    if (initData.data) {
      setinitTopic(fetchInitData(initData.data));
    } else {
      api.image.fetchImageTopicTemplate({ id: initData.meta.id }).then((res: any) => {
        // 接口原来数据格式没变，返回list数组，目前只取第一个即可 11.18 琳巍
        setinitTopic(res?.list?.[0] ? fetchInitData(res?.list?.[0]?.data) : cloneDeep(initEmptyData));
      });
    }
  }, [initData]);

  useEffect(() => {
    jcdCallbackFns[tabKey] = (clickSaveTime: number) => new Promise((resolve) => {
      Promise.all(Object.values(topicCallbackFns.current)
        .map((fn) => fn())).then((topicList) => {
        console.log('=======883883', topicList);
        resolve({
          data: topicList,
          meta: {
            imageId,
            sid: window.$storage.getItem('patientSid'),
            createdTime: clickSaveTime,
            title: outType,
            ...initData.meta,
          },
        });
      });
    });
    setJcdCallbackFns(jcdCallbackFns);
    return () => {
      // 删除掉此tab要delete掉此项
      delete jcdCallbackFns[tabKey];
      setJcdCallbackFns(jcdCallbackFns);
    };
  }, []);
  const changeTopicCallbackFns = ({ type, fn }: ICallbackFn ) => {
    const fns: CommonData = topicCallbackFns.current;
    fns[type] = fn;
    topicCallbackFns.current = { ...fns };
  };
  const subProps = {
    changeCallbackFns: changeTopicCallbackFns,
    isViewOnly,
    templateId: initData.meta.id,
    meta: initData.meta,
    isFirstEdit: !initData.data, // 是否是修改化验单
  };
  return (
    <div className={`${styles.topic_list}`}>
      <TopicBaseInfo
        outType={outType}
        initData={initTopic.BASE}
        {...subProps}
      />
      <TopicDdtk initData={initTopic.COMPLETION} {...subProps} />
      <TopicChoice initData={initTopic.CHOICE} {...subProps} />
      <TopicProblem initData={initTopic.TEXT} {...subProps} />
    </div>
  );
};

export default StructuredJcdTabItem;
