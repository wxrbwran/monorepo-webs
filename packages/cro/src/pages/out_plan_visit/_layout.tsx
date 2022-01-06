import React, { FC, useEffect } from 'react';
import { history } from 'umi';
import styles from './index.scss';

interface IProps {
  location: {
    pathname: string;
  }
}
const OutPlanVisitLayout: FC<IProps> = ({ children, location }) => {
  console.log('locationlocation', location);
  const handleGo = (urlName: string) => {
    history.push(`/out_plan_visit/${urlName}`);
  };
  useEffect(() => {
    handleGo('subjective');
  }, []);
  const scaleType = [
    { title: '主观量表', key: 'subjective' },
    { title: '客观检查', key: 'objective' },
    { title: 'CRF量表', key: 'crf' },
  ];
  return (
    <div className={styles.out_plan_visit}>
      <div className={styles.tabs}>
        {
          scaleType.map(item => (
            <div
              key={item.key}
              onClick={() => handleGo(item.key)}
              className={location.pathname.includes(item.key) ? styles.active_tab : ''}
            >
                {item.title}
            </div>
          ))
        }
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default OutPlanVisitLayout;
