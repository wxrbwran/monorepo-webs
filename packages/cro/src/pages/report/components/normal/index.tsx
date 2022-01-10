import React, { useState } from 'react';
import XzlTable from 'xzl-web-shared/dist/components/XzlTable';
import { normalColumns } from './columns';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { dataSource } from './mock';
import styles from './index.scss';

interface IProps {
  children: React.ReactElement;
}
function Normal({ children }:IProps) {
  const projectSid =  window.$storage.getItem('projectSid');
  const [tableOptions, _setOptions] = useState({ projectSid });
  const [showModal, setShowModal] = useState(false);

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
            title="心率"
            onCancel={() => setShowModal(false)}
            footer={null}
            className={styles.count}>
              <XzlTable
                // request={() => {}}
                // request={window.$api.event.fetchEventCountInfo}
                depOptions={tableOptions}
                // noPagination={true}
                columns={normalColumns}
                dataKey="events"
                tableOptions={{
                  rowSelection: false,
                  // pagination: false,
                }}
                mockData={dataSource}/>
          </DragModal>
        )
      }
    </div>
  );
}
export default Normal;
