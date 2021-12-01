import React, { useState, useEffect } from 'react';
import iconClose from '@/assets/img/icon_close.png';
import iconAdd from '@/assets/img/icon_add_large.png';
import styles from './index.scss';
import ChoiceContent from '../ChoiceContent';
import { IList } from '../../../../const';
import ListItem from '../../../ListItem';


interface Iprops {
  sources: IList[],
  onRemoveSuccess: (item: any, index: number, newSources: any[]) => void,

  // dragModalSources: ContentListModel[]; //ContentListModel[]会作为+号点击弹窗的数据来源
  onDragModalDidShow: () => void; // 弹窗显示会调
  onSaveChoices: (choices: IList[]) => void; // 选中的所有数据id,

  type: 'crf' | 'education' | 'suifang';
}



function ContentList({ sources, onRemoveSuccess, type, onSaveChoices, onDragModalDidShow }: Iprops) {

  const [contentList, setContentList] = useState<IList[]>(sources);

  useEffect(() => {
    console.log('=============== useEffect,', sources.length);
    setContentList(sources);
  }, [sources]);

  const onRemove = (item: any, index: number) => {

    contentList.splice(index, 1);

    console.log('============= onRemove', JSON.stringify(contentList));
    setContentList([...contentList]);
    onRemoveSuccess(item, index, contentList);
  };

  const saveChoices = (source: IList[]) => {

    setContentList([...source]);
    onSaveChoices(source);
  };

  return (
    <div className='flex flex-wrap'>
      {
        contentList.map((item, index) => (
          <div className={`flex flex-col justify-center relative w-86 h-113 mr-20 mt-15 rounded-md ${styles.listItem}`}>
            <img className="absolute right-5 top-5 w-14 h-14 z-10" src={iconClose} alt="" onClick={() => { onRemove(item, index); }} />

            <ListItem type={item.extraFileType.type} item={item} />
          </div>
        ))
      }
      {
        <ChoiceContent choicesContentList={contentList} type={type} onSaveChoices={saveChoices} onDragModalDidShow={onDragModalDidShow}>
          <div className={`flex items-center justify-center box-shadow w-86 h-86 rounded-md mt-15 ${styles.item}`}>
            <img src={iconAdd} alt="" />
          </div>
        </ChoiceContent>
      }
    </div>
  );
}

export default ContentList;
