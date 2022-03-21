import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import SearchJcd, { IPartMethod, IAddJcdItem } from '../SearchJcd';
interface IProps {
  changePartMethod: (data: IPartMethod) => void;
  handleAddJcdTab: (data: IAddJcdItem) => void;
  handleShowAddJctBtn: (isShow: boolean) => void;
  createJcdNum: number;
  outType: string;
}
const SearchJcdModal: FC<IProps> = (props) => {
  const { children } = props;
  const [showModal, setshowModal] = useState(false);
  const handleShowModal = () => {
    setshowModal(true);
  };
  return (
    <>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center new-header"
        zIndex={1011}
        width="600px"
        visible={showModal}
        title="搜索"
        onCancel={() => setshowModal(false)}
        footer={null}
        destroyOnClose
      >
        <div>
          <SearchJcd {...props} action="searchModal" onCancel={() => setshowModal(false)} />
        </div>
      </DragModal>
    </>
  );
};

export default SearchJcdModal;
