import React, { useEffect, useState, useMemo } from 'react';
// @ts-ignore
import { Button, Empty } from 'antd';
import Viewer from '@/components/Viewer';
// import jgh from '@/assets/img/jgh.png';
// import CheckImgStructured from '@/components/CheckImgStructured';
import styles from './index.scss';
import { IImageItem } from 'typings/model';
import * as api from '@/services/api';
import dayjs from 'dayjs';

interface IProps {
  handleHideCont: () => void;
  refresh: () => void;
  data: IImageItem;
}
interface IImg {
  imageId: string;
  uploadTime: number;
  lastReportAt?: number;
  url: string;
  status: number; // 0是异常 1是正常
  degree: number;
  reviewStatus: string; // 0待审核   TO_REVIEW,   4已审核 REVIEW
}
function ImageList({ data, handleHideCont, refresh }: IProps) {
  console.log(refresh);
  const [showViewer, setShowViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片，当前选中第几张
  const [imageId, setImageId] = useState<string>();
  const [imgList, setImgList] = useState< { [key: string]: IImg[] }>({});
  const [degree, setDegree] = useState(0);
  const fetchImgList = () => {
    const params: CommonData = {
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
    };
    if (data.imageIdList) {
      params.imageIdList = data.imageIdList;
    } else {
      params.typeNew = data.typeNew;
    }
    api.image.fetchImageDetailNew(params).then((res: { imageInfos: IImg[] }) => {
      const review: IImg[] = [];
      const toReview: IImg[] = [];
      let imgs: { [key: string]: IImg[] } = {};
      res.imageInfos.forEach((item: IImg) => {
        if (item.reviewStatus === 'TO_REVIEW') {
          toReview.push(item);
        } else {
          review.push(item);
        }
      });
      res.imageInfos.forEach(item => {
        const time = data.category === 2 && data.name === '待审核图片' ? item.uploadTime : item.lastReportAt;
        const date = dayjs(time).format('YYYY.MM.DD');
        if (imgs[date]) {
          imgs[date].push(item);
        } else {
          imgs[date] = [item];
        }
      });
      setImgList(imgs);
    });
  };
  useEffect(() => {
    fetchImgList();
  }, []);
  // 点击图片显示图片查看器
  const toggleShowViewer = (imgId: string, imgDegree: number) => {
    Object.values(imgList).flat().forEach((img, imgInx) => {
      if (img.imageId === imgId) {
        setActiveIndex(imgInx);
      }
    });
    setImageId(imgId);
    setShowViewer(!showViewer);
    setDegree(imgDegree);
    handleHideCont();
    setTimeout(() => {
      const domKey = imgDegree > 0 ? 'rotateRight' : 'rotateLeft';
      const degreeDom = document.querySelector(`.react-viewer-btn[data-key="${domKey}"]`);
      const clickNum = (imgDegree / 90) % 4;
      for (let i = 0; i < Math.abs(clickNum); i++) {
        // @ts-ignore
        degreeDom?.click();
      }
    }, 300);
  };
  console.log(toggleShowViewer);
  const handleGoStructured = (imgId: string, imgDegree: number) => {
    setImageId(imgId);
    setDegree(imgDegree);
  };
  const hideViewer = () => {
    setShowViewer(false);
    setDegree(0);
    handleHideCont();
  };
  // const handleRefresh = () => {
  //   fetchImgList();
  //   refresh();
  // };
  const handleImageRotate = (degreeNum: number) => {
    const params = {
      imageId,
      degree: degreeNum,
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
    };
    window.$api.image.patchImageDegree(params);
  };

  const renderItem = useMemo(() => (item: IImg) => (
    <div
      key={item.imageId}
      className={styles.images_item}
    >
      {/* {
        item.status === 0
          ? <span className={styles.exception}>异常</span>
          : <span className={styles.normal}>正常</span>
      } */}
      <img
        // alt="化验单检查单"
        src={item.url}
        style={{ transform: `rotate(${item.degree}deg)` }}
        // onClick={() => toggleShowViewer(item.imageId, item.degree)}
      />
      <Button
        className="mt-10 border-blue-500 text-blue-400"
        onClick={() => handleGoStructured(item.imageId, item.degree)}
      >
        {/* <CheckImgStructured
          handleRefresh={handleRefresh}
          imageInfo={{ imageId: item.imageId }}
        >
          查看详情
        </CheckImgStructured> */}
      </Button>
    </div>
  ), [imgList]);
  return (
    <>
      {Object.keys(imgList).map((dateItem) => (
        <div className="flex" key={dateItem}>
          <div className="mr-10 mt-20">{dateItem}</div>
          <div className={styles.images_list}>
            {imgList[dateItem].map((item) => renderItem(item))}
          </div>
        </div>
      ))}
      {/* <div className={styles.images_list}>
        { imgReview.map((item, index) => renderItem(item, index + imgToReview.length)) }
      </div> */}
      {Object.values(imgList).length === 0 && <Empty />}
      <Viewer
        visible={showViewer}
        images={Object.values(imgList).flat().map((image) => ({
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
        disableKeyboardSupport
        customToolbar={(config) => [
          ...config,
        ]}
      />
    </>
  );
}
export default ImageList;
