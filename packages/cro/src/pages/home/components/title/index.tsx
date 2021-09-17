import React from 'react';
import styles from './index.scss';

interface IProps {
  name: string;
  time: string;
}
function Title(props: IProps) {
  return (
    <div className={styles.charts_title}>
      <span className={styles.name}>{props.name}</span>
      {/* <span className={styles.time}>更新时间：{props.time}</span> */}
    </div>
  )
}

export default Title;