import React, { useState, useEffect, useMemo } from 'react';
import { RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'umi';
import { IImageItem, IState } from 'typings/model';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import NoData from '@/assets/img/icon_nodata.png';
import Title from '../Title';
import ImageList from './ImageList';
import styles from './index.scss';

function CheckImages() {
  const dispatch = useDispatch();
  const { insImg, anaImg, otherImg } = useSelector((state: IState) => state.image);
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState<IImageItem>();
  const [hideCont, setHideCont] = useState(false);
  // const color = ['red', 'green', 'gray'];
  const handleShowImages = (item: IImageItem) => {
    if (item.count) {
      setShowModal(true);
      setActiveItem(item);
    }
  };
  const fetchImages = () => {
    dispatch({
      type: 'image/fetchImageCount',
      payload: {},
    });
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const getDate = (item:IImageItem) => {
    const { count, lastReportAt } = item;
    if (count === 0) {
      return '--';
    }
    return lastReportAt ? `(${dayjs(lastReportAt, 'x').format('YYYY.MM.DD')})` : '时间不详';
  };
  const typeList = [
    {
      title: '化验单',
      data: anaImg,
    },
    {
      title: '检查单',
      data: insImg,
    },
  ];
  const renderItem = useMemo(() => (data: IImageItem[], hideDate?: boolean) => (
    data.map((item:IImageItem) => {
      return (
      // red green
      <div
        // className={styles[color[item.status]]}
        onClick={() => handleShowImages(item)}
        key={item.name}
        className={(item.name === '待审核图片' && item.count > 0) ? styles.red : ''}
      >
        <span className={styles.name}>
          {item.name}
        </span>
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
      );
    })), [anaImg, insImg, otherImg]);
  return (
    <>
      {
        typeList.map((t) => (
          <div className={styles.check_img} key={t.title}>
            <Title text={t.title} />
            <div className={styles.list}>
              { t.data.length > 0 ? renderItem(t.data) : (
                <div className="flex flex-col items-center h-full" style={{ justifyContent: 'center' }}>
                  <img className="w-50 h-50" src={NoData} alt="" />
                  <span className="text-gray-300 text-sm mt-6">{`暂无${t.title}`}</span>
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
            data={activeItem as IImageItem}
            handleHideCont={() => setHideCont(!hideCont)}
            refresh={fetchImages}
          />
          <div />
        </div>
      </DragModal>
    </>
  );
}

export default CheckImages;
