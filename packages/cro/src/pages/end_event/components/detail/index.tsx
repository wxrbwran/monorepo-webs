import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import styles from '../../index.scss';
interface IProps {
  eventDetail: {
    adverseEvent: {
      detail: object
    },
    mainEndpoint: {
      detail: object
    },
    secondaryEndpoint: {
      detail: object
    }
  }
}
function Detial({ eventDetail }: IProps) {
  const [firstEvent, setFirstEvent] = useState<string[]>([]);
  const [secondEvent, setSecondEvent] = useState<string[]>([]);
  const [thirdEvent, setthirdEvent] = useState<string[]>([]);
  useEffect(() => {
    if (!isEmpty(eventDetail)){
      const { adverseEvent, mainEndpoint, secondaryEndpoint } = eventDetail;
      setFirstEvent(Object.values(mainEndpoint.detail));
      setSecondEvent(Object.values(secondaryEndpoint.detail));
      setthirdEvent(Object.values(adverseEvent.detail));
    }
  }, [eventDetail]);
  const sick = [
    '死亡',
    '危及生命',
    '永远、严重残疾、功能丧失',
    '先天性异常、出生缺陷',
    '需要住院治疗、延长住院时间',
  ];
  return (
    <div className={styles.echo_detail}>
      <p className={styles.title}>一. 主要终点事件</p>
      {
        firstEvent.length > 0 ?
            <div className={styles.data}>
              {
                firstEvent.map((item)=> (
                  <span className={styles.sick_item}>{item}</span>
                ))
              }
            </div>
          : <div className={styles.empty}>暂未填写</div>
      }
      <p className={styles.title}>二. 次要终点事件</p>
      {
        secondEvent.length > 0 ?
          <div className={styles.data}>
            {
              secondEvent.map((item)=> (
                <span className={styles.sick_item}>{item}</span>
              ))
            }
          </div>
          : <div className={styles.empty}>暂未填写</div>
      }
      <p className={styles.title}>三. 不良反应</p>
      <div className={styles.sick}>
        <p className={styles.title}>1. 不良事件</p>
        {
          thirdEvent.length > 0 ?
            <div className={styles.data}>
              {
                thirdEvent.map((item)=> (
                  <span className={styles.sick_item}>{item}</span>
                ))
              }
            </div>
            : <div className={styles.empty}>暂未填写</div>
        }
      </div>
      <div className={styles.sick}>
        <p className={styles.title}>2. 严重不良反应事件（SAE）</p>
        <div className={styles.data}>
          {sick.map((item) => (
            <span className={styles.sick_item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Detial;
