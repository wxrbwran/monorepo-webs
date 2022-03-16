import React, { FC, useEffect, useState } from 'react';
import RichText from '@/components/RichText';
import iconTime from '@/assets/img/follow-table/icon_time.svg';
import iconCondition from '@/assets/img/follow-table/icon_condition.svg';
import iconFrequency from '@/assets/img/follow-table/icon_frequency.svg';
import iconGroup from '@/assets/img/follow-table/icon_group.svg';
import { getConditionDescriptionFromConditionss, getFrequencyDescriptionFromFrequency, getStartTimeDescriptionFromConditionss, IChooseValues, IRuleDoc } from '@/pages/subjective_table/util';

import * as styles from './index.scss';

interface IProps {
  contData: any;
}
const ObjectiveScaleDiff: FC<IProps> = ({ contData }) => {
  const { chooseValues } = contData;
  const [conditionDescription, setConditionDescription] = useState();
  useEffect(() => {
    const conditionDes = getConditionDescriptionFromConditionss(contData.chooseValues?.choseConditions);
    setConditionDescription(conditionDes);
  }, [contData]);
  const des = chooseValues ? chooseValues.choseScope.map(item => item.description).join(',') : '';
  return (
    <div className={styles.objective_diff}>
      <div className={`${styles.border} ${styles.rich_text}`}>
        <RichText value={contData.questions} handleChange={() => { }} readonly={true} />
        </div>
      <div className={styles.plan__cont}>
        <div className={styles.item}>
          <div className={styles.tit}>
            <img src={iconTime} alt="" />
            <span>首次发送时间</span>
          </div>
          <div className={styles.text}>
            {getStartTimeDescriptionFromConditionss(chooseValues?.firstTime)}
            {contData?.ruleDoc?.rules?.[0]?.actions?.[0]?.type === 'block' && <span>(不发送)</span>}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.tit}>
            <img src={iconFrequency} alt="" />
            <span>发送频率</span>
          </div>
          {chooseValues?.frequency && <div className={styles.text}>
            {getFrequencyDescriptionFromFrequency(chooseValues?.frequency)}
          </div>}
        </div>
        <div className={styles.space}></div>
        {(conditionDescription &&
          <div className={styles.item}>
            <div className={styles.tit}>
              <img src={iconCondition} alt="" />
              <span>发送条件</span>
            </div>
            <div className={styles.text}>
              {conditionDescription.age && <p>{conditionDescription.age}</p>}
              {conditionDescription.sex && <p>{conditionDescription.sex}</p>}
              {conditionDescription.disease && <p>{conditionDescription.disease}</p>}
              {conditionDescription.treatment && <p>{conditionDescription.treatment}</p>}
            </div>
          </div>
        )}
        <div className={styles.item}>
          <div className={styles.tit}>
            <img src={iconGroup} alt="" />
            <span>发送试验组</span>
          </div>
          <div className={styles.text}>{des}</div>
        </div>
      </div>
    </div>
  );
};

export default ObjectiveScaleDiff;
