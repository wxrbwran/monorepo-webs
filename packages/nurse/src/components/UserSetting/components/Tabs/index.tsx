import React, { useState, useEffect } from 'react';
import { Popover } from 'antd';
import styles from './index.scss';

interface IProps {
  orgList: {
    organizationName: string,
    organizationId: string,
  }[],
  handleChangeTab: (orgId: string) => void;
}
function Tabs({ orgList, handleChangeTab }: IProps) {
  const [activeTab, setActiveTab] = useState('11');
  useEffect(() => {
    setActiveTab(orgList[0]?.organizationId);
  }, []);
  const handleToggleTab = (orgId: string) => {
    setActiveTab(orgId);
    handleChangeTab(orgId);
  };

  return (
    <ul className={styles.tabs}>
      {
        orgList.map((item) => (
          <li
            className={activeTab === item.organizationId ? styles.active : null}
            key={item.organizationId}
          >
            <Popover content={item.organizationName}>
              <div onClick={() => handleToggleTab(item.organizationId)}>
                {item.organizationName}
              </div>
            </Popover>
          </li>
        ))
      }
    </ul>
  );
}

export default Tabs;
