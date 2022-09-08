import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import dayjs from 'dayjs';
import * as api from '@/services/api';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
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

  const formatData = (type: string, records: any[]) => {
    const record = records.filter((r) => r.type === type);
    const recordArr: any = [];
    record.forEach((r) => {
      let conditionType = null;
      let date = null;
      conditionType = type;
      date = r.createdAt ? dayjs(r.createdAt).format('MM月DD日 HH:mm') : '';
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
    api.medicine
      .getLifeStatus(params)
      .then((res) => {
        setLifeStatusList(res.lifeStatusList.sort((a, b) => a.createdAt - b.createdAt));
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
          title="宣教课程"
          width="80%"
          wrapClassName="ant-modal-wrap-center"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
        >
          <div>宣教列表</div>
        </DragModal>
      )}
    </div>
  );
}

export default LifeStandard;
