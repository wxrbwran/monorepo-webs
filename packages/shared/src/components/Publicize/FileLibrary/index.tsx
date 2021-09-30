import React from 'react';
// import video from '@/assets/img/video.svg';
// import suifang from '@/assets/img/suifang.svg';
// import file from '@/assets/img/file.svg';
// import article from '@/assets/img/article.svg';
// import pic from '@/assets/img/pic.svg';
// import mp3 from '@/assets/img/MP3.svg';
// import { Row, Col } from 'antd';
import SubType from '../SubType';

interface IProps {
  uploadPublicizeRequest: (params: any) => Promise<any>;
  filePrepareRequest: (params: any) => Promise<any>;
}

function FileLibrary({ uploadPublicizeRequest, filePrepareRequest }: IProps) {
  const fileType = [
    {
      type: 'video',
      name: '视频',
      icon: 'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/test/2/367545c1-beba-4eb2-8654-e2c7b34835f8video.6193c135.svg',
    },
    {
      type: 'audio',
      name: '音频',
      icon: 'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/test/2/367545c1-beba-4eb2-8654-e2c7b34835f8video.6193c135.svg',
    },
    {
      type: 'document',
      name: '文件',
      icon: 'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/test/2/367545c1-beba-4eb2-8654-e2c7b34835f8video.6193c135.svg',
    },
    {
      type: 'article',
      name: '编辑文章',
      icon: 'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/test/2/367545c1-beba-4eb2-8654-e2c7b34835f8video.6193c135.svg',
    },
    {
      type: 'picture',
      name: '图片',
      icon: 'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/test/2/367545c1-beba-4eb2-8654-e2c7b34835f8video.6193c135.svg',
    },
    {
      type: 'accompany',
      name: '随访表',
      icon: 'https://xzl-im-files.oss-cn-hangzhou.aliyuncs.com/test/2/367545c1-beba-4eb2-8654-e2c7b34835f8video.6193c135.svg',
    },
  ];

  return (
    <div className="flex flex-wrap">
      {fileType.map((item) => (
        <div key={item.type} className="mx-30">
          <SubType
            name={item.name}
            type={item.type}
            icon={item.icon}
            uploadPublicizeRequest={uploadPublicizeRequest}
            filePrepareRequest={filePrepareRequest}
          />
        </div>
      ))}
    </div>
  );
}

export default FileLibrary;
