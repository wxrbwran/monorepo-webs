import React, { useState, FC, useEffect } from 'react';
import { Spin } from 'antd';
import { IApiDocumentList, IImgStructuredApiData, IMeta, ITmpList, ITopicItemApi, ITopicTemplateItemApi } from 'typings/imgStructured';
import * as api from '@/services/api';
import ImgWrap from './compontents/ImgWrap';
import StructuredDetail from './compontents/StructuredDetail';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import uuid from 'react-uuid';
import { history } from 'umi';

interface IProps {
  handleRefresh?: () => void;
}
interface ITempItem {
  data: ITopicTemplateItemApi;
  meta: IMeta;
}
const CheckImgStructured: FC<IProps> = (props) => {
  const { handleRefresh } = props;
  const { imageId } = history.location.query;
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

  // 获取问题模板: 取上面接口返回的第一个list里的createtime  ，list为空表示是初次， form传0
  const fetchTemplate = (from: number, to: number) => {
    const params = { from, to: to || openTime };
    api.image.fetchImageTopicTemplate(params).then(res => {
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
  const fetchImageJcds = async () => {
    const params = { meta: { imageId,  sid: patientSid } };
    const data = api.image.fetchImageJcdAndOther(params);
    return data;
  };
  const fetchImageIndexes = async () => {
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
      setHydData(hData.list.map(item => {
        return ({ ...item, key: uuid() });
      }));
      // setJcdData(jData.list);
      setJcdData(jData.list.map(item => {
        return ({ ...item, key: uuid() });
      }));
      setImgData({ ...hData, imageId: id });
      if (!isEmpty(jData.list)) {
        fetchTemplate(jData.list[0].meta.createdTime, toTime);
      } else {
        setIsLoaded(true);
      }
    });
  };

  useEffect(() => {
    const oTime = new Date().getTime();
    setOpenTime(oTime);
    fetchTemplate(0, oTime);
    fetchData(imageId, oTime);
    return () => {
      setHydData([]);
      setJcdData([]);
      setTemplatePart({});
      setIsLoaded(false);
      setOpenTime(0);
    };
  }, []);
  // console.log('templatePart223', templatePart);
  // params.originIds = jcdData.map(item => item.meta.id);
  return (
    <div>
      {
        imgData ? (
          <div className="flex justify-start items-start" style={{ minWidth: 1200 }}>
            <ImgWrap
              imageUrl={imgData.url}
              handleClose={() => history.goBack()}
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
                  handleClose={() => history.goBack()}
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
          <div className="pl-18 flex -mt-10">
            <ExclamationCircleFilled style={{ color: '#FFCA4D', paddingTop: '4px' }} />
            <div className="ml-3">
              <p>1.如果图片内含多张单据，点击顶部选择图片类型</p>
              <p>2.添加新的单据,每一张单据结构化后，一并保存</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CheckImgStructured;
