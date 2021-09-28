import React, { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { history, useDispatch } from 'umi';
import * as api from '@/services/api';
import { Popconfirm, message } from 'antd';
import styles from './index.scss';

interface IList {
  content: {
    filename: string,
    cover: string,
    text: {
      ops: []
    },
  },
  id: string
}
function List() {
  const dispatch = useDispatch();
  const [sourceList, setSourceList] = useState<IList[]>([]);
  const getPublicizeList = () => {
    api.education.getPublicizeList({
      // fromSid: window.$storage.getItem('orgSid'),
      types: ['ARTICLE'],
      ownershipSid: window.$storage.getItem('orgSid'),
      roleType: window.$storage.getItem('roleId'),
      operatorWcId: window.$storage.getItem('wcId'),
      operatorSid: window.$storage.getItem('sid'),
    }).then((res) => {
      setSourceList(res.list);
    })
      .catch((err: string) => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    getPublicizeList();
  }, []);
  const go2NewPage = (content: IList) => {
    dispatch({
      type: 'education/saveArticleContent',
      payload: { ...content },
    });
    history.push('/education/article/create');
  };
  const handleDel = (id: string) => {
    api.education.delPublicize(id).then(() => {
      message.success('删除成功');
      getPublicizeList();
    }).catch(err => {
      message.error(err?.result || '删除失败');
    });
  };
  return (
    <div className="flex justify-start  flex-start flex-wrap">
      {
        sourceList.map((item) => {
          const { filename, cover } = item.content;
          return (
            <div key={cover} className={`mr-40 mb-30 relative ${styles.item_wrap}`}>
              <div className={styles.del_wrap}>
                <Popconfirm
                  title="是否删除?"
                  onConfirm={() => handleDel(item.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <DeleteOutlined className="text-white" />
                </Popconfirm>
              </div>
              <p className='relative' onClick={() => go2NewPage(item)}>
                <img src={cover} alt="" className='rounded w-240 h-135' />
                <div className={`${styles.filename} absolute bottom-0 left-0 w-240 h-135 overflow-hidden flex items-end px-8 py-9`}>
                  <span>{filename}</span>
                </div>
              </p>
            </div>
          );
        })
      }
      <p
        className={`${styles.upload}`}
        onClick={() => history.push('/education/article/create')}
      >
        <PlusOutlined />
      </p>
    </div>
  );
}

export default List;
