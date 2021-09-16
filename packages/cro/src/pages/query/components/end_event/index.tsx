import React, { useState } from 'react';
import XzlTable from 'xzl-web-shared/src/components/XzlTable';
import { endEventColumns } from '@/utils/columns';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import styles from './index.scss';
interface IProps {
  children: React.ReactElement;
  row: {
    text: any;
    record: any;
    tree: any;
    resultKey: string;
    value: number
  },
}
function EndEvent({ children, row }:IProps) {
  const [tableOptions ] = useState({
    sid: row.record.item.row_key,
    dataIndex: row.tree.dataIndex,
    actionLogId: row.resultKey,
    page: 0,
    pageSize: 10,
  });
  const [showModal, setShowModal] = useState(false);

  const legendArr = [
    {
      text: '主要终点事件',
      class: 'MAIN',
    }, {
      text: '严重不良反应事件',
      class: 'SICK',
    }, {
      text: '次要终点事件',
      class: 'MINOR',
    }, {
      text: '不良事件',
      class: 'BAD',
    },
  ];
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={styles.count}>
      <div onClick={handleShowModal}>{children}</div>
      {
        showModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="880px"
            visible={showModal}
            title="终点事件"
            onCancel={() => setShowModal(false)}
            footer={null}
            className={styles.count}>
              <div className={styles.top}>
                <div className={styles.legend}>
                  {legendArr.map(item => (
                    <div className={styles.item}>
                      <span className={`${styles[item.class]} ${styles.label}`}></span>
                      <span> ：{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <XzlTable
                  request={window.$api.query.fetchQueryResultDetail}
                  depOptions={tableOptions}
                  // noPagination={true}
                  columns={endEventColumns()}
                  dataKey="events_jsonb"
                  tableOptions={{
                    rowSelection: false,
                    // pagination: false,
                  }}
                  extra={row.value}
                />
              </div>
          </DragModal>
        )
      }
    </div>
  );
}
export default EndEvent;
