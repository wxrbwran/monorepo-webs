import React, { FC } from 'react';
import { Row, Col, Space, Button } from 'antd';
import { useSelector } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { topInfos, isInternet } from 'xzl-web-shared/src/utils/consts';
// import Management from '../components/Management';
import UploadInfo from '../components/UploadInfo';
import styles from './index.scss';

const OrgInfo: FC = () => {
  const orgInfo = useSelector((state: Store) => state.org.currentOrg.orgBase);
  const handleKeyText = (key: string) => {
    const target: any = orgInfo[key];
    switch (key) {
      case 'isInternet':
        return isInternet[target];
      // case 'level':
      //   return hospitalLevel[target];
      // case 'grade':
      //   return hospitalGrade[target];
      default:
        return target;
    }
  };
  return (
    <div className={styles.right}>
      <Col className={`${styles.info} white`}>
        <Row className={styles.title}>
          <Space size="large">
            <span>{orgInfo.name}</span>
            <UploadInfo>
              <Button type="primary" ghost icon={<UploadOutlined />}>
                上传医院资料
              </Button>
            </UploadInfo>
            {/* <Button>
              <Link to="/group_msg_history">群发历史</Link>
            </Button> */}
          </Space>
        </Row>
        <Row className={styles.block}>
          {Object.keys(topInfos)
            .filter((key) => orgInfo[key])
            .map((key) => (
              <span key={key}>{`${topInfos[key]}: ${handleKeyText(key)}`}</span>
            ))}
        </Row>
        {/* <Row>
          <Management />
        </Row> */}
      </Col>
    </div>
  );
};
OrgInfo.title = '医院信息';
export default OrgInfo;
