import React, { useState, FC, useEffect } from 'react';
import { Spin, message } from 'antd';
import { IApiDocumentList, IImgStructuredApiData, IMeta, ITmpList, ITopicItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import * as api from '@/services/api';
import ImgWrap from './compontents/ImgWrap';
import StructuredDetail from './compontents/StructuredDetail';
import { ExclamationCircleFilled } from '@ant-design/icons';
import uuid from 'react-uuid';

interface IProps {
  handleRefresh?: () => void;
  imageInfo: {
    imageId?: string;
    imageUrl?: string;
  }
}
interface ITempItem {
  data: ITopicTemplateItemApi;
  meta: IMeta;
}
const CheckImgStructured: FC<IProps> = (props) => {
  const { children, imageInfo, handleRefresh } = props;
  const [showViewer, setShowViewer] = useState(false);
  const [hydData, setHydData] = useState<IApiDocumentList[]>([]);
  const [jcdData, setJcdData] = useState<ITopicItemApi[]>([]);
  const [imgData, setImgData] = useState<IImgStructuredApiData>();
  const [isLoaded, setIsLoaded] = useState(false);
  // 全部模板 from ： 0
  const [tempAll, settempAll] = useState<ITmpList>({});
  const patientSid = window.$storage.getItem('patientSid');
  const handleStructured = () => {
    setShowViewer(true);
  };
  const hideViewer = () => {
    setShowViewer(false);
  };
  const formatTemplate = (res) => {
    const tempData: ITmpList = {};
    res.list.forEach((item: ITempItem) => {
      const { method, part, title } = item.meta;
      const type = title === 'JCD' ? JSON.stringify({ method, part }) : item.meta.title;
      if (!tempData[type]) {
        tempData[type] = [];
      }
      tempData[type] = tempData[type].concat(item.data);
    });
    settempAll(tempData);
  };
  const fetchTemplate = async (from: number, to: number) => {
    const params = { from, to };
    const data = api.image.fetchImageTopicTemplate(params);
    return data;
  };
  const fetchImageJcds = async (imageId: string) => {
    const params = { meta: { imageId,  sid: patientSid } };
    const data = api.image.fetchImageJcdAndOther(params);
    return data;
  };
  const fetchImageIndexes = async (imageId: string) => {
    const params = {
      imageId,
      patientSid: patientSid,
      operatorId: window.$storage.getItem('sid'),
      wcId: window.$storage.getItem('wcId'),
    };
    const data = await api.image.fetchImageIndexes(params);
    return data;
  };
  const fetchData = (id: string, oTime: number) => {
    Promise.all([fetchTemplate(0, oTime), fetchImageIndexes(id), fetchImageJcds(id)]).then((res: any[]) => {
      const [tempData, hData, jData ] = res;
      formatTemplate(tempData);
      setHydData(hData.list.map(item => {
        return ({ ...item, key: uuid() });
      }));
      setJcdData(jData.list.map(item => {
        return ({ ...item, key: uuid() });
      }));
      setImgData({ ...hData, imageId: id });
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    if (showViewer) {
      const oTime = new Date().getTime();
      const { imageId, imageUrl } = imageInfo;
      if (imageId) {
        fetchData(imageId, oTime);
      } else if (imageUrl) {
        // im入口点击 图片，先获取图片id
        api.image.putImage({
          url: imageUrl,
          sid: patientSid,
          wcId: window.$storage.getItem('wcId'),
        }).then((res: { id: string }) => {
          fetchData(res.id, oTime);
        });
      } else {
        message.error('获取图片信息失败');
      }
    } else {
      setHydData([]);
      setJcdData([]);
      setIsLoaded(false);
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
        destroyOnClose
      >
        <div>
          {
            imgData ? (
              <div className="flex justify-start items-start mt-10" style={{ minWidth: 1400 }}>
                <ImgWrap
                  imageUrl={imgData.url}
                  handleClose={() => setShowViewer(false)}
                  imageId={imgData.imageId}
                  degree={Number(imgData?.degree ?? 0)}
                />
                {
                  isLoaded && (
                    <StructuredDetail
                      hydData={hydData}
                      jcdData={jcdData}
                      jcdOriginIds={jcdData.map(item => item.meta.id)}
                      imageId={imgData?.imageId}
                      handleRefresh={handleRefresh}
                      handleClose={() => setShowViewer(false)}
                      tempAll={tempAll}
                    />
                  )
                }
              </div>
            ) : (
              <div className="h-500 w-full flex items-center justify-center"><Spin size="large" /></div>
            )
          }
          {
            imgData && (
              <div className="pl-18 flex">
                <ExclamationCircleFilled style={{ color: '#FFCA4D', paddingTop: '4px' }} />
                <div className="ml-3">
                  <p>1.如果图片内含多张单据，点击顶部选择图片类型</p>
                  <p>2.添加新的单据,每一张单据结构化后，一并保存</p>
                </div>
              </div>
            )
          }
        </div>
      </DragModal>
    </>
  );
};

export default CheckImgStructured;
