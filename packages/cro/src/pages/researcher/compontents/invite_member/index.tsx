import React, { useState } from 'react';
import { Button } from 'antd';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import InviteMemberList from '../invite_member_list';

interface IProps {
  children: string;
  refreshList: () => void;
}

function InviteMember(props: IProps) {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleShowGroup = () => {
    setIsShowModal(true);
  };
  return (
    <>
      <Button
        className="send-btn-cro mr-10"
        type="primary"
        onClick={handleShowGroup}
      >
        {props.children}
      </Button>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className="select-group-modal"
        width="900px"
        visible={isShowModal}
        title='邀请研究者参与管理'
        onCancel={() => setIsShowModal(false)}
        footer={null}
      >
        <InviteMemberList onClose={() => setIsShowModal(false)} refreshList={props.refreshList} />
      </DragModal>
    </>
  );
}

export default InviteMember;
