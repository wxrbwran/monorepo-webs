import React, { FC } from 'react';
import female from '@/assets/img/icon_female.svg';
import male from '@/assets/img/icon_male.svg';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import { isEmpty } from 'lodash';
import styles from './index.scss';

interface IProps {
  doctorData: ISubject;
  style?: object;
  doctorWorkOrg?: CommonData;
}
const MemberItem: FC<IProps> = ({ doctorData, style, doctorWorkOrg }) => {
  // 女  男
  const sexList = [female, male];
  const { name, practiceAreas, title, roleTags, orgs, sex, avatarUrl, sid } = doctorData;
  // 科室为多机构组合并去重得到, 互联网医院科室，不是执业科室
  const depList = practiceAreas ? [...new Set(practiceAreas.map(item => item?.sub?.name).filter(item => item !== undefined))] : [];
  const selectOrgNsId = doctorWorkOrg?.[sid];
  return (
    <div className={`mt-10 p-15 rounded-md ${styles.item}`} style={style}>
      <div className="flex items-start mb-14">
        <img className="w-60 h-60 mr-15 rounded-md" src={avatarUrl || defaultAvatar} />
        <div>
          <div className="flex items-center  mt-10">
            <span className="text-lg font-bold">{name}</span>
            { [0, 1].includes(sex) && <img src={sexList[sex]} /> }
          </div>
          <div className="text-gray-500">
            { depList.map(item => <span className="mr-5" key={item}>{item}</span>)}
            <span>{title && !isEmpty(depList) && '|' }</span>
            <span>{title ? `${title}` : ''}</span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className={`text-gray-500 mr-10 pt-2 ${styles.title}`}>角色标签:</div>
        <div>
          { roleTags && !!roleTags.length ? roleTags?.map(item => <span className={styles.role_tag} key={item}>{item}</span>) : '--'}
        </div>
      </div>
      <div className="flex my-12">
        <div className={`text-gray-500 mr-10 ${styles.title}`}>执业医院:</div>
        <div>
          { practiceAreas ? practiceAreas?.map(item => <span className="mr-20" key={item.standardId}>{item.name}</span>) : '--'}
        </div>
      </div>
      <div className="flex">
        <div className={`text-gray-500 mr-10 ${styles.title}`}>互联网医院:</div>
        <div>
          {
            orgs?.map((item: { name: string, nsId: string }) => {
              return (
                <span key={item.nsId} className={`mr-20 ${selectOrgNsId === item?.nsId ? 'text-blue-500' : ''}`}>{item.name}</span>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};
MemberItem.defaultProps = {
  style: {},
  doctorData: {},
};
export default MemberItem;
