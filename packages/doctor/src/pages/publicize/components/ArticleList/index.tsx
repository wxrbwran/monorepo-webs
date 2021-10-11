import React, { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { history, useDispatch, useSelector } from 'umi';
import * as api from '@/services/api';
import { Popconfirm, message } from 'antd';
import styles from './index.scss';

interface IList {
  content: {
    filename: string;
    cover: string;
    text: {
      ops: [];
    };
  };
  id: string;
}
function ArticleList() {
  const dispatch = useDispatch();
  const [sourceList, setSourceList] = useState<IList[]>([]);
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  const getPublicizeList = () => {
    api.education
      .getPublicizeList({
        // fromSid: window.$storage.getItem('orgSid'),
        types: ['ARTICLE'],
        operatorSid: window.$storage.getItem('sid'),
        operatorWcId: window.$storage.getItem('wcId'),
        ownershipSid: currentOrgInfo.sid,
        roleType: window.$storage.getItem('roleId'),
      })
      .then((res) => {
        setSourceList(res.list);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };
  useEffect(() => {
    getPublicizeList();
  }, [currentOrgInfo]);
  const go2NewPage = (content: IList) => {
    dispatch({
      type: 'education/saveArticleContent',
      payload: { ...content },
    });
    history.push('/publicize/files/article/create');
  };
  const handleDel = (id: string) => {
    api.education
      .delPublicize(id)
      .then(() => {
        message.success('删除成功');
        getPublicizeList();
      })
      .catch((err) => {
        message.error(err?.result || '删除失败');
      });
  };

  return (
    <div className="flex justify-start  flex-start flex-wrap">
      {sourceList.map((item) => {
        const { filename, cover } = item.content;
        // 是否显示编辑或者删除按钮
        const isShowBtn = (item?.edit) || (!item?.inSchedule && item?.del);
        // 是否显示分隔线
        const isShowSplit = item?.edit && (!item?.inSchedule && item?.del);
        return (
          <div key={cover} className={`mr-40 mb-30 relative ${styles.item_wrap}`}>
            {
              isShowBtn && (
                <div className={styles.del_wrap}>
                  {
                    item?.edit && (
                      <>
                        <FormOutlined onClick={() => go2NewPage(item)} />
                      </>
                    )
                  }
                  {
                    isShowSplit && <span className="mx-5 text-white">|</span>
                  }
                  {
                    !item?.inSchedule && item?.del && (
                      <Popconfirm
                        title="是否删除?"
                        onConfirm={() => handleDel(item.id)}
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
            <p className="relative" onClick={() => go2NewPage(item)}>
              <img src={cover} alt="" className="rounded w-240 h-135" />
              <div
                className={`${styles.filename} absolute bottom-0 left-0 w-240 h-135 overflow-hidden flex items-end px-8 py-9`}
              >
                <span>{filename}</span>
              </div>
            </p>
          </div>
        );
      })}
      <p className={`${styles.upload}`} onClick={() => history.push('/publicize/files/article/create')}>
        <PlusOutlined />
      </p>
    </div>
  );
}

export default ArticleList;
