import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Select, Form } from 'antd';
import * as api from '@/services/api';

const { Option } = Select;
function Organization() {
  const [depList, setDepLists] = useState([]);
  const filterOrgs: ISubject[] = useSelector((state: IState) => state.user.filterOrgs);
  const { isLogin } = useSelector((state: IState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin) {
      dispatch({
        type: 'user/getUserOrganizations',
        payload: { },
      });
    }
  }, [isLogin]);
  const handleChangeOrg = (val: string) => {
    if (val) {
      api.doctor.getNurseDeps(val).then((res) => {
        setDepLists(res.list);
      })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      setDepLists([]);
    }
  };
  return (
    <>
      <Form.Item noStyle name="organization">
        <Select
          placeholder="全部医院"
          style={{ width: 130, marginRight: 10 }}
          onChange={handleChangeOrg}
        >
          <Option value="">全部医院</Option>
          {
          filterOrgs.map(({ nsId, name, wcId }) => (
            <Option value={nsId} title={name} key={wcId}>
              {name}
            </Option>
          ))
        }
        </Select>
      </Form.Item>
      <Form.Item noStyle name="department">
        <Select placeholder="全部科室" style={{ width: 130 }}>
          <Option value="">全部科室</Option>
          {
          depList.map(({ nsId, name }) => (
            <Option value={nsId} title={name} key={nsId}>
              {name}
            </Option>
          ))
        }
        </Select>
      </Form.Item>
    </>
  );
}
export default Organization;
