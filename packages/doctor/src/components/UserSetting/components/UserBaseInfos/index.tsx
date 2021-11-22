import React, { useState } from 'react';
import { useSelector } from 'umi';
import { Input } from 'antd';
import moment from 'moment';
import { basicInfoTab } from '@/utils/tools';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import UserAvatar from '../../components/UserAvatar';
import { IState } from 'packages/doctor/typings/model';
import telIcon from '@/assets/img/icon_tel.png';
import titlesIcon from '@/assets/img/icon_titles.png';
import peopleIcon from '@/assets/img/icon_people.png';
import './index.scss';

interface IProps {
  userInfo: ISubject;
}
function UserBaseInfos({ userInfo }: IProps) {
  const {
    name, tel, title, practiceAreas, mentor,
    belongToGroup, qcCode, qcIssuingDate, pcCode, pcIssuingDate, biography, expertise,
    achievement, meetingLecture, firstProfessionBrief, bankName, bankCardNum, roleTags,
  } = userInfo;
  const { filterOrgs } = useSelector((state: IState) => state.user);
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
      <div className="flex">
        <UserAvatar avatarUrl={userInfo.avatarUrl || defaultAvatar} status={userInfo.status} />
        <div>
          <div className="text-lg mt-8">{name}</div>
          <div className="flex mb-3 mt-5">
            <div className="flex items-center justify-start">
              <img className="w-14 h-14 mr-2" src={telIcon} />
              <span>手机号: {tel}</span>
            </div>
            <div className="flex items-center ml-40 mr-40">
              <img className="w-14 h-14 mr-2" src={peopleIcon} />
              <span>职称: {title || '--'}</span>
            </div>
            <div className="flex items-center">
              <img className="w-14 h-14 mr-2" src={titlesIcon} />
              <span>导师: {mentor}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="infos__base">
        <div className="flex">
          <div className="w-112 text-right" style={{ flex: '0 0 112px' }}>执业医院和科室：</div>
          <div>
            {
              practiceAreas?.length > 0 ? (
                practiceAreas.map(item => {
                  return (
                    <span className="mr-10">{item.name}-{item.sub.name}</span>
                  );
                })
              ) : '--'
            }
          </div>
        </div>
        <div className="flex">
          <div className="w-112 text-right whitespace-nowrap">所在互联网医院：</div>
          <div>
            {/* <span>心之力</span> */}
            {
              filterOrgs?.map((item: { name: string, nsId: string }) => {
                return (
                  <span key={item.nsId} className={'mr-20'}>{item.name}</span>
                );
              })
            }
          </div>
        </div>
        <div className="flex">
          <div className="w-112 text-right">所属医生集团：</div>
          <div>
            <span>{belongToGroup || '--'} </span>
          </div>
        </div>
        <div className="flex">
          <div className="w-112 text-right">角色标签：</div>
          <div>
            {
              roleTags?.length > 0 ? roleTags.map((item: string) => <span className='infos__base__tags'>{item}</span>) : '--'
            }
          </div>
        </div>
        <div className="flex">
          <div className="w-112 text-right">银行卡号：</div>
          <div>
            {bankCardNum || '--'}
            { bankName ? ` - ${bankName}` : null }
          </div>
        </div>
        <div className="flex">
          <div className="w-112 text-right">资格证书编码：</div>
          <div>
            {`${qcCode || '--'} ${qcCode && qcIssuingDate ? '-' : ''} 发证日期：${qcIssuingDate ? moment(qcIssuingDate).format('YYYY-MM-DD') : '--'}`}

          </div>
        </div>
        <div className="flex">
          <div className="w-112 text-right">执业证书编码：</div>
          <div>
            {`${pcCode || '--'} ${pcCode && pcIssuingDate ? '-' : ''} 发证日期：${pcIssuingDate ? moment(pcIssuingDate).format('YYYY-MM-DD') : '--'}`}
          </div>
        </div>
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
            style={{ width: '900px', height: 88, padding: 0, margin: 0, border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
export default UserBaseInfos;
