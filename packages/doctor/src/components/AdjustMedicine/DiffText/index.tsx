import React from 'react';
import { unitFlagRe } from '@/utils/tools';
import { handleIsEdit } from '../formatData';
import styles from './index.scss';

interface IProps {
  category: number;
  newMedicine: IAdjustMedicinePlan[];
}
function DiffText({ category, newMedicine }: IProps) {
  const isEdit = handleIsEdit(newMedicine);
  const getDiffText = () => {
    if (isEdit) {
      switch (category) {
        case 1:
          return (
            <p>
              您好，医生根据您
              {/* {question} */}
              上传的化验结果，做出如下药物调整，请您尽快按照医生指示调整医嘱
            </p>
          );
        case 3:
          return <p>您好，医生根据您的服药副作用反馈，做出如下药物调整，请您尽快按照医生指示调整医嘱：</p>;
        // case 4:
        //   return (
        //     <Taboos
        //       medicineTaboos={medicineTaboos}
        //       roleText="您"
        //       appendText=""
        //     />
        //   );
        case 5:
          return <p>您好，医生根据您的近期情况，做出如下药物调整，请您尽快按照医生指示调整医嘱：</p>;
        default:
          return '';
      }
    }
    return '';
  };
  const getEditDom = (m: IAdjustMedicinePlan) => {
    const editPlan = m.plans.filter((plan) => plan.status !== 'NONE');
    const unit = unitFlagRe[m.medicine.unit];
    const editLi = (
      <li key={m.medicine.medicineId}>
        <div className={styles.name}>
          {m.medicine.name}
          :
        </div>
        <div className={styles.plans}>
          {
            editPlan.map((p) => {
              if (p.status === 'DELETE') {
                return (
                  <div className={styles.plan} key={p.dosage}>
                    {`剂量【${p.dosage}${unit}】,用药时间【${p.takeTime.toString()}】停用`}
                  </div>
                );
              }
              return (
                <div className={styles.plan} key={p.dosage}>
                  {p.originDosage && `剂量由【${p.originDosage}${unit}】调整为【${p.dosage}${unit}】`}
                  {p.originTakeTime && `用药时间【${p.originTakeTime.toString()}】调整为【${p.takeTime.toString()}】`}
                </div>
              );
            })
          }
        </div>
      </li>
    );
    return editPlan.length > 0 ? editLi : null;
  };
  const getMedicineDiff = (m:IAdjustMedicinePlan) => {
    let renderLi;
    switch (m.medicine.status) {
      case 'ADD':
        renderLi = (
          <li key={m.medicine.medicineId}>
            <div className={styles.name}>
              {`新增用药${m.medicine.name}: `}
            </div>
            <div className={styles.plans}>
              {
                m.plans.map((p) => (
                  <div className={styles.plan} key={p.dosage}>
                    {`剂量【${p.dosage}${unitFlagRe[m.medicine.unit]}】`}
                    {`,用药时间为【${p.takeTime.toString()}】`}
                  </div>
                ))
              }
            </div>
          </li>
        );
        break;
      case 'DELETE':
        renderLi = (
          <li>
            {`${m.medicine.name}停用`}
          </li>
        );
        break;
      case 'NONE':
        renderLi = getEditDom(m);
        break;
      default:
        renderLi = <></>;
    }
    return renderLi;
  };
  return (
    <div className={styles.diff_text}>
      <h3>发送患者</h3>
      {getDiffText()}
      <ul>
        {
          isEdit ? (
            newMedicine.map((m) => (
              getMedicineDiff(m)
            ))
          ) : (
            <li style={{ color: 'red' }}>目前指标良好，请继续坚持正确服药</li>
          )
        }

      </ul>
    </div>
  );
}

export default DiffText;
