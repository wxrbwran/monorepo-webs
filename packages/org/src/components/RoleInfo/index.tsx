import React, { FC } from 'react';
import { Avatar, Button, Tabs, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import AddEditDoctor from '@/components/AddEditDoctor';
import CertificateCard from '@/components/CertificateCard';
import { useSelector, useDispatch } from 'umi';
import {
  defaultAvatar,
  itemWithoutlabel,
  itemWithLabel,
  titleList,
  sexList,
  basicInfoTab,
} from 'xzl-web-shared/dist/src/utils/consts';
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import { UserStatus } from '@/utils/enums';
import certified from './img/certified.svg';
import notCertified from './img/not_certified.svg';
import styles from './index.scss';

interface IProps {
  type: string;
}

const { TabPane } = Tabs;
const RoleInfo: FC<IProps> = (props) => {
  const { type } = props;
  const dispatch = useDispatch();
  const info = useSelector((state: IState) => state.department_tab.info);
  const department = useSelector((state: IState) => state.org_menu.department);
  console.log(type);
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
  const handlePassCert = async (isPass: boolean) => {
    console.log(isPass);
    const status = isPass ? UserStatus.Accepted : UserStatus.Refused;
    const res = await window.$api.user.approve({
      nsId: department.id,
      objectId: info.sid,
      objectRole: Role.DOCTOR.id,
      status,
    });
    console.log('handlePassCert', res);
    message.success('操作成功');
    dispatch({
      type: 'department_tab/changeUserInfo',
      payload: {
        ...info,
        status,
      },
    });
  };
  return (
    <div className={styles.role_info}>
      <div className={styles.info}>
        <div className={styles.left}>
          <Avatar src={info?.avatarUrl || defaultAvatar} shape="square" size={80} />
          <div className={`${styles.cert_status} ${isCerted ? 'green' : ''}`}>
            <img src={isCerted ? certified : notCertified} alt="" />
            {isCerted ? '已认证' : '未认证'}
          </div>
          <p>
            医生识别码：
            {info?.uuCode}
          </p>
          {type === 'doctor' && (
            <AddEditDoctor mode="EDIT">
              <Button
                type="primary"
                onClick={() => {
                  dispatch({
                    type: 'department_tab/changeUserInfo',
                    payload: {
                      ...info,
                    },
                  });
                }}
              >
                修改资料
              </Button>
            </AddEditDoctor>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.top_with_btn}>
            <div className={styles.top}>
              {itemWithoutlabel.map((item) => (
                <span className={styles.label} key={item}>
                  {handleItemWithoutLabel(item)}
                </span>
              ))}
              {itemWithLabel.map((item) => (
                <span key={item.key} className={styles.label}>
                  {`${item.label} :
               ${handleItemWithoutLabel(item.key)}`}
                </span>
              ))}
            </div>
            <Button
              onClick={() => {
                dispatch({
                  type: 'department_tab/changeTab',
                  payload: {
                    inner: 'list',
                  },
                });
              }}
              type="primary"
              icon={<RollbackOutlined />}
            >
              返回
            </Button>
          </div>
          {type === 'doctor' && (
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
          {showCertBtn && (
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
  );
};

export default RoleInfo;
