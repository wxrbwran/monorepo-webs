import React from 'react';
// import { RouteComponentProps } from 'react-router-dom'
import project from '@/assets/project.png';
import invite from '@/assets/invite.png';
import risk from '@/assets/img/risk.png'
import { Row, Col } from 'antd';
import FileType from './file_type';
import styles from './index.scss';

interface IProps{
}
function UploadFile({ }:IProps) {

  const fileType = [
    {
      type: 'PROJECT_FILE',
      name: '试验文件',
      name2: '',
      img: project,
      span: 5
    },
    {
      type: 'INVITER_FILE',
      name: '项目邀请书',
      name2: '知情同意书',
      img: invite,
      span: 5
    },
    {
      type: 'RISK_FILE',
      name: '风险评估',
      name2: '风险对策',
      img: risk,
      span: 5
    },
  ];

  return (
    <div className={styles.right_top}>
      <div className={styles.head}>项目文件</div>
      <Row>
        {
          fileType.map((item, index)=>(
            <Col key={index} span={item.span}>
              <FileType
                name={item.name}
                name2={item.name2}
                type={item.type}
                imgSrc={item.img}
              />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default UploadFile;
