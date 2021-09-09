import React, { useEffect } from 'react';
import {history} from 'umi';
// import styles from './index.scss';

export default () => {
  useEffect(() => {
    history.replace(`/end_event/define`);
  },[])
  return (
    <div> </div>
  );
}
