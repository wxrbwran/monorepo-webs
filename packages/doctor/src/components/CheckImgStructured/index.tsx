import React, { useState, FC, useEffect } from 'react';
import { Spin, message } from 'antd';
import { IImgStructuredApiData } from 'typings/imgStructured';
import DragModal from '@/components/DragModal';
import * as api from '@/services/api';
import ImgWrap from './compontents/ImgWrap';
import StructuredDetail from './compontents/StructuredDetail';

interface IProps {
  handleRefresh?: () => void;
  imageInfo: {
    imageId?: string;
    imageUrl?: string;
  }
}
const CheckImgStructured: FC<IProps> = (props) => {
  const { children, imageInfo, handleRefresh } = props;
  const [showViewer, setShowViewer] = useState(false);
  const [data, setData] = useState<IImgStructuredApiData>();
  const handleStructured = () => {
    setShowViewer(true);
  };
  const hideViewer = () => {
    setShowViewer(false);
  };
  const fetchImageIndexes = (imageId: string) => {
    const params = {
      imageId,
      patientSid: window.$storage.getItem('patientSid'),
    };
    // 新指标库获取图片结构化数据指标
    api.image.fetchImageIndexes(params).then((res) => {
      setData({ ...res, imageId });
    });
  };
  useEffect(() => {
    if (showViewer) {
      const { imageId, imageUrl } = imageInfo;
      if (imageId) {
        fetchImageIndexes(imageId);
      } else if (imageUrl) {
        // im入口点击 图片，先获取图片id
        api.image.putImage({
          url: imageUrl,
          sid: window.$storage.getItem('patientSid'),
          wcId: window.$storage.getItem('wcId'),
        }).then((res: {id: string}) => {
          fetchImageIndexes(res.id);
        });
      } else {
        message.error('获取图片信息失败');
      }
    } else {
      setData(undefined);
    }
  }, [showViewer]);
  return (
    <>
      <span onClick={handleStructured}>{ children }</span>
      <DragModal
        wrapClassName="ant-modal-wrap-full"
        zIndex={1010}
        width="100%"
        visible={showViewer}
        title=""
        onCancel={hideViewer}
        footer={null}
      >
        <div>
          {
            data ? (
              <div className="flex justify-start items-start mt-10">
                <ImgWrap
                  imageUrl={data.url}
                  handleClose={() => setShowViewer(false)}
                  imageId={data.imageId}
                  degree={Number(data?.degree ?? 0)}
                />
                <StructuredDetail
                  data={data}
                  imageId={data.imageId}
                  handleRefresh={handleRefresh}
                  handleClose={() => setShowViewer(false)}
                />
              </div>
            ) : (
              <div className="h-500 w-full flex items-center justify-center"><Spin size="large" /></div>
            )
          }
        </div>
      </DragModal>
    </>
  );
};

export default CheckImgStructured;
