import React, { useEffect, useState } from 'react';
import { Descriptions, Row, Col, Input, message, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import Ewm from '../compontent/Ewm';
import styles from './index.scss';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';
import { useLocation, useSelector } from 'umi';
import { isOpenSub as getIsOpenSub, upperOrgNsId } from '@/utils/tools';

const { TextArea } = Input;
function Account() {
  const [org, setOrgInfo] = useState({});
  const [intro, setIntro] = useState();
  const location = useLocation();
  const { nsId, openSub, sid } = location?.query; // 处理查看下级机构
  const isOpenSub = getIsOpenSub();
  const { isLogin } = useSelector((state: IState) => state.auth);
  const fetchOrgInfo = () => {
    let params = {};
    if (openSub || isOpenSub) {
      params = {
        targetNSId: location?.query.nsId || upperOrgNsId(),
      };
    } else {
      params = {
        sid: window.$storage.getItem('sid'),
        sRole: Role.ORG_ADMIN.id,
      };
    }
    api.org.getOrgInfo(params).then(res => {
      setOrgInfo({ ...res });
      setIntro(res?.intro);
      window.$storage.setItem('orgSid', res.orgSid);
      window.$storage.setItem('orgRole', res.orgRole);
      if (isOpenSub) {
        sessionStorage.setItem('upperOrgName', res.orgName); // 树状图使用
      } else {
        window.$storage.setItem('orgName', res.orgName); // 树状图使用
      }

    });
  };
  useEffect(() => {
    if (isLogin){
      fetchOrgInfo();
      if (openSub) { // 查看下级机构详情，默认打开此页面，此时页面参数带有下级机构关键信息。要存到本地，后面页面接口使用
        sessionStorage.setItem('upperOrgSid', sid);
        sessionStorage.setItem('upperOrgNsId', nsId);
      }
    }
  }, [isLogin]);
  const count = [
    { key: 'doctorCount', tit: '医生人数' },
    { key: 'patientCount', tit: '患者人数' },
  ];
  const baseInfo = {
    adminAccount: '管理员账号',
    uuCode: '机构识别码',
    orgName: '机构名称',
  };
  const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = {
      'context': e.target.value,
      'sid': org.orgSid,
    };
    api.org.patchOrgInfo(params).then(() => {
      message.success('医院介绍修改成功');
      fetchOrgInfo();
    });
  };
  const changeIntro = (e: { target: { value: string } }) => {
    setIntro(e.target.value);
  };
  return (
    <div className={`h-full relative ${styles.account}`}>
      <Row>
        <Col span={12} className={styles.mr}>
          <Row className="w-340 mx-auto h-256" align="middle">
            <Col span={24}>
              <Descriptions
                column={1}
                labelStyle={{
                  paddingLeft: 4,
                  borderLeft: '2px solid #0F90FF',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                contentStyle={{
                  fontSize: 14,
                  color: '#1890FF',
                  fontWeight: 400,
                }}
              >
                {Object.keys(baseInfo).map((d) => (
                  <Descriptions.Item key={d} label={baseInfo[d]}>
                    {org[d] || '--'}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </Col>
            {/* 二维码目前先隐藏 */}
            {/* <Col span={6} offset={6}>
              <Ewm />
            </Col> */}
          </Row>
        </Col>
        <Col span={12}>
          <div className="flex justify-around items-center h-full">
            {count
              .map((item) => (
              <div
                className="flex"
                key={item.key}
              >
                <Row>
                  <Col className="mr-5">
                    <UserOutlined />
                  </Col>
                  <Col className="mr-5">
                    <p className="">{org[item.key]}人</p>
                    <p className="black-65 mt-10">{item.tit}</p>
                  </Col>
                </Row>
              </div>
              ))}
          </div>
        </Col>
      </Row>
      <div className={`${styles.introduce} flex justify-center`}>
        <div className="mt-80">
          <h1 className="text-3xl mb-6">医院介绍:</h1>
            <Tooltip placement="top" title='点击可进行编辑'>
              <TextArea
                style={{ minHeight: 220, width: 800 }}
                disabled={!!isOpenSub}
                onBlur={handleSave}
                onChange={changeIntro}
                value={intro}
              />
            </Tooltip>
        </div>
      </div>

    </div>
  );
}

export default Account;
