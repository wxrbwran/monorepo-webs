import React, { useState } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import AdjustPanel from '@/components/AdjustMedicine/AdjustPanel';
import DiffShow from '@/components/AdjustMedicine/DiffShow';
import { Role } from 'xzl-web-shared/dist/utils/role';
import PlansDetail from '../../../CurrentMedicine/PlansDetail';
import styles from '../index.scss';

interface IProps {
  saveData: (data: IAdjustMedicinePlan[]) => void;
  issueData: IIssueList;
}
/*
  主管医生:
  1.下级医生调整用药了，上级这里直接显示下级调药信息，可重调
  2.下级医生点击不调整，忽略了。上级这里直接显示患者的目前服药，可进行调整
*/
function MrAdjustMedicine({ saveData, issueData }: IProps) {
  console.log(issueData);
  // 待审核问题里，issue详情如果存在medicineList，那一定是下级医生调整的信息
  let lowerMedicine:IAdjustMedicinePlan[] = [];
  const allMedicines = issueData.body?.content?.medicineList;
  let lowerNote: string | null | undefined = null;
  if (allMedicines) {
    lowerMedicine = allMedicines[0]?.allPlans;
    lowerNote = allMedicines[0]?.note;
  }
  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState<IAdjustMedicinePlan[]>([]);
  const role = window.$storage.getItem('role') || '';
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleSaveAdjust = (data:IAdjustMedicinePlan[]) => {
    setNewMedicine(data);
    setShowModal(false);
    saveData(data);
  };
  const getShowUi = () => {
    if (newMedicine.length > 0) {
      return <DiffShow category={5} newMedicine={newMedicine} />;
    } if (!isEmpty(lowerMedicine)) {
      return <DiffShow category={5} newMedicine={lowerMedicine} />;
    }
    return <PlansDetail />;
  };
  const getTitle = () => {
    if (newMedicine.length > 0) {
      return `${Role[role].desc}调药结果`;
    } if (!isEmpty(lowerMedicine)) {
      return '下级医生调药结果';
    }
    return '患者目前用药';
  };
  return (
    <div className={styles.records_left}>
      <div className={styles.tit_wrap}>
        <h3>
          { getTitle() }
        </h3>
        <Button onClick={handleShowModal}>
          <EditFilled />
          调整
        </Button>
      </div>
      <div className={styles.details_wrap}>
        {getShowUi()}
      </div>
      {
        lowerNote && (
          <div style={{ marginBottom: 20 }}>
            <h3 className={styles.tit_wrap}>下级医生调整建议</h3>
            <div className={styles.note}>{lowerNote}</div>
          </div>
        )
      }
      <DragModal
        title="调药"
        width="1000px"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div>
          <AdjustPanel
            handleSaveAdjust={handleSaveAdjust}
            handleCancel={() => setShowModal(false)}
          />
        </div>
      </DragModal>
    </div>
  );
}

export default MrAdjustMedicine;
