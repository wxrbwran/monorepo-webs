import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import BuildTitle from './BuildTitle';

interface IProps {
  title: string | React.ReactElement;
  // eslint-disable-next-line react/require-default-props
  extra?: string;
  children: React.ReactElement;
  onCancel: () => void;
}

function DragModal(props: IProps & ModalProps) {
  const { title, extra, children } = props;
  const titleNode = (
    <BuildTitle
      title={title}
      extra={extra || ''}
    />
  );
  return (
    <Modal
      style={{ top: 0 }}
      maskClosable
      {...props}
      title={titleNode}
      destroyOnClose
    >
      {children}
    </Modal>
  );
}

export default DragModal;
