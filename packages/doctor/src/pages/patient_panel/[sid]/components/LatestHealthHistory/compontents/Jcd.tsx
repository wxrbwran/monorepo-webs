import React, { FC, useEffect, useState } from 'react';
import { Timeline, Collapse, Tabs, Spin, Empty } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from '../index.scss';
import * as api from '@/services/api';
import { ITopicItemApi } from 'typings/imgStructured';
import Topic from './Topic';
import dayjs from 'dayjs';
const { Panel } = Collapse;

const { TabPane } = Tabs;
interface IProps {
  time: {
    startTime: Date;
    endTime: Date;
  };
  category: string; // JCD OTHER
}

interface IData {
  category: number; // 1检查单 2其他医学单据
  name: string; // 检查单： 部位+ 方法， 其他医学单据： 单据名称
  jcdList: ITopicItemApi[];
}
const Jcd: FC<IProps> = ({ time, category }) => {
  const [dataLoading, setDataLoading] = useState(true); // 列表的loading
  const [data, setData] = useState<IData[]>([]); // 部分+方法下面的单据列表
  const patientSid = window.$storage.getItem('patientSid');
  const fetchData = () => {
    const params = {
      from: time.startTime.setHours(0, 0, 0, 0),
      to: time.endTime.setHours(23, 59, 59, 59),
      sid: patientSid,
      title: category,
    };
    api.image.fetchImageMedicalJcdData(params).then(res => {
      console.log('fetchImageMedicalJcdData', res);
      setData(res.images);
      setDataLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, [time]);

  return (
    <div className={styles.jcd_wrap}>
      {
        dataLoading ? <Spin size="default" className="w-full" /> : (
          <Tabs size="large">
            {
              data.map(item => {
                return (
                  <TabPane tab={item.name} key={item.name} forceRender={true}>
                    <div className='mt-20'>
                      <Timeline>
                        {
                          item.jcdList.map(djItem => {
                            return (
                              <Timeline.Item key={djItem.meta.id}>
                                <div className='flex'>
                                  <div className='text-sm pt-5 mr-6'>
                                    {djItem.meta.isStructAt && '*'} {dayjs(djItem.meta.createdTime).format('YYYY/MM/DD')}
                                  </div>
                                  <div className='flex-1'>
                                    <Collapse
                                      defaultActiveKey={['1']}
                                      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                    >
                                      <Panel header={djItem.meta.jcdName} key="1">
                                        <Topic initData={djItem.data} />
                                      </Panel>
                                    </Collapse>
                                  </div>
                                </div>
                              </Timeline.Item>
                            );
                          })
                        }
                      </Timeline>
                    </div>
                  </TabPane>
                );
              })
            }
            {
              data.length === 0 && <div className='text-center w-full'><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
            }
          </Tabs>
        )
      }
    </div>
  );
};

export default Jcd;
