import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';

import { Select, Form } from 'antd';

const { Option } = Select;
function Organization() {
  const filterOrgs: ISubject[] = useSelector((state: IState) => state.user.filterOrgs);
  const [selectOrgList, setSelectOrgList] = useState<ISubject[]>(filterOrgs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'user/getUserOrganizations',
      payload: { },
    });
  }, []);
  useEffect(() => {
    if (filterOrgs) {
      setSelectOrgList(filterOrgs);
    }
  }, [filterOrgs]);
  return (
    <Form.Item noStyle name="organization">
      <Select placeholder="全部机构">
        <Option value="">全部机构</Option>
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
