import React, { FC, useState, useEffect } from 'react';
import { Divider } from 'antd';
import edit from '@/assets/img/edit.svg';
import remove from '@/assets/img/remove.svg';
import avatar from '@/assets/img/default_project.png';
import styles from './index.scss';
import { Button } from 'antd';
import AddServicePackage from './components/AddServicePackage';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';
interface IProps {

}
const Croservice: FC<IProps> = () => {

  const [teams, setTeams] = useState([]);

  useEffect(() => {

    api.service.fetchBaseRoles().then(res => {

      console.log('========= service.getTeams', JSON.stringify(res));
    });

    api.service.getTeams({ 'teamNSLabels': ['research_cro_team'] }).then(res => {

      setTeams(res.teams);
    });
  }, []);

  const onSaveSuccess = () => {

    api.service.getTeams({ 'teamNSLabels': ['research_cro_team'] }).then(res => {

      setTeams(res.teams);
    });
  };

  const getDesRoles = (members: any[]) => {

    // const roles = [Role.CRO_CRC.id, Role.CRO_CRA.id, Role.CRO_PM.id];

    return members.map((item) => {

      if (item.role == Role.CRO_CRC.id) {
        return 'CRC';
      } else if (item.role == Role.CRO_CRA.id) {
        return 'CRA';
      } else if (item.role == Role.CRO_PM.id) {
        return 'PM';
      } else {
        return '研究者';
      }
    }).join(' ');
  };

  return (
    <div className={styles.croservice}>
      <AddServicePackage onSaveSuccess={onSaveSuccess}>
        <Button type="primary" className="mb-20">+ 添加新团队</Button>
      </AddServicePackage>

      {
        teams.map((team) => {
          return (<div className={`${styles.member} py-15 px-20 mb-15`}>
            <div className='flex justify-between text-base mb-50'>
              <div className='font-bold'>{team.name}</div>
              <div className={`${styles.operator} flex items-center`}>
                <p><img src={edit} className='mr-5' />编辑</p>
                <Divider type="vertical" />
                <p><img src={remove} className='mr-5' />解散</p>
              </div>
            </div>
            <div className='flex'>
              {
                team.innerTeams.map((innerTeam) => {
                  return (<div className='text-center text-base mx-40'>
                    <p className={styles.avatar}><img src={innerTeam.members[0].avatarUrl ?? avatar} /></p>
                    <p className='font-bold mb-5 mt-20'>{innerTeam.members[0].name}</p>
                    <p className='text-sm'>{getDesRoles(innerTeam.members)}</p>
                  </div>);
                })
              }
            </div>
          </div>);
        })
      }
    </div>
  );
};

export default Croservice;
