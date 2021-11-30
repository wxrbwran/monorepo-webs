import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { Role } from 'xzl-web-shared/src/utils/role';

import { Select, Form } from 'antd';
import { IOrgTeams } from 'packages/doctor/typings/global';
interface IProps {
  type: 'org' | 'croproject';
}
interface IOrgInfo {
  org: ISubject[],
  croProject: ISubject[],
}
const { Option } = Select;
function PatientOrgs(props: IProps = { type: 'org' } ) {
  const { type } = props;
  const typeObj = {
    'org': { title: '全部机构' },
    'croProject': { title: '全部项目' },
  };
  const [selectOrgList, setSelectOrgList] = useState<IOrgInfo>({ org: [], croProject: [] });
  useEffect(() => {
    api.doctor.getPatientOrgs().then(res => {
      const croProject: ISubject[] = [];
      const org: ISubject[] = [];
      res.teams.forEach((item: IOrgTeams) => {
        item.members.forEach((member: ISubject) => {
          if (member.role === Role.ORG.id) {
            org.push({
              ...member,
              nsId: item.teamNSId,
            });
          } else if (member.role === Role.RESEARCH_PROJECT.id) {
            croProject.push({
              ...member,
              nsId: item.teamNSId,
            });
          }
        });
      });
      setSelectOrgList({
        org,
        croProject,
      });
    });
  }, []);
  return (
    <Form.Item noStyle name="organization">
      <Select placeholder={typeObj[type].title}>
        <Option value="">{typeObj[type].title}</Option>
        {
        selectOrgList[type].map(({ nsId, name, wcId }) => (
          <Option value={nsId} title={name} key={wcId}>
            {name}
          </Option>
        ))
      }
      </Select>
    </Form.Item>
  );
}
export default PatientOrgs;
