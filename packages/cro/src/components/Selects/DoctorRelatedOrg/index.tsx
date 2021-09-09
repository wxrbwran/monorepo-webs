import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { Select, Form } from 'antd';
import { useSelector } from 'umi';
import styles from '../index.scss';
import { IState, ISubject } from 'typings/global';
import { Role } from '@/utils/role';

const { Option } = Select;
interface IOrg {
  name: string;
  orgNsId: string;
}
interface ITeam {
  members: ISubject[];
  teamNSId: string;
}
function DoctorRelatedOrg() {
  const [selectOrgList, setSelectOrgList] = useState<ISubject[]>([]);
  useEffect(() => {
    const params = {sid: localStorage.getItem('xzl-web-doctor_sid')};
    api.research.fetchDoctorRelatedOrg(params).then((res: {teams: ITeam[]}) => {
      const organizations: ISubject[] = [];
      res.teams.forEach((item) => {
        item.members.forEach((member:ISubject) => {
          if (member.role === Role.ORG.id) {
            organizations.push({
              ...member,
              nsId: item.teamNSId,
            });
          }
        });
      });
      setSelectOrgList(organizations)
    })
    // fetchDoctorRelatedOrg
  }, []);

  return (
    <div className={styles.org_select}>
      <Form.Item noStyle name="orgId">
        <Select placeholder="全部机构" style={{ width: 106 }}>
          <Option value="">全部机构</Option>
          {
          selectOrgList.map(({ nsId, name, id }) => (
            <Option value={nsId} title={name} key={id}>
            {name}
          </Option>
          ))
        }
        </Select>
      </Form.Item>
    </div>
  );
}
export default DoctorRelatedOrg;
