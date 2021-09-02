import React, { useState } from 'react';
import { Popover, InputNumber } from 'antd';
import question from '@/assets/img/question.svg';
import { btnRender } from '@/utils/button';
import Tabs from '../../components/Tabs';
import styles from '../index.scss';

interface IProps {
  onClose: () => void;
  toggleEdit: () => void;
}
interface Iorg {
  organizationName: string;
  organizationId: string;
  price?: number;
}
const orgList: Iorg[] = [
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
function ChargesEdit({ onClose, toggleEdit }: IProps) {
  // INDEPENDENT_VIP独立管理  VIP_YEAR   VIP_HALF_YEAR   VIP_QUARTER
  // SUPERIOR_VIP上级医生
  // SUBORDINATE_VIP下级医生
  // DOCTOR_CONSULTATION单次会诊 CONSULTATION_24  CONSULTATION_12
  // MEDIA_SERVICE 视频语音  VIDEO AUDIO
  const [orgId, setOrgId] = useState(orgList[0].organizationId);
  const handleChangeTab = (id: string) => {
    setOrgId(id);
  };
  const changePriceNumber = (price: number) => {
    console.log(orgId);
    console.log(price);
  //   const { isInit } = this.props;
  //   if (price < 999999999) {
  //     if (isInit) {
  //       this.handleInitPrice(type, price, orgId);
  //     } else {
  //       this.setState({ [`${orgId}${type}Price`]: price });
  //     }
  //   }
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
                <span className={styles.input_num}>
                  ￥
                  <InputNumber
                    onChange={(value) => changePriceNumber(value)}
                    min={0}
                    max={999999999}
                    value={0}
                    precision={0}
                  />
                </span>
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
                <span className={styles.input_num}>
                  ￥
                  <InputNumber
                    onChange={(value) => changePriceNumber(value)}
                    min={0}
                    max={999999999}
                    value={0}
                    precision={0}
                  />
                </span>
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
                <span className={styles.input_num}>
                  ￥
                  <InputNumber
                    onChange={(value) => changePriceNumber(value)}
                    min={0}
                    max={999999999}
                    value={0}
                    precision={0}
                  />
                </span>
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
                <span className={styles.input_num}>
                  ￥
                  <InputNumber
                    onChange={(value) => changePriceNumber(value)}
                    min={0}
                    max={999999999}
                    value={0}
                    precision={0}
                  />
                </span>
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
                <span className={styles.input_num}>
                  ￥
                  <InputNumber
                    onChange={(value) => changePriceNumber(value)}
                    min={0}
                    max={999999999}
                    value={0}
                    precision={0}
                  />
                </span>
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
        okText: '保存',
        onOk: toggleEdit,
        onCancel: onClose,
      })}
    </div>
  );
}

export default ChargesEdit;
