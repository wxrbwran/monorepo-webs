import React, { useState } from 'react';
// import { Tabs, Badge } from 'antd';
import { Tabs } from 'antd';
import { history } from 'umi';
import config from '@/config';
import styles from './index.scss';

const { TabPane } = Tabs;

function MenuTab() {
  //  如果用户仅仅是专家会诊池的医生，那么只显示预约患者tab，且左侧只显示我是会诊医生
  const onlyConsultations = window.$storage.getItem('onlyConsultations');
  const [activeTab, setActiveTab] = useState(onlyConsultations ? 'ORDER' : 'SIGNING');
  const handleBadge = () => {
    // 切换tab更新小红点,把数据保存到redux中，导航和侧边栏都需要使用
  };
  const handleToggleTab = (key: string) => {
    setActiveTab(key);
    if (key === 'SIGNING') {
      handleBadge();
      history.push('/doctor/patients/alone_doctor');
    } else if (key === 'ORDER') {
      handleBadge();
      // history.push('/doctor/reservation/im');
    } else if (key === 'SuiFang') {
      history.push('/suifang/patients');
    }
  };
  const handleGoCro = async () => {

    (document.getElementById('go_cro') as HTMLElement).click();
    // if (!firstProfessionCompany) {
    //   notification.warning({
    //     message: '提醒',
    //     duration: 6,
    //     description:
    //       '请在【设置 → 个人资料】中填写第一执业医院',
    //   });
    // } else {
    //   api.user.patchCheckInfo().then(() => {
    //     (document.getElementById('go_cro') as HTMLElement).click();
    //   }).catch((err) => {
    //     message.error(err?.result);
    //   });
    // }
  };
  return (
    <div className={styles.center}>
      {/* {
        !onlyConsultations && activeTab !== 'SIGNING' && (
          <Badge
            className={styles.badge}
            count={10 || 0}
            overflowCount={999}
            style={{ left: 110 }}
          />
        )
      } */}
      {/* {
        activeTab !== 'ORDER' && (
          <Badge
            className={styles.badge}
            count={1000 || 0}
            overflowCount={999}
            style={{ left: 220 }}
          />
        )
      } */}
      <Tabs defaultActiveKey={activeTab} onChange={handleToggleTab}>
        {
          !onlyConsultations && <TabPane tab="慢病管理" key="SIGNING" />
        }
        {/* <TabPane tab="预约患者" key="ORDER" /> */}
        {/* <TabPane tab="患者随访" key="SuiFang" /> */}
      </Tabs>
      <a href={config.CLINICAL_CRO} id="go_cro" target="_blank" rel="noopener noreferrer"> </a>
      <div className={styles.clinical} onClick={handleGoCro}>智能科研平台</div>
      {/* <a
        href={config.INDEX_LIBRARY}
        className={styles.clinical}
        target="_blank"
        rel="noopener noreferrer"
      >
        指标库
      </a> */}
    </div>
  );
}

export default MenuTab;
