import React, { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import DragM from '../DragM';
import './index.scss';

interface IProps {
  title: string | React.ReactElement,
  extra: string;
}
function BuildTitle({ title, extra }: IProps) {
  let modalDom: HTMLElement;
  useEffect(() => {
    // modal的class是ant-modal-wrap
    const modals = document.getElementsByClassName('ant-modal-wrap');
    modalDom = modals[modals.length - 1] as HTMLElement;
  });
  const updateTransform = (transformStr: string) => {
    modalDom.style.transform = transformStr;
  };
  return (
    <DragM updateTransform={updateTransform}>
      <div className="build-title">
        { title || <span style={{ visibility: 'hidden' }}>心之力</span> }
        { extra && (
        <span className="extra">
          <InfoCircleOutlined />
          { extra }
        </span>
        )}
      </div>
    </DragM>
  );
}

export default BuildTitle;
