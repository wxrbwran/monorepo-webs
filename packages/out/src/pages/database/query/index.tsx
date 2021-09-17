import React from 'react';
import { Button, message } from 'antd';
import { history } from 'umi';
import QueryCondition from './components/QueryCondition';
import QueryHistory from './components/QueryHistory';
import styles from './index.scss';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

function Query() {
  // 1:未搜索时ui, 2: 点击搜索后ui  3: 点击继续搜索后ui。根据此状态，判断显示哪些ui

  const base = useSelector((state: IQuery)=>state.query.base);
  const images = useSelector((state: IQuery)=>state.query.images);
  const other = useSelector((state: IQuery)=>state.query.other);

  const go2Result = () => {
    if (isEmpty(base) && isEmpty(images) && isEmpty(other)) {
      message.error('请选择搜索条件')
    } else {
      history.replace(`/database/query/result`);
    }
  }

  return (
    <div className={styles.query}>
      <QueryCondition searchStatus={1}/>
      <div className={styles.head}>
        <Button type="primary" onClick={go2Result}>查询</Button>
        <QueryHistory>
          <Button className={styles.search_history}>查询历史</Button>
        </QueryHistory>
      </div>
    </div>
  )
}

export default Query;
