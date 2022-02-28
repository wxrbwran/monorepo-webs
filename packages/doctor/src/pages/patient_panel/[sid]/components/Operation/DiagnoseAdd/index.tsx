import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import DiagnoseAddEdit from './DiagnoseAddEdit';

interface Iprops {
  children: React.ReactElement;
  type: string;
  initData?: IdiagnosisItem | null;
  refreshList: () => void;
}
export interface IdiagnosisItem {
  name: string;
  diseaseId: string;
  id: string;
  attachedInfo: {
    diagnosisAt: number;
    hospitalName: string;
    hospitalId: string;
  }
}
function AddDiagnose(props: Iprops) {
  const [isShowModal, setIsShowModa] = useState(false);
  const handleShowModal = () => {
    setIsShowModa(true);
  };

  return (
    <span>
      <span onClick={handleShowModal}>{props.children}</span>
      {
        isShowModal && (
          <DragModal
            wrapClassName="ant-modal-wrap-center"
            width="580px"
            visible={isShowModal}
            title={`${props.type === 'add' ? '添加' : '编辑'}诊断`}
            onCancel={() => setIsShowModa(false)}
            footer={null}
          >
            <DiagnoseAddEdit {...props} closeModal={() => setIsShowModa(false)} />
          </DragModal>
        )
      }
    </span>
  );
}
AddDiagnose.defaultProps = {
  initData: null,
};
export default AddDiagnose;
