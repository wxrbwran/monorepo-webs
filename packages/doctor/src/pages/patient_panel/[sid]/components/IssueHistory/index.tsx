import React, { useEffect, useMemo, useState } from 'react';
// import DoctorRemind from '@/components/DoctorRemind';
import { useParams, useDispatch, useSelector } from 'umi';
import { Pagination } from 'antd';
import noProblem from '@/assets/img/noProblem.png';
import { itemRender } from '@/utils/pager';
import config from '@/config';
import Medicine from './Medicine';
import Inspection from './Inspection';
import MedicalRecords from './MedicalRecords';
import IssueTime from '../IssueContent/IssueTime';
import styles from './index.scss';

function IssueHistory() {
  const { sid } = useParams<{ sid: string }>();
  const dispatch = useDispatch();
  const [pageAt, setPageAt] = useState(1);
  const [total, setTotal] = useState(0);
  const { issueHistoryList, issueHistoryPager }: IssueModelState = useSelector(
    (state: IState) => state.issue,
  );
  useEffect(() => {
    setPageAt(issueHistoryPager.pageAt);
    setTotal(issueHistoryPager.total);
  }, [issueHistoryPager]);
  const stateObj: CommonData = {
    0: { text: '待审核', color: 'overlook' },
    1: { text: '已同意' },
    2: { text: '已忽略', color: 'overlook' },
    4: { text: '已忽略', color: 'overlook' },
    5: { text: '已修改', color: 'modify' },
    // 3: '医生直发',
    // 4: '助手拒绝',
    // modify 修改
  };
  const fetchIssue = (current?: number) => {
    // 上级的审核|操作历史
    dispatch({
      type: 'issue/fetchIssueHistory',
      payload: {
        objectId: sid,
        pageAt: current || pageAt,
      },
    });
  };
  useEffect(() => {
    fetchIssue();
  }, []);
  function onShowSizeChange(current: number) {
    console.log('current1111', current);
    fetchIssue(current);
  }
  // type: 164调整用药   162 指标调整  161大病历-调整治疗方案
  const getIssueHistoryList = useMemo(() => () => (
    issueHistoryList.map((item, index) => (
      <div key={item.id}>
        <IssueTime time={item.createdAt} />
        <div className={`${styles.status} ${styles[stateObj[item.state].color]}`}>
          {stateObj[item.state].text}
        </div>
        <div className={styles?.text}>
          {`${(index + 1) + (pageAt - 1) * config.ISSUE_LIST}.${item.body.msg} `}
          { item.type === 164 && <Medicine data={item}>查看详情</Medicine>}
          { item.type === 162 && <Inspection data={item}>查看详情</Inspection>}
          { item.type === 163 && <MedicalRecords data={item}>查看详情</MedicalRecords>}
          { item.type === 165
            && (
              <div style={{ paddingLeft: 10 }}>
                {item.body?.content?.advice}
              </div>
            )}
        </div>
      </div>
    ))
  ), [issueHistoryList, pageAt]);
  return (
    <div className={styles.history}>
      {/* <div className={styles.remind_doctor_btn}><DoctorRemind /></div> */}
      {
        issueHistoryList.length > 0 ? (
          <>
            {getIssueHistoryList()}
            <Pagination
              className={styles.pager}
              onChange={onShowSizeChange}
              current={pageAt}
              pageSize={config.ISSUE_LIST}
              total={total}
              itemRender={itemRender}
            />
          </>
        ) : (
          <div className={styles.no_data}>
            <img src={noProblem} alt="暂无审核历史" />
            <div>暂无审核历史</div>
          </div>
        )
      }
    </div>
  );
}

export default IssueHistory;
