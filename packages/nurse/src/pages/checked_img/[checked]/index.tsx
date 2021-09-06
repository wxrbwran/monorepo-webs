import React, { useEffect, useState } from 'react';
import { useParams, history } from 'umi';
import { Button } from 'antd';
import XzlTable from '@/components/XzlTable';
import GoBack from '@/components/GoBack';

interface IUrlParams {
  checked: string;
}
function CheckedImg() {
  console.log('useParams()', useParams());
  const { checked } = useParams<IUrlParams>();
  const reviewStatus: CommonData = {
    checked: 'REVIEW', // 已审核
    unchecked: 'TO_REVIEW', // 待审核
  };
  const initOptions = {
    pageAt: 1,
    sid: window.$storage.getItem('patientSid'),
    reviewStatus: reviewStatus[checked],
  };
  const [depOptions, setOptions] = useState(initOptions);

  useEffect(() => {
    setOptions({
      ...depOptions,
      pageAt: 1,
      reviewStatus: reviewStatus[checked],
    });
  }, [checked]);
  const handleCallback = (selected: string[]) => {
    console.log(selected);
  };
  const handlePagerChange = (pageAt: number) => {
    setOptions({
      ...depOptions,
      pageAt,
    });
  };
  const handleGoDetail = (id: string) => {
    history.push(`${history.location.pathname}/structured?imageId=${id}`);
  };
  const columns = [
    {
      title: '图片',
      dataIndex: 'url',
      render: (data: string) => (
        <img className="w-50 h-50" src={data} alt="" />
      ),
    },
    {
      title: 'OCR分类结果',
      dataIndex: 'ocrImageType',
      render: (data: string[]) => (
        <div>
          {
            data?.map((item, index) => (
              `${item}${index === data.length - 1 ? '' : ','}`
            ))
          }
        </div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (data: string) => (
        <Button className="text-base" type="link" size="large" onClick={() => handleGoDetail(data)}>审核图片</Button>
      ),
    },
  ];
  if (checked === 'checked') {
    columns.splice(1, 0, {
      title: '人工审核结果',
      dataIndex: 'imageType',
      render: (data: string[]) => (
        <div>
          {
            data?.map((item, index) => (
              `${item}${index === data.length - 1 ? '' : ','}`
            ))
          }
        </div>
      ),
    });
  }
  return (
    <div>
      <XzlTable
        columns={columns}
        dataKey="images"
        // category="patientList"
        request={window.$api.image.fetchImageList}
        depOptions={depOptions}
        handleCallback={handleCallback}
        tableOptions={{
          handlePagerChange,
          rowSelection: false,
        }}
      />
      <GoBack />
    </div>
  );
}

export default CheckedImg;
