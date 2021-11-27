
import React, { useState } from 'react';
import { message } from 'antd';
import { useSelector } from 'umi';

import TemplateRule from '../components/TemplateRule';
import * as api from '@/services/api';


function CRFScale() {

  const [dragModalSources, setDragModalSources] = useState<ContentListModel[]>([]);

  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  const fileType = [
    {
      name: '视频',
      code: 1,
      type: 'video',
    }, {
      name: '文件',
      code: 2,
      type: 'document',
    }, {
      name: '文章',
      code: 3,
      type: 'article',
    }, {
      name: '图片',
      code: 4,
      type: 'picture',
    }, {
      name: '音频',
      code: 6,
      type: 'audio',
    },
  ];

  // 查询随访表列表
  const getPublicizeScaleList = () => {
    api.education.getPublicizeList({
      // fromSid: window.$storage.getItem('orgSid'),
      types: ['DOCUMENT', 'VIDEO', 'ARTICLE', 'AUDIO', 'PICTURE'],
      operatorSid: window.$storage.getItem('sid'),
      operatorWcId: window.$storage.getItem('wcId'),
      ownershipSid: currentOrgInfo.sid,
      roleType: window.$storage.getItem('roleId'),
    }).then((res) => {

      const list = [];
      fileType.forEach((type) => {

        if (res.list.filter(p => p.type === type.code).length > 0) {
          list.push({
            title: type.name,
            lists: res.list.filter(p => p.type === type.code),
            ...type,
          });
        }
      });
      setDragModalSources(list);
    })
      .catch((err: string) => {
        message.error(err?.result);
      });
  };

  const dragModalDidShow = () => {

    getPublicizeScaleList();
  };

  return (
    <div className='ml-100 mt-100'>
      <TemplateRule mode={'add'}
        dragModalDidShow={dragModalDidShow}
        dragModalSources={dragModalSources}
        type={'PUBLICIZE_EDUCATION'}
        sourceType={3}
        onCancelClick={() => { }}
        onSaveClick={() => { }}>

      </TemplateRule>
    </div>
  );
}

export default CRFScale;
