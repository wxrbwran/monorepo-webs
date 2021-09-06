import React from 'react';
import {projectDefaultImg} from '@/utils/consts';
import { Tooltip } from 'antd';
import styles from './index.scss';

interface IProps {
  data: any;
  className?: string;
}
function ProjectItem({ data }: IProps) {
  return (
    <div className={`${styles.proj_item} ${styles[data.className]}`}>
      <p>
        <span className={styles.proj_name}>{data.name}</span>
        <img src={data.detail.avatarUrl ? data.detail.avatarUrl : projectDefaultImg[0]} />
      </p>
      <div>
        <div className={styles.desc}>
          <span className={styles.tit}>发起人:</span>
          <span>{data.creatorName}</span>
        </div>
        <div className={`${styles.tit} mb-2 mt-20`}>项目简介:</div>
        <Tooltip title={data.detail.intro}>
          <div className={`${styles.info}`}>{data.detail.intro || '暂无'}</div>
        </Tooltip>
      </div>
    </div>
  )
}
export default ProjectItem;
