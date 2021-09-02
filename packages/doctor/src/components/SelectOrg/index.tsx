import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import * as api from '@/services/api';

const { Option } = Select;

interface IProps {
  callback: (keyName: string, value: string) => void;
  defaultOrgId: string;
}
interface IOrgItem {
  name: string;
  id: string;
  nsId: string;
}
function SelectOrg({ callback, defaultOrgId }: IProps) {
  const [organizationId, setOrganizationId] = useState(defaultOrgId);
  const [orgList, setOrgList] = useState<IOrgItem[]>([]);

  useEffect(() => {
    setOrganizationId(defaultOrgId);
  }, [defaultOrgId]);

  useEffect(() => {
    // getDoctorOrgs
    api.doctor.getDoctorOrgs().then((res) => {
      setOrgList(res.results);
    });
  }, []);

  const handleChangeOrg = (value: string) => {
    setOrganizationId(value);
    callback('organizationId', value);
  };
  return (
    <Select
      value={organizationId || ''}
      onChange={handleChangeOrg}
    >
      <Option value="">全部机构</Option>
      {
        orgList.map(({ nsId, name, id }) => (
          <Option value={nsId} title={name} key={id}>
            {name}
          </Option>
        ))
      }
    </Select>
  );
}

export default SelectOrg;
