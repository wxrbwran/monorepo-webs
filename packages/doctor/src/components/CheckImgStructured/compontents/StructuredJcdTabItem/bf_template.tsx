import React, { FC, useEffect, useRef, useState } from 'react';
import TopicBaseInfo from '../TopicBaseInfo';
import TopicChoice from '../TopicChoice';
import TopicProblem from '../TopicProblem';
import TopicDdtk from '../TopicDdtk';
import styles from './index.scss';
import { isEmpty, cloneDeep } from 'lodash';
import { ITmpList, ITopicQaItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import { formatTempDdtk, fetchInitData } from '../utils';
import { IMeta } from 'packages/doctor/typings/imgStructured';

interface IProps {
  tabKey: string;
  outType: string;
  jcdCallbackFns: any; // 保存时候的回调
  setJcdCallbackFns: (params: { [type: string]: () => void }) => void;
  imageId: string;
  initData: {
    data: ITopicQaItemApi[],
    meta: IMeta;
  };
  tempAll: ITmpList;
  isViewOnly: boolean;
}

const StructuredDetailTopic: FC<IProps> = (props) => {
  console.log('gggprops', props);
  const { initData, tabKey, jcdCallbackFns, setJcdCallbackFns, isViewOnly,
    imageId, outType, tempAll } = props;
  const initTmp: ITopicTemplateItemApi[][] = [[], [], [], []];
  // 编辑：后增加的模板问题
  const [templateTopic, setTempTopic] = useState<ITopicTemplateItemApi[][]>(cloneDeep(initTmp));
  const [isLoad, setIsLoad] = useState(false);
  let initTempKey = undefined;
  if (outType === 'JCD') {
    // initTempKey = isEmpty(initData) ? undefined : initData.meta.method + initData.meta.part;
    initTempKey = isEmpty(initData) ? undefined : JSON.stringify({ method:initData.meta.method, part: initData.meta.part });
  } else {
    initTempKey = outType; // other
  }
  console.log('isEmpty(initData)', initData.meta);
  console.log('initTempKey', initTempKey);
  const [tempKey, setTempKey] = useState(initTempKey);
  const tempKeyRef = useRef(initTempKey);

  // 模板-s
  const formatTemplate = () => {
    // test-s
    console.log('tempAll[outType]', tempAll[tempKey]);
    console.log('tempAll', tempAll);
    console.log('tempKey', tempKey);
    console.log('initData', initData.data);
    let newTemps = [];
    if (isEmpty(initData)) {
      newTemps = tempAll[tempKey];
    } else {
      newTemps = tempAll[tempKey]?.filter(item => {
        // 如果原有问题列表不存在此模板问题，则需追加上
        return isEmpty(initData?.data.filter(originItem => originItem?.uuid === item.uuid));
      });
    }
    // test-e
    // 如果初始数据为空，表示第一次打开，模板使用全部。否则模板使用上次添加后添加的模板
    const concatTemp = newTemps || [];
    const topicArr: any[][] = cloneDeep(initTmp);
    concatTemp.forEach(item => {
      const newItem = item;
      delete newItem.sid;
      switch (item.question_type) {
        case 'BASE':
          topicArr[0].push(newItem);
          break;
        case 'COMPLETION':
          topicArr[1].push(newItem);
          break;
        case 'RADIO':
        case 'CHECKBOX':
          topicArr[2].push(newItem);
          break;
        case 'TEXT':
          topicArr[3].push(newItem);
          break;
        default:
          break;
      }
    });
    console.log('topicArr', topicArr);
    setTempTopic(cloneDeep(topicArr));
    setIsLoad(true);
  };
  // 模板-e
  const [initTopic, setinitTopic] = useState(initData ? fetchInitData(initData) : []);
  const topicCallbackFns = useRef({});
  useEffect(() => {
    setinitTopic(fetchInitData(initData));
  }, [initData]);

  // 监听到所属方法+部分，发生改变后，重新渲染问题列表
  useEffect(() => {
    if (!!tempKey) {
      formatTemplate();
    }
  }, [tempKey]);

  const changeJcdBaseInfo = (info: any) => {
    // 后面根据方法+部分动态加载对应问题的模板 使用
    const { method, part } = info;
    if (JSON.stringify({ method, part }) !== tempKey) {
      setIsLoad(false);
      if (method !== undefined && part !== undefined) {
        setTempKey(JSON.stringify({ method, part }));
        tempKeyRef.current = JSON.stringify({ method, part });
      } else {
        setTempKey(undefined);
        tempKeyRef.current = undefined;
      }
    }
  };
  useEffect(() => {
    jcdCallbackFns[tabKey] = (clickSaveTime: number) => new Promise((resolve) => {
      Promise.all(Object.values(topicCallbackFns.current)
        .map((fn) => fn())).then((topicList) => {
        let jcdProp: any = {};
        if (tempKeyRef.current !== 'OTHER') {
          const { method, part } = JSON.parse(tempKeyRef.current as string);
          jcdProp = {
            method,
            part,
          };
        }
        resolve({
          data: topicList,
          meta: {
            imageId,
            sid: window.$storage.getItem('patientSid'),
            createdTime: clickSaveTime,
            title: outType,
            id: initData?.meta?.id || null,
            ...jcdProp,
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

  const subProps = { changeCallbackFns: changeTopicCallbackFns, isViewOnly, tabKey, tempKey };
  const dataAndTemp = (inx: number) => {
    console.log('inxx', inx);
    let originInitTopic = [];
    // 如果有初始化数据 ，判断初始化数据的方法+部位 与当前用户输入的方法+部位是否一致，不一致的情况，清空之前的问题列表。
    if (outType === 'JCD' && !isEmpty(initData) && tempKey !== JSON.stringify({ method: initData.meta.method, part: initData.meta.part })) {
      originInitTopic = [];
    } else {
      originInitTopic = initTopic?.[inx];
    }
    if (inx === 1) {
      const ddtk = formatTempDdtk(templateTopic?.[1]);
      console.log('处理后的模板数据格式', ddtk);
      return originInitTopic.concat(ddtk);
    }
    return originInitTopic.concat((templateTopic?.[inx] || []));
  };
  return (
    <div className={`${styles.topic_list}`}>
      <TopicBaseInfo
        outType={outType}
        initData={[...initTopic?.[0] || []]}
        {...subProps}
        changeJcdBaseInfo={changeJcdBaseInfo} />
      {
        isLoad ? (
          <>
            <TopicDdtk initData={dataAndTemp(1)} {...subProps} />
            <TopicChoice initData={dataAndTemp(2)} {...subProps} />
            <TopicProblem initData={dataAndTemp(3)} {...subProps} />
          </>
        ) : <></>
      }
    </div>
  );
};

export default StructuredDetailTopic;
