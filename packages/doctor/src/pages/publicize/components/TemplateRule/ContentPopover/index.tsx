import React, { useState } from 'react';
import styles from './index.scss';
import { Popover } from 'antd';
import ContentList from '../FirstSendTime/ContentList';
// import { ContentListModel } from '../FirstSendTime/ChoiceContent';
import { IList } from '../../../const';


interface Iprops {
  contentListsources: IList[],
  onRemoveSuccess: (item: any, index: number, newSources: any[]) => void,

  // dragModalSources: ContentListModel[]; //ContentListModel[]会作为+号点击弹窗的数据来源
  // onDragModalDidShow: () => void; // 弹窗显示会调
  onSaveChoices: (choices: IList[]) => void; // 选中的所有数据id,
  type: 'crf' | 'ducation' | 'suifang';
}

function ContentPopover({ contentListsources, onRemoveSuccess, type, onSaveChoices }: Iprops) {


  const [contentListVisible, setContentListVisible] = useState(false);


  const onVisibleChange = (visible) => {
    setContentListVisible(visible);
  };

  const dragModalDidShow = () => {
    setContentListVisible(false);
    // onDragModalDidShow();
  };

  console.log('================== contentListsources contentListsources', contentListsources.length);

  return (
    <Popover placement="bottom" content={
      <ContentList sources={contentListsources} onRemoveSuccess={onRemoveSuccess} onDragModalDidShow={dragModalDidShow} onSaveChoices={onSaveChoices} type={type} />
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
