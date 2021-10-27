import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TeamAddMember from '../components/TeamAddMember';
import MemberItem from '../components/MemberItem';
import { handleRelatedDoctorsDataSource } from 'xzl-web-shared/src/components/XzlTable/util';
import * as api from '@/services/api';

const Team: FC = () => {
  const [friends, setfriends] = useState([]);
  const handleFetchFriends = () => {
    api.service.fetchDoctorFriends().then(res => {
      setfriends(handleRelatedDoctorsDataSource(res.teams));
    });
  };
  useEffect(() => {
    handleFetchFriends();
  }, []);
  return (
    <div className="p-20 flex-auto">
      <TeamAddMember handleRefresh={handleFetchFriends}>
        <Button type="primary" icon={<PlusOutlined />}>添加成员</Button>
      </TeamAddMember>
      <div className="flex flex-wrap justify-between w-auto">
        {
          friends.map((doctor: ISubject) => <MemberItem doctorData={doctor} />)
        }
      </div>
    </div>
  );
};

export default Team;
