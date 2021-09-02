import React from 'react';
import { EditFilled } from '@ant-design/icons';
import { useSelector } from 'umi';
import { detailEnumList, diaList } from '@/utils/tools';
import transformMedicalRecordData from '@/utils/transformMedicalRecordData';
import Title from '../Title';
import styles from './index.scss';
import OtherDiaEdit from '../OtherDiaEdit';

interface IDia {
  name: string,
  status: string,
  time: string,
  diseaseStatus: string,
}
function OtherDia() {
  const infos = useSelector((state: IPatient) => state.detail.infos);
  const lists = transformMedicalRecordData('other', infos.otherDiagnosis);
  const filterLists = lists.filter((list) => list.status === 'SICK');
  return (
    <div className={styles.other_dia}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title text="其他诊断" />
        </div>
        <OtherDiaEdit>
          <>
            <EditFilled />
            采集
          </>
        </OtherDiaEdit>
      </div>
      {filterLists && filterLists.length > 0 ? (
        <ul>
          {filterLists.map((item:IDia, index) => {
            const {
              name, status, time, diseaseStatus,
            } = item;
            const year = time >= 12 ? `${~~(time / 12)}年` : '';
            const month = time % 12 !== 0 ? `${time % 12}个月` : '';
            return (
              <li key={item.name}>
                {!!status && (
                  <>
                    <span>
                      {index + 1}
                      、
                    </span>
                    <span>{name}</span>
                    {!time && !diseaseStatus ? '' : ': '}
                    {name !== '幽门螺旋杆菌感染' && !!time && (
                      <span>
                        {year}
                        {month}
                      </span>
                    )}
                    <span>
                      {' '}
                      {detailEnumList[diseaseStatus]}
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {diaList.map((item) => (
            <li key={item.key}>
              {item.value}
              :&nbsp;&nbsp;无数据
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OtherDia;
