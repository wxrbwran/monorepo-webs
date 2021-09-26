import React, { useEffect, useState, useMemo } from 'react';
// @ts-ignore
import { Button, Empty } from 'antd';
import Viewer from '@/components/Viewer';
import jgh from '@/assets/img/jgh.png';
import CheckImgStructured from '@/components/CheckImgStructured';
import styles from './index.scss';
import { IImageItem } from 'typings/model';

interface IProps {
  handleHideCont: () => void;
  refresh: () => void;
  data: IImageItem;
}
interface IImg {
  imageId: string;
  uploadTime: number;
  url: string;
  status: number; // 0是异常 1是正常
  degree: number;
  reviewStatus: string; // 0待审核   TO_REVIEW,   4已审核 REVIEW
}
function ImageList({ data, handleHideCont, refresh }: IProps) {
  const [showViewer, setShowViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片，当前选中第几张
  const [imageId, setImageId] = useState<string>();
  const [imgToReview, setImgToReview] = useState<IImg[]>([]); // 未结构化
  const [imgReview, setImgReview] = useState<IImg[]>([]); // 已结构化
  const [degree, setDegree] = useState(0);
  const fetchImgList = () => {
    const params: CommonData = {
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
    };
    if (data.category === 1 || data.type === 1) {
      params.imageIdList = data.imageIdList;
    } else {
      params.typeNew = data.typeNew;
    }
    window.$api.image.fetchImageDetailNew(params).then((res: { imageInfos: IImg[] }) => {
      const review: IImg[] = [];
      const toReview: IImg[] = [];
      res.imageInfos.forEach((item: IImg) => {
        if (item.reviewStatus === 'TO_REVIEW') {
          toReview.push(item);
        } else {
          review.push(item);
        }
      });
      setImgToReview(toReview);
      setImgReview(review);
    });
  };
  useEffect(() => {
    fetchImgList();
  }, []);
  // 点击图片显示图片查看器
  const toggleShowViewer = (index: number, imgId: string, imgDegree: number) => {
    setActiveIndex(index);
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
  const handleGoStructured = (imgId: string, imgDegree: number) => {
    setImageId(imgId);
    setDegree(imgDegree);
  };
  const hideViewer = () => {
    setShowViewer(false);
    setDegree(0);
    handleHideCont();
  };
  const handleRefresh = () => {
    fetchImgList();
    refresh();
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

  const renderItem = useMemo(() => (item: IImg, index: number) => (
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
        alt="化验单检查单"
        src={item.url}
        style={{ transform: `rotate(${item.degree}deg)` }}
        onClick={() => toggleShowViewer(index, item.imageId, item.degree)}
      />
      <Button
        className="mt-10 border-blue-500 text-blue-400"
        onClick={() => handleGoStructured(item.imageId, item.degree)}
      >
        <CheckImgStructured
          handleRefresh={handleRefresh}
          imageInfo={{ imageId: item.imageId }}
        >
          {item.reviewStatus === 'TO_REVIEW' ? '单据结构化' : '修改结果'}
        </CheckImgStructured>
      </Button>
    </div>
  ), [imgToReview, imgReview]);
  return (
    <>
      <div className={styles.images_list}>
        { imgToReview.map((item, index) => renderItem(item, index)) }
      </div>
      <div className={styles.images_list}>
        { imgReview.map((item, index) => renderItem(item, index + imgToReview.length)) }
      </div>
      { imgToReview.length === 0 && imgReview.length === 0 && <Empty /> }
      <Viewer
        visible={showViewer}
        images={[...imgToReview, ...imgReview].map((image) => ({
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
        customToolbar={(config) => (
          [
            ...config,
            {
              key: 'customStructured',
              render: (
                <CheckImgStructured
                  imageInfo={{ imageId }}
                  handleRefresh={handleRefresh}
                >
                  <span
                    className="react-viewer-btn"
                    key="structured"
                  >
                    <div>
                      <img src={jgh} alt="" />
                    </div>
                    <span>结构化数据</span>
                  </span>
                </CheckImgStructured>
              ),
            },
          ]
        )}
      />
    </>
  );
}
export default ImageList;
