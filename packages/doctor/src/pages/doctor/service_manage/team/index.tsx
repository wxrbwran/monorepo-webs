import React, { FC, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TeamAddMember from '../components/TeamAddMember';
import MemberItem from '../components/MemberItem';
import * as api from '@/services/api';

const Team: FC = () => {
  // const [friends, setfriends] = useState([]);
  useEffect(() => {
    api.service.fetchDoctorFriends().then(res => {
      console.log('好友', res.teams);
    });
  }, []);
  return (
    <div className="p-20 flex-auto">
      <TeamAddMember>
        <Button type="primary" icon={<PlusOutlined />}>添加成员</Button>
      </TeamAddMember>
      <div className="flex flex-wrap justify-between w-auto">
        <MemberItem />
        <MemberItem />
      </div>
    </div>
  );
};

export default Team;
