import React, { FC, useState } from 'react';
import { Popover } from 'antd';
import { tumourTreatmentTitle } from '@/utils/tools';
import dayjs from 'dayjs';
import * as api from '@/services/api';
import TumourEdit from '../TumourEdit';
import styles from './index.scss';
/* eslint-disable */
type Ihospital = {
  endTime: number;
  startTime: number;
  diagnosisAt: number;
  hospitalId: string;
  hospitalName: string;
};
interface Iprops {
  data: {
    category: string;
    treatmentDataList: {
      treatmentName: string;
      id: string;
      hospitalInfo: Ihospital
    }[]
  };
  index: number;
  refresh: () => void;
}
const TumourTreatItem: FC<Iprops> = ({ data, index, refresh }) => {
  const [hospital, setHospital] = useState({ title: '', content: '' });
  const { treatmentDataList } = data;
  const renderTime = ({ startTime, endTime }: Ihospital) => (
    <span>
      {!startTime && !endTime ? '时间不详'
        : (
          <span>
            {startTime && dayjs(startTime).format('YYYY.MM.DD')}
            {startTime && endTime && '-'}
            {endTime && dayjs(endTime).format('YYYY.MM.DD')}
          </span>
        )}
    </span>
  );
  const fetchHospitalDetail = (hosInfo: Ihospital) => {
    const params = {
      id: hosInfo.hospitalId,
      name: hosInfo.hospitalName,
    };
    api.base.fetchHospitals(params).then((res) => {
      console.log(res);
      const {
        province, district, county, address, name,
      } = res.organizationInfos[0];
      setHospital({
        title: name,
        content: `${province}${district}${county}${address}`,
      });
    });
  };
  return (
    <li className={styles.tumour}>
      <div className={styles.head}>
        <span>
          {index}
          .
        </span>
        <span className={styles.trea_type}>{tumourTreatmentTitle[data.category]}</span>
        <TumourEdit refresh={refresh} data={data}>编辑</TumourEdit>
      </div>
      {
        treatmentDataList.length === 0
          ? <div className={styles.empty}>处理方式: 无</div>
          : treatmentDataList.map((item) => (
            <div key={item.id}>
              <div className={styles.treatment_item}>
                <div className={styles.trea_name}>{item.treatmentName}</div>
                <div className={styles.info}>
                  {
                    data.category === 'OTHER_TREATMENT'
                      ? (
                        <span>
                          {item.hospitalInfo.diagnosisAt
                            ? dayjs(item.hospitalInfo.diagnosisAt).format('YYYY.MM.DD')
                            : '时间不详'}
                        </span>
                      )
                      : renderTime(item.hospitalInfo)
                  }
                  {
                    item.hospitalInfo.hospitalName ? (
                      <Popover
                        title={hospital.title}
                        content={hospital.content}
                        placement="bottomLeft"
                      >
                        <span onMouseEnter={() => fetchHospitalDetail(item.hospitalInfo)}>
                          {item.hospitalInfo.hospitalName}
                        </span>
                      </Popover>
                    ) : '医院不详'
                  }
                </div>
              </div>
            </div>
          ))
      }

    </li>
  );
};

export default TumourTreatItem;
