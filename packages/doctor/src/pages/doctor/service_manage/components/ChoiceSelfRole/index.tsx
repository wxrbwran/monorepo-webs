import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { IState } from 'packages/doctor/typings/model';
import { Role } from 'xzl-web-shared/src/utils/role';

interface IProps {
  callback: (selectData: Object) => void;
}
interface ISelfInfo {
  sourceNSId: null | string;
  role: null | string;
  orgName: null | string;
}
const { Option } = Select;
function ChoiceSelfRole({ callback }: IProps) {
  const { filterOrgs, userInfo } = useSelector((state: IState) => state.user);
  const [selectOrgList, setSelectOrgList] = useState<ISubject[]>(filterOrgs);
  const [selfInfo, setselfInfo] = useState<ISelfInfo>({ sourceNSId: null, role: null, orgName: null });
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
  const handleChangeOrg = (type: string, val: Object, option?: { title: string }) => {
    console.log('checkVal', type, val);
    // callback('org', val);
    const newData: ISelfInfo = {
      ...selfInfo,
      [type]: val,
    };
    if (option) {
      newData.orgName = option.title;
    }
    setselfInfo(newData);
    if (newData.sourceNSId && newData.role) {
      callback({
        ...newData,
        sid: window.$storage.getItem('sid'),
        avatarUrl: userInfo.avatarUrl,
        name: userInfo.name,
      });
    }
  };

  return (
    <div className="mt-15">
      <span className="mr-15">我在</span>
      <Select placeholder="请选择机构" onChange={(val, option) => handleChangeOrg('sourceNSId', val, option)}  style={{ width: 240 }}>
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
        <Option value={Role.UPPER_DOCTOR.id}>主管医生</Option>
        <Option value={Role.LOWER_DOCTOR.id}>医生助手</Option>
        <Option value={Role.DIETITIAN.id}>营养师</Option>
      </Select>
      <span className="ml-20">角色管理患者</span>
    </div>

  );
}
export default ChoiceSelfRole;
