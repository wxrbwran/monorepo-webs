/**
 * Created by wuxiaoran on 2019/1/28.
 */
import type { FC} from 'react';
import React, { useState } from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd/lib/modal/Modal';
import Draggable from 'react-draggable';

interface IDMProps extends ModalProps {
  title: string;
  extra?: any;
}
/* eslint-disable */
const AntdModalDrag: FC<IDMProps> = (props) => {
  const { title, children } = props;
  const [disabled, setDisabled] = useState(true);
  const titleNode = (
    <div
      style={{
        width: '100%',
        cursor: 'move',
      }}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false);
        }
      }}
      onMouseOut={() => {
        setDisabled(true);
      }}
      // fix eslintjsx-a11y/mouse-events-have-key-events
      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
      onFocus={() => {}}
      onBlur={() => {}}
      // end
    >
      {title}
    </div>
  );
  return (
    <Modal
      destroyOnClose
      {...props}
      title={titleNode}
      modalRender={(modal) => (
        <Draggable disabled={disabled}>{modal}</Draggable>
      )}
    >
      {children}
    </Modal>
  );
};

export default AntdModalDrag;
