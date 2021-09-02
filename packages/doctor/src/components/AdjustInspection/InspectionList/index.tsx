import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { useSelector } from 'umi';
import InspectionItem from '../InspectionItem';
import InspectionDiff from '../InspectionDiff';
import styles from '../index.scss';

interface Iprops {
  callback: (status: string) => void;
}
function InspectionList({ callback }: Iprops) {
  const medicalList: Imedical[] = useSelector((state: IState) => state.currentPatient.medicalLast);
  // const [advice, setAdvice] = useState<string>(''); // 建议内容
  const [step, setStep] = useState(1);
  const [editMedicalList, setEditMedicalList] = useState<Imedical[]>([]);
  const [medicalIndexList, setMedicalIndexList] = useState<Imedical[]>(medicalList);

  useEffect(() => {
    console.log('____999', medicalList);
    if (medicalList.length > 0) {
      console.log('_____medicalList', medicalList);
      setEditMedicalList(cloneDeep(medicalIndexList));
      setMedicalIndexList(medicalList);
    }
  }, [medicalList]);
  // const changeAdvice = (val: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setAdvice(val.target.value);
  // };
  const handleSetStep = () => {
    setStep(1);
    setEditMedicalList(cloneDeep(medicalIndexList));
  };
  const handleChange = (abbreviation: string, type: string, val: number) => {
    editMedicalList.map((item: CommonData) => {
      if (item.abbreviation === abbreviation) {
        // eslint-disable-next-line no-param-reassign
        item[type] = val;
        // eslint-disable-next-line no-param-reassign
        item.action = 'edit';
      }
      return false;
    });
    setEditMedicalList(editMedicalList);
  };
  const handleEditSuccess = () => {
    callback('success');
  };
  return (
    <div>
      {
        step === 1 ? (
          <div className={styles.adjust}>
            <ul className={styles.content}>
              <li className={styles.item}>
                <div className={styles.item_name}> </div>
                <div className={styles.item_standart}>达标值</div>
                {/* <div className={styles.item_advice}>建议值</div> */}
              </li>
              {
                medicalIndexList.map((item) => (
                  <InspectionItem key={item.name} data={item} handleChange={handleChange} />
                ))
              }
            </ul>
            {/* <div className={styles.advice}>
              <div>调整建议</div>
              <Input.TextArea
                value={advice}
                autoSize={{ minRows: 1, maxRows: 3 }}
                onChange={changeAdvice}
              />
            </div> */}
            <div className="common__btn">
              <Button className={styles.submit} onClick={() => callback('cancel')}>取消</Button>
              <Button className={styles.submit} htmlType="submit" type="primary" onClick={() => setStep(2)}>确认</Button>
            </div>
          </div>
        )
          : <InspectionDiff
              goBack={handleSetStep}
              editMedicalList={editMedicalList}
              originData={medicalIndexList}
              handleCloseModal={handleEditSuccess}
          />
      }
    </div>
  );
}

export default InspectionList;
