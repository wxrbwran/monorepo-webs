import React, { useState, FC, useEffect } from 'react';
import { Spin, message } from 'antd';
import uuid from 'react-uuid';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import * as api from '@/services/api';
import ImgWrap from './compontents/ImgWrap';
import StructuredDetail from './compontents/StructuredDetail';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';

interface IImg {
  imageId: string;
  uploadTime: number;
  lastReportAt?: number;
  url: string;
  status: number; // 0是异常 1是正常
  degree: number;
  reviewStatus: string; // 0待审核   TO_REVIEW,   4已审核 REVIEW
}
interface IProps {
  handleRefresh?: () => void;
  imageInfo?: {
    imageId?: string;
    imageUrl?: string;
  };
  images: IImg[];
}

// 待审核进入，不需要获取图片详情，其余入口都要获取图片详情
// im聊天进入，需要根据imageInfo获取图片url

const CheckImgStructured: FC<IProps> = (props) => {
  const { children, imageInfo, handleRefresh, images } = props;
  console.log('image232s', images);
  const [showViewer, setShowViewer] = useState(false);
  const [hydData, setHydData] = useState<IApiDocumentList[]>([]);
  const [jcdData, setJcdData] = useState<ITopicItemApi[]>([]);
  const [imgData, setImgData] = useState<IImg[]>(images);
  const [isLoaded, setIsLoaded] = useState(false);
  // 全部模板 from ： 0
  // const [tempAll, settempAll] = useState<ITmpList>({});
  const patientSid = window.$storage.getItem('patientSid');
  const handleStructured = () => {
    setShowViewer(true);
  };
  const hideViewer = () => {
    setShowViewer(false);
  };
  const fetchImageJcds = async (imageId: string) => {
    const params = { meta: { imageId,  sid: patientSid } };
    const data = api.image.fetchImageJcdAndOther(params);
    return data;
  };
  const fetchImageIndexes = async (imageId: string, groupId: string) => {
    const params = {
      imageId,
      groupId,
      patientSid: patientSid,
      operatorId: window.$storage.getItem('sid'),
      wcId: window.$storage.getItem('wcId'),
    };
    const data = await api.image.fetchImageIndexes(params);
    return data;
  };
  const fetchData = (id: string, groupId: string) => {
    Promise.all([fetchImageIndexes(id, groupId), fetchImageJcds(id)]).then((res: any[]) => {
      const [hData, jData ] = res;
      setHydData(hData.list.map(item => {
        return ({ ...item, key: uuid() });
      }));
      setJcdData(jData.list.map(item => {
        return ({ ...item, meta: {
          ...item.meta,
          tabKey: uuid(),
        } });
      }));
      // setImgData({ ...hData, imageId: id });
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    if (showViewer) {
      setImgData(images);
      if (imageInfo && imageInfo.imageUrl) {
        // im入口点击 图片，先获取图片id，图片groupid
        api.image.putImage({
          url: imageInfo.imageUrl,
          sid: patientSid,
          wcId: window.$storage.getItem('wcId'),
        }).then((res: { id: string }) => {
          fetchData(res.id);
          // setImgData
        }).catch(err => {
          message.error(err?.result || '获取图片信息失败');
        });
      } else {
        if (images.length > 1) {
          if (images[0].reviewStatus === 'REVIEW') {
            //  已审核过的图片
            fetchData(images[0].imageId, images[0].groupId);
          } else {
            // 待审核图片进入 ，直接审核图片
            console.log('-----待审核');
            setIsLoaded(true);
          }
        }
      }
    } else {
      setHydData([]);
      setJcdData([]);
      setIsLoaded(false);
    }
  }, [showViewer, images]);
  console.log('---loading', isLoaded);
  return (
    <>
      <span onClick={handleStructured}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-full"
        // zIndex={1010}
        style={{ top: 0, height: '100vh' }}
        width="100%"
        visible={showViewer}
        title=""
        onCancel={hideViewer}
        footer={null}
        destroyOnClose
      >
        <div>
          {!isEmpty(imgData) ? (
            <div className="flex justify-start items-start mt-10" style={{ minWidth: 1400 }}>
              <ImgWrap
                handleClose={() => setShowViewer(false)}
                images={imgData}
              />
              {isLoaded && (
                <StructuredDetail
                  hydData={hydData}
                  jcdData={jcdData}
                  jcdOriginIds={jcdData.map((item) => item.meta.id)}
                  images={imgData}
                  groupId={images?.[0]?.groupId}
                  handleRefresh={handleRefresh}
                  handleClose={() => setShowViewer(false)}
                  tempAll={{}}
                />
              )}
            </div>
          ) : (
            <div className="h-500 w-full flex items-center justify-center">
              <Spin size="large" />
              <div>2323</div>
            </div>
          )}
          {imgData && (
            <div className="pl-18 flex">
              <ExclamationCircleFilled style={{ color: '#FFCA4D', paddingTop: '4px' }} />
              <div className="ml-3">
                <p>1.如果图片内含多张单据，可通过搜索单据名称进行添加</p>
                <p>2.添加新的单据,每一张单据结构化后，一并保存</p>
              </div>
            </div>
          )}
        </div>
      </DragModal>
    </>
  );
};

export default CheckImgStructured;
