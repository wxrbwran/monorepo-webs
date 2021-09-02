import React, { useState } from 'react';
import { Button } from 'antd';
import styles from '../index.scss';

interface IProps {
  handleToggleOrg: (org: Iorg) => void;
  orgList: Iorg[],
  type: string;
}
function OrgListBtn({ handleToggleOrg, orgList, type }: IProps) {
  const [activeOrgIndex, setActiveOrgIndex] = useState(0);
  console.log('orgList', orgList, type);
  const changeOrg = (index: number, org: Iorg) => {
    setActiveOrgIndex(index);
    handleToggleOrg(org);
  };
  return (
    <div className={styles.org_list}>
      {
        orgList.map((item, index) => (
          <Button
            className={index === activeOrgIndex ? 'active' : ''}
            onClick={() => changeOrg(index, item)}
            key={item.orgName}
          >
            {item.orgName}
          </Button>
        ))
      }
    </div>
  );
}

export default OrgListBtn;
