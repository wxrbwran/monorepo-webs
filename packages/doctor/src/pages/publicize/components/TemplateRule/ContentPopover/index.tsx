import React, { useState } from 'react';
import styles from './index.scss';
import { Popover } from 'antd';
import ContentList from '../FirstSendTime/ContentList';
import { ContentListModel } from '../FirstSendTime/ChoiceContent';


interface Iprops {
  contentListsources: {
    url: string,
    name: string,
  }[],
  onRemoveSuccess: (item: any, index: number, newSources: any[]) => void,

  dragModalSources: ContentListModel[]; //ContentListModel[]会作为+号点击弹窗的数据来源
  onDragModalDidShow: () => void; // 弹窗显示会调
  onSaveChoices: (choiceIds: string[]) => void; // 选中的所有数据id,
}

function ContentPopover({ contentListsources, onRemoveSuccess, dragModalSources, onDragModalDidShow, onSaveChoices }: Iprops) {


  const [contentListVisible, setContentListVisible] = useState(false);



  const onVisibleChange = (visible) => {
    setContentListVisible(visible);
  };

  const dragModalDidShow = () => {
    setContentListVisible(false);
    onDragModalDidShow();
  };

  return (
    <Popover placement="bottom" content={
      <ContentList sources={contentListsources} onRemoveSuccess={onRemoveSuccess} dragModalSources={dragModalSources} onDragModalDidShow={dragModalDidShow} onSaveChoices={onSaveChoices} />
    } onVisibleChange={onVisibleChange} visible={contentListVisible} trigger="click">
      <div className={`w-120 h-40 rounded-md text-center relative justify-center flex flex-col ${styles.content}`}>
        <div>
          选择发送内容
        </div>
        {
          !contentListsources?.length && <div className={`w-5 h-5 absolute top-5 right-5 rounded-full ${styles.content_circle}`}>
          </div>
        }
      </div>
    </Popover>
  );
}

export default ContentPopover;
