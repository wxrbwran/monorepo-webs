import React, { FC } from 'react';
import iconClose from '@/assets/img/icon_close.png';
import iconAdd from '@/assets/img/icon_add_large.png';
import ChoiceDoctor from '../ChoiceDoctor';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import { Role } from 'xzl-web-shared/src/utils/role';
import styles from './index.scss';
import avatar from '@/assets/img/default_project.png';
interface IMemberProps {

  title: string;
  members: any[];
  editable: boolean;
  friends: any[];
  handleChoice?: (choices: any[]) => void;
  onRemove?: (item: any, index: number) => void;
}
const Member: FC<IMemberProps> = ({ title, members, editable, friends, handleChoice, onRemove }) => {

  console.log('======fetchDoctorFriends==', JSON.stringify(friends));


  return (
    <div className="mt-20">
      <div className="text-base font-bold mb-10">{title}</div>

      <div className="flex flex-wrap">
        {
          members.map((item, index) => (
            <div className="box-shadow relative w-160 h-188 text-center rounded-md mr-20">
              {
                editable &&
                <img className="absolute right-10 top-10 w-14" src={iconClose} alt="" onClick={() => { onRemove(item, index); }} />
              }
              <img className="w-80 h-80 rounded mt-30" src={item.avatarUrl ?? defaultAvatar} alt="" />
              <div className="text-lg font-bold mt-5">{item.name ?? ''}</div>
              {/* <div className={`text-gray-600 ${styles.org_name}`} title="xxx">{item.orgs ? item.orgs.map((it) => it.name).join(' ') : ''}</div> */}
            </div>
          ))
        }
        {
          editable && members.length !== friends.length && <ChoiceDoctor members={members} friends={friends} role="助手" handleChoice={handleChoice}>
            <div className="flex items-center justify-center box-shadow w-160 h-188 rounded-md">
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

    // SPACE_CREATOR
    const roles = [Role.CRO_CRC.id, Role.CRO_CRA.id, Role.CRO_PM.id, Role.SPACE_CREATOR.id];
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
      } else if (item.role == Role.SPACE_CREATOR.id) {
        return '研究者';
      }
    }).join(' ');
  };

  return (
    <div className='flex'>
      {
        team.innerTeams.map((innerTeam) => {

          return (<div className='text-center text-base mx-40'>
            <p className={styles.avatar}><img src={getDoctorMember(innerTeam.members)[0].avatarUrl ?? avatar} /></p>
            <p className='font-bold mb-5 mt-20'>{getDoctorMember(innerTeam.members)[0].name}</p>
            <p className='text-sm'>{getDesRoles(innerTeam.members)}</p>
          </div>);
        })
      }
    </div>
  );
};
