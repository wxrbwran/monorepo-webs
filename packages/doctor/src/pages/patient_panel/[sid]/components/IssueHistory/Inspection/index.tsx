import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import InspectionDiff from '@/components/AdjustInspection/InspectionDiff';
import { fetchRolePropValue } from 'xzl-web-shared/dist/src/utils/role';
import { AdviceTitle } from '@/utils/tools';
import styles from '../index.scss';

interface IProps {
  data:IIssueList;
  children: string;
}

const Inspection: FC<IProps> = (props) => {
  const { children, data } = props;
  const { body } = data;
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <span className={styles.detail} onClick={handleShowModal}>
        {children}
      </span>
      <DragModal
        title="指标调整"
        width={1100}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div className={styles.medicine_diff_title}>
          {
            body.content?.medicalList.map((item) => (
              <div className={styles.medicine_diff_wrap}>
                <h3 style={{ width: 530, margin: '10px auto' }}>{`${fetchRolePropValue(item.role, 'desc')}指标调整`}</h3>
                <InspectionDiff
                  medicalList={item.medicalIndexList}
                />
                {
                  item.note && (
                    <div className={styles.advice}>
                      <h3>{AdviceTitle[item.role]}</h3>
                      <div>{item.note}</div>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </DragModal>
    </>
  );
};

export default Inspection;
