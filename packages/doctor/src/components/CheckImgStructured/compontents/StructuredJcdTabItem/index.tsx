import React, { FC, useEffect, useRef, useState } from 'react';
import TopicBaseInfo from '../TopicBaseInfo';
import TopicChoice from '../TopicChoice';
import TopicProblem from '../TopicProblem';
import TopicDdtk from '../TopicDdtk';
import styles from './index.scss';
import { fetchInitData } from '../utils';
import { IJcdTabItem } from '../type';
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
  console.log('isEmpty(initData)', initData.meta);
  const [initTopic, setinitTopic] = useState(initData.data ? fetchInitData(initData) : []);
  const topicCallbackFns = useRef({});
  useEffect(() => {
    if (initData.data) {
      setinitTopic(fetchInitData(initData));
    } else {
      api.image.fetchImageTopicTemplate({ id: initData.meta.id }).then((res: any) => {
        console.log('=======12', res);
        // 接口原来数据格式没变，返回list数组，目前只取第一个即可 11.18 琳
        console.log('fetchInitData(res?.list?.[0])', fetchInitData(res?.list?.[0]));
        setinitTopic(res?.list?.[0] ? fetchInitData(res?.list?.[0]) : []);
      });
    }
  }, [initData]);

  useEffect(() => {
    jcdCallbackFns[tabKey] = (clickSaveTime: number) => new Promise((resolve) => {
      Promise.all(Object.values(topicCallbackFns.current)
        .map((fn) => fn())).then((topicList) => {
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

  const subProps = { changeCallbackFns: changeTopicCallbackFns, isViewOnly, templateId: initData.meta.id };
  const dataAndTemp = (inx: number) => {
    console.log('inxx', inx);
    let originInitTopic = initTopic?.[inx];
    return originInitTopic;
  };
  return (
    <div className={`${styles.topic_list}`}>
      <TopicBaseInfo
        outType={outType}
        initData={[...initTopic?.[0] || []]}
        {...subProps}
      />
      <TopicDdtk initData={dataAndTemp(1)} {...subProps} />
      <TopicChoice initData={dataAndTemp(2)} {...subProps} />
      <TopicProblem initData={dataAndTemp(3)} {...subProps} />
    </div>
  );
};

export default StructuredJcdTabItem;
