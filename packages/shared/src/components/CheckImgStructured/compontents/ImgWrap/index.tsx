import React, { useEffect, useState, useRef, ImgHTMLAttributes } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Viewer from '../../../Viewer';
import { IImg } from '../type';
import './index.css';

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
  useEffect(() => {
    setShow(true);
  }, []);

  const handleImageRotate = (degreeNum: number) => {
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
  const handleImageChange = (imgDetil: IImg) => {
    curImage.current = imgDetil;
  };
  return (
    <div className='img_box'>
      <div className='img_wrap' id="images" />
      <Viewer
        className="structured_viewer"
        noClose
        onClose={() => { }}
        onMaskClick={() => { }}
        // changeable={isEmpty(images)} // 是否隐藏切换上一张下一张
        // noNavbar // 是否展示底部缩略图
        onRotateClick={handleImageRotate}
        onChange={handleImageChange}
        container={document.getElementById('images')!}
        visible={show}
        disableKeyboardSupport
        images={
          images.map(imgItem => {
            return {
              src: imgItem.url,
              alt: '化验单检查单',
              degree: imgItem.degree,
              imageId: imgItem.imageId,
            };
          })
        }
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
