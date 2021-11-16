import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { IState } from 'packages/doctor/typings/model';
import { Role } from 'xzl-web-shared/src/utils/role';
import { isEmpty } from 'lodash';

interface IProps {
  callback: (selectData: Object) => void;
  initData: {
    role: string;
    sourceNSId: string;
    orgName: string;
  };
}
interface ISelfInfo {
  sourceNSId: null | string;
  role: null | string;
  orgName: null | string;
}
const { Option } = Select;
function ChoiceSelfRole({ callback, initData }: IProps) {
  const { filterOrgs, userInfo } = useSelector((state: IState) => state.user);
  const [selectOrgList, setSelectOrgList] = useState<ISubject[]>(filterOrgs);
  const [selfInfo, setselfInfo] = useState<ISelfInfo>(initData);
  const handleChangeOrg = (type: string, val: Object, option?: { title: string }) => {
    const newData: ISelfInfo = { ...selfInfo, [type]: val };
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
  useEffect(() => {
    if (filterOrgs) {
      setSelectOrgList(filterOrgs);
      if (!initData?.sourceNSId && filterOrgs.length === 1) {
        const { nsId, name } = filterOrgs?.[0];
        handleChangeOrg('sourceNSId', nsId, { title: name });
      }
    }
  }, [filterOrgs]);
  // 如果只有一个机构，默认选中
  let initOrgNsId: any = initData?.sourceNSId;
  if (!initData?.sourceNSId && filterOrgs.length === 1) {
    initOrgNsId = filterOrgs[0]?.nsId;
  }
  return (
    <div className="mt-15">
      {
        !!isEmpty(initData) && (
          <>
            <span className="mr-15">我在</span>
              <Select
                placeholder="请选择机构"
                defaultValue={initOrgNsId}
                onChange={(val, option) => handleChangeOrg('sourceNSId', val, option)}
                style={{ width: 240 }}
                // disabled={!!initData.sourceNSId}
              >
                {
                  selectOrgList.map(({ nsId, name, wcId }) => (
                    <Option value={nsId} title={name} key={wcId}>
                      {name}
                    </Option>
                  ))
                }
              </Select>
          </>
        )
      }
      <span className="mx-15">以</span>
      <Select placeholder='请选择角色' defaultValue={initData.role} style={{ width: 240 }} onChange={(val) => handleChangeOrg('role', val)}>
        <Option value={Role.UPPER_DOCTOR.id}>主管医生</Option>
        <Option value={Role.LOWER_DOCTOR.id}>医生助手</Option>
        <Option value={Role.DIETITIAN.id}>营养师</Option>
      </Select>
      <span className="ml-20">角色管理患者</span>
    </div>

  );
}
export default ChoiceSelfRole;
