import type { FC } from 'react';
import React, { useState } from 'react';
import { Avatar, Button, Tabs, message, Form } from 'antd';
import CertificateCard from '@/components/CertificateCard';
import DragModalForm from '@/components/DragModal/DragModalForm';
// import { useSelector, useDispatch } from 'umi';
import {
  defaultAvatar,
  itemWithoutlabel,
  titleList,
  sexList,
  basicInfoTab,
} from 'xzl-web-shared/src/utils/consts';
import { Role } from 'xzl-web-shared/src/utils/role';
import { UserStatus } from '@/utils/enums';
import { formItemLayout } from 'xzl-web-shared/src/utils/consts';
import certified from './img/certified.svg';
import notCertified from './img/not_certified.svg';
import styles from './index.scss';
import { isOpenSub } from '@/utils/tools';
import { debounce } from 'lodash';

interface IProps {
  role: string;
  trigger: React.ReactElement;
  info: any;
  refresh: () => void;
}

const { TabPane } = Tabs;
const RoleInfo: FC<IProps> = (props) => {
  const { role, trigger, info, refresh } = props;
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const isCerted = info?.status === UserStatus.Accepted;
  const showCertBtn = info?.status === UserStatus.InitState;
  const handleItemWithoutLabel = (property: string) => {
    switch (property) {
      case 'title':
        return titleList[info[property]];
      case 'sex':
        return sexList[info[property]];
      default:
        return info[property] || '暂无信息';
    }
  };
  const handlePassCert = debounce(async (isPass: boolean) => {
    console.log(isPass);
    const status = isPass ? UserStatus.Accepted : UserStatus.Refused;
    const res = await window.$api.user.approve({
      objectId: info.sid,  // 当前医生的sid
      objectRole: Role.DOCTOR.id, // 当前医生的角色
      status,
    });
    console.log('handlePassCert', res);
    message.success('操作成功');
    refresh();
    setShowModal(false);
  }, 300);
  const renderTrigger = () => {
    return (
      <div onClick={() => setShowModal(true)}>{trigger}</div>
    );
  };
  console.log('rewrerer', info?.practiceAreas);
  return (
    <DragModalForm
      title="角色信息"
      trigger={renderTrigger()}
      layout="horizontal"
      onVisibleChange={setShowModal}
      colon={false}
      {...formItemLayout}
      visible={showModal}
      modalProps={{
        width: 900,
        footer: null,
        wrapClassName: 'hide_modal_footer',
      }}
      onFinish={async (values) => {
        console.log(values);
        return true;
      }}
      form={form}
    >
      <div className={styles.role_info}>
        <div className={styles.info}>
          <div className={styles.left}>
            <Avatar src={info?.avatarUrl || defaultAvatar} shape="square" size={80} />
            <div className={`${styles.cert_status} ${isCerted ? 'green' : ''}`}>
              <img src={isCerted ? certified : notCertified} alt="" />
              {isCerted ? '已认证' : '未认证'}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top_with_btn}>
              <div className={styles.top}>
                {itemWithoutlabel.map((item) => (
                  <span className={styles.label} key={item}>
                    {handleItemWithoutLabel(item)}
                  </span>
                ))}
                <span className={styles.label}>
                  手机{handleItemWithoutLabel('tel')}
                </span>
              </div>
            </div>
            <div className="mb-10 flex">
                <span style={{ flex: '0 0 113px' }}>执业医院和科室：</span>
                <div>
                  {
                    info?.practiceAreas ?
                      info?.practiceAreas?.map(item => {
                        return (
                        <span className="mr-20 inline-block mb-3" key={item.standardId}>{item?.name}-{item?.sub?.name}</span>
                        );
                      }) : '--'
                  }
                </div>
              </div>
            {role === 'doctor' && (
              <div className={styles.items}>
                <Tabs size="middle">
                  {Object.keys(basicInfoTab).map((tab) => (
                    <TabPane tab={basicInfoTab[tab]} key={tab}>
                      <p className={styles.desc}>{handleItemWithoutLabel(tab)}</p>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            )}
            <div className={styles.certs}>
              <CertificateCard userInfo={info} />
            </div>
            {showCertBtn && !isOpenSub() && (
              <div className={styles.btns}>
                <Button onClick={() => handlePassCert(true)} type="primary" size="large">
                  通过
                </Button>
                <Button onClick={() => handlePassCert(false)} type="primary" danger size="large">
                  不通过
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DragModalForm>
  );
};

export default RoleInfo;
