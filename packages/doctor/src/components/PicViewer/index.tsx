import React, { useState } from 'react';
import Viewer from '@/components/Viewer';

interface Iprops {
  children: React.ReactElement;
}
function PicViewer({ children }: Iprops) {
  const [showPic, setShowPic] = useState(false);
  const images = [
    {
      id: 'rwLQ9l',
      category: null,
      type: null,
      types: [
        'DBL',
        'XCG',
      ],
      typeName: null,
      status: null,
      reportAt: null,
      hospital: null,
      count: 4,
      url: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/d0f886d6-9a52-4ca8-974d-fd2e4123a34d',
      thumbUrl: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/bbd25d58-1811-4244-bb12-d0fe8806f13f',
      degree: 0,
      ocrImageTypes: null,
      mediaType: 'PICTURE',
      mediaTime: null,
      reviewTime: null,
      reviewerName: null,
      uploadTime: 1602837881888,
      amendStatus: null,
    },
    {
      id: 'l9YwOl',
      category: null,
      type: null,
      types: [
        'XCG',
      ],
      typeName: null,
      status: null,
      reportAt: null,
      hospital: null,
      count: 4,
      url: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/1392b966-1df0-467b-bc64-0784329ebb6a',
      thumbUrl: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/892aaa4d-57a7-4046-9d78-0a7be0252686',
      degree: 0,
      ocrImageTypes: null,
      mediaType: 'PICTURE',
      mediaTime: null,
      reviewTime: null,
      reviewerName: null,
      uploadTime: 1602830401865,
      amendStatus: null,
    },
    {
      id: '8KjVdl',
      category: null,
      type: null,
      types: [
        'XCG',
        'BCG',
        'OTHER_HY',
      ],
      typeName: null,
      status: null,
      reportAt: null,
      hospital: null,
      count: 4,
      url: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/6c27ac08-29b2-4534-b122-c37e13a1e4c4',
      thumbUrl: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/8d3d1158-46a3-418b-a337-5234aeb0e1b3',
      degree: 0,
      ocrImageTypes: null,
      mediaType: 'PICTURE',
      mediaTime: null,
      reviewTime: null,
      reviewerName: null,
      uploadTime: 1592981663439,
      amendStatus: null,
    },
    {
      id: '5A3jEl',
      category: null,
      type: null,
      types: [
        'XCG',
      ],
      typeName: null,
      status: null,
      reportAt: null,
      hospital: null,
      count: 4,
      url: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/7cbee8dd-1126-4fd2-8530-30a432396649',
      thumbUrl: 'https://medical-images-dev.oss-cn-beijing.aliyuncs.com/7548084a-0443-4a2e-b767-72c13716307c',
      degree: 0,
      ocrImageTypes: null,
      mediaType: 'PICTURE',
      mediaTime: null,
      reviewTime: null,
      reviewerName: null,
      uploadTime: 1592981189936,
      amendStatus: null,
    },
  ];

  return (
    <span>
      <span onClick={() => setShowPic(true)}>{children}</span>
      <Viewer
        visible={showPic}
        onClose={() => setShowPic(false)}
        images={images.map((image) => ({
          src: image.mediaType === 'PICTURE' ? `${image.url}?x-oss-process=image/auto-orient,1/resize,m_lfit,h_846` : image.url,
          alt: image.typeName,
          mediaType: image.mediaType,
          degree: 0,
        }))}
        rotateDegree={90}
        onMaskClick={() => setShowPic(false)}
        toolBarAppend={(
          <li
            onClick={() => setShowPic(false)}
            className="react-viewer-btn"
            key="close"
          >
            <span className="viewer__close">关闭</span>
          </li>
        )}
      />
    </span>
  );
}

export default PicViewer;
