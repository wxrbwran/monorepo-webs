import React, { useState } from 'react';
import { Button } from 'antd';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import styles from './index.scss';

function MyScore() {
  const [isShowExchange, setIsShowExchange] = useState(false); // 是否显示兑换弹框
  const [isShowBank, setIsShowBank] = useState(false); // 是否显示提示绑定银行卡弹框
  const [isShowSuccess, setIsShowSuccess] = useState(false); // 兑换成功弹框
  const [canExchange, setCanExchange] = useState(1); // 可兑换金额
  const toggleBankModal = () => {
    setIsShowBank(!isShowBank);
  };
  const toggleExchangeModal = () => {
    setIsShowExchange(!isShowExchange);
  };
  const exchangeScore = () => {
    console.log(1);
    console.log(setCanExchange);
  };
  const showModal = () => {
    toggleBankModal();
    // 如果没绑银行卡，展示提醒绑卡弹框，否则显示兑换弹框
    // if (!bankCardNumber || !bank) {
    //   this.toggleBankModal();
    // } else {
    //   this.toggleExchangeModal();
    // }
    // toggleExchangeModal();
  };
  const toBind = () => {
    // tab切换到个人资料卡片上
    // this.props.actions.toggleUserModal({
    //   isShow: true,
    //   page: 'info',
    // });
    toggleBankModal();
  };

  return (
    <div className={styles.my_score}>
      <div>积分</div>
      <div className={styles.total}>
        77
        <span>可折现: ￥77</span>
      </div>
      <div>今日获得积分: 0</div>
      <div className={styles.content}>
        <div className={styles.rule}>
          <h3>积分规则</h3>
          <p>1.在医患对话中回答患者的问题，每日每个患者可获得1积分，单日最多10积分；</p>
          <p> 注：回答单句超过5个字算作有效回答；</p>
          <p>2.每日处理患者的任务，每日每个患者可获得1积分，单日最多10积分；</p>
          <h3>兑换规则</h3>
          <p>兑换规则请以兑换活动为准</p>
        </div>
        <div className={styles.activity}>
          <h3>当前兑换活动</h3>
          {/* <div>暂无活动</div> */}
          <div className={styles.item}>
            <div className={styles.tit}>1元1积分兑换活动</div>
            <div className={styles.activety_rule}>
              <span>1积分=1元</span>
              <Button type="primary" onClick={showModal}>兑换</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.history}>
        <h3>兑换历史</h3>
        <div>暂无历史</div>
      </div>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={355}
        maskClosable
        visible={isShowExchange}
        onCancel={toggleExchangeModal}
        title="积分兑换"
        style={{ textAlign: 'center' }}
        onOk={canExchange < 10 ? toggleExchangeModal : exchangeScore}
        okText={canExchange < 10 ? '确定' : '确认兑换'}
      >
        <div className={styles.current_money}>
          <p>
            您当前积分77，可兑换￥
            <span>{Math.floor(canExchange * 100) / 100}</span>
            元
          </p>
          {canExchange < 10 && <p className={styles.tip}>不足10元，无法提现</p>}
        </div>
      </DragModal>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={355}
        maskClosable
        visible={isShowBank}
        onCancel={toggleBankModal}
        title="未绑定银行卡"
        style={{ textAlign: 'center' }}
        onOk={toBind}
        okText="去绑定"
      >
        <div className={styles.bind_card}>您还未绑定银行卡</div>
      </DragModal>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width={355}
        maskClosable
        visible={isShowSuccess}
        onCancel={() => setIsShowSuccess(false)}
        title="兑换成功"
        style={{ textAlign: 'center' }}
        onOk={() => setIsShowSuccess(false)}
      >
        <div>
          <p className={styles.bind_card}>兑换成功</p>
          <p className={styles.bind_card}>将于72小时内到账</p>
        </div>
      </DragModal>
    </div>
  );
}

export default MyScore;
