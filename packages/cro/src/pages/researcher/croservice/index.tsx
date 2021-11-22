import React, { FC, useState, useEffect } from 'react';
import { Divider, Popconfirm } from 'antd';
import editPng from '@/assets/img/edit.svg';
import remove from '@/assets/img/remove.svg';
import styles from './index.scss';
import { Button } from 'antd';
import AddServicePackage from './components/AddServicePackage';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import { TeamMember } from './components/Member';
import { Role } from 'xzl-web-shared/src/utils/role';
import { hasPermissions } from '@/utils/utils';
import { debounce } from 'lodash';
interface IProps {

}
const Croservice: FC<IProps> = () => {

  // const { projectNsId, creatorSId } = useSelector((state: IState) => state.project.projDetail);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  const [teams, setTeams] = useState([]);

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [source, setSource] = useState({});
  const teamMembers = useSelector((state: IState) => state.project.teamMembers);


  useEffect(() => {

    // const isCurrentSid = creatorSId == localStorage.getItem('xzl-web-doctor_sid');
    // setIsCreater(isCurrentSid);

    api.service.fetchBaseRoles().then(res => {

      console.log('========= service.getTeams', JSON.stringify(res));
    });

    api.service.getTeams({ 'teamNSLabels': ['research_pro_patient'], 'targetNSId': projectNsId }).then(res => {

      // 只能展示自己创建的，自己参与的，
      const croTeams = res.teams.filter((item) => item.teamNSLabels.includes('research_cro_team'));

      setTeams(croTeams);
    });
  }, []);

  const onSaveSuccess = () => {

    setShow(false);
    api.service.getTeams({ 'teamNSLabels': ['research_pro_patient'], 'targetNSId': projectNsId }).then(res => {

      // 过滤独立管理的
      const croTeams = res.teams.filter((item) => item.teamNSLabels.includes('research_cro_team'));
      setTeams(croTeams);
    });
  };

  const onEditTeam = (team) => {

    setShow(true);
    setSource(team);
    setEdit(true);
  };

  const onAddTeam = () => {

    setShow(true);
    setEdit(false);
    setSource({});
  };

  const onHandleRemove = (team) => {

    const parma = {

      name: team.name,
      teamNSId: team.teamNSId,
      teamNSLabels: ['research_pro_patient'],
      members: team.innerTeams
        .filter((innerTeam) => innerTeam.members.find((item) => item.role == Role.NS_OWNER.id))
        .flatMap((inner) => inner.members)
        .map((item) => { return { sid: item.sid, role: item.role }; }),
    };

    console.log('======================= memberList', JSON.stringify(parma));

    api.service.deleteTeamMembers(parma).then(() => {

      onSaveSuccess();
    });
  };

  // 是否是该team的创建人
  const isTeamCreater = (team) => {

    return team.innerTeams
      .find((innerTeam) => innerTeam.members.find((item) => localStorage.getItem('xzl-web-doctor_sid') == item.sid && item.role == Role.NS_OWNER.id));
  };

  return (
    <div className={styles.croservice}>
      <AddServicePackage onSaveSuccess={onSaveSuccess} edit={edit} source={source} show={show} onCancel={() => { setShow(false); }}>
        {
          hasPermissions(teamMembers) && <Button type="primary" className="mb-20" onClick={debounce(onAddTeam, 300)}>+ 添加新团队</Button>
        }
      </AddServicePackage>
      {
        teams.map((team) => {

          return (<div key={team.teamNSId} className={`${styles.member} py-15 px-20 mb-15`}>
            <div className='flex justify-between text-base mb-50'>
              <div className='font-bold'>{team.name}</div>
              {
                hasPermissions(teamMembers) && isTeamCreater(team) && <div className={`${styles.operator} flex items-center`}>
                  <p onClick={() => { onEditTeam(team); }}><img src={editPng} className='mr-5' />编辑</p>
                  <Divider type="vertical" />
                  <Popconfirm
                    placement="leftTop"
                    title={
                      <div style={{ width: 305, fontSize: 14 }}>
                        <div>解散后服务小组内的患者将自动转为由你独立管理?</div>
                        <div className="text-gray-600"> 这是一个不可逆的操作，请谨慎对待</div>
                      </div>
                    }
                    onConfirm={() => { onHandleRemove(team); }}
                    okText="确定"
                    cancelText="取消"
                  >

                    <span className="flex items-center text-sm">
                      <img className='w-16 h-16' src={remove} />
                      <span>解散</span>
                    </span>
                  </Popconfirm>
                </div>
              }

            </div>
            <TeamMember team={team}></TeamMember>
          </div>);
        })
      }
    </div>
  );
};

export default Croservice;
