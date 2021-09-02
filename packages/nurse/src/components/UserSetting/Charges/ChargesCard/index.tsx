import React from 'react';
import { Popover } from 'antd';
import question from '@/assets/img/question.svg';
import { btnRender } from '@/utils/button';
import Tabs from '../../components/Tabs';
import styles from '../index.scss';

interface IProps {
  onClose: () => void;
  toggleEdit: () => void;
}
function ChargesCard({ onClose, toggleEdit }: IProps) {
  const orgList = [
    {
      organizationName: '心之力',
      organizationId: '11',
    },
    {
      organizationName: '家家乐互联网专科医院',
      organizationId: '121',
    },
    {
      organizationName: '尽不不不不',
      organizationId: '114',
    },
  ];
  const handleChangeTab = (orgId: string) => {
    console.log(orgId);
  };

  return (
    <div className={styles.charges}>
      <div className={styles.info_height}>
        <Tabs orgList={orgList} handleChangeTab={handleChangeTab} />
        <div className={styles.content}>
          <div className={styles.item}>
            <h4 className={styles.title}>个人收费标准</h4>
            <div className={styles.price_list}>
              <span className={[styles.price_box, styles.first_one].join(' ')}>
                独立管理病人
                <span>￥--</span>
                元/12个月
              </span>
              <span className={styles.price_box}>
                <span>￥--</span>
                元/6个月
              </span>
              <span className={styles.price_box}>
                <span>￥--</span>
                元/3个月
              </span>
              <span className={[styles.price_box, styles.first_one].join(' ')}>
                <span className={styles.price_lable}>
                  我做上级医生
                  <Popover content="我带助手管理">
                    <img src={question} alt="" />
                  </Popover>
                </span>
                <span>￥--</span>
                元/12个月
              </span>
              <span className={styles.price_box}>
                <span>￥--</span>
                元/6个月
              </span>
              <span className={styles.price_box}>
                <span>￥--</span>
                元/3个月
              </span>
              <span className={[styles.price_box, styles.first_one].join(' ')}>
                <span className={styles.price_lable}>
                  我做下级医生
                  <Popover content="我找上级医生一起管">
                    <img src={question} alt="" />
                  </Popover>
                </span>
                <span>￥--</span>
                元/12个月
              </span>
              <span className={styles.price_box}>
                <span>￥--</span>
                元/6个月
              </span>
              <span className={styles.price_box}>
                <span>￥--</span>
                元/3个月
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <h4 className={styles.title}>会诊收费</h4>
            <div className={styles.price_list}>
              <span className={[styles.price_box, styles.first_one].join(' ')}>
                单次会诊
                <span>￥--</span>
                元/12h回复
              </span>
              <span className={styles.price_box} style={{ width: 315 }}>
                <span>￥--</span>
                元/24h回复
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <h4 className={styles.title}>视频语音收费</h4>
            <div className={styles.price_list}>
              <span className={[styles.price_box, styles.first_one].join(' ')}>
                视频单价
                <span>￥--</span>
                元/10分钟一次
              </span>
              <span className={[styles.price_box, styles.first_one].join(' ')}>
                语音单价
                <span>￥--</span>
                元/10分钟一次
              </span>
            </div>
          </div>
        </div>
      </div>
      {btnRender({
        okText: '修改价格',
        onOk: toggleEdit,
        onCancel: onClose,
      })}
    </div>
  );
}

export default ChargesCard;
