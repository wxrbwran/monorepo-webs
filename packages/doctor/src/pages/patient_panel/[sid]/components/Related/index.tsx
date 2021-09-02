import React from 'react';
import { useSelector } from 'umi';
import { EditFilled } from '@ant-design/icons';
import { diseaseHistoryList } from '@/utils/tools';
import transformMedicalRecordData from '@/utils/transformMedicalRecordData';
import Title from '../Title';
import styles from './index.scss';
import RelatedEdit from '../RelatedEdit';

function Related() {
  const infos = useSelector((state: IPatient) => state.detail.infos);
  const lists = transformMedicalRecordData('related', infos.integratedHistory);
  return (
    <div className={styles.related}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title text="家族史 吸烟史 饮酒史 过敏史" />
        </div>
        <RelatedEdit>
          <>
            <EditFilled />
            采集
          </>
        </RelatedEdit>
      </div>
      {lists && lists.length > 0 ? (
        <ul>
          {lists?.map((item:{name: string, text:string}) => {
            const { name, text } = item;
            return (
              <li key={item.name} className={styles.related__lists}>
                <div style={{ marginRight: 10, flex: '0 0 46px' }}>
                  {name}
                  :
                  {' '}
                </div>
                <div>{text}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul>
          {diseaseHistoryList.map((item) => (
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

export default Related;
