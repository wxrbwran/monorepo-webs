import React, { useState } from 'react';
import FarDoctorEdit from './FarDoctorEdit';
import FarDoctorCard from './FarDoctorCard';
import styles from './index.scss';

interface IProps {
  onClose: () => void;
}
function FarDoctor({ onClose }: IProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [activeType, setActiveType] = useState('INTERNAL');
  const changeTab = (t: string) => {
    setActiveType(t);
  };

  const tab: CommonData = {
    INTERNAL: '内科',
    SURGERY: '外科',
  };
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className={styles.future}>
      <div className={styles.tab}>
        {Object.keys(tab).map((t) => (
          <div
            key={t}
            className={t === activeType ? styles.active : null}
            onClick={() => changeTab(t)}
          >
            {tab[t]}
          </div>
        ))}
      </div>
      {isEdit ? (
        <FarDoctorEdit
          cancelSave={toggleEdit}
          type={activeType}
          // futureDoctorInfos={futureDoctorInfos}
          // fetchFarDoctorInfo={this.fetchFarDoctorInfo}
          // method={method}
        />
      ) : (
        <FarDoctorCard
          close={onClose}
          toggleEdit={toggleEdit}
          // futureDoctorInfos={futureDoctorInfos}
        />
      )}
    </div>
  );
}

export default FarDoctor;
