import React, { FC, useState, useMemo } from 'react';
import { AutoComplete, Select, Button, Tabs, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import StructuredDetailTopic from '../StructuredDetailTopic';
const { Option } = Select;
const { TabPane } = Tabs;

interface IProps {
  imageId: string;
  outType: string;
  // initData: {
  //   documentList: IApiDocumentItem[];
  //   orgId: string;
  //   orgName: string;
  //   outType: string;
  //   unknownReport?: boolean;
  //   measuredAt?: number;
  // };
  initData: any;
  jcdCallbackFns: any; // 保存时候的回调
  setJcdCallbackFns: (params: { [type: string]: () => void }) => void; // 设置callback function
  isViewOnly: boolean;
}
const StructuredDetailJcdPanel: FC<IProps> = (props) => {
  const { imageId, outType, isViewOnly, setJcdCallbackFns } = props;
  const [parts, setParts] = useState([]);
  const [methods, setMethods] = useState([]);
  const [jcdList, setJcdList] = useState([]);
  const [activeType, setActiveType] = useState([]);
  const topicPanelCallbackFns = useRef({});
  console.log(outType, setParts, setMethods, setJcdList, setActiveType);
  const handleSearch = (val: string, type: string) => {
    console.log(val, type);
  };
  const handleChangeName = (e) => {
    console.log(34343, e);
  };
  const handleJcdName = (e) => {
    console.log('erewrq', e);
  };
  const handleActiveTab = (e) => {
    console.log(e);
  };
  const handleRemoveType = (targetItem: IjcdListItem | ISearchDocumentItem) => {
    console.log(targetItem);
    // const targetKey = targetItem.documentId + targetItem.sampleFrom;
    // const newjcdList = jcdList.filter((item: IjcdListItem | ISearchDocumentItem) => (
    //   item.documentId + item.sampleFrom) !== targetKey);
    // setjcdList(newjcdList);
    // if (activeType1.current === targetKey && newjcdList.length > 0) {
    //   activeType1.current = newjcdList[0].documentId + newjcdList[0].sampleFrom;
    //   setActiveType(newjcdList[0].documentId + newjcdList[0].sampleFrom);
    //   console.log('===-3');
    // }
  };
  const fetInitData = (inx: any) => {
    console.log('inxx', inx);
    return [];
  };
  const renderTabPane = useMemo(() => () => jcdList.map(
    (item: any) => (
      <TabPane
        tab={`${item.documentName}`}
        key={`${item.documentId}${item.sampleFrom}`}
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
        <StructuredDetailTopic
          initData={fetInitData(item)}
          hydCallbackFns={topicPanelCallbackFns}
          setHydCallbackFns={setJcdCallbackFns}
          tempAll={tempAll}
          outType={typeStart}
          tabKey={itemTabType}
          imageId={imageId}
          isViewOnly={isViewOnly}
        />
      </TabPane>
    ),
  ), [jcdList, isViewOnly, initData]);
  return (
    <div>
      <div className="flex">
        <div className="flex">
          <span>检查部位：</span>
          <AutoComplete
            options={parts}
            onSearch={(val) => handleSearch(val, 'part')}
            onBlur={handleChangeName}
            placeholder="请输入检查部位"
          />
        </div>
        <div className="flex">
          <span>检查方法</span>
          <AutoComplete
            options={methods}
            onSearch={(val) => handleSearch(val, 'method')}
            onBlur={handleChangeName}
            placeholder="请输入检查方法"
          />
        </div>
      </div>
      <div>
        <span>检查名称</span>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleJcdName}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Button>添加</Button>
      </div>
      {
        jcdList.length > 0 && (
          <Tabs
            activeKey={activeType}
            onChange={(tab: string) => handleActiveTab(tab)}
            type="editable-card"
            hideAdd
          >
            {renderTabPane()}
          </Tabs>
        )
      }
    </div>
  );
};

export default StructuredDetailJcdPanel;
