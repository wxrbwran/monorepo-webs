import React, { FC } from 'react';
import { Row, Col } from 'antd';
// import { useParams } from 'umi';
import OrgMenu from './components/OrgMenu';
import GoBack from './components/GoBack';

import styles from './index.scss';

const NormalOrg: FC = (props) => {
  const { children } = props;
  return (
    <>
      <Row
        justify="start"
        style={{
          flexFlow: 'row nowrap',
          backgroundColor: '#f6f7fb',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Col flex="0 0 365px">
          <OrgMenu />
        </Col>
        <Col flex="auto" className={styles.right}>
          {children}
        </Col>
      </Row>
      <GoBack />
    </>
  );
};
NormalOrg.title = '医院信息';

export default NormalOrg;
