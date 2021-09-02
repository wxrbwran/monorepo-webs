import React, { useEffect, useState } from 'react';
import { useSelector } from 'umi';
import { cloneDeep } from 'lodash';
import InspectionItem from '../InspectionItem';
import styles from '../index.scss';

interface IProps {
  saveMedicalList: (editMedical: IMedicalList[]) => void;
}
function AdjustPanel({ saveMedicalList }: IProps) {
  const medicalList: IMedicalList[] = useSelector(
    (state: IState) => state.currentPatient.medicalLast,
  );
  const [editMedicalList, setEditMedicalList] = useState<IMedicalList[]>([]);
  const formatMedicalList = () => {
    const newData = cloneDeep(medicalList);
    newData.forEach((item:IMedicalList) => {
      const newItem: CommonData = item;
      newItem.originCustomizedReferenceMax = item.customizedReferenceMax;
      newItem.originCustomizedReferenceMin = item.customizedReferenceMin;
      newItem.action = 'NONE';
    });
    setEditMedicalList(newData);
    saveMedicalList(newData);
  };
  useEffect(() => {
    formatMedicalList();
  }, []);
  const handleChange = (abbreviation: string, type: string, val: number) => {
    editMedicalList.map((item: CommonData) => {
      const newItem = item;
      if (newItem.abbreviation === abbreviation) {
        newItem[type] = val;
        if ((newItem.originCustomizedReferenceMax !== newItem.customizedReferenceMax)
              || (newItem.originCustomizedReferenceMin !== newItem.customizedReferenceMin)) {
          newItem.action = 'EDIT';
        } else {
          newItem.action = 'NONE';
        }
      }
      return false;
    });
    setEditMedicalList([...editMedicalList]);
    saveMedicalList(editMedicalList);
  };

  return (
    <div className={styles.adjust}>
      <ul className={styles.content}>
        <li className={styles.item}>
          <div className={styles.item_name}> </div>
          <div className={styles.item_standart}>达标值</div>
        </li>
        {
          editMedicalList.map((item) => (
            <InspectionItem key={item.name} data={item} handleChange={handleChange} />
          ))
        }
      </ul>
    </div>
  );
}

export default AdjustPanel;
