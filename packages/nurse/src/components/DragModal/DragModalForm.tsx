/**
 * Created by wuxiaoran on 2019/1/28.
 */
import React, { FC, useState } from 'react';
import { ModalForm } from '@ant-design/pro-form';
// import ProForm from '@ant-design/pro-form';
import { ModalProps } from 'antd/lib/modal/Modal';
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
    <ModalForm
      {...props}
      title={titleNode}
      modalProps={{
        destroyOnClose: true,
        modalRender: (modal) => (
          <Draggable disabled={disabled}>{modal}</Draggable>
        ),
        ...props.modalProps,
      }}
    >
      {children}
    </ModalForm>
  );
};

export default AntdModalDrag;
