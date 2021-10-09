import React from 'react';
import { Image, message, Popconfirm } from 'antd';
import word from '@/assets/img/suifang/word.png';
import excel from '@/assets/img/suifang/excel.png';
import pdf from '@/assets/img/suifang/pdf.png';
import suifang from '@/assets/img/suifang/suifang.png';
import QuestionDetail from '../question_detail';
import audio from '@/assets/img/suifang/audio.png';
import type { IList } from '../../const';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import styles from './index.scss';
import * as api from '@/services/api';
import { useDispatch, history } from 'umi';

interface IProps {
  type: string;
  item: IList;
  location?: { pathname: string }
  onSuccess: () => void;
}
function ListItem({ type, item, location, onSuccess }: IProps) {
  // const { filename, text } = item.content;
  const dispatch = useDispatch();
  const len = item?.content?.filename?.split('.').length;
  const ext = item?.content?.filename?.split('.')[len - 1];
  const isList = location?.pathname.includes('files');
  const lookFile = (_item: IList) => {
    const aEl = document.getElementById('upload');
    if (aEl && !!location){
      aEl.setAttribute('href', _item.content.convertAddress);
      aEl.click();
    }
  };
  const handleDel = (id: string) => {
    let request = api.education.delPublicize;
    if (type === 'accompany') {
      request = api.education.delPublicizeScale;
    }
    request(id).then( () => {
      message.success('删除成功');
      onSuccess();
    }).catch(err => {
      message.error(err?.result || '删除失败');
    });
  };
  const handleEdit = () => {
    dispatch({
      type: 'suifang/saveCurrentEditScale',
      payload: item,
    });
    history.push('/publicize/files/accompany/create');
  };
  // 是否显示编辑或者删除按钮
  const isShowBtn = (type === 'accompany' && item?.edit) || (!item?.inSchedule && item?.del);
  return (
    <div key={item.id} className={`text-center relative ${styles.item_wrap}`}>
      {
        isList && isShowBtn && (
          <div className={styles.del_wrap}>
            {
              type === 'accompany' && item?.edit && (
                <>
                  <FormOutlined onClick={handleEdit} />
                  <span className="mx-5 text-white">|</span>
                </>
              )
            }
            {
              !item?.inSchedule && item?.del && (
                <Popconfirm
                  title="是否删除?"
                  onConfirm={() => handleDel(item?.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <DeleteOutlined className="text-white" />
                </Popconfirm>
              )
            }
          </div>
        )
      }
      <p>
        {
          type === 'video' && (
            <video
              src={item.content.address}
              autoPlay={false}
              controls={true}
              preload='metadata'
              className={`w-220 h-120 rounded ${styles.video}`}
              controlsList='nodownload'
              disablePictureInPicture={true}
            ></video>
          )
        }
        {
          type === 'document' && (
            <>
            {['doc', 'docx'].includes(ext) && <img src={word} alt="" onClick={() => lookFile(item)}/>}
            {['xlsx', 'xls'].includes(ext) && <img src={excel} alt="" onClick={() => lookFile(item)}/>}
            {['pdf'].includes(ext) && <img src={pdf} alt="" onClick={() => lookFile(item)}/>}
            <a id="upload" className='hidden' target="_blank"></a>
            </>
          )
        }
        {
          type === 'picture' && (
              <Image
                width={86}
                height={86}
                src={item.content.address}
                alt=""
                className='w-86 h-86 rounded'
              />
          )
        }
        {
          type === 'accompany' && (
            location ?
              <QuestionDetail
                title={item.title}
                subTitle={item.subTitle}
                question={item.question}
                isShowEdit={false}
              >
                <img src={suifang} alt="" />
              </QuestionDetail>
              : <img src={suifang} alt="" />
          )

        }
        {
          type === 'audio' && <img src={audio} alt=""/>
        }
        {
          type === 'article' && <img src={item.content.cover} alt="" className='w-240 h-120'/>
        }
      </p>
      <p className={styles.name}>{`${type !== 'accompany' ? item.content.filename || '' : item.title}`}</p>
    </div>
  );
}

export default ListItem;
