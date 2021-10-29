import React, { FC } from 'react';
import iconClose from '@/assets/img/icon_close.png';
import iconAdd from '@/assets/img/icon_add_large.png';
import ChoiceDoctor from '../ChoiceDoctor';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import styles from './index.scss';

interface IMemberProps {

  title: string;
  members: any[];
  editable: boolean;
  friends: any[];
  handleChoice?: (choices: any[]) => void;
  onRemove?: (item: any, index: number) => void;
}
const Member: FC<IMemberProps> = ({ title, members, editable, friends, handleChoice, onRemove }) => {

  console.log('======fetchDoctorFriends==', JSON.stringify(members));


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
              <div className={`text-gray-600 ${styles.org_name}`} title="xxx">{item.orgs ? item.orgs.map((it) => it.name).join(' ') : ''}</div>
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



