import React, { useState } from 'react';
import { Tabs } from 'antd';
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
      key: 'reset',
      value: '修改密码',
      components: <ResetPWD onClose={onClose} />,
    },
  ];
  const callback = (key:string) => {
    console.log(key);
    setActiveTab(key);
  };
  return (
    <div className={styles.user_setting}>
      <Tabs defaultActiveKey={activeTab} onChange={callback}>
        {
          tabName.map((item) => (
            <TabPane tab={item.value} key={item.key}>
              {item.components}
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  );
}

export default UserSetting;
