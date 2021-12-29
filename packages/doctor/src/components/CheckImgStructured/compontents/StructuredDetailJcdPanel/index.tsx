import React, { FC, useState, useMemo, useRef, useEffect } from 'react';
import { Tabs, Popconfirm, Button } from 'antd';
import { CloseOutlined, SyncOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';
import { isEmpty, cloneDeep } from 'lodash';
import StructuredJcdTabItem from '../StructuredJcdTabItem';
import SearchJcd from '../SearchJcd';
import CreateJcd from '../CreateJcd';
import { IAddJcdItem, IJcdTabItem } from '../type';
// import * as api from '@/services/api';
import { getSource } from '../utils';
import iconCopy from '@/assets/img/icon_copy_dj.png';
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
  const [jcdList, setJcdList] = useState<IJcdTabItem[]>(initData || []); // 检查单tab list
  const [activeTabKey, setActiveTabKey] = useState<string>(); // 检查单tab 当前选中项
  const [showAddJctBtn, setShowAddJctBtn] = useState(false); // 显示添加检查单按钮
  const [partMethod, setPartMethod] = useState<{ part?: string; method?: string }>(); // 部位+方法，添加检查单时使用
  const [createJcdNum, setCreateJcdNum] = useState(0); // 添加新检查单累加器，searchJcd监听此参数，若变化，更新搜索列表
  const [refreshTabInx, setRefreshTsbInx] = useState<null | number>(null);
  const timer = useRef<any>(null);
  console.log( setJcdList, setActiveTabKey);
  const doctorSid =  window.$storage.getItem('sid');
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
  const handleEditJcdNameSuccess = (jcdInfo: { id: string; jcdName: string; }) => {
    console.log('jcdInfo', jcdInfo);
    jcdList.forEach(item => {
      if (item.meta.id === jcdInfo.id) {
        item.meta.jcdName = jcdInfo.jcdName;
      }
    });
    setJcdList(cloneDeep(jcdList));
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const handleRefresh = (inx: number) => {
    setRefreshTsbInx(inx);
    timer.current = setTimeout(() => {
      setRefreshTsbInx(null);
    }, 1000);
  };
  // 删除页签的回调
  const handelTabsEdit = (deleteTabKey: string) => {
    const newTabs = jcdList.filter(item => item.meta.tabKey !== deleteTabKey);
    if (deleteTabKey === activeTabKey && !(isEmpty(newTabs))) {
      setActiveTabKey(newTabs?.[newTabs?.length - 1].meta.tabKey);
    }
    // setActiveTabKey(cloneDeep(newTabs));
  };
  const renderTabPane = useMemo(() => () => jcdList.map(
    (item: IJcdTabItem, inx: number) => (
      <TabPane
        tab={<span>
          {
            !item.data && <span className="mr-5" onDoubleClick={() => handleRefresh(inx)}><SyncOutlined /></span>
          }
          {
            item.meta.creatorSid === doctorSid ? (
              <CreateJcd
                actionType="edit"
                initData ={{ part:item.meta.part, method: item.meta.method, jcdName: item.meta.jcdName }}
                templateId={item.meta.id}
                onSuccess={handleEditJcdNameSuccess}
                updateCreateJcdNum={updateCreateJcdNum}
                outType={outType}
              >
                <span>
                  <span className="relative -top-1" dangerouslySetInnerHTML={{ __html: getSource(item.meta.source, item.meta.creatorSid) }}></span>
                  {item.meta.jcdName}
                </span>
              </CreateJcd>
            ) : (
              <span className="relative -top-2">
                <span dangerouslySetInnerHTML={{ __html: getSource(item.meta.source, item.meta.creatorSid) }}></span>
                {item.meta.jcdName}
              </span>
            )
          }

        </span> }
        key={`${item.meta.tabKey}`}
        forceRender
        closeIcon={
          <Popconfirm
            title="关闭后，标签内全部指标数据将清空，请确认?"
            onConfirm={() => handleRemoveType(item)}
            okText="确认"
            cancelText="取消"
          >
            <CloseOutlined />
          </Popconfirm>
        }
      >
        <div className={styles.jcd_panel_item}>
         {!item.data && item.meta.creatorSid !== doctorSid && <div className={styles.copy_temp}>
          <CreateJcd
            actionType="copy"
            initData ={{ part:item.meta.part, method: item.meta.method, jcdName: item.meta.jcdName }}
            templateId={item.meta.id}
            onSuccess={handleAddJcdTab}
            updateCreateJcdNum={updateCreateJcdNum}
            outType={outType}
          >
            <Button
              className="flex items-center text-sm mb-15"
              icon={<img src={iconCopy} className="w-16 mr-2" />}
            >
              复制并修改单据
            </Button>
          </CreateJcd>
          </div>}
          <StructuredJcdTabItem
            initData={item}
            imageId={imageId}
            outType={outType}
            isViewOnly={isViewOnly}
            jcdCallbackFns={jcdCallbackFns}
            setJcdCallbackFns={setJcdCallbackFns}
            refreshTabInx={refreshTabInx}
            tabInx={inx}
          />
        </div>
      </TabPane>
    ),
  ), [jcdList, isViewOnly, initData, refreshTabInx]);
  console.log('****initDatainitData', initData);

  console.log('*******jcdList', jcdList);
  return (
    <div>
      {
        !isViewOnly && (
          <SearchJcd
            outType={outType}
            changePartMethod={changePartMethod}
            handleAddJcdTab={handleAddJcdTab}
            handleShowAddJctBtn={(isShow: boolean) => setShowAddJctBtn(isShow)}
            createJcdNum={createJcdNum}
          />
        )
      }
      <div className={styles.tab_wrap}>
        {
          jcdList.length > 0 && (
            <Tabs
              onEdit={handelTabsEdit}
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
          (showAddJctBtn || !isEmpty(jcdList)) && !isViewOnly && (
            <CreateJcd
              actionType="add"
              initData={partMethod}
              onSuccess={handleAddJcdTab}
              updateCreateJcdNum={updateCreateJcdNum}
              outType={outType}
            >
              <div className={styles.add_jct_btn}>{`+添加${outType === 'JCD' ? '检查单' : '其他单据'}`}</div>
            </CreateJcd>
          )
        }
        {
          isEmpty(jcdList) && (
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
