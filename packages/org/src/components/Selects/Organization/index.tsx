import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

const { Option } = Select;
interface IProps {
  changeSelect: (val, index: number) => void;
  deleteSelect: (inx: number) => void;
  index: number;
  orgNsId: string;
}
interface ITeam {
  members: ISubject[];
  teamNSId: string;
}
function Organization(props: IProps) {
  const { changeSelect, deleteSelect, index, orgNsId } = props;
  const [organization, setOrganization] = useState<string>('');
  const [orgList, setOrgList] = useState<ISubject[]>([]);
  const handleChange = (val: string) => {
    setOrganization(val);
    const ageData = {
      var: 'cr.namespace',
      operator: '=',
      value: val,
    };
    if (val) {
      changeSelect(ageData, index);
    } else {
      deleteSelect(index);
    }
  };

  useEffect(() => {
    setOrganization(orgNsId);
    window.$api.doctor.getDoctorAllOrgs().then((res: { teams: ITeam[] }) => {
      const organizations: ISubject[] = [];
      res.teams.forEach((item) => {
        item.members.forEach((member: ISubject) => {
          organizations.push({
            ...member,
            nsId: item.teamNSId,
          });
        });
      });
      setOrgList(organizations);
    });
  }, []);
  return (
    <Select value={organization || ''} onChange={(value) => handleChange(value)}>
      {orgList.map(({ nsId, name, id }) => (
        <Option value={nsId} title={name} key={id}>
          {name}
        </Option>
      ))}
    </Select>
  );
}
export default Organization;
