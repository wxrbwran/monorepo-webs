import React, { useState, useEffect } from 'react';
import { useSelector } from 'umi';

import { Select, Form } from 'antd';
interface IProps {
  type: 'org' | 'croproject';
}
const { Option } = Select;
function Organization(props: IProps = { type: 'org' } ) {
  const { type } = props;
  const typeObj = {
    'org': { title: '全部机构',  storeKey: 'filterOrgs' },
    'croProject': { title: '全部项目',  storeKey: 'croProjectList' },
  };
  const filterOrgs: ISubject[] = useSelector((state: IState) => state.user[typeObj[type].storeKey]);
  const [selectOrgList, setSelectOrgList] = useState<ISubject[]>(filterOrgs);
  useEffect(() => {
    if (filterOrgs) {
      setSelectOrgList(filterOrgs);
    }
  }, [filterOrgs]);
  return (
    <Form.Item noStyle name="organization">
      <Select placeholder={typeObj[type].title}>
        <Option value="">{typeObj[type].title}</Option>
        {
        selectOrgList.map(({ nsId, name, wcId }) => (
          <Option value={nsId} title={name} key={wcId}>
            {name}
          </Option>
        ))
      }
      </Select>
    </Form.Item>
  );
}
export default Organization;
