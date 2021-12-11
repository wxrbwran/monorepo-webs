import React, { FC, useEffect, useState } from 'react';
import { Role } from 'xzl-web-shared/src/utils/role';
import { useLocation } from 'umi';
import { isEmpty } from 'lodash';
import styles from './index.scss';

interface ITeams {
  name: string;
  teamNSId: string;
  members: ISubject[]
}
interface IProps {
  handleChangeDoc: (sid: string) =>  void;
  handleNoData: () =>  void;
}
const DepHeadDoctors: FC<IProps> = ({ handleChangeDoc, handleNoData }) => {
  const [doctors, setDoctors] = useState<ISubject[]>([]);
  const [activeSid, setActiveSid] = useState<string>();
  const location = useLocation();
  useEffect(() => {
    console.log('---3--3', location);
    const params = {
      targetNSId:location.query?.depHeadNsId,
    };
    window.$api.doctor.getDoctorHeadingDoctors(params).then((res: { teams: ITeams[] }) => {
      console.log('======32', res);
      if (!isEmpty(res.teams)) {
        const list: ISubject[] = [];
        res.teams.forEach(item => {
          item.members.forEach(memberItem => {
            if (memberItem.role === Role.DOCTOR.id) {
              list.push(memberItem);
            }
          });
        });
        setActiveSid(list?.[0]?.sid);
        handleChangeDoc(list?.[0]?.sid!);
        setDoctors(list);
      } else {
        handleNoData();
        setDoctors([]);
      }
    });
  }, [location]);
  const handleClick = (sid: string) => {
    console.log('sid', sid);
    setActiveSid(sid);
    handleChangeDoc(sid);
  };
  return (
    <div className={styles.doctors}>
      {
        doctors.map(item => {
          return (
            <div
              key={item.sid}
              className={`${styles.item} ${activeSid === item.sid ? styles.active : ''}`}
              onClick={() => handleClick(item.sid!)}
            >{item.name}</div>
          );
        })
      }
    </div>
  );
};
export default DepHeadDoctors;
