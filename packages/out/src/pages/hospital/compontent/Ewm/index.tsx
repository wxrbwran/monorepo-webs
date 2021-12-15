import React, { useState } from 'react';
import { Avatar } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import ewmPic from '@/assets/img/ewm.jpg';
import styles from './index.scss';

function Ewm() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div onClick={() => setShow(true)}>
        <Avatar
          icon={<QrcodeOutlined />}
          style={{ backgroundColor: '#3588FD' }}
          size={80}
          className="shadow"
        ></Avatar>
      </div>
      <DragModal
        width={700}
        visible={show}
        maskClosable
        centered
        title='医院资料'
        onCancel={() => setShow(false)}
        footer={null}
      >
        <div className={styles.ewm_wrap}>
          <div>
            <img src={ewmPic} alt="门诊二维码"/>
            <div>门诊二维码</div>
          </div>
          <div>
            <img src={ewmPic} alt="医生注册二维码"/>
            <div>医生注册二维码</div>
          </div>
        </div>
      </DragModal>
    </div>
  );
}

export default Ewm;
