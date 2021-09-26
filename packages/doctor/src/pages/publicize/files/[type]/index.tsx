import React, { useState, useEffect } from 'react';
import { Upload, message, Image } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams, history } from 'umi';
import * as api from '@/services/api';
import request from 'umi-request';
import type { IList } from '../../const';
import { EducationType, AcceptType, businessType } from '../../const';
import ArticleList from '../../components/ArticleList';
import ListItem from '../../components/ListItem';
import styles from './index.scss';

interface IProps {
  location: {
    pathname: string;
  };
}
function List({ location }: IProps) {
  const { type } = useParams<{ type: string }>();
  const [sourceList, setSourceList] = useState<IList[]>([]);
  // 查询非随访表列表
  const getPublicizeList = () => {
    api.education
      .getPublicizeList({
        fromSid: window.$storage.getItem('orgSid'),
        types: [type.toUpperCase()],
      })
      .then((res) => {
        setSourceList(res.list);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };
  // 查询随访表列表
  const getPublicizeScaleList = () => {
    api.education
      .getPublicizeScale({
        fromSid: window.$storage.getItem('orgSid'),
      })
      .then((res) => {
        setSourceList(res.list);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };
  const fetchListData = () => {
    if (type === 'accompany') {
      getPublicizeScaleList();
    } else if (type !== 'article') {
      getPublicizeList();
    }
  };
  useEffect(() => {
    fetchListData();
  }, []);

  const addPublicize = (params) => {
    api.education
      .addPublicize({ ...params })
      .then(() => {
        setTimeout(() => {
          message.success('上传成功');
          getPublicizeList();
        }, 200);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  };
  // 上传
  const handleSubmit = (rawUrl: string, file: any) => {
    const params = {
      content: {
        address: rawUrl,
        cover: null,
        filename: file.name,
        text: null,
      },
      fromSid: window.$storage.getItem('orgSid'),
      type: type.toUpperCase(),
    };
    if (['document', 'picture'].includes(type)) {
      params.content.size = file.size;
    }
    if (type !== 'audio') {
      addPublicize({ ...params });
    } else {
      // 获取录音时长
      const url = URL.createObjectURL(file);
      const audioElement = new Audio(url);
      audioElement.addEventListener('loadedmetadata', (_event) => {
        params.content.duration = parseInt(_event.path[0].duration * 1000, 10);
        addPublicize({ ...params });
      });
    }
  };
  const fetchUrlThenUpload = async (file: { name: string; type: string }) => {
    message.info({
      content: '正在上传',
    });
    console.log('file666', file);
    api.file
      .filePrepare({ businessType: businessType[type] })
      .then((res) => {
        const { accessId, encodePolicy, host, key, signature } = res;
        const formData = new FormData();
        formData.set('name', file.name);
        formData.set('key', `${key}${file.name}`);
        formData.set('policy', encodePolicy);
        formData.set('OSSAccessKeyId', accessId);
        formData.set('success_action_status', '200');
        formData.set('callback', '');
        formData.set('signature', signature);
        formData.set('file', file);
        console.log('host', host);
        request
          .post(host, {
            data: formData,
          })
          .then(() => {
            handleSubmit(`${host}/${key}${file.name}`, file);
          })
          .catch((err) => {
            console.log('err-aly', err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.visite_list}>
      <div onClick={() => history.goBack()}>
        <LeftOutlined style={{ marginBottom: 36 }} />{' '}
        <span className="font-bold pointer text-lg">{EducationType[type]}</span>
      </div>
      {type === 'article' ? (
        <ArticleList />
      ) : (
        <div className={`${styles.block} flex justify-start  flex-start flex-wrap`}>
          <Image.PreviewGroup>
            {sourceList.map((item) => (
              <ListItem type={type} item={item} location={location} onSuccess={fetchListData} />
            ))}
          </Image.PreviewGroup>
          {['video', 'document', 'article', 'picture', 'audio'].includes(type) && (
            <Upload
              multiple={false}
              listType="text"
              beforeUpload={fetchUrlThenUpload}
              showUploadList={false}
              accept={AcceptType[type]}
              className={`${styles.upload} ${type === 'video' ? '' : styles.add}`}
            >
              <PlusOutlined />
            </Upload>
          )}
          {type === 'accompany' && (
            <p
              className={`${styles.upload} ${styles.add}`}
              onClick={() => history.push('/publicize/files/accompany/create')}
            >
              <PlusOutlined />
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default List;
