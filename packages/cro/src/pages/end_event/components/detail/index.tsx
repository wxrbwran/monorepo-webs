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
    if(!isEmpty(eventDetail)){
      const { adverseEvent, mainEndpoint, secondaryEndpoint } = eventDetail;
      setFirstEvent(Object.values(mainEndpoint.detail));
      setSecondEvent(Object.values(secondaryEndpoint.detail));
      setthirdEvent(Object.values(adverseEvent.detail));
    }
  }, [eventDetail])
  return (
    <div>
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
    </div>
  )
}
export default Detial;
