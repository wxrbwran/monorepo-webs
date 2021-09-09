import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { Select, Form } from 'antd';
import { useSelector } from 'umi';
import styles from '../index.scss';
import { IState } from 'typings/global';

const { Option } = Select;
interface IOrg {
  name: string;
  orgNsId: string;
}
function Organization() {
  const [selectOrgList, setSelectOrgList] = useState<IOrg[]>([]);
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  useEffect(() => {
    api.research.fetchProjectOrg(projectNsId).then(res => {
      console.log('机构列表', res)
      setSelectOrgList(res.infos)
    })
  }, []);

  return (
    <div className={styles.org_select}>
      <Form.Item noStyle name="orgId">
        <Select placeholder="全部机构" style={{ width: 106 }}>
          <Option value="">全部机构</Option>
          {
          selectOrgList.map(({ orgNsId, name }) => (
            <Option value={orgNsId} title={name} key={orgNsId}>
              {name}
            </Option>
          ))
        }
        </Select>
      </Form.Item>
    </div>
  );
}
export default Organization;
