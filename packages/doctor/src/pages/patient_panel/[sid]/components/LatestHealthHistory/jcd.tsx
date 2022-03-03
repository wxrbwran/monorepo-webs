import React, { FC, useState } from 'react';
import { Timeline, Collapse, Tabs, Spin } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from './index.scss';
const { Panel } = Collapse;

const { TabPane } = Tabs;
const Jcd: FC = () => {
  const [dataLoading, setDataLoading] = useState(false); // 列表的loading
  const handleChangeTab = (tab: string) => {
    // @ts-ignore
    // setActiveTab(tab);
    // setPageAt(1);
    // setData([]);
    // setDataLoading(true);
    // fetchHistory({ pageAt: 1 }, tab);
  };
  return (
    <div className={styles.jcd_wrap}>
      <Tabs onChange={handleChangeTab} size="large">
        <TabPane tab='头部CT' key="CT">
          {
            dataLoading
              ? <Spin size="default" className="w-full" /> : (
                <div className='mt-20'>
                  <Timeline>
                    <Timeline.Item>
                      <div className='flex'>
                        <div className='text-sm pt-5 mr-6'>2022/09/09</div>
                        <div className='flex-1'>
                          <Collapse
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          >
                            <Panel header="头部ct检查单" key="1">
                              <div>
                                <div>心脏测值：dfdfdd</div>
                              </div>
                            </Panel>
                          </Collapse>
                        </div>
                      </div>
                    </Timeline.Item>
                  </Timeline>
                </div>
              )
          }
        </TabPane>
        <TabPane tab='腹部B超' key="b超">
          {
            dataLoading
              ? <Spin size="default" className="w-full" /> : (
                <div className='mt-20'>
                  <Timeline>
                    <Timeline.Item>
                      <div className='flex'>
                        <div className='text-sm pt-5 mr-6'>2022/09/09</div>
                        <div className='flex-1'>
                          <Collapse
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          >
                            <Panel header="头部ct检查单" key="1">
                              <div>
                                <div>心脏测值：dfdfdd</div>
                              </div>
                            </Panel>
                          </Collapse>
                        </div>
                      </div>
                    </Timeline.Item>
                    <Timeline.Item>
                      <div className='flex'>
                        <div className='text-sm pt-5 mr-6'>2022/09/09</div>
                        <div className='flex-1'>
                          <Collapse
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                          >
                            <Panel header="头部ct检查单" key="1">
                              <div>
                                <div>心脏测值：dfdfdd</div>
                              </div>
                            </Panel>
                          </Collapse>
                        </div>
                      </div>
                    </Timeline.Item>
                  </Timeline>
                </div>
              )
          }
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Jcd;
