import React from 'react';
import styles from '../index.scss';

interface Iprops {
  medicalList: IMedicalList[];
}
function InspectionDiff({ medicalList }: Iprops) {
  return (
    <div className={styles.diff}>
      <ul className={styles.content}>
        <li>
          <div className={styles.item_name}> </div>
          <div className={styles.item_standart}>达标值</div>
          {/* <div className={styles.item_advice}>建议值</div> */}
        </li>
        {
        medicalList.map((item) => (
          <li className={item.action === 'EDIT' ? styles.red : null} key={item.name}>
            <div className={styles.item_name}>{item.name}</div>
            <div className={styles.item_standart}>
              {item.name === '血压' ? item.originCustomizedReferenceMax : item.originCustomizedReferenceMin}
              {item.spliceSymbol}
              {item.name === '血压' ? item.originCustomizedReferenceMin : item.originCustomizedReferenceMax}

              {
                item.action === 'EDIT' && (
                  <span>
                    <span className={styles.arrow}>
                      —
                      {'>'}
                    </span>
                    {item.name === '血压' ? item.customizedReferenceMax : item.customizedReferenceMin}
                    {item.spliceSymbol}
                    {item.name === '血压' ? item.customizedReferenceMin : item.customizedReferenceMax}
                  </span>
                )
              }
            </div>
            {/* <div className={styles.item_advice}>
              <span>{item.unifiedReference}</span>
            </div> */}
          </li>
        ))
      }
      </ul>
    </div>
  );
}

export default InspectionDiff;
