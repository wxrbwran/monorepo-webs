import React, { useState, FC, useEffect } from 'react';
import { Spin } from 'antd';
// import uuid from 'react-uuid';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import * as api from '@/services/api';
import ImgWrap from './compontents/ImgWrap';
import StructuredDetail from './compontents/StructuredDetail';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { IApiDocumentList, ITopicItemApi } from 'typings/imgStructured';

interface IImg {
  imageId: string;
  uploadTime: number;
  lastReportAt?: number;
  url: string;
  status: number; // 0是异常 1是正常
  degree: number;
  reviewStatus: string; // 0待审核   TO_REVIEW,   4已审核 REVIEW
  groupId?: string;
}
interface IProps {
  handleRefresh?: () => void;
  imageInfo?: {
    imageId?: string;
    imageUrl?: string;
  };
  images: IImg[];
  sid: string;
}

// 待审核进入，不需要获取图片详情，其余入口都要获取图片详情
// im聊天进入，需要根据imageInfo获取图片url

const CheckImgStructured: FC<IProps> = (props) => {
  const { children, handleRefresh, images, sid } = props;
  console.log('image232s', images);
  const [showViewer, setShowViewer] = useState(false);
  const [hydData, setHydData] = useState<IApiDocumentList[]>([]);
  const [jcdData, setJcdData] = useState<ITopicItemApi[]>([]);
  const [imgData, setImgData] = useState<IImg[]>(images);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleStructured = () => {
    setShowViewer(true);
  };
  const hideViewer = () => {
    setShowViewer(false);
  };
  // 获取
  const fetchImageJcds = async (imageId: string, groupId: string | undefined) => {
    const params: any = { meta: { sid: sid } };
    // 有groupId就传imgGroupId(新数据),没有就传imageId(兼容老数据情况);
    if (groupId) {
      params.meta.imgGroupId = groupId;
    } else {
      params.meta.imageId = imageId;
    }
    const data = api.image.fetchImageJcdAndOther(params);
    return data;
  };
  const fetchImageIndexes = async (imageId: string, groupId: string | undefined) => {
    const params = {
      imageId,
      groupId,
      patientSid: sid,
      operatorId: localStorage.getItem('xzl-web-doctor_sid'),
      wcId: localStorage.getItem('xzl-web-doctor_wcId'),
    };
    if (groupId) {
      params.groupId = groupId;
    }
    const data = await api.image.fetchImageIndexes(params);
    return data;
  };
  const fetchData = (id: string, groupId: string | undefined) => {
    Promise.all([fetchImageIndexes(id, groupId), fetchImageJcds(id, groupId)]).then((res: any[]) => {
      const [hData, jData] = res;

      setHydData(hData.list.map(item => {
        return ({
          ...item,
          // key: uuid()
        });
      }));
      setJcdData(jData.list.map(item => {
        return ({
          ...item, meta: {
            ...item.meta,
            // tabKey: uuid(),
          },
        });
      }));
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    if (showViewer) {
      setImgData(images);

      if (images.length > 0) {
        if (images[0].reviewStatus === 'REVIEW') {
          //  已审核过的图片
          fetchData(images[0].imageId, images[0]?.groupId);
        } else {
          // 待审核图片进入 ，直接审核图片
          console.log('-----待审核');
          setIsLoaded(true);
        }
      }
      // }
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
