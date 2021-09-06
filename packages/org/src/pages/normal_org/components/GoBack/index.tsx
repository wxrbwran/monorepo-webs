import React from 'react';
import { Button } from 'antd';
import { history, useDispatch } from 'umi';
import { RollbackOutlined } from '@ant-design/icons';
import styles from './index.scss';

const GoBack = () => {
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch({
      type: 'org_menu/changeOrgMenu',
      payload: {
        type: 'org',
        department: {},
        group: '',
      },
    });
    history.push('/root_org');
  };
  return (
    <div className={styles.back}>
      <Button
        onClick={handleBack}
        icon={<RollbackOutlined />}
        shape="round"
        size="large"
      >
        返回
      </Button>
    </div>
  );
};

export default GoBack;
