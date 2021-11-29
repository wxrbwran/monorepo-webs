import React from 'react';
import video from '@/assets/img/suifang/video.svg';
import suifang from '@/assets/img/suifang/suifang.svg';
import crf from '@/assets/img/suifang/crf.png';
import file from '@/assets/img/suifang/file.svg';
import article from '@/assets/img/suifang/article.svg';
import pic from '@/assets/img/suifang/pic.svg';
import mp3 from '@/assets/img/suifang/MP3.svg';
import SubType from '../components/SubType';

function Visite() {
  const fileType = [
    {
      type: 'video',
      name: '视频',
      icon: video,
    },
    {
      type: 'audio',
      name: '音频',
      icon: mp3,
    },
    {
      type: 'document',
      name: '文件',
      icon: file,
    },
    {
      type: 'article',
      name: '编辑文章',
      icon: article,
    },
    {
      type: 'picture',
      name: '图片',
      icon: pic,
    },
    {
      type: 'accompany',
      name: '随访表',
      icon: suifang,
    },
    {
      type: 'crf',
      name: 'CRF量表',
      icon: crf,
    },
  ];

  return (
    <div className="flex flex-wrap">
      {fileType.map((item) => (
        <div key={item.type} className="mx-30">
          <SubType name={item.name} type={item.type} icon={item.icon} />
        </div>
      ))}
    </div>
  );
}

export default Visite;
