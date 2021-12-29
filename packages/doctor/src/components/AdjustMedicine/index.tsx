import React, { FC, useState } from 'react';
import QRCode from 'qrcode.react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import styles from './index.scss';

interface IProps {
  title?: string;
}
// 此组件用于患者详情，右侧调整用药。
const AdjustMedicine: FC<IProps> = (props) => {
  const { children, title } = props;
  const doctorRole = window.$storage.getItem('currRoleId');
  const patientSid = window.$storage.getItem('patientSid');
  const doctorSid = window.$storage.getItem('sid');
  /*
    status决定渲染哪种ui组合
    0:弹框不展示  1:调整用药  2:调整用药后的diff展示页面
  */
  const [status, setStatus] = useState(0);
  const handleShowModal = () => {
    setStatus(1);
  };
  return (
    <>
      <div onClick={handleShowModal}>
        {children}
      </div>
      {title}
      <DragModal
        title={title || '调整用药'}
        width={770}
        visible={!!status}
        onCancel={() => setStatus(0)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div className={styles.adjust_medicine_modal}>
          <p className="text-base mb-15">请使用「心之力医生端APP」扫描屏幕二维码进行调药</p>
          <QRCode size={120} value={`${doctorRole}-${doctorSid}-${patientSid}`} />
        </div>
      </DragModal>
    </>
  );
};

export default AdjustMedicine;
