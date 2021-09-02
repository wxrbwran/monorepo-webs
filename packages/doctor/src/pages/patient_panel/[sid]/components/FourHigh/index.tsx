import React from 'react';
import { useSelector } from 'umi';
import { EditFilled } from '@ant-design/icons';
import { detailEnumList, hyperList } from '@/utils/tools';
import transformMedicalRecordData from '@/utils/transformMedicalRecordData';
import Title from '../Title';
import styles from './index.scss';
import FourHighEdit from '../FourHighEdit';

interface IList {
  name: string,
  status: string,
  time:string,
  medicine: string,
}
function FourHigh() {
  const infos = useSelector((state: IPatient) => state.detail.infos);
  const lists = transformMedicalRecordData('four', infos.fourHighInfo);

  return (
    <div className={styles.four_high}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title text="四大代谢" />
        </div>
        <FourHighEdit>
          <>
            <EditFilled />
            采集
          </>
        </FourHighEdit>
      </div>
      {/* {
        lists?.length>0 && ()
      } */}
      {lists && lists.length > 0 ? (
        <ul>
          {lists.map((item:IList, index:number) => {
            const {
              name, status, time, medicine,
            } = item;
            const color = status === 'WELL' || !status ? '#999' : '#f04134';
            const year = time >= 12 ? `${~~(time / 12)}年` : '';
            const month = time % 12 !== 0 ? `${time % 12}个月` : '';
            return (
              <li key={item.name}>
                <span>
                  {index + 1}
                  、
                </span>
                <span style={{ color }}>{name}</span>
                {!!status && <span>: </span>}
                {status === 'WELL' ? (
                  <span>无</span>
                ) : (
                  <>
                    <span>
                      {year}
                      {month}
                      {' '}
                    </span>
                    {!!medicine && <span>{detailEnumList[medicine]}</span>}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {hyperList.map((item) => (
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

export default FourHigh;
