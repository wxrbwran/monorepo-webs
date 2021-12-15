import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useSelector } from 'umi';
import config from '@/config';
import * as api from '@/services/api';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import Tabs from '../components/Tabs';
import DoctorInfo from './DoctorInfo';
import DoctorList from './DoctorList';
import styles from './index.scss';

export interface IMember {
  name: string;
  id: string;
  nsId: string;
  role: string;
  title: string;
  department: {
    name: string;
  }
  wcId: string;
  avatarUrl: string;
}
interface ITeam {
  members: IMember[];
  teamNSId: string;
}

function FactionDoctor() {
  const orgList: ISubject[] = useSelector((state: IState) => state.user.filterOrgs);
  const [activeType, setActiveType] = useState('UPPER_DOCTOR');
  const [isShowDel, setIsShowDel] = useState(false);
  const [delDoctorId, setDelDoctorId] = useState<string>('');
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [doctorList, setDoctorList] = useState<IMember[]>([]);
  const [orgNsId, setOrgNsId] = useState<string>('');
  const [currDetail, setCurrDetail] = useState<IMember | null>(null);
  const handleChangeTab = (orgId: string) => {
    console.log(orgId);
    setOrgNsId(orgId);
  };
  const tab: CommonData = {
    UPPER_DOCTOR: '我的主管医生',
    LOWER_DOCTOR: '我的医生助手',
  };
  const changeTab = (value: string) => {
    setActiveType(value);
  };

  useEffect(() => {
    if (orgList.length > 0) {
      setOrgNsId(orgList[0].nsId);
    }
  }, [orgList]);

  const getDoctors = (type: string) => {
    const roleId = type === 'UPPER_DOCTOR' ? Role.LOWER_DOCTOR.id : Role.UPPER_DOCTOR.id;
    api.doctor.getDoctors(orgNsId, roleId).then((res: { teams: ITeam[] }) => {
      const doctors: IMember[] = [];
      res.teams.forEach((item) => {
        item.members.forEach((member:IMember) => {
          if (member.role === Role[type].id) {
            doctors.push({
              ...member,
              nsId: item.teamNSId,
            });
          }
        });
      });
      setDoctorList(doctors);
    }).catch((err) => {
      console.log('err', err);
    });
  };

  useEffect(() => {
    if (orgNsId) {
      getDoctors(activeType);
    }
  }, [orgNsId, activeType]);

  const handleDeleteFaction = () => {
    api.doctor.delDoctors(delDoctorId).then(() => {
      setIsShowDel(false);
      message.success('移出成功');
      getDoctors(activeType);
    }).catch((err) => {
      console.log('err', err);
    });
  };
  const handleShowDel = (e: React.MouseEvent, doctorId: string) => {
    e.stopPropagation();
    setDelDoctorId(doctorId);
    setIsShowDel(true);
  };
  const handleToggleDetail = (item: IMember) => {
    setIsShowDetail(!isShowDetail);
    setCurrDetail({ ...item });
  };

  const formatOrgList = orgList.map((org) => ({
    organizationName: org.name,
    organizationId: org.nsId,
  }));
  return (
    <div className={styles.faction_doctor}>
      <Tabs orgList={formatOrgList} handleChangeTab={handleChangeTab} />
      <div className={styles.doctorList}>
        <div className={styles.tab}>
          {Object.keys(tab).map((t: string) => (
            <div
              key={t}
              className={t === activeType ? styles.active : null}
              onClick={() => changeTab(t)}
            >
              {tab[t]}
            </div>
          ))}
        </div>
        <div className={styles.doctor}>
          {
            doctorList.map((item) => (
              <div className={styles.card} onClick={() => handleToggleDetail(item)}>
                <div className={styles.img}>
                  <img src={item.avatarUrl || config.defaultAvatar} alt="" />
                </div>
                <h3 className={styles.name}>{item.name}</h3>
                <p>
                  {item.title}
                  {item.title && item.department?.name && '|'}
                  {item.department?.name}
                </p>
                <div
                  className={styles.delete}
                  onClick={(e) => handleShowDel(e, item.wcId)}
                >
                  移出团队
                </div>
              </div>
            ))
          }
          <DoctorList
            activeType={Role[activeType].id}
            getDoctors={() => getDoctors(activeType)}
            orgNsId={orgNsId}
          />
        </div>
      </div>
      <DragModal
        wrapClassName="ant-modal-wrap-center cancel_text_blue"
        width={355}
        maskClosable
        visible={isShowDel}
        onCancel={() => setIsShowDel(false)}
        title="移出团队"
        onOk={handleDeleteFaction}
        okText="确定移出"
        cancelText="取消操作"
      >
        <div className={styles.out}>
          <h2>确定移出团队</h2>
          <p>医生被移出团队后，将不再被推荐给患者</p>
        </div>
      </DragModal>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        footer={null}
        width={1100}
        maskClosable
        visible={isShowDetail}
        onCancel={handleToggleDetail}
        title=" "
      >
        <DoctorInfo currDetail={currDetail} />
      </DragModal>
    </div>
  );
}

export default FactionDoctor;
