import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddTeamMember from '../components/AddTeamMember';
import MemberItem from '../components/MemberItem';
import { handleRelatedDoctorsDataSource } from 'xzl-web-shared/dist/components/XzlTable/util';
import * as api from '@/services/api';

const Team: FC = () => {
  const [friends, setfriends] = useState([]);
  const doctorSid = window.$storage.getItem('sid');
  const handleFetchFriends = () => {
    api.service.fetchDoctorFriends().then(res => {
      setfriends(handleRelatedDoctorsDataSource(res.teams));
    });
  };
  useEffect(() => {
    handleFetchFriends();
  }, []);
  return (
    <div className="p-20 flex-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 58px)' }}>
      <AddTeamMember handleRefresh={handleFetchFriends}>
        <Button type="primary" icon={<PlusOutlined />}>添加成员</Button>
      </AddTeamMember>
      <div className="flex flex-wrap justify-between w-auto">
        {
          friends.filter(item => item?.sid !== doctorSid)
            .map((doctor: ISubject) => <MemberItem style={{ width: '49.5%' }} doctorData={doctor} />)
        }
      </div>
    </div>
  );
};

export default Team;
