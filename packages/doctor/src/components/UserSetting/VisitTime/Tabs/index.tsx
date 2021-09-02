import React, { useState } from 'react';
import styles from '../index.scss';

interface Iprops {
  handleChangeTab: (activeTab: string) => void;
}
function Tabs({ handleChangeTab }:Iprops) {
  const [activeType, setActiveType] = useState('visiting');
  const tab: CommonData = {
    imTime: '视频语音',
    visiting: '门诊时间',
    visitingWebsite: '网上门诊时间',
  };
  const changeTab = (key: string) => {
    if (key !== 'visitingWebsite') {
      setActiveType(key);
      handleChangeTab(key);
    }
  };
  return (
    <div className={styles.tab}>
      {Object.keys(tab).map((t) => (
        <div
          key={t}
          className={t === activeType ? styles.active : null}
          onClick={() => changeTab(t)}
        >
          {tab[t]}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
