import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import DiffShow from '@/components/AdjustMedicine/DiffShow';
import InspectionDiff from '@/components/AdjustInspection/InspectionDiff';
import { fetchRolePropValue } from '@/utils/role';
import styles from './index.scss';

interface IProps {
  data:IIssueList;
  children: string;
}
function MedicalRecords(props: IProps) {
  const { data, children } = props;
  const { body } = data;
  const medicalList = body?.content?.medicalList;
  const medicineList = body?.content?.medicineList;
  const remind = body?.content?.remind;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {
        (medicalList || medicineList) && (
          <span className={styles.blue} onClick={() => setShowModal(true)}>{children}</span>
        )
      }
      <DragModal
        title="调整治疗方案"
        width={1100}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <>
          <div className={styles.medical_records}>
            {
            medicineList && (
              medicineList.map((item) => (
                <div>
                  <h3>{`${fetchRolePropValue(item.role, 'desc')}调药医嘱`}</h3>
                  <div className={styles.border}>
                    <DiffShow category={5} newMedicine={item.allPlans} />
                    {
                        item.note && (
                        <div>
                          <div className={styles.note_tit}>{item.role === 'LOWER_DOCTOR' ? '调整建议（发给上级）' : '上级医生的评价与指导（发给下级）'}</div>
                          <div>{item.note}</div>
                        </div>
                        )
                      }
                  </div>
                </div>
              ))
            )
            }
            {
              medicalList && (
                medicalList.map((item) => (
                  <div>
                    <h3>{`${fetchRolePropValue(item.role, 'desc')}指标调整`}</h3>
                    <div className={styles.border}>
                      <InspectionDiff medicalList={item.medicalIndexList} />
                    </div>
                  </div>
                ))
              )
            }
          </div>
          <div>
            <div className={styles.note_tit}>医生提醒（发给患者）</div>
            <div>{remind}</div>
          </div>
        </>
      </DragModal>
    </>
  );
}
export default MedicalRecords;
