import React, { useState } from 'react';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { endEventColumns } from '@/utils/columns';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import styles from './index.scss';
interface IProps {
  children: React.ReactElement;
  row: {
    kp: string;
    source: string[]
  }
}
function EndEvent({ children, row }:IProps) {
  const [tableOptions, _setOptions] = useState({ kp: row.kp, ids: row.source });
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
                  request={window.$api.query.fetchEndEventDetail}
                  depOptions={tableOptions}
                  // noPagination={true}
                  columns={endEventColumns()}
                  dataKey="events"
                  tableOptions={{
                    rowSelection: false,
                    // pagination: false,
                  }}
                />
              </div>
          </DragModal>
        )
      }
    </div>
  );
}
export default EndEvent;
