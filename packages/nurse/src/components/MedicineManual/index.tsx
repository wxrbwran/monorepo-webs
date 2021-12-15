import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
// import { message } from 'antd';
import * as api from '@/services/api';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
  medicineId: string;
}
interface IManual {
  adverseReaction?: string;
  precautions?: string;
  contraindication?: string;
  dosage?: string;
  drugInteraction?: string;
  indication?: string;
  ingredient?: string;
  isLoading?: string;
  pharmacologicalAction?: string;
  specialCrowd?: string;
  medicineName?: string;
}
function MedicineManual({ children, medicineId }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [manual, setManual] = useState<IManual>({});
  const [isHave, setIsHave] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchManual = () => {
    setShowModal(!showModal);
    const params = JSON.stringify({
      medicineId,
    });
    api.medicine
      .getManual(params)
      .then((res) => {
        setManual(res);
        setIsLoading(false);
        if (res) {
          setIsHave(true);
        } else {
          setIsHave(false);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const medicineManual = isHave ? (
    <div className={styles.manual}>
      <h1 className={styles.name}>{manual?.medicineName}</h1>
      <div>
        <h3>成分</h3>
        <p>{manual?.ingredient}</p>
      </div>
      <div>
        <h3>适应症</h3>
        <p>{manual?.indication}</p>
      </div>
      <div>
        <h3>用法用量</h3>
        <p>{manual?.dosage}</p>
      </div>
      <div>
        <h3>不良反应</h3>
        <p>{manual?.adverseReaction}</p>
      </div>
      <div>
        <h3>禁忌</h3>
        <p>{manual?.contraindication}</p>
      </div>
      <div>
        <h3>注意事项</h3>
        <p>{manual?.precautions}</p>
      </div>
      <div>
        <h3>特殊人群</h3>
        <p>{manual?.specialCrowd}</p>
      </div>
      <div>
        <h3>药物 相互作用</h3>
        <p>{manual?.drugInteraction}</p>
      </div>
      <div>
        <h3>药理作用</h3>
        <p>{manual?.pharmacologicalAction}</p>
      </div>
    </div>
  ) : (
    <div className={styles.manual}>
      {/* <h1 className={styles.name}>{medicineName}</h1> */}
      <p>此药品暂无说明书。</p>
    </div>
  );
  return (
    <>
      <div onClick={fetchManual} className={styles.manual_pic}>
        {children}
      </div>
      {showModal && (
        <DragModal
          visible={showModal}
          title="药品说明书"
          width={1100}
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
          <div>{isLoading ? <LoadingOutlined /> : medicineManual}</div>
        </DragModal>
      )}
    </>
  );
}

export default MedicineManual;
