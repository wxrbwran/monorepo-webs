import React, { useState, useEffect, useMemo } from 'react';
import { RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import Title from '../Title';
import ImageList from './ImageList';
import styles from './index.scss';

interface IImageItem {
  category: number; // 0化验单  1检查单
  count: number;
  lastReportAt: number;
  name: string;
  status: number; // 0是红色  1是绿色  2是灰色
  type: number;
  typeNew: string;
}
function CheckImages() {
  const [showModal, setShowModal] = useState(false);
  const [analysis, setAnalysis] = useState<IImageItem[]>([]);
  const [inspection, setInspection] = useState<IImageItem[]>([]);
  const [otherImg, setOtherImg] = useState<IImageItem[]>([]);
  const [activeItem, setActiveItem] = useState<IImageItem>();
  const [hideCont, setHideCont] = useState(false);
  const typeList = [
    {
      title: '化验单',
      data: analysis,
    },
    {
      title: '检查单',
      data: inspection,
    },
  ];
  const handleShowImages = (item: IImageItem) => {
    if (item.count) {
      setShowModal(true);
      setActiveItem(item);
    }
  };
  useEffect(() => {
    const params = {
      sid: window.$storage.getItem('patientSid'),
      wcId: window.$storage.getItem('patientWcId'),
    };
    window.$api.image.fetchImageCountNew(params).then((res: {images: IImageItem[]}) => {
      const { images } = res;
      const anaImg: IImageItem[] = [];
      const insImg: IImageItem[] = [];
      const oImg: IImageItem[] = [];
      images.forEach((item: IImageItem) => {
        if (item.category === 1) {
          insImg.push(item);
        } else if (item.category === 0) {
          anaImg.push(item);
        } else if (item.category === 2) {
          oImg.push(item);
        }
      });
      setAnalysis(anaImg);
      setInspection(insImg);
      setOtherImg(oImg);
    });
  }, []);
  const getDate = (item:IImageItem) => {
    const { count, lastReportAt } = item;
    if (count === 0) {
      return '无';
    }
    return lastReportAt ? dayjs(lastReportAt, 'x').format('YYYY.MM.DD') : '时间不详';
  };
  const renderItem = useMemo(() => (data: IImageItem[], hideDate?: boolean) => (
    data.map((item:IImageItem) => (
      // red green
      <div
        // className={styles[color[item.status]]}
        onClick={() => handleShowImages(item)}
        key={item.name}
        className={(item.name === '待审核图片' && item.count > 0) ? styles.red : ''}
      >
        <span className={styles.name}>{item.name}</span>
        {
          !hideDate && (
            <span className={styles.date}>
              {getDate(item)}
            </span>
          )
        }
        <span className={styles.count}>
          {`${item.count}张`}
          <RightOutlined />
        </span>
      </div>
    ))), [analysis, inspection, otherImg]);
  return (
    <>
      {
        typeList.map((t) => (
          <div className={styles.check_img} key={t.title}>
            <Title text={t.title} />
            <div className={styles.list}>
              { t.data.length > 0 ? renderItem(t.data) : (
                <div>
                  {`暂无${t.title}`}
                </div>
              )}
            </div>
            {
              t.title === '检查单' && (
                <div className="mt-30">
                  <Title text="其他图片" />
                  <div className={styles.list}>
                    {renderItem(otherImg, true)}
                  </div>
                </div>
              )
            }
          </div>
        ))
      }
      <DragModal
        wrapClassName={`ant-modal-wrap-center ${hideCont ? 'mode_hide' : 'mode_block'}`}
        // maskClosable={false}
        mask={!hideCont}
        width="1200px"
        visible={showModal}
        title={activeItem?.name || '单据'}
        onCancel={() => setShowModal(false)}
        footer={null}
        style={{ display: hideCont ? 'none' : 'block' }}
      >
        <div className={styles.images_wrap}>
          <ImageList
            typeNew={activeItem?.typeNew as string}
            handleHideCont={() => setHideCont(!hideCont)}
          />
          <div />
        </div>
      </DragModal>
    </>
  );
}

export default CheckImages;
