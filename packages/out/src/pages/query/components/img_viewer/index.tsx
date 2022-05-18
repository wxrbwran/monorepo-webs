import React, { useState } from 'react';
import './index.scss';
import Viewer from 'react-viewer';
import moment from 'moment';
interface IProps {
  info: {
    start: number;
    value: string;
  }[];
}

function ImgViewer({ info }: IProps) {
  const [isShowViewer, setIsShowViewer] = useState(false); // 是否显示预览图片
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片从第几张开始

  // 图片切换
  const changePicState = (idx: any) => {
    setIsShowViewer(false);
    setActiveIndex(idx);
  };

  const handleShowViewer = (index: number) => {
    setActiveIndex(index);
    setIsShowViewer(true);
  };
  return (
    <>
      <div className="img-list">
        {
          info && info.map((item, index) => {
            return (
              <div className="item" data-testid={`item${index}`} key={index} onClick={() => handleShowViewer(index)}>
                <img src={item.value} alt="化验单检查单" />
                {
                  item.start && (
                    <p className="time">{moment(item.start).format('YYYY-MM-DD')}</p>
                  )
                }
              </div>
            );
          })
        }
      </div>
      <Viewer
        visible={isShowViewer}
        onClose={() => changePicState(0)}
        activeIndex={activeIndex}
        images={info.map(item => item.value).map(url => ({
          src: url,
          alt: '',
        }))}
      />
    </>
  );
}

export default ImgViewer;
