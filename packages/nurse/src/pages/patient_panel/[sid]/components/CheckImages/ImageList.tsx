import React, { useEffect, useState } from 'react';
// @ts-ignore
import Viewer from '@/components/Viewer';
// import { Button } from 'antd';
// import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styles from './index.scss';
import { IImageItem } from 'typings/imgStructured';

interface IProps {
  handleHideCont: () => void;
  data: IImageItem;
}
interface IImg {
  imageId: number;
  uploadTime: number;
  url: string;
  status: number; // 0是异常 1是正常
  degree: number;
}
function ImageList({ data, handleHideCont }: IProps) {
  const [showViewer, setShowViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片，当前选中第几张
  const [degree, setDegree] = useState(0);
  // const [showNoDate, setShowNoDate] = useState(true); // 时间不详过滤
  const [imageId, setImageId] = useState<number | null>();
  const [imgList, setImgList] = useState<IImg[]>([]);
  useEffect(() => {
    const params: any = {
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
    };
    if (data.imageIdList) {
      params.imageIdList = data.imageIdList;
    } else {
      params.typeNew = data.typeNew;
    }
    window.$api.image.fetchImageDetailNew(params).then((res: { imageInfos: IImg[] }) => {
      setImgList(res.imageInfos);
    });
  }, []);
  const toggleShowViewer = (index: number, imgId: number, imgDegree: number) => {
    setShowViewer(!showViewer);
    setActiveIndex(index);
    setImageId(imgId);
    setDegree(imgDegree);
    handleHideCont();
    setTimeout(() => {
      const domKey = degree > 0 ? 'rotateRight' : 'rotateLeft';
      const degreeDom = document.querySelector(`.react-viewer-btn[data-key="${domKey}"]`);
      const clickNum = (imgDegree / 90) % 4;
      for (let i = 0; i < Math.abs(clickNum); i++) {
        // @ts-ignore
        degreeDom?.click();
      }
    }, 300);
  };
  const handleImageRotate = (degreeNum: number) => {
    const params = {
      imageId,
      degree: degreeNum,
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
    };
    window.$api.image.patchImageDegree(params);
  };
  const hideViewer = () => {
    setShowViewer(false);
    setDegree(0);
    handleHideCont();
  };
  return (
    <>
      {/* <Button onClick={() => setShowNoDate(!showNoDate)}>
        时间不详 { showNoDate ? <UpOutlined /> : <DownOutlined /> }
      </Button> */}
      <div className={styles.images_list}>
        {
          imgList.map((item, index) => (
            <div
              key={item.imageId}
              className={styles.images_item}
              onClick={() => toggleShowViewer(index, item.imageId, item.degree)}
            >
              <img
                alt="化验单检查单"
                src={item.url}
                style={{ transform: `rotate(${item.degree}deg)` }}
              />
              {
                item.status === 0
                  ? <span className={styles.exception}>异常</span>
                  : <span className={styles.normal}>正常</span>
              }
            </div>
          ))
        }
      </div>
      <Viewer
        visible={showViewer}
        images={imgList.map((image) => ({
          src: image.url,
          alt: '化验单检查单',
          degree: image.degree,
        }))}
        rotateDegree={degree}
        activeIndex={activeIndex}
        scalable={false}
        onClose={hideViewer}
        onRotateClick={handleImageRotate}
        onMaskClick={hideViewer}
        toolBarAppend={(
          <li
            onClick={hideViewer}
            className="react-viewer-btn"
            key="close"
          >
            <span className="viewer__close">关闭</span>
          </li>
        )}
      />
    </>
  );
}
export default ImageList;
