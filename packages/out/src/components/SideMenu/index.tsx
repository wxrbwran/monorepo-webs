import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import styles from './index.scss';

interface IProps {
  data: ISideMenuItem[];
  keyName: string;
  handleChangeTab: (keyName: string) => void;
  sideWidth?: number; // 默认菜单宽为200，可通过参数传递
}
const { TabPane } = Tabs;
function SideMenu(props: IProps) {
  const { data, keyName, handleChangeTab, sideWidth } = props;
  const [active, setActive] = useState(data?.[0]?.[keyName]);
  const handleTab = (id: string) => {
    setActive(id);
    handleChangeTab(id);
  };
  useEffect(() => {
    setActive(data?.[0]?.[keyName]);
  }, [data])
  return (
    <div style={{ width: sideWidth || 200 }}>
      <div className={`w-full h-full ${styles.side_menu}`}>
        <Tabs tabPosition="left" onTabClick={handleTab} activeKey={active}>
          {data.map((item) => (
            <TabPane tab={item.name} key={item[keyName]} />
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default SideMenu;
