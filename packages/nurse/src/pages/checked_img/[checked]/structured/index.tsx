import React, { FC, useEffect, useState } from 'react';
import { history } from 'umi';
import { isEmpty } from 'lodash';
import { Spin } from 'antd';
import * as api from '@/services/api';
import StructuredDetail from './compontents/StructuredDetail';
import ImgWrap from './compontents/ImgWrap';

interface IData {
  list: IImgTypeItems[],
  url: string;
  imageOutType?: string;
  degree: number;
}
const Structured: FC = () => {
  const [data, setData] = useState<IData>({});
  const { imageId } = history.location.query;
  useEffect(() => {
    const params = {
      imageId,
      patientSid: window.$storage.getItem('patientSid'),
    };
    console.log('paramsd', params);
    api.image.fetchImageIndexes(params).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <>
      {
        !isEmpty(data) ? (
          <div className="flex justify-start items-start mt-10" style={{ minWidth: 1200 }}>
            <ImgWrap imageUrl={data.url} imageId={imageId} degree={Number(data?.degree ?? 0)} />
            <StructuredDetail data={data} imageId={imageId} />
          </div>
        ) : <div className="h-500 w-full flex items-center justify-center"><Spin size="large" /></div>
      }
    </>
  );
};
export default Structured;
