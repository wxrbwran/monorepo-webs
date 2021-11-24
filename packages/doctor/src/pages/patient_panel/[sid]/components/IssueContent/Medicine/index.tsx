import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useParams, useSelector } from 'umi';
import { debounce } from 'lodash';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import DiffShow from '@/components/AdjustMedicine//DiffShow';
import AdjustPanel from '@/components/AdjustMedicine//AdjustPanel';
import DiffTable from '@/components/AdjustMedicine/DiffTable';
import { AdjustMedicineBtn } from '@/utils/tools';
import { getIssueParams } from '@/utils/utils';
import { Role } from 'xzl-web-shared/src/utils/role';
import styles from '../index.scss';

interface Iprops {
  refresh: () => void;
  data:IIssueList;
  children: string;
}
// 此组件用于 下级医生调完药-上级收到下级医生的请求-上级审核调药
function Medicine({
  data, refresh, children,
}: Iprops) {
  const dispatch = useDispatch();
  const roleId: string = window.$storage.getItem('roleId')!;
  /*
    0:弹框不展示
    3*:主管医生收到下级医生的调药请示  31->33也可33->31
    31:展示下级医生调药diff页面
    32:在31基础上，主管医生点击重新调药
    33:32基础上，调完药点击确定展示主管医生调药
  */
  const [status, setStatus] = useState(0);
  const [newMedicine, setNewMedicine] = useState<IAdjustMedicinePlan[]>([]);
  const [advice, setAdvice] = useState<string>();
  const { allPlans, note } = data.body.content?.medicineList[0];
  const lowerMedicine = allPlans;
  const { sid } = useParams<{ sid: string }>();
  const { isYlPatient } = useSelector((state: IState) => state.currentPatient);
  const [loading, setLoading] = useState(false);
  const handleShowModal = () => {
    setStatus(31);
  };
  const handleSaveAdjust = (medicineData:IAdjustMedicinePlan[]) => {
    setNewMedicine(medicineData);
    setStatus(33);
  };
  const handleSend = () => {
    setLoading(true);
    const { content } = data.body;
    if (status === 33) {
      content.medicineList.push({
        role: roleId,
        note: advice,
        allPlans: newMedicine,
      });
    }
    const params = getIssueParams(JSON.stringify(content), 164);
    window.$api.issue.sendMedication({ ...params, id: data.id }).then(() => {
      setStatus(0);
      setLoading(false);
      message.success('发送成功');
      refresh();
      // 更新操作历史-s
      dispatch({
        type: 'issue/fetchIssueHistory',
        payload: {
          objectId: sid,
        },
      });
    }).catch((err: any) => {
      console.log('err', err);
      setLoading(false);
    });
  };
  const handleSetNote = (val: string) => {
    setAdvice(val);
  };
  console.log(921, note);
  return (
    <>
      <span className={styles.blue} onClick={handleShowModal}>{children}</span>
      <DragModal
        title="调整用药"
        width={1200}
        visible={!!status}
        onCancel={() => setStatus(0)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div className={styles.medicine_diff_title}>
          {
            status === 31 && (
              <div>
                <h3 className={styles.diff_title}>下级医生调药医嘱</h3>
                <DiffShow
                  category={5}
                  newMedicine={lowerMedicine}
                  advice={note}
                  showAdvice
                  sourceRole={Role.LOWER_DOCTOR.id}
                />
                <div className="common__btn" style={{ marginTop: 30 }}>
                  <Button type="primary" onClick={debounce(() => handleSend(), 1000)} loading={loading}>
                    { isYlPatient === 1 ? '发送给护士' : AdjustMedicineBtn[roleId] }
                  </Button>
                  <Button type="primary" onClick={() => setStatus(32)}>
                    重新调整
                  </Button>
                </div>
              </div>
            )
          }
          <div style={{ display: status === 32 ? 'block' : 'none' }}>
            <h3>下级医生调药医嘱</h3>
            <DiffTable newMedicine={lowerMedicine} simple={false} />
            <h3>调整建议</h3>
            <div>{note || '无'}</div>
            <div style={{ marginTop: 20 }}>
              <AdjustPanel
                handleSaveAdjust={handleSaveAdjust}
                handleCancel={() => setStatus(31)}
                handleSetNote={handleSetNote}
                showAdvice
              />
            </div>
          </div>
          {
            status === 33 && (
              <div>
                <h3>我的调药医嘱</h3>
                <div>
                  <DiffShow category={5} newMedicine={newMedicine} showAdvice advice={advice} />
                  <div className="common__btn" style={{ marginTop: 30 }}>
                    <Button type="primary" onClick={debounce(() => handleSend(), 1000)} loading={loading}>
                      { isYlPatient === 1 ? '发送给护士' : AdjustMedicineBtn[roleId] }
                    </Button>
                    <Button type="primary" onClick={() => setStatus(32)}>
                      重新调药
                    </Button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </DragModal>
    </>
  );
}

export default Medicine;
