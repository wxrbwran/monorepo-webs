import React, { useState } from 'react';
import { Tabs } from 'antd';
import UserInfo from './UserInfo';
// import MyScore from './MyScore';
import Charges from './Charges';
import FactionDoctor from './FactionDoctor';
// import FarDoctor from './FarDoctor';
// import VisitTime from './VisitTime';
import ResetPWD from './ResetPWD';
import styles from './index.scss';

const { TabPane } = Tabs;
interface Item {
  key: string;
  value: string;
  components: React.ReactElement;
}

interface Iprops {
  onClose: () => void;
  activeTabKey: string;
}
function UserSetting(props: Iprops) {
  const { onClose, activeTabKey } = props;
  const [activeTab, setActiveTab] = useState<string>(activeTabKey);
  const tabName: Array<Item> = [
    {
      key: 'info',
      value: '个人资料',
      components: <UserInfo onClose={onClose} />,
    },
    // {
    //   key: 'score',
    //   value: '我的积分',
    //   components: <MyScore />,
    // },
    {
      key: 'price',
      value: '收费标准',
      components: <Charges onClose={onClose} />,
    },
    {
      key: 'upperLower',
      value: '我的上下级医生',
      components: <FactionDoctor />,
    },
    // {
    //   key: 'farDoctor',
    //   value: '未来医生',
    //   components: <FarDoctor onClose={onClose} />,
    // }, {
    //   key: 'visitingTime',
    //   value: '出诊时间',
    //   components: <VisitTime />,
    // },
    {
      key: 'reset',
      value: '修改密码',
      components: <ResetPWD onClose={onClose} />,
    },
  ];
  const callback = (key: string) => {
    console.log(key);
    setActiveTab(key);
  };
  return (
    <div className={styles.user_setting}>
      <Tabs defaultActiveKey={activeTab} onChange={callback}>
        {tabName.map((item) => (
          <TabPane tab={item.value} key={item.key}>
            {item.components}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default UserSetting;
