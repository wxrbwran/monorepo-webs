import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
// import DoctorRemind from '@/components/DoctorRemind';
import { Button } from 'antd';
import { useParams } from 'umi';
import { debounce } from 'lodash';
import noProblem from '@/assets/img/noProblem.png';
import config from '@/config';
import AdjustInspection from '@/components/AdjustInspection';
import Remind from './Remind'; // 医生提醒
import Medicine from './Medicine'; // 调整用药
import Inspection from './Inspection'; // 指标调整
import NotAdjustBtn from './NotAdjustBtn'; // 有调整/不调整按钮 类型的
import MedicalRecords from './MedicalRecords'; // 大病历-调整指标+调药
import ViewerImg from './ViewerImg'; // 大病历-图片类型-标题中可点击预览图片
import IssueTime from './IssueTime';
import styles from './index.scss';

let timer: any = null;
function IssueContent() {
  const confirmRef = useRef<HTMLDivElement>(null);
  const { sid } = useParams<{ sid: string }>();
  const role = window.$storage.getItem('role') || '';
  const [issueList, setIssueList] = useState<IIssueList[]>([]);
  let pageAt = 1;
  const fetchIssue = (paramsPageAt: number) => {
    const params = {
      fromSid: window.$storage.getItem('sid') || '',
      objectId: sid,
      state: role === 'UPPER_DOCTOR' ? [0, 4] : [0], // 0 是未读,4是已忽略
      roleType: window.$storage.getItem('roleId'),
      pageAt: paramsPageAt,
      pageSize: config.ISSUE_LIST,
    };
    window.$api.issue.fetchIssue(params).then((res: { issueMessages: IIssueList[] }) => {
      if (res.issueMessages.length > 0) {
        if (paramsPageAt !== 1) {
          setIssueList((prevIssueList: IIssueList[]) => [...prevIssueList, ...res.issueMessages]);
        } else {
          pageAt = 1;
          setIssueList(res.issueMessages);
        }
      }
    });
  };
  useEffect(() => {
    fetchIssue(1);
    timer = setInterval(() => {
      fetchIssue(1);
    }, config.REFRESH_LIST);
    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, []);

  const scrollToLoad = debounce(() => {
    const confirmList = confirmRef.current as HTMLDivElement;
    const { scrollTop, offsetHeight, scrollHeight } = confirmList;
    console.log('scrollTop, offsetHeight, scrollHeight',
      scrollTop, offsetHeight, scrollHeight);
    const bottomToLoad = 200; // 距离底部多少像素开始加载
    if (scrollTop + offsetHeight + bottomToLoad >= scrollHeight) {
      pageAt++;
      fetchIssue(pageAt);
    }
  }, 500);
  useEffect(() => {
    if (confirmRef && confirmRef.current) {
      (confirmRef.current as HTMLDivElement).addEventListener('scroll', scrollToLoad, false);
    }
  }, [confirmRef]);

  const refreshIssue = () => {
    fetchIssue(1);
  };
  /*
    160 更新诊断或处理   161 更新大病历   162 生活达标值调整  163 生活达标值-用药达标值调整  type 164  165 医生提醒
    162:医生助手和独立管理，是直接调。主管医生是先显示医生助手的调整详情再调
  */
  const getConfirmList = useMemo(() => () => (
    issueList.map((item, index) => (
      <div key={item.id}>
        <IssueTime time={item.createdAt} />
        <div className={styles.text}>
          {`${index + 1} . `}
          {
            item.body?.content?.imageList ? <ViewerImg body={item.body} /> : `${item.body.msg}`
          }
          {item.type === 164 && <Medicine data={item} refresh={refreshIssue}> 请您审核 </Medicine>}
          {item.type === 162 && role === 'UPPER_DOCTOR' && <Inspection data={item} refresh={refreshIssue}> 请您审核 </Inspection>}
          {item.type === 162
            && ['LOWER_DOCTOR', 'ALONE_DOCTOR'].includes(role)
            && (
              <div className={styles.btn_wrap}>
                <AdjustInspection issueData={item} refresh={refreshIssue}>
                  <Button>调整</Button>
                </AdjustInspection>
                <NotAdjustBtn data={item} refresh={refreshIssue} />
              </div>
            )}
          {
            item.type === 163 && <MedicalRecords data={item} refresh={refreshIssue} />
          }
          {
            item.type === 165 && <Remind data={item} refresh={refreshIssue} />
          }
        </div>
      </div>
    ))
  ), [issueList]);
  return (
    <div ref={confirmRef} className={styles.confirm_cont}>
      {/* <div className={styles.remind_doctor_btn}><DoctorRemind /></div> */}
      {
        issueList.length > 0 ? getConfirmList() : (
          <div className={styles.no_data}>
            <img src={noProblem} alt="暂无待审核问题" />
            <div>暂无待审核问题</div>
          </div>
        )
      }
    </div>
  );
}

export default IssueContent;
