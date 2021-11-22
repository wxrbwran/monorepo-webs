import React, { useState, useEffect } from 'react';
import UserInfoCard from './UserInfoCard';
import UserInfoEdit from './UserInfoEdit';
import { useSelector } from 'umi';
import { IState } from 'packages/doctor/typings/model';

interface IProps {
  onClose: () => void;
}
function UserInfo({ onClose }: IProps) {
  const { userInfo, loginCount } = useSelector((state: IState) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (loginCount === 1) {
      setIsEdit(true);
    }
  }, [userInfo, loginCount]);
  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      {
        isEdit
          ? <UserInfoEdit toggleEdit={handleToggleEdit} />
          : <UserInfoCard handleToggleEdit={handleToggleEdit} onClose={onClose} />
      }
    </div>
  );
}

export default UserInfo;
