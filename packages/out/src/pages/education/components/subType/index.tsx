import React from 'react';
import * as api from '@/services/api';
import { Upload, message } from 'antd';
import { UploadOutlined, FormOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { history } from 'umi';
import { AcceptType, businessType } from '../../const';
import styles from './index.scss';

interface IProps {
  name: string;
  type: string;
  icon: string;
}

function subType({ name, icon, type }: IProps) {

  const addPublicize = (params: { content: { address: string; cover: null; filename: any; text: null; }; fromSid: string; type: string; }) => {
    api.education.addPublicize({ ...params }).then(() => {
      setTimeout(() => {
        message.success('上传成功');
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
      // fromSid: window.$storage.getItem('orgSid'),
      ownershipSid: window.$storage.getItem('orgSid'),
      operatorWcId: window.$storage.getItem('wcId'),
      operatorSid: window.$storage.getItem('sid'),
      type: type.toUpperCase(),
    };
    if (type === 'document') {
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
  const fetchUrlThenUpload = async (file: { name: string, type: string }) => {
    message.info({
      content: '正在上传',
    });
    api.file.filePrepare({ businessType: businessType[type] }).then(res => {
      console.log(432, res);
      const {
        accessId, encodePolicy, host, key, signature,
      } = res;
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
          console.log('err', err);
        });
    }).catch(err => {
      console.log(err);
    });
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  const go2NewPage = () => {
    history.push(`/education/list/${type.toLowerCase()}`);
  };

  const go2CreatePage = (e: { stopPropagation: (arg0: any) => void }) => {
    e.stopPropagation(e);
    history.push(`/education/${type}/create`);
  };

  return (
    <>
      <div className={styles.box} onClick={go2NewPage}>
        <div className={styles.upload}>
          {
            ['accompany', 'article'].includes(type) ?
              <p onClick={go2CreatePage} className={styles.btn}>
                <FormOutlined /> 创建
              </p>
              :
              <Upload
                multiple={false}
                listType="text"
                beforeUpload={fetchUrlThenUpload}
                showUploadList={false}
                accept={AcceptType[type]}
                onClick={stopPropagation}
              >
                <UploadOutlined />
                <span>上传</span>
              </Upload>
          }
        </div>
        <p className={styles.file}>
          <img src={icon} alt="" />
        </p>
        <p>{name}</p>
      </div>
    </>
  );
}

export default subType;
