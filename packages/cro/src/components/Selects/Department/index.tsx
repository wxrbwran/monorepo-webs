import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { Select, Form } from 'antd';

const { Option } = Select;
interface IOrg {
  name: string;
  id: string;
}
interface IProps {
  orgId: string;
}
function Department({ orgId }: IProps) {
  const [selectDepList, setSelectDepList] = useState<IOrg[]>([]);
  useEffect(() => {
    if (orgId) {
      api.research.fetchProjectDep({
        orgId,
      }).then(res => {
        console.log('科室列表', res)
        setSelectDepList(res.infos);
      })
    } else {
      setSelectDepList([]);
    }
  }, [orgId]);

  return (
    <Form.Item noStyle name="depId">
      <Select placeholder="全部科室" style={{ width: 106 }}>
        <Option value="">全部科室</Option>
        {
          selectDepList.map(({ id, name }) => (
            <Option value={id} title={name} key={id}>
              {name}
            </Option>
          ))
        }
      </Select>
    </Form.Item>
  );
}
export default Department;
