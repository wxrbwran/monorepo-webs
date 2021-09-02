import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import styles from './index.scss';

interface IProps {
  data: any;
  col: any[]
  activeTab: string;
}

function LatestHealthHistoryTable(props: IProps) {
  const { data, col, activeTab } = props;
  console.log('data35', data);
  return (
    <div className={`mt-20 mb-10 ${styles.data_history}`}>
      {
        // 6.10修改：去掉采集指标，数据历史去掉其它指标，这里代码目前没用了，暂时先留着...
        activeTab === 'CUSTOM' ? (
          <table className="w-full">
            {
              data.map((itemData: any, indexData: number) => (
                <tr className={`${styles.item} flex`} key={itemData.id}>
                  {
                    itemData?.map((item: string | number, index: number) => (
                      <td key={item}>
                        <div style={{ minWidth: index === itemData.length - 1 ? '160px' : '100%', textAlign: 'center' }}>
                          {(index === 0 && indexData !== 0) ? moment(Number(item)).format('YYYY/MM/DD') : item}
                        </div>
                      </td>
                    )
                    )
                  }
                </tr>
              ))
            }
          </table>
        ) : (
          <Table
            rowKey={(record) => record.measuredAt || record.time.time || record}
            columns={col}
            dataSource={data}
            pagination={false}
            bordered
          />
        )
      }

    </div>
  );
}

export default LatestHealthHistoryTable;
