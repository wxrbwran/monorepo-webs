import React, { FC, useMemo } from 'react';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import styles from '../PackageTeamItem/index.scss';
import { Role, fetchRolePropValue } from 'xzl-web-shared/src/utils/role';
interface IProps {
  members:  ISubject[];
}
const PackageDoctorItem: FC<IProps> = (props) => {
  const { members } = props;
  const renderItem = useMemo(() => () => {
    console.log('members322', members);
    let isCreator = false;
    let doctorName = '';
    let roles: string[] = [];
    let orgName = '';
    let avatarUrl = defaultAvatar;
    members.forEach(member => {
      switch (member.role) {
        case Role.NS_OWNER.id:
          isCreator = true;
          break;
        case Role.ORG.id:
          orgName = member.name!;
          break;
        default:
          doctorName = member.name!;
          avatarUrl = member.avatarUrl || defaultAvatar;
          roles.push(fetchRolePropValue(member.role, 'desc'));
          break;
      }
    });
    console.log('orgName', orgName);
    return (
      <div className="text-center mb-15 w-160">
        <div className="relative w-100 mx-auto">
          <img className="w-100 h-100 rounded" src={avatarUrl} />
          {isCreator && <div className={styles.creator}>创建人</div>}
        </div>
        <div className="mt-10 text-base font-bold line-ellipsis w-160" title={doctorName}>{doctorName}</div>
        <div className="text-gray-600 text-sm">
          {
            roles.map(role => <span className="ml-3 mr-3" key={role}>{role}</span>)
          }
        </div>
        <div className="text-gray-600 text-sm line-ellipsis w-160" title={orgName}>{orgName}</div>
      </div>
    );
  }, [members]);
  return (
    <>
      { renderItem() }
    </>
  );
};

export default PackageDoctorItem;
