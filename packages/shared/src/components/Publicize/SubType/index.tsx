import React from 'react';
import { Upload, message } from 'antd';
// import { UploadOutlined, FormOutlined } from '@ant-design/icons';
import request from 'umi-request';
// @ts-ignore
import { history } from 'umi';
import { AcceptType, businessType } from '../const';
import './index.css';

interface IProps {
  name: string;
  type: string;
  icon: string;
  uploadPublicizeRequest: (params: any) => Promise<any>;
  filePrepareRequest: (params: any) => Promise<any>;
}

function SubType({ name, icon, type, uploadPublicizeRequest, filePrepareRequest }: IProps) {
  const addPublicize = async (params: {
    content: { address: string; cover: null; filename: any; text: null };
    fromSid: string;
    type: string;
  }) => {
    const res = await uploadPublicizeRequest(params);
    if (res){
      setTimeout(() => {
        message.success('上传成功');
      }, 200);
    }
  };
  // 上传
  const handleSubmit = (rawUrl: string, file: any) => {
    const params: any = {
      content: {
        address: rawUrl,
        cover: null,
        filename: file.name,
        text: null,
      },
      fromSid: window.$storage.getItem('orgSid'),
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
      audioElement.addEventListener('loadedmetadata', (_event: Event) => {
        params.content.duration = parseInt(`${_event.path[0].duration * 1000}`, 10);
        addPublicize({ ...params });
      });
    }
  };
  const fetchUrlThenUpload = async (file: File) => {
    message.info({
      content: '正在上传',
    });
    const res = await filePrepareRequest({ businessType: businessType[type] });
    if (res){
      console.log(432, res);
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
          console.log('err', err);
        });
    }
  };

  const stopPropagation = (e: MouseEvent) => {
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
      <div className="box" onClick={go2NewPage}>
        <div className="upload">
          {['accompany', 'article'].includes(type) ? (
            <p onClick={go2CreatePage} className="btn">
              {/* <FormOutlined /> 创建 */}
              创建
            </p>
          ) : (
            <Upload
              multiple={false}
              listType="text"
              beforeUpload={fetchUrlThenUpload}
              showUploadList={false}
              accept={AcceptType[type]}
              // @ts-ignore
              onClick={stopPropagation}
            >
              {/* <UploadOutlined /> */}
              <span>上传</span>
            </Upload>
          )}
        </div>
        <p className="file">
          <img src={icon} alt="" />
        </p>
        <p>{name}</p>
      </div>
    </>
  );
}

export default SubType;
