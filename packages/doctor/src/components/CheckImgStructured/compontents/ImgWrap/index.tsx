import React, { useEffect, useState, useRef, ImgHTMLAttributes } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Viewer from '@/components/Viewer';
import { IImg } from '../type';
import styles from './index.scss';

interface IProps {
  handleClose: () => void;
  images: IImg[];
}
const ImgWrap = (props: IProps) => {
  const {
    handleClose, images,
  } = props;
  const [show, setShow] = useState(false);
  const curImage = useRef(images[0]);
  const isRotateInit = useRef(false);
  useEffect(() => {
    setShow(true);
  }, []);
  // useEffect(() => {
  //   setShow(true);
  //   setTimeout(() => {
  //     const domKey = degree > 0 ? 'rotateRight' : 'rotateLeft';
  //     const degreeDom = document.querySelector(`.structured_viewer .react-viewer-btn[data-key="${domKey}"]`);
  //     const clickNum = (degree / 90) % 4;
  //     for (let i = 0; i < Math.abs(clickNum); i++) {
  //       // @ts-ignore
  //       degreeDom?.click();
  //     }
  //     isRotateInit.current = true;
  //   }, 300);
  // }, [degree]);
  const handleImageRotate = (degreeNum: number, b, c) => {
    console.log('====232', degreeNum, b, c);
    // && isRotateInit.current
    if (curImage.current.imageId) {
      const params = {
        imageId: curImage.current.imageId,
        degree: degreeNum,
        sid: window.$storage.getItem('patientSid'),
        wcId: window.$storage.getItem('patientWcId'),
      };
      window.$api.image.patchImageDegree(params);
    }
  };
  console.log('imagesimages', images);
  console.log('2322222', images.map(imgItem => {
    return {
      src: imgItem.url,
      alt: '化验单检查单',
      degree: imgItem.degree,
    };
  }));
  const handleChangeImg = (imgDetil: IImg) => {
    curImage.current = imgDetil;
  };
  return (
    <div className={styles.img_box}>
      <div className={styles.img_wrap} id="images" />
      <Viewer
        className="structured_viewer"
        noClose
        onClose={() => {}}
        onMaskClick={() => { }}
        onChange={handleChangeImg}
        // changeable={false} // 是否隐藏切换上一张下一张
        // noNavbar // 是否展示底部缩略图
        onRotateClick={handleImageRotate}
        container={document.getElementById('images')!}
        visible={show}
        disableKeyboardSupport
        images={
          images.map(imgItem => {
            return {
              src: imgItem.url,
              alt: '化验单检查单',
              degree: imgItem.degree,
            };
          })
        }
        rotate={120}
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
