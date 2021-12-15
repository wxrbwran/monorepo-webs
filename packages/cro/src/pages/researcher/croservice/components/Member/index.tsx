import React, { FC } from 'react';
import iconClose from '@/assets/img/icon_close.png';
import iconAdd from '@/assets/img/icon_add_large.png';
import ChoiceDoctor, { DoctorOrgsProp } from '../ChoiceDoctor';
import { defaultAvatar } from 'xzl-web-shared/dist/src/utils/consts';
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import styles from './index.scss';
import avatar from '@/assets/img/default_project.png';
interface IMemberProps {

  title: string;
  members: any[];
  editable: boolean;
  friends: any[];
  handleChoice?: (choices: any[]) => void;
  onRemove?: (item: any, index: number) => void;
  onDoctorChoice?: (member) => DoctorOrgsProp;
  onDoctorUnChoice?: (member) => boolean; // 取消选中了某个医生，需要返回一个bool值，判断chiceOrg是不是要赋空值
}
const Member: FC<IMemberProps> = ({ title, members, editable, friends, handleChoice, onRemove, onDoctorChoice, onDoctorUnChoice }) => {

  console.log('======fetchDoctorFriends==', JSON.stringify(friends));


  return (
    <div className="mt-20">
      <div className="text-base font-bold">{title}</div>

      <div className='flex flex-wrap'>
        {
          members.map((item, index) => (
            <div className={`flex flex-row justify-center box-shadow relative w-150 h-80 text-center rounded-md mr-20 mt-15 rounded-md ${styles.item}`}>
              {
                editable &&
                <img className="absolute right-3 top-3 w-14 h-14" src={iconClose} alt="" onClick={() => { onRemove(item, index); }} />
              }
              <img className="w-50 h-50 rounded mt-15 ml-15" src={item.avatarUrl ?? defaultAvatar} alt="" />
              <div className={'flex flex-col items-center justify-center'}>
                <div className={`font-bold mt-5 ${styles.name}`} title={item.name ?? ''}>{item.name ?? ''}</div>
                <div className={`text-gray-600 ${styles.org_name}`} title={item.choiceOrg ? item.choiceOrg.name : ''}>{item.choiceOrg ? item.choiceOrg.name : ''}</div>
              </div>
            </div>
          ))
        }
        {
          editable && members.length !== friends.length && <ChoiceDoctor members={members} friends={friends} role={title} handleChoice={handleChoice} onDoctorChoice={onDoctorChoice} onDoctorUnChoice={onDoctorUnChoice}>
            <div className={`flex items-center justify-center box-shadow w-80 h-80 rounded-md mt-15 ${styles.item}`}>
              <img src={iconAdd} alt="" />
            </div>
          </ChoiceDoctor>
        }
      </div>
    </div>
  );
};

export default Member;




interface ITeamMemberProps {

  team: any;
}

export const TeamMember: FC<ITeamMemberProps> = ({ team }) => {


  const getDoctorMember = (members) => {

    const roles = [Role.CRO_CRC.id, Role.CRO_CRA.id, Role.CRO_PM.id, Role.RESEARCH_PROJECT_DOCTOR.id];
    const result = members.filter((memb) => roles.includes(memb.role));

    console.log('============= members', JSON.stringify(members));

    console.log('============= getDoctorMember', JSON.stringify(result));
    return result;
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
      } else if (item.role == Role.RESEARCH_PROJECT_DOCTOR.id) {
        return '研究者';
      }
    }).join(' ');
  };

  const getChoiceOrgName = (members: any[]) => {

    // const roles = [Role.CRO_CRC.id, Role.CRO_CRA.id, Role.CRO_PM.id];
    return members.map((item) => {

      if (item.role == Role.ORG.id) {
        return item.name;
      }
    }).join(' ');
  };


  return (
    <div className='flex flex-wrap'>
      {
        team.innerTeams.map((innerTeam) => {

          return (<div className='text-center text-base mx-40'>
            <p className={styles.avatar}><img src={getDoctorMember(innerTeam.members)[0]?.avatarUrl ?? avatar} /></p>
            <p className='font-bold mb-5 mt-20'>{getDoctorMember(innerTeam.members)[0]?.name}</p>
            <p className='text-sm'>{getDesRoles(innerTeam.members)}</p>
            <p className='text-sm mb-30'>{getChoiceOrgName(innerTeam.members)}</p>
          </div>);
        })
      }
    </div>
  );
};
