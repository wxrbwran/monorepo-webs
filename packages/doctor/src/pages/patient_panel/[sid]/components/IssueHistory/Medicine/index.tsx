import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import DiffShow from '@/components/AdjustMedicine//DiffShow';
import { fetchRolePropValue } from 'xzl-web-shared/src/utils/role';
import styles from '../index.scss';

interface IProps {
  data:IIssueList;
  children: string;
}
function Medicine(props: IProps) {
  const { data, children } = props;
  const { body } = data;
  const [showModal, setShowModal] = useState(false);
  const handleShowDetail = () => {
    setShowModal(true);
  };
  console.log('body.content?.medicineList', body.content?.medicineList);
  return (
    <>
      <span className={styles.detail} onClick={handleShowDetail}>
        {children}
      </span>
      <DragModal
        title="调整用药"
        width={1200}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName="ant-modal-wrap-center"
        footer={null}
      >
        <div className={styles.medicine_diff_title}>
          {
            body.content?.medicineList.map((item) => (
              <div>
                <h3>{`${fetchRolePropValue(item.role, 'desc')}调药医嘱`}</h3>
                <DiffShow
                  category={5}
                  newMedicine={item.allPlans}
                  showAdvice
                  advice={item.note}
                  sourceRole={item.role}
                />
              </div>
            ))
          }
        </div>
      </DragModal>
    </>
  );
}

export default Medicine;
