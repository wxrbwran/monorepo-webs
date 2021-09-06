import React, { FC } from 'react';
import { useSelector } from 'umi';
import { addtionalMenuList } from '@/utils/consts';
import styles from './index.scss';

const DepartmentGroupBanner: FC = () => {
  const currentOrg = useSelector((state: IState) => state.org.currentOrg);
  const orgMenu = useSelector((state: IState) => state.org_menu);
  let name = '';
  if (orgMenu.type === 'department') {
    name = orgMenu.department?.name;
  } else if (orgMenu.type === 'group') {
    name = addtionalMenuList[orgMenu.group];
  }
  return <div className={styles.banner}>{`${currentOrg.orgBase.name} - ${name}`}</div>;
};
export default DepartmentGroupBanner;
