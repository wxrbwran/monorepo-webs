import React, { FC, useEffect, useRef, useState } from 'react';
import TopicBaseInfo from '../TopicBaseInfo';
import TopicChoice from '../TopicChoice';
import TopicProblem from '../TopicProblem';
import TopicDdtk from '../TopicDdtk';
import TopicDdtkSenior from '../TopicDdtkSenior';
import styles from './index.scss';
// import { fetchInitData } from '../utils';
import { IJcdTabItem, IQaItem } from '../type';
import { cloneDeep } from 'lodash';
import * as api from '@/services/api';
import { SearchOutlined } from '@ant-design/icons';
import { Spin, Input } from 'antd';
import { IImg } from 'typings/imgStructured';

interface IProps {
  jcdCallbackFns: any; // 保存时候的回调
  setJcdCallbackFns: (params: { [type: string]: () => void }) => void;
  // imageId: string;
  images: IImg[];
  groupId: string;
  initData: IJcdTabItem;
  isViewOnly: boolean;
  outType: string; //JCT  OTHER
  refreshTabInx: number | null;
  tabInx: number;
}

const StructuredJcdTabItem: FC<IProps> = (props) => {
  console.log('gggprops', props);
  const { initData, jcdCallbackFns, setJcdCallbackFns, isViewOnly, outType, refreshTabInx, tabInx, groupId, images } = props;
  const { tabKey } = initData.meta;
  const [lightKeyWord, setlightKeyWord] = useState('');
  const [partMethod, setPartMethod] = useState({});
  const initEmptyData: { [key: string]: IQaItem[] } = { COMPLETION: [], CHOICE: [], TEXT: [], BASIC: [], COMPLETION_SENIOR: [] };
  const doctorSid =  window.$storage.getItem('sid');
  const fetchInitData = (data: IQaItem[]) => {
    let initD: { [key: string]: IQaItem[] } = cloneDeep(initEmptyData);
    data.forEach(item => {
      switch (item.question_type) {
        case 'TEXT':
        case 'BASIC':
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

    console.log('========initD', initD);
    return initD;
  };
  const [initTopic, setinitTopic] = useState(initData.data ? fetchInitData(initData.data) : cloneDeep(initEmptyData));
  const topicCallbackFns = useRef({});
  const fetchData = () => {
    api.image.fetchImageTopicTemplate({ id: initData.meta.id }).then((res: any) => {
      // 接口原来数据格式没变，返回list数组，目前只取第一个即可 11.18 琳巍
      setinitTopic(res?.list?.[0] ? fetchInitData(res?.list?.[0]?.data) : cloneDeep(initEmptyData));
      // res?.list?.[0]?.meta.method  part
      setPartMethod({
        method: res?.list?.[0]?.meta?.method,
        part: res?.list?.[0]?.meta?.part,
      });
    });
  };
  useEffect(() => {
    if (initData.data) {
      setinitTopic(fetchInitData(initData.data));
    } else {
      fetchData();
    }
  }, [initData]);
  useEffect(() => {
    if (refreshTabInx === tabInx) {
      fetchData();
    }
  }, [refreshTabInx]);
  useEffect(() => {
    jcdCallbackFns[tabKey] = (clickSaveTime: number) => new Promise((resolve) => {
      Promise.all(Object.values(topicCallbackFns.current)
        .map((fn) => fn())).then((topicList) => {
        console.log('=======883883', topicList);
        const meta = initData.meta;
        if (meta.id) {
          delete meta.id; // 结构化时不要回传id
        }
        const imgInfo = groupId ? { imgGroupId: groupId } : { imageId: images?.[0]?.imageId };
        resolve({
          data: topicList,
          meta: {
            // imageId,
            title: outType,
            ...meta,
            ...imgInfo,
            ...partMethod,
            sid: window.$storage.getItem('patientSid'),
            creatorSid: initData.meta.creatorSid, // 模板创建者的sid
            createdTime: clickSaveTime, // 添加或者编辑，此值都使用点击保存时的时间
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
  }, [partMethod]);
  const changeTopicCallbackFns = ({ type, fn }: ICallbackFn ) => {
    const fns: CommonData = topicCallbackFns.current;
    fns[type] = fn;
    topicCallbackFns.current = { ...fns };
  };
  const subProps = {
    changeCallbackFns: changeTopicCallbackFns,
    isViewOnly,
    lightKeyWord,
    templateId: initData.meta.id,
    meta: initData.meta,
    // 是否显示编辑按钮  1.如果有没有initData.data（首次编辑）并且模板创建人是自己
    isShowEdit: !initData.data && initData.meta.sid === doctorSid,
  };
  console.log('initTopic', initTopic);
  return (
    <div className={`${styles.topic_list}`}>
      {
        !isViewOnly && (
          <div className='mb-20' style={{ width: !initData.data && initData.meta.creatorSid !== doctorSid ? 'calc(100% - 160px)' : '100%'  }}>
            <Input.Search
              placeholder="请输入关键字"
              allowClear
              enterButton="搜索"
              className='search_keyword'
              prefix={<SearchOutlined className='text-gray-600' />}
              onSearch={(val) => setlightKeyWord(val)}
            />
          </div>
        )
      }
      {
        refreshTabInx !== tabInx ? (
          <>
            <TopicBaseInfo
              outType={outType}
              initData={initTopic.BASIC}
              {...subProps}
            />
            <TopicDdtk initData={initTopic.COMPLETION} {...subProps} />
            <TopicChoice initData={initTopic.CHOICE} {...subProps} />
            <TopicProblem initData={initTopic.TEXT} {...subProps} />
            <TopicDdtkSenior initData={initTopic.COMPLETION_SENIOR} {...subProps} />
          </>
        ) : (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        )
      }

    </div>
  );
};

export default StructuredJcdTabItem;
