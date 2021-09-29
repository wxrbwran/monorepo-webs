import React, { useEffect, useState, useRef } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Viewer from '@/components/Viewer';
import styles from './index.scss';

interface IProps {
  imageUrl: string;
  handleClose: () => void;
  imageId: string;
  degree: number;
}
const ImgWrap = (props: IProps) => {
  const {
    imageUrl, handleClose, imageId, degree,
  } = props;
  const [show, setShow] = useState(false);
  const isRotateInit = useRef(false);
  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      const domKey = degree > 0 ? 'rotateRight' : 'rotateLeft';
      const degreeDom = document.querySelector(`.structured_viewer .react-viewer-btn[data-key="${domKey}"]`);
      const clickNum = (degree / 90) % 4;
      for (let i = 0; i < Math.abs(clickNum); i++) {
        // @ts-ignore
        degreeDom?.click();
      }
      isRotateInit.current = true;
    }, 300);
  }, [degree]);
  const handleImageRotate = (degreeNum: number) => {
    if (imageId && isRotateInit.current) {
      const params = {
        imageId,
        degree: degreeNum,
        sid: window.$storage.getItem('patientSid'),
        wcId: window.$storage.getItem('patientWcId'),
      };
      window.$api.image.patchImageDegree(params);
    }
  };
  return (
    <div className={styles.img_box}>
      <div className={styles.img_wrap} id="images" />
      <Viewer
        className="structured_viewer"
        noClose
        onClose={() => {}}
        onMaskClick={() => { }}
        changeable={false}
        onRotateClick={handleImageRotate}
        container={document.getElementById('images')!}
        visible={show}
        disableKeyboardSupport
        images={[
          {
            src: imageUrl,
            alt: '化验单检查单',
            // rotate: 0,
          },
        ]}
        rotate={120}
        noNavbar
        customToolbar={(config) => (
          [
            ...config,
            {
              key: 'customClose',
              render: (
                <div>
                  <CloseOutlined />
                  <div>关闭</div>
                </div>
              ),
              onClick: handleClose,
            },
          ]
        )}

      />
    </div>
  );
};
export default ImgWrap;
