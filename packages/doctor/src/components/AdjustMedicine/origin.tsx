import React, { FC, useState } from 'react';
import { Button, message } from 'antd';
import { useDispatch, useParams, useSelector } from 'umi';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import * as api from '@/services/api';
import { getIssueParams } from '@/utils/utils';
import { AdjustMedicineBtn } from '@/utils/tools';
import { Role } from '@/utils/role';
import DiffShow from './DiffShow';
import AdjustPanel from './AdjustPanel';
import styles from './index.scss';

interface IProps {
  title?: string;
}
// 此组件用于患者详情，右侧调整用药。
const AdjustMedicine: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { sid } = useParams<{ sid: string }>();
  const { children, title } = props;
  const roleId: string = window.$storage.getItem('roleId')!;
  const { isYlPatient } = useSelector((state: IState) => state.currentPatient);
  /*
    status决定渲染哪种ui组合
    0:弹框不展示  1:调整用药  2:调整用药后的diff展示页面
  */
  const [status, setStatus] = useState(0);
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [newMedicine, setNewMedicine] = useState<IAdjustMedicinePlan[]>([]);
  const handleShowModal = () => {
    setStatus(1);
  };

  const handleSaveAdjust = (data:IAdjustMedicinePlan[]) => {
    setNewMedicine(data);
    setStatus(2);
  };
  const handleSend = () => {
    setLoading(true);
    const content = {
      medicineList: [
        {
          role: roleId,
          note,
          allPlans: newMedicine,
        },
      ],
    };
    const params = getIssueParams(JSON.stringify(content), 164);
    api.issue.sendMedication(params).then(() => {
      setStatus(0);
      setLoading(false);
      message.success('发送成功');
      // 更新操作历史-s
      dispatch({
        type: 'issue/fetchIssueHistory',
        payload: {
          objectId: sid,
        },
      });
    }).catch((err) => {
      console.log('err', err);
      setLoading(false);
    });
  };
  const handleSetNote = (val: string) => {
    setNote(val);
  };
  return (
    <>
      <div onClick={handleShowModal}>
        {children}
      </div>
      {title}
      <DragModal
        title={title || '调整用药'}
        width={1100}
        visible={!!status}
        onCancel={() => setStatus(0)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div className={styles.adjust_medicine_modal}>
          <div style={{ display: status === 1 ? 'block' : 'none' }}>
            <AdjustPanel
              handleSetNote={handleSetNote}
              handleSaveAdjust={handleSaveAdjust}
              handleCancel={() => setStatus(0)}
              showAdvice={roleId === Role.LOWER_DOCTOR.id}
            />
          </div>
          {
            status === 2 && (
              <div>
                <DiffShow
                  advice={note}
                  category={5}
                  newMedicine={newMedicine}
                  showAdvice={roleId === Role.LOWER_DOCTOR.id}
                />
                <div className="common__btn" style={{ marginTop: 30 }}>
                  <Button type="primary" loading={loading} onClick={handleSend}>
                    {/* 是养老患者，且不是下级医生角色时，显示发送给护士 */}
                    {(isYlPatient === 1 && roleId !== Role.LOWER_DOCTOR.id) ? '发送给护士' : AdjustMedicineBtn[roleId] }
                  </Button>
                  <Button type="primary" onClick={() => setStatus(1)}>
                    重新调药
                  </Button>
                </div>
              </div>
            )
          }
        </div>
      </DragModal>
    </>
  );
};

export default AdjustMedicine;
