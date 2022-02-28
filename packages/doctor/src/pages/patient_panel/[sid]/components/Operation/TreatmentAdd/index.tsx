import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import AddEditTreatment, { IProps } from '@/components/AddEditTreatment/index';

function AddTreatment(props: IProps) {
  const { children, type } = props;
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleShowModal = () => {
    setIsShowModal(true);
  };
  return (
    <span>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="580px"
        visible={isShowModal}
        title={`${type === 'add' ? '添加' : '编辑'}治疗`}
        onCancel={() => setIsShowModal(false)}
        footer={null}
        destroyOnClose
      >
        <AddEditTreatment {...props} closeModal={() => setIsShowModal(false)} />
      </DragModal>

    </span>
  );
}
export default AddTreatment;
