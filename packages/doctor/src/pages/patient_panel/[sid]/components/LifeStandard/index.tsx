import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import dayjs from 'dayjs';
import * as api from '@/services/api';
import DragModal from '@/components/DragModal';
import convertDietData from '@/utils/convertDietData';
import convertSportData from '@/utils/convertSportData';
import convertSleepData from '@/utils/convertSleepData';
import LifeCondition from '../LifeCondition';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
}
function LifeStandard({ children }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [lifeStatusList, setLifeStatusList] = useState<ILife[]>([]);
  const [dietCondition, setDietCondition] = useState<IDiet[]>([]);
  const [sportCondition, setSportCondition] = useState<ISport[]>([]);
  const [sleepCondition, setSleepCondition] = useState<ISleep[]>([]);

  const formatData = (type: string, records:any[]) => {
    const record = records.filter((r) => r.type === type);
    const recordArr:any = [];
    record.forEach((r) => {
      let conditionType = null;
      let date = null;
      conditionType = type;
      date = r.createdAt
        ? dayjs(r.createdAt).format('MM月DD日') : '';
      recordArr.push({
        condition: { ...r.content },
        date,
        conditionType,
        createdAt: r.createdAt,
      });
    });
    return recordArr;
  };
  useEffect(() => {
    const params = {
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
      // type: 'SPORT',
      pageSize: 3,
    };
    api.medicine.getLifeStatus(params)
      .then((res) => {
        setLifeStatusList(res.lifeStatusList);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    if (lifeStatusList.length > 0) {
      setDietCondition(formatData('DIET', lifeStatusList));
      setSportCondition(formatData('SPORT', lifeStatusList));
      setSleepCondition(formatData('SLEEP', lifeStatusList));
    }
  }, [lifeStatusList]);

  const noCondition = (text: string) => (
    <div className={styles.life_condition_item_content}>
      <div>
        {text}
        情况
      </div>
      <div>暂无相关信息</div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'inline' }} onClick={() => setShowModal(!showModal)}>
        {children}
      </div>
      {showModal && (
        <DragModal
          visible={showModal}
          title="生活达标"
          width="80%"
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
          <div>
            <div className={styles.condition}>
              <div className={styles.life_condition}>
                <h3 className={styles.life_condition_title}>生活情况</h3>
                <div className={styles.life_condition_content}>
                  <div>
                    { dietCondition.length > 0
                      ? dietCondition.map((diet:IDiet, idx) => {
                        const dIndex = idx;
                        return (
                          <LifeCondition
                            key={`${diet.createdAt}${dIndex}`}
                            text="饮食情况"
                            conditionType={diet.conditionType}
                            condition={convertDietData(diet.condition)}
                            date={diet.date}
                          />
                        );
                      })
                      : noCondition('饮食') }
                  </div>
                  <div>
                    { sportCondition.length > 0
                      ? sportCondition.map((sport, idx) => {
                        const sIndex = idx;
                        return (
                          <LifeCondition
                            key={`${sport.createdAt}${sIndex}`}
                            text="运动情况"
                            conditionType={sport.conditionType}
                            condition={convertSportData(sport.condition)}
                            date={sport.date}
                          />
                        );
                      }) : noCondition('运动') }
                  </div>
                  <div>
                    { sleepCondition.length > 0
                      ? sleepCondition.map((sleep, idx) => {
                        const lIndex = idx;
                        return (
                          <LifeCondition
                            key={`${sleep.createdAt}${lIndex}`}
                            text="睡眠情况"
                            conditionType={sleep.conditionType}
                            condition={sleep.condition && convertSleepData(sleep.condition)}
                            date={sleep.date}
                          />
                        );
                      }) : noCondition('睡眠') }
                  </div>
                </div>
              </div>
            </div>
            <div className="common__btn">
              <Button onClick={() => { setShowModal(false); }}>退出</Button>
            </div>
          </div>
        </DragModal>
      )}
    </div>
  );
}

export default LifeStandard;
