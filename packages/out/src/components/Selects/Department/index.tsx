import React, { useState } from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;
const { Item } = Form;

function Department() {
  const [department, _setOrgList] = useState<ISubject[]>([]);
  // const handleChange = (val: string) => {
  //   setOrganization(val);
  //   const ageData = {
  //     var: 'cr.namespace',
  //     operator: '=',
  //     value: val,
  //   };
  //   if (val) {
  //     changeSelect(ageData, index);
  //   } else {
  //     deleteSelect(index);
  //   }
  // };

  // useEffect(() => {
  //   setOrganization(orgNsId);
  //   window.$api.doctor.getDoctorAllOrgs().then((res: { teams: ITeam[] }) => {
  //     const organizations: ISubject[] = [];
  //     res.teams.forEach((item) => {
  //       item.members.forEach((member: ISubject) => {
  //         organizations.push({
  //           ...member,
  //           nsId: item.teamNSId,
  //         });
  //       });
  //     });
  //     setOrgList(organizations);
  //   });
  // }, []);
  return (
    <Item noStyle name="department">
      <Select placeholder="请选择科室" style={{ width: 120 }} allowClear>
        <Option value="">全部科室</Option>
        {department.map(({ nsId, name, id }) => (
          <Option value={nsId} title={name} key={id}>
            {name}
          </Option>
        ))}
      </Select>
    </Item>
  );
}
export default Department;
