/**
 * Created by wuxiaoran on 2019/1/28.
 */
import React, { FC, useState } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal/Modal';
import Draggable from 'react-draggable';
// import 'antd/dist/antd.min.css';
import 'antd/lib/modal/style/index.css';


interface IDMProps extends ModalProps {
  title: string;
  extra?: any;
  titleDoubleClick?: () => void;
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
      onDoubleClick={props?.titleDoubleClick || (() => {} )}
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
