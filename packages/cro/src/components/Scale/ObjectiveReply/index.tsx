import React, { useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Input } from 'antd';
import * as api from '@/services/api';
import Viewer from '@/components/Viewer';
import styles from './index.scss';
import config from '@/config';

interface IProps {
  children: React.ReactElement;
  scaleId: string;
  scaleType: 'OBJECTIVE' | 'VISIT_OBJECTIVE';
}
interface IInfoList {
  imageList: string[];
  patientName: string;
  patientSid: string;
  replyNumber: number;
  sendNumber: number;
}

function Reply({ children, scaleId, scaleType }: IProps) {

  const [wordKey, setWordKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [infoList, setInfoList] = useState<IInfoList[]>([]);
  const [isShowViewer, setIsShowViewer] = useState(false); // 是否显示预览图片
  const [images, setImages] = useState<string[]>([]); // 预览图片集
  const [activeIndex, setActiveIndex] = useState(0); // 预览图片从第几张开始

  const changePicState = (idx: any) => {
    setIsShowViewer(false);
    setTimeout(() => {
      setShowModal(true);
    }, 500); // 添加延迟修复bug点击回复详情弹窗再点击图片弹窗再关闭弹窗，量表列表不能滑动问题
    setActiveIndex(idx);
  };
  const fetchScaleDetail = () => {

    console.log('============= scaleType scaleType', scaleType);
    const params: any = {
      scaleId,
      type: scaleType == 'OBJECTIVE' ? 1 : 4,
    };
    if (wordKey) {
      params.patientName = wordKey;
    }
    api.subjective.getReplyDetail(params).then((res) => {
      setInfoList(res.replyInfoList);
      let imgArr: string[] = [];
      res.replyInfoList.forEach((item: { imageList: string[] }) => {
        imgArr = [...imgArr, ...item.imageList];
      });
      setImages([...imgArr]);
    });
  };
  const handleShowImgModal = () => {
    fetchScaleDetail();
    setShowModal(true);
  };
  const handleShowViewer = (img: string) => {
    setActiveIndex(images.indexOf(img));
    setShowModal(false);
    setIsShowViewer(true);
  };

  const handleSearchKey = (_word: string) => {
    fetchScaleDetail();
  };

  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordKey(e.target.value);
  };

  return (
    <>
      <div style={{ display: 'inline' }} onClick={handleShowImgModal}>{children}</div>
      {showModal && (
        <DragModal
          visible={showModal}
          title='回复详情'
          width={800}
          wrapClassName="ant-modal-wrap-center send_plan"
          onCancel={() => setShowModal(false)}
          maskClosable
          footer={null}
          className={styles.send_plan}
        >
          <div className={styles.search}>
            <Input.Search
              placeholder='搜索姓名'
              value={wordKey}
              style={{ width: 200 }}
              onSearch={handleSearchKey}
              onChange={handleChangeKey}
            />
          </div>
          {
            infoList.length > 0 ? infoList.map((item) => {
              return (
                <>
                  <div className={styles.img_title}>
                    <p className={styles.name}>{item.patientName}</p>
                    <p>发送客观检查提醒次数：{item.sendNumber}</p>
                    <p>回复单据数量：{item.replyNumber}</p>
                  </div>
                  <div className={styles.img_list}>
                    {
                      item.imageList && item.imageList.map((img) => {
                        return (
                          <img src={img} key={img} onClick={() => handleShowViewer(img)} onError={(e) => { e.target.src = config.defaultAvatar; }} />
                        );
                      })
                    }
                  </div>
                </>
              );
            }) : <div className={styles.empty}>暂无数据</div>
          }
        </DragModal>
      )}
      {
        images && (
          <Viewer
            visible={isShowViewer}
            onClose={() => changePicState(0)}
            activeIndex={activeIndex}
            images={images.map(url => ({
              src: url,
              alt: '',
            }))}
          />
        )
      }
    </>
  );
}

export default Reply;
