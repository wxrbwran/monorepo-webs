import React, { useState } from 'react';
import iconClose from '@/assets/img/icon_close.png';
import iconAdd from '@/assets/img/icon_add_large.png';
import styles from './index.scss';
import { defaultAvatar } from 'xzl-web-shared/src/utils/consts';
import ChoiceContent, { ContentListModel } from '../ChoiceContent';


interface Iprops {
  sources: {
    url: string,
    name: string,
  }[],
  onRemoveSuccess: (item: any, index: number, newSources: any[]) => void,

  dragModalSources: ContentListModel[]; //ContentListModel[]会作为+号点击弹窗的数据来源
  onDragModalDidShow: () => void; // 弹窗显示会调
  onSaveChoices: (choiceIds: string[]) => void; // 选中的所有数据id,
}



function ContentList({ sources, onRemoveSuccess, dragModalSources, onDragModalDidShow, onSaveChoices }: Iprops) {

  const [contentList, setContentList] = useState<{
    url: string,
    name: string,
  }[]>(sources);

  const onRemove = (item: any, index: number) => {

    contentList.splice(index, 1);

    console.log('============= onRemove', JSON.stringify(contentList));
    setContentList([...contentList]);
    onRemoveSuccess(item, index, contentList);
  };

  return (
    <div className='flex flex-wrap'>
      {
        contentList.map((item, index) => (
          <div className={`flex flex-col justify-center relative w-86 h-113 mr-20 mt-15 rounded-md ${styles.tem}`}>
            <img className="absolute right-3 top-3 w-14 h-14" src={iconClose} alt="" onClick={() => { onRemove(item, index); }} />
            <img className="w-86 h-86 rounded" src={item.url ?? defaultAvatar} alt="" />
            <div className={`mt-10 ${styles.name}`} title={item.name ?? ''}>{item.name ?? ''}</div>
          </div>
        ))
      }
      {
        <ChoiceContent dragModalDidShow={onDragModalDidShow} dragModalSources={dragModalSources} onSaveChoices={onSaveChoices}>
          <div className={`flex items-center justify-center box-shadow w-86 h-86 rounded-md mt-15 ${styles.item}`}>
            <img src={iconAdd} alt="" />
          </div>,
        </ChoiceContent>
      }
    </div>
  );
}

export default ContentList;
