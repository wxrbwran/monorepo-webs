import React, { useState, FC, useEffect } from 'react';
import { Spin, message } from 'antd';
import { IApiDocumentList, IImgStructuredApiData, IMeta, ITmpList, ITopicItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import * as api from '@/services/api';
import ImgWrap from './compontents/ImgWrap';
import StructuredDetail from './compontents/StructuredDetail';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';

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
  const [openTime, setOpenTime] = useState(new Date().getTime()); // 打开图片结构化的时间
  // 编辑：后增加的模板
  const [templatePart, setTemplatePart] = useState<ITmpList>({});
  // 全部模板 from ： 0
  const [tempAll, settempAll] = useState<ITmpList>({});
  const patientSid = window.$storage.getItem('patientSid');
  const handleStructured = () => {
    setShowViewer(true);
  };
  const hideViewer = () => {
    setShowViewer(false);
  };
  // 获取问题模板: 取上面接口返回的第一个list里的createtime  ，list为空表示是初次， form传0
  const fetchTemplate = (from: number, to: number) => {
    const params = { from, to: to || openTime };
    api.image.fetchImageTopicTemplate(params).then(res => {
      console.log(3443222, res);
      const tempData: ITmpList = {};
      res.list.forEach((item: ITempItem) => {
        const type = item.meta.title;
        if (!tempData[type]) {
          tempData[type] = [];
        }
        tempData[type] = tempData[type].concat(item.data);
      });
      if (from) {
        setTemplatePart(tempData);
        setIsLoaded(true);
      } else {
        settempAll(tempData);
      }
    });
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
  const fetchData = (id: string, toTime: number) => {
    Promise.all([fetchImageIndexes(id), fetchImageJcds(id)]).then((res: any[]) => {
      const [hData, jData] = res;
      setHydData(hData.list);
      setJcdData(jData.list);
      setImgData({ ...hData, imageId: id });
      if (!isEmpty(jData.list)) {
        fetchTemplate(jData.list[0].meta.createdTime, toTime);
      } else {
        setIsLoaded(true);
      }
    });
  };

  useEffect(() => {
    if (showViewer) {
      const oTime = new Date().getTime();
      setOpenTime(oTime);
      fetchTemplate(0, oTime);
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
      setTemplatePart({});
      setIsLoaded(false);
      setOpenTime(0);
    }
  }, [showViewer]);
  // console.log('templatePart223', templatePart);
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
              <div className="flex justify-start items-start mt-10" style={{ minWidth: 1200 }}>
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
                      imageId={imgData?.imageId}
                      handleRefresh={handleRefresh}
                      handleClose={() => setShowViewer(false)}
                      templatePart={templatePart}
                      tempAll={tempAll}
                      openTime={openTime}
                      // openTime={1632463461030}
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
