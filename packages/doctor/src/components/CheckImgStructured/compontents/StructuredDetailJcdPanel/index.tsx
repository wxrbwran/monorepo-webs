import React, { FC, useState, useMemo } from 'react';
import { Tabs, Popconfirm } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import iconGf from '@/assets/img/icon_official.png';
import StructuredJcdTabItem from '../StructuredJcdTabItem';
import SearchJcd from '../SearchJcd';
import CreateJcd from '../CreateJcd';
import { IAddJcdItem, IJcdTabItem } from '../type';
// import * as api from '@/services/api';
import uuid from 'react-uuid';
import { isEmpty } from 'lodash';
import styles from './index.scss';

interface IProps {
  imageId: string;
  outType: string;
  initData: any;
  jcdCallbackFns: any; // 保存时候的回调
  setJcdCallbackFns: (params: { [type: string]: () => void }) => void; // 设置callback function
  isViewOnly: boolean;
}
const { TabPane } = Tabs;
const StructuredDetailJcdPanel: FC<IProps> = (props) => {
  const { imageId, outType, isViewOnly, setJcdCallbackFns, initData, jcdCallbackFns } = props;
  // const topicPanelCallbackFns = useRef({});
  // const addJcdNum = useRef();
  const [jcdList, setJcdList] = useState<IJcdTabItem[]>([ { meta: { tabKey: 'iidi', jcdName: 'test' } }]); // 检查单tab list
  const [activeTabKey, setActiveTabKey] = useState<string>(); // 检查单tab 当前选中项
  const [showAddJctBtn, setShowAddJctBtn] = useState(false); // 显示添加检查单按钮
  const [partMethod, setPartMethod] = useState<{ part?: string; method?: string }>(); // 部位+方法，添加检查单时使用
  const [createJcdNum, setCreateJcdNum] = useState(0); // 添加新检查单累加器，searchJcd监听此参数，若变化，更新搜索列表

  console.log( setJcdList, setActiveTabKey);
  const handleRemoveType = (targetItem: IJcdTabItem) => {
    const newJcdList = jcdList.filter(item => item.meta.tabKey !== targetItem.meta.tabKey);
    if (targetItem.meta.tabKey === activeTabKey && !isEmpty(newJcdList)) {
      setActiveTabKey(newJcdList[0].meta.tabKey);
    }
    setJcdList(newJcdList);
  };
  const handleAddJcdTab = (newTabData: IAddJcdItem) => {
    console.log('newTabData', newTabData);
    const tabKey = uuid();
    setJcdList([ ...jcdList, { meta: { ...newTabData, tabKey } }]);
    setActiveTabKey(tabKey);
  };
  // 即时更新用户输入的部位+方法 添加检查单时使用
  const changePartMethod = (data: { part: string; method: string }) => {
    setPartMethod(data);
  };
  const updateCreateJcdNum = () => {
    setCreateJcdNum(prev => prev + 1);
  };
  const renderTabPane = useMemo(() => () => jcdList.map(
    (item: IJcdTabItem) => (
      <TabPane
        tab={<span>
              <SyncOutlined />
              <span onDoubleClick={() => {}}>
                {item.meta.source === 'SYSTEM' &&  <img className="w-16 h-16" src={iconGf} /> }
                {item.meta.jcdName}
              </span>
            </span> }
        key={`${item.meta.tabKey}`}
        forceRender
        closeIcon={
          <Popconfirm
            title=" 关闭后，标签内全部指标数据将清空，请确认?"
            onConfirm={() => handleRemoveType(item)}
            okText="确认"
            cancelText="取消"
          >
            <CloseOutlined />
          </Popconfirm>
        }
      >
        <StructuredJcdTabItem
          initData={item}
          imageId={imageId}
          outType={outType}
          isViewOnly={isViewOnly}
          jcdCallbackFns={jcdCallbackFns}
          setJcdCallbackFns={setJcdCallbackFns}
        />
      </TabPane>
    ),
  ), [jcdList, isViewOnly, initData]);

  return (
    <div>
      <SearchJcd
        changePartMethod={changePartMethod}
        handleAddJcdTab={handleAddJcdTab}
        handleShowAddJctBtn={(isShow: boolean) => setShowAddJctBtn(isShow)}
        createJcdNum={createJcdNum}
      />
      <div className={styles.tab_wrap}>
        {
          jcdList.length > 0 && (
            <Tabs
              activeKey={activeTabKey}
              onChange={(tab: string) => setActiveTabKey(tab)}
              type="editable-card"
              hideAdd
            >
              {renderTabPane()}
            </Tabs>
          )
        }
        {
          (showAddJctBtn || !isEmpty(jcdList)) && (
            <CreateJcd
              actionType="add"
              partMethod={partMethod}
              handleAddJcdTab={handleAddJcdTab}
              updateCreateJcdNum={updateCreateJcdNum}
            >
              <div className={styles.add_jct_btn}>+添加检查单</div>
            </CreateJcd>
          )
        }
        {
          showAddJctBtn && isEmpty(jcdList) && (
            <div className={styles.empty_wrap}>
              暂无检查单，请添加
            </div>
          )
        }
      </div>
    </div>
  );
};

export default StructuredDetailJcdPanel;
