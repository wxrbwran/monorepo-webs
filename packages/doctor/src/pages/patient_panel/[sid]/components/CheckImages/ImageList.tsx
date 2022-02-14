import React, { useEffect, useState, useMemo, useRef } from 'react';
// @ts-ignore
import { Button, Empty } from 'antd';
import Viewer from '@/components/Viewer';
import jgh from '@/assets/img/jgh.png';
import CheckImgStructured from '@/components/CheckImgStructured';
import styles from './index.scss';
import { IImageItem } from 'typings/model';
import IconCheckFill from '@/assets/img/icon_check_fill.png';
import { cloneDeep, isEmpty } from 'lodash';
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
    };
    if (data.imageIdList) {
      params.imageIdList = data.imageIdList;
    } else {
      params.typeNew = data.typeNew;
    }
    window.$api.image.fetchImageDetailNew(params).then((res: { imageInfos: IImg[] }) => {
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
  const toggleShowViewer = (imgId: string, imgDegree: number) => {
    console.log('imgId', imgId);
    console.log('imgDegree', imgDegree);
    console.log('===11',  Object.values(imgList).flat(2));
    Object.values(imgList).flat(2).forEach((img, imgInx) => {
      if (img.imageId === imgId) {
        setActiveIndex(imgInx);
      }
    });
    setImageId(imgId);
    setShowViewer(!showViewer);
    handleHideCont();
    // setTimeout(() => {
    //   const domKey = imgDegree > 0 ? 'rotateRight' : 'rotateLeft';
    //   const degreeDom = document.querySelector(`.react-viewer-btn[data-key="${domKey}"]`);
    //   const clickNum = (imgDegree / 90) % 4;
    //   for (let i = 0; i < Math.abs(clickNum); i++) {
    //     // @ts-ignore
    //     degreeDom?.click();
    //   }
    // }, 300);
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
        {
          isToReview ? (
            <span className='absolute top-5 right-5 z-10' onClick={() => handleChangeSelect(groupItem[0])} >
              {
                selectImgs.find(img => img.imageId === groupItem[0].imageId) ?
                <img className={styles.check_fill} src={IconCheckFill} /> :
                <span className={styles.check_border} />
              }
            </span>
          ) : (
            groupItem.length > 1 && <span className={styles.img_count}>共{groupItem.length}张</span>
          )
        }
        <img
          src={item.url}
          style={{ transform: `rotate(${item.degree}deg)` }}
          onClick={() => toggleShowViewer(item.imageId, item.degree)}
        />
        <Button
          className="mt-10 border-blue-500 text-blue-400"
          onClick={() => setSelectImgs(groupItem)}
        >
          <CheckImgStructured
            handleRefresh={handleRefresh}
            images={selectImgs}
          >
            结构化
          </CheckImgStructured>
        </Button>
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
      {
        isToReview && (
          isEmpty(selectImgs) ? <Button className='absolute bottom-20 ml-20 right-25' type="primary" disabled>批量结构化</Button> : (
            <CheckImgStructured
              handleRefresh={handleRefresh}
              images={selectImgs}
            >
              <Button type="primary" className='absolute bottom-20 ml-20 right-25'>批量结构化</Button>
            </CheckImgStructured>
          )
        )
      }
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
        // 已和产品沟通，由于待审核问题处，可以勾选多张，再查看大图，此时点击结构化，是结构当前图片还是外面勾选的图片有歧义，此按钮隐藏
        customToolbar={(config) => [
          ...config,
          isToReview ?
            {
              key: 'customStructured',
              render: (
                <CheckImgStructured
                  images={[viewerImages.current[activeIndex]]}
                  handleRefresh={handleRefresh}
                >
                  <span className="react-viewer-btn" key="structured">
                    <div>
                      <img src={jgh} alt="" />
                    </div>
                    <span>结构化该张图片</span>
                  </span>
                </CheckImgStructured>
              ),
            } : {},
        ]}
      />
    </>
  );
}
export default ImageList;
