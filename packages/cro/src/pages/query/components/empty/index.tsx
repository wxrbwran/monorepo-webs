import { Result } from 'antd';
import React from 'react';
import errorIcon from '@/assets/img/empty.png';
import styles from './index.scss';

const Empty: React.FC<{}> = () => (
    <div className={styles.search_empty}>
      <Result
        subTitle={
          <div className={styles.subtitle}>
            <p className={styles.top}>暂无结果</p>
            <p>温馨提示：请检查您的查询条件是否正确</p>
            <p>如有任何意见或建议，请及时反馈给我们</p>
          </div>
        }
        icon={
          <img style={{ width: 100, height: 100 }} src={errorIcon} alt="" />
        }

      />
    </div>

);

export default Empty;
