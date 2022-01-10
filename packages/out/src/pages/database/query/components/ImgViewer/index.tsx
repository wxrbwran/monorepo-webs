import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { queryFields } from '../../consts';
import '../ReportTable/index.scss';
import Viewer from 'react-viewer';
import * as api from '@/services/api';
import moment from 'moment';

interface IProps {
  children: string;
  imageType: string;
  sid: string;
}

interface IImageList {
  url: string;
  createdAt: string;
}

function ImgViewer({ imageType, children, sid }: IProps) {
  const [imageList, setImageList] = useState<IImageList[]>([]);
  const [isShowImgModal, setIsShowImgModal] = useState(false); // 是否展示图片集弹框
  const [isShowViewer, setIsShowViewer] = useState(false); // 是否显示预览图片
  const [images, setImages] = useState<string[]>([]); // 预览图片集
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片从第几张开始

  // 图片切换
  const changePicState = (idx: any) => {
    setIsShowViewer(false);
    setIsShowImgModal(true);
    setActiveIndex(idx);
  };

  const handleShowImgModal = () => {
    const params = {
      imageType: imageType.toUpperCase(),
      sid,
    };
    api.query.getImageUrl(params).then((res) => {
      setImageList(res.imageInfos);
      setImages(res.imageInfos.map((item: { url: string }) => item.url));
    });
    setIsShowImgModal(true);
  };
  const handleShowViewer = (index: number) => {
    setActiveIndex(index);
    setIsShowImgModal(false);
    setIsShowViewer(true);
  };
  return (
    <>
      {
        (+children > 0) ? (
          <div
            className="checklist-num"
            onClick={handleShowImgModal}
          >
            {children}
          </div>
        ) : <div>{children}</div>
      }
      <DragModal
        wrapClassName="ant-modal-wrap-center report-wrap-modal"
        width="800px"
        visible={isShowImgModal}
        title={queryFields[imageType]}
        onCancel={() => setIsShowImgModal(false)}
        footer={null}
      >
        <div className="img-list">
          {
            imageList && imageList.map((item, index) => {
              return (
                <div className="item" data-testid={`item${index}`} key={item.url} onClick={() => handleShowViewer(index)}>
                  <img src={item.url} alt="化验单检查单" />
                  <p className="time">{moment(item.createdAt).format('YYYY-MM-DD')}</p>
                </div>
              );
            })
          }
        </div>
      </DragModal>
      <Viewer
        visible={isShowViewer}
        onClose={() => changePicState(0)}
        activeIndex={activeIndex}
        images={images.map(url => ({
          src: url,
          alt: '',
        }))}
      />
    </>
  );
}

export default ImgViewer;
