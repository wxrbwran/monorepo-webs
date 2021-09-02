import React, { useState } from 'react';
import { Input } from 'antd';
import moment from 'moment';
import {
  sexList, basicInfoTab, hospitalLevel,
} from '@/utils/tools';
import './index.scss';

interface IProps {
  userInfo: ISubject;
}
function UserBaseInfos({ userInfo }: IProps) {
  const {
    name, sex, tel, title, workDepartment, mentor, firstProfessionCompany, level,
    belongToGroup, qcCode, qcIssuingDate, pcCode, pcIssuingDate, biography, expertise,
    achievement, meetingLecture, firstProfessionBrief, bankName, bankCardNum,
  } = userInfo;
  const [activeInfoTab, setActiveInfoTab] = useState('biography');
  const tabData:CommonData = {
    biography,
    expertise,
    achievement,
    meetingLecture,
    firstProfessionBrief,
  };
  console.log('userInfo12', userInfo);
  const changeActiveInfoTab = (tab: string) => {
    setActiveInfoTab(tab);
  };
  return (
    <div className="infos">
      <div className="infos__base">
        <span>{name}</span>
        {sex !== undefined && <span>{sexList[sex]}</span>}
        {title && <span>{title}</span>}
        {workDepartment
          && (
            <span>
              科室：
              {workDepartment}
            </span>
          )}
        {tel && (
          <span>
            手机：
            {tel}
          </span>
        )}
        <span>{mentor}</span>
      </div>
      <div className="infos__base">
        <span>
          第一执业医院：
          {firstProfessionCompany || '--'}
          {level ? hospitalLevel[level] : ''}
        </span>
        {belongToGroup && (
          <span>
            所属医生集团：
            {belongToGroup || '--'}
          </span>
        )}
        <span>
          所在互联网医院：
          心之力
        </span>
        {qcCode && (
          <p>
            <span>
              资格证书编码：
              {qcCode}
            </span>
            {qcIssuingDate && (
              <span>
                （发证日期：
                {moment(qcIssuingDate).format('YYYY-MM-DD')}
                ）
              </span>
            )}
          </p>
        )}
        {pcCode && (
          <p>
            <span>
              执业证书编码：
              {pcCode}
            </span>
            {pcIssuingDate && (
              <span>
                （发证日期：
                {moment(pcIssuingDate).format('YYYY-MM-DD')}
                ）
              </span>
            )}
          </p>
        )}
      </div>
      <div className="infos__introduction">
        <ul>
          {Object.keys(basicInfoTab).map((tab) => (
            <li
              key={tab}
              className={activeInfoTab === tab ? 'active' : ''}
              onClick={() => changeActiveInfoTab(tab)}
            >
              {basicInfoTab[tab]}
            </li>
          ))}
        </ul>
        <div>
          <Input.TextArea
            readOnly
            disabled
            value={tabData[activeInfoTab]}
            style={{
              width: '100%',
              height: 88,
              padding: 0,
              margin: 0,
              border: 'none',
            }}
          />
        </div>
      </div>
      <div className="infos__base">
        {/* <span>证件信息: 234234132434</span> */}
        <span>
          银行卡号：
          {bankCardNum}
          {
            bankName ? `(${bankName})` : null
          }
        </span>
      </div>
    </div>
  );
}
export default UserBaseInfos;
