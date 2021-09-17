import type { FC } from 'react';
import React from 'react';
import { Row, Col } from 'antd';
import OrgMenu from './components/OrgMenu';
// import Management from '../components/Management';

const Department: FC = (props) => {
  const { children } = props;
  // const orgInfo = useSelector((state: Store) => state.org.currentOrg.orgBase);
  return (
    <Row
      justify="start"
      style={{
        flexFlow: 'row nowrap',
        backgroundColor: '#f6f7fb',
        position: 'relative',
        overflow: 'hidden',
        height: "100%"
      }}
    >
      <Col flex="0 0 150px" className=" bg-white overflow-y-auto">
        <OrgMenu />
      </Col>
      <Col className="bg-white overflow-y-auto" flex="auto">
        {children}
      </Col>
    </Row>
  );
};
Department.title = '科室信息';
export default Department;
