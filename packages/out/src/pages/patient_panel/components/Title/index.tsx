import React from 'react';
import styles from './index.scss';

interface Iprops {
  text: string;
}
function Title({ text }: Iprops) {
  return (
    <div className={styles.title}>
      <h3>{text}</h3>
    </div>
  );
}

export default Title;
