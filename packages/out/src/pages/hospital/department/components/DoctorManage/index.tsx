/**
 * Created by wuxiaoran on 2018/11/12.
 */
import type { FC } from 'react';
import React from 'react';
import { useSelector } from 'umi';
import { doctorList, svg } from './consts';
import './index.scss';

const DoctorManage: FC = () => {
  const roleCount = useSelector((state: IState) => state.system.roleCount);
  console.log('roleCount', roleCount);
  return (
    // const { adminChatType } = this.props;
    <>
      <ul className="data__frame">
        {Object.keys(doctorList).map((list) => (
          <li className="data__frame-doctor" key={list}>
            <h3>
              <img src={svg[`${list}Svg`]} alt="" />
              {doctorList[list]}
            </h3>
            <p>{roleCount.filter((role) => role.key === list)[0]?.count}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default DoctorManage;
