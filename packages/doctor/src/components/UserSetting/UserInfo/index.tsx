import React, { useState } from 'react';
import UserInfoCard from './UserInfoCard';
import UserInfoEdit from './UserInfoEdit';

interface IProps {
  onClose: () => void;
}
function UserInfo({ onClose }: IProps) {
  const [isEdit, setIsEdit] = useState(true);
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
