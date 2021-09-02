import React, { useState } from 'react';
import DragModal from '@/components/DragModal';
import MedicineRecord from '../MedicineRecord';
import MedicineSheet from '../MedicineSheet';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
}
interface Item {
  key: string;
  value: string;
}

function MedicineHistory({ children }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [medicineType, setShowMedicineType] = useState('record');
  const tabBar: Array<Item> = [
    {
      key: 'sheet',
      value: '服药趋势图',
    },
    {
      key: 'record',
      value: '服药记录',
    },
  ];
  return (
    <div>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>
        {children}
      </div>
      {showModal && (
        <DragModal
          visible={showModal}
          title={
            <ul className={styles.history_tab}>
              {tabBar.map((item) => (
                <li
                  key={item.key}
                  onClick={() => setShowMedicineType(item.key)}
                  className={medicineType === item.key ? `${styles.active}` : ''}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          }
          width="80%"
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
          className={styles.history_modal}
        >
          <>{medicineType === 'sheet' ? <MedicineSheet /> : <MedicineRecord />}</>
        </DragModal>
      )}
    </div>
  );
}

export default MedicineHistory;
