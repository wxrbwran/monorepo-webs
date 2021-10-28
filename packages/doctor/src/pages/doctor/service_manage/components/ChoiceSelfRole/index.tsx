import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { IState } from 'packages/doctor/typings/model';

interface IProps {
  callback: (selectData: Object) => void;
}
const { Option } = Select;
function ChoiceSelfRole({ callback }: IProps) {
  const filterOrgs: ISubject[] = useSelector((state: IState) => state.user.filterOrgs);
  const [selectOrgList, setSelectOrgList] = useState<ISubject[]>(filterOrgs);
  const [selfInfo, setselfInfo] = useState({ org: null, role: null });
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
  const handleChangeOrg = (type: string, val: Object) => {
    console.log('checkVal', type, val);
    // callback('org', val);
    const newData = {
      ...selfInfo,
      [type]: val,
    };
    setselfInfo(newData);
    if (newData.org && newData.role) {
      callback(newData);
    }
  };

  return (
    <div className="mt-15">
      <span className="mr-15">我在</span>
      <Select placeholder="请选择机构" onChange={(val) => handleChangeOrg('org', val)}  style={{ width: 240 }}>
        {
        selectOrgList.map(({ nsId, name, wcId }) => (
          <Option value={nsId} title={name} key={wcId}>
            {name}
          </Option>
        ))
      }
      </Select>
      <span className="mx-15">以</span>
      <Select placeholder='请选择角色' style={{ width: 240 }} onChange={(val) => handleChangeOrg('role', val)}>
        <Option value="主管医生">主管医生</Option>
        <Option value="医生助手">医生助手</Option>
        <Option value="营养师">营养师</Option>
      </Select>
      <span className="ml-20">角色管理患者</span>
    </div>

  );
}
export default ChoiceSelfRole;
