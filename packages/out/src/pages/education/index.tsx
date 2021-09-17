import React from 'react';
import video from '@/assets/img/video.svg';
import suifang from '@/assets/img/suifang.svg';
import file from '@/assets/img/file.svg';
import article from '@/assets/img/article.svg';
import pic from '@/assets/img/pic.svg';
import mp3 from '@/assets/img/MP3.svg';
// import { Row, Col } from 'antd';
import SubType from './components/subType';


function Visite() {

  const fileType = [
    {
      type: 'video',
      name: '视频',
      icon: video,
      span: 5
    }, {
      type: 'audio',
      name: '音频',
      icon: mp3,
      span: 5
    }, {
      type: 'document',
      name: '文件',
      icon: file,
      span: 5
    }, {
      type: 'article',
      name: '编辑文章',
      icon: article,
      span: 5
    }, {
      type: 'picture',
      name: '图片',
      icon: pic,
      span: 5
    },{
      type: 'accompany',
      name: '随访表',
      icon: suifang,
      span: 5
    }
  ];

  return (
    <div className='flex flex-wrap'>
      {/* <Row>
        {
          fileType.map((item)=>(
            <Col key={item.type} span={item.span}>
              <SubType
                name={item.name}
                type={item.type}
                icon={item.icon}
              />
            </Col>
          ))
        }
      </Row> */}
      {
        fileType.map((item)=>(
          <div key={item.type} className='mx-30'>
            <SubType
              name={item.name}
              type={item.type}
              icon={item.icon}
            />
          </div>
        ))
      }
    </div>
  )
}

export default Visite;
