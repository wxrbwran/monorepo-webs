import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import styles from './index.scss';

const OrgStaffs: FC = () => {
  const dispatch = useDispatch();
  const system = useSelector((state: IState) => state.system);
  useEffect(() => {
    // if (system.roleCount.length === 0) {
    dispatch({ type: 'system/getCount' });
    // }
  }, []);
  return (
    <div className={styles.staffs}>
      {system.roleCount.map((role) => (
        <div className={styles.item} key={role.id}>
          <span className={styles.name}>{`${role.desc}：`}</span>
          <span className={styles.count}>{role.count}</span>
        </div>
      ))}
    </div>
  );
};

export default OrgStaffs;
