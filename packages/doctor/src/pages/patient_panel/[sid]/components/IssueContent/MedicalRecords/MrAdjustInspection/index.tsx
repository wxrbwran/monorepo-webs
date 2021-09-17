import React, { useState } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import AdjustPanel from '@/components/AdjustInspection/AdjustPanel';
import InspectionDiff from '@/components/AdjustInspection/InspectionDiff';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Role } from 'xzl-web-shared/src/utils/role';
import LatestHealth from '../../../LatestHealth';
import styles from '../index.scss';

interface IProps {
  saveData: (data: IMedicalList[]) => void;
  issueData: IIssueList;
}
function MrAdjustInspection({ saveData, issueData }: IProps) {
  console.log('issueData', issueData);
  let lowerMedical:IMedicalList[] = [];
  const lowerMedicals = issueData.body.content?.medicalList;
  if (lowerMedicals) {
    lowerMedical = lowerMedicals[0]?.medicalIndexList;
  }
  const [showModal, setShowModal] = useState(false);
  const [newMedical, setNewMedical] = useState<IMedicalList[]>([]);
  const [editIngMedical, setEditIngMedical] = useState<IMedicalList[]>([]);
  const role = window.$storage.getItem('role') || '';
  const saveEditMedical = (data: IMedicalList[]) => {
    setEditIngMedical(data);
  };
  const handleSend = () => {
    console.log('保存'); // 此时把数据抛给父级组件
    setNewMedical(editIngMedical);
    setShowModal(false);
    saveData(editIngMedical);
  };
  const getShowUi = () => {
    if (newMedical.length > 0) {
      return <InspectionDiff medicalList={newMedical} />;
    } if (!isEmpty(lowerMedical)) {
      return <InspectionDiff medicalList={lowerMedical} />;
    }
    return <LatestHealth iOnlyShow />;
  };
  const getTitle = () => {
    if (newMedical.length > 0) {
      return `${Role[role].desc}调指标结果`;
    } if (!isEmpty(lowerMedical)) {
      return '下级医生调指标结果';
    }
    return '患者目前达标值';
  };
  return (
    <div className={styles.records_right}>
      <div className={styles.tit_wrap}>
        <h3>{getTitle()}</h3>
        <Button onClick={() => { setShowModal(true); }}>
          <EditFilled />
          调整
        </Button>
      </div>
      <div className={styles.details_wrap}>
        {getShowUi()}
      </div>
      <DragModal
        title="指标调整"
        width="800px"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div>
          {
            !isEmpty(lowerMedical) && <InspectionDiff medicalList={lowerMedical} />
          }
          <AdjustPanel
            saveMedicalList={saveEditMedical}
          />
          <div className="common__btn">
            <Button onClick={() => setShowModal(false)}>取消</Button>
            <Button type="primary" onClick={handleSend}>确认</Button>
          </div>
        </div>
      </DragModal>
    </div>
  );
}

export default MrAdjustInspection;
