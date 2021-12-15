import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import { IRecord } from '../../columns';
import styles from '../../index.scss';

interface IProps {
  selectedPatientId: IRecord[];
}
function UnBind({ selectedPatientId } : IProps) {
  const [showModal, setShowModal] = useState(false);
  console.log(33);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  const handleUnBind = () => {

  };
  return (
    <>
      <Button disabled={selectedPatientId.length === 0} onClick={handleShowModal}>解约</Button>
      <DragModal
        visible={showModal}
        width={415}
        footer={null}
        onCancel={handleHideModal}
        title=""
        wrapClassName="ant-modal-wrap-center"
      >
        <div className={styles.unbind}>
          <div className={styles.title}>
            <ExclamationCircleOutlined />
            确认解约？
          </div>
          <div className={styles.content}>
            <p>
              解约患者：
              {selectedPatientId.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
            </p>
            <p>解约后您将不再为患者提供管理服务</p>
          </div>
          <div className={styles.protocol}>
            <span>* </span>
            违约详情请见
            <span className={styles.agreement}>《用户服务协议》</span>
          </div>
          <div className="common__btn">
            <Button className={styles.submit} onClick={handleHideModal}>
              取消解约
            </Button>
            <Button className={styles.submit} onClick={handleUnBind} htmlType="submit" type="primary">
              确定解约
            </Button>
          </div>
        </div>
      </DragModal>
    </>
  );
}

export default UnBind;
