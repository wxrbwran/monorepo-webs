import React, { useEffect, useState, useMemo, useRef } from 'react';
// @ts-ignore
import { Button, Empty } from 'antd';
import Viewer from '@/components/Viewer';
import styles from './index.scss';
import { IImageItem } from 'typings/model';
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
function ImageList(props: IProps) {
  const { data, handleHideCont, refresh } = props;
  console.log('332323', props);
  const [showViewer, setShowViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片，当前选中第几张
  const [imageId, setImageId] = useState<string>();
  const [imgList, setImgList] = useState< { [key: string]: IImg[] }>({}); // key是时间
  const viewerImages = useRef<IImg[]>([]);
  const [selectImgs, setSelectImgs] = useState<IImg[]>([]);
  const isToReview = data.name === '待审核图片';
  const fetchImgList = () => {
    const params: CommonData = {
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
      category: data.category,
      groupName: data.name,
    };
    if (data.imageIdList) {  // 检查单
      params.imageIdList = data.imageIdList;
    } else { // 其他图片，化验单
      params.typeNew = data.typeNew;
    }
    window.$api.image.fetchImageDetailV1(params).then((res: { imageInfos: IImg[] }) => {
      let imgs: { [key: string]: IImg[] } = {};
      console.log('res3333', res);
      if (res) {
        Object.keys(res).forEach(groupId => {
          const time = data.category === 2 && isToReview ? res[groupId][0].uploadTime : res[groupId][0].lastReportAt;
          const date = dayjs(time).format('YYYY.MM.DD');
          if (imgs[date]) {
            imgs[date].push(res[groupId]);
          } else {
            imgs[date] = [res[groupId]];
          }
        });
        const orderImgs: { [key: string]: IImg[] } = {};
        Object.keys(imgs).sort().reverse().forEach(timeKey => {
          orderImgs[timeKey] = imgs[timeKey];
        });
        setImgList(orderImgs);
        viewerImages.current = Object.values(orderImgs).flat(2);
      } else {
        setImgList({});
        viewerImages.current = [];
      }
    });
  };
  useEffect(() => {
    fetchImgList();
  }, []);
  // 点击图片显示图片查看器
  const toggleShowViewer = (imgId: string) => {
    Object.values(imgList).flat(2).forEach((img, imgInx) => {
      if (img.imageId === imgId) {
        setActiveIndex(imgInx);
      }
    });
    setImageId(imgId);
    setShowViewer(!showViewer);
    handleHideCont();
  };
  const hideViewer = () => {
    setShowViewer(false);
    handleHideCont();
  };
  const handleRefresh = () => {
    if (showViewer) {
      setShowViewer(false);
      handleHideCont();
    }
    setActiveIndex(0);
    fetchImgList();
    setSelectImgs([]);
    refresh();
  };
  const handleImageRotate = (degreeNum: number) => {
    console.log('degreeNumdegreeNum', degreeNum);
    const params = {
      imageId,
      degree: degreeNum,
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
    };
    window.$api.image.patchImageDegree(params);
  };
  const handleImageChange = (imgDetail: any, inx:number) => {
    setActiveIndex(inx);
    setImageId(imgDetail.imageId);
  };
  const handleChangeSelect = (curImg: IImg) => {
    let newSelectImgs: IImg[] = [];
    let isHas = selectImgs.find(item => item.imageId === curImg.imageId);
    console.log('isHas', isHas);
    console.log('curImg', curImg);
    if (isHas) {
      // 删除
      selectImgs.forEach(item => {
        if (item.imageId !== curImg.imageId){
          newSelectImgs.push(item);
        }
      });
    } else {
      newSelectImgs = [...selectImgs, curImg];
    }
    setSelectImgs([...newSelectImgs]);
  };
  const renderItem = useMemo(() => (groupItem: IImg[]) => {
    const item = groupItem[0];
    return (
      <div
        key={item.imageId}
        className={styles.images_item}
      >
        { groupItem.length > 1 && <span className={styles.img_count}>共{groupItem.length}张</span>}
        <img
          src={item.url}
          style={{ transform: `rotate(${item.degree}deg)` }}
          onClick={() => toggleShowViewer(item.imageId)}
        />
      </div>
    );
  }, [imgList, selectImgs]);
  console.log('=====imgList', imgList);
  console.log('selectImgs', selectImgs);
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
      {Object.values(imgList).length === 0 && <Empty />}
      <Viewer
        visible={showViewer}
        images={viewerImages.current.map((image) => ({
          src: image.url,
          alt: '化验单检查单',
          degree: image.degree,
          imageId: image.imageId,
        }))}
        activeIndex={activeIndex}
        scalable={false}
        onClose={hideViewer}
        onRotateClick={handleImageRotate}
        onMaskClick={hideViewer}
        disableKeyboardSupport
        // onChange={(img, inx) => setActiveIndex(inx)}
        onChange={handleImageChange}
      />
    </>
  );
}
export default ImageList;
