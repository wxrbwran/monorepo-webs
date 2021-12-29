/**
 * Created by wuxiaoran on 2019/1/28.
 */
import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { message } from 'antd';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import Cropper from 'react-cropper';
import request from 'umi-request';
import 'cropperjs/dist/cropper.css';
import style from './index.scss';
import './preview.scss';
// import { api } from 'utils/api';

interface IProps {
  preview?: boolean;
  type: string;
  aspectRatio?: number;
  close?: () => void;
  success: (params: any) => void;
}

const UploadImageWithCrop: FC<IProps> = (props) => {
  const { preview, type, aspectRatio, close, children, success } = props;
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState<string>('');
  const [file, setFile] = useState<File | null>();
  const [submitting, setSubmitting] = useState(false);
  const [cropper, setCropper] = useState<any>();

  const inputRef = useRef();

  useEffect(() => {
    if (show) {
      console.log(1);
      const id = 'UPLOAD_CORP';
      setTimeout(() => {
        console.log(id, inputRef);
        inputRef.current?.click();
      }, 300);
    }
  }, [show]);

  // useEffect(() => {
  //   document.addEventListener();
  // }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const uploadFile = (files as FileList)[0];
    if (uploadFile) {
      if (uploadFile.type === 'image/heic') {
        message.warn('请选择jpeg, jpg, png格式图片');
        return false;
      }
      const fileReader = new FileReader();

      fileReader.onload = (ev: ProgressEvent<FileReader>) => {
        const dataURL = ev.target?.result as string;
        setSrc(dataURL);
        setFile(uploadFile);
      };
      fileReader.readAsDataURL(uploadFile);
    } else if (close) {
      close();
    }
    // e.target.value = '';
    return true;
  };

  const handleSubmit = () => {
    console.log('upload');
    if (!submitting) {
      const filenameArr = file.name.split('.');
      const filename = `a.${filenameArr[filenameArr.length - 1]}`;
      message.info({
        content: '正在上传图片',
      });
      // 登录状态下不会出现这行文字，点击页面右上角一键登录
      // TODO: 这里可以尝试修改上传图片的尺寸
      console.log(cropper);
      cropper.getCroppedCanvas().toBlob(async (blob) => {
        // 提示开始上传
        setSubmitting(true);
        // 上传图片
        const params = {
          // filename,
          businessType: 0,
        };
        const data = await window.$api.file.filePrepare(params);
        console.log(4443432222222, blob);
        const { accessId, encodePolicy, host, key, signature } = data;
        try {
          const formData = new FormData();
          formData.set('name', filename);
          formData.set('key', key);
          formData.set('policy', encodePolicy);
          formData.set('OSSAccessKeyId', accessId);
          formData.set('success_action_status', '200');
          formData.set('callback', '');
          formData.set('signature', signature);
          formData.set('file', blob);
          await request
            .post(host, {
              data: formData,
            })
            .then(() => {
              message.success({
                content: '上传成功',
              });
              success({ imageURL: `${host}/${key}`, type });
              setShow(false);
            })
            .catch((err) => {
              console.log(err);
              message.error(7777, err);
            });
        } catch (e) {
          message.error('上传失败');
        }
        // 提示上传完毕
        setSubmitting(false);
      });
    }
  };

  return (
    <>
      <div
        style={{ display: 'inline' }}
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        {children}
      </div>
      <DragModal
        title="上传图片"
        width={770}
        onCancel={() => {
          setShow(false);
        }}
        onOk={handleSubmit}
        visible={show}
        destroyOnClose
      >
        <div>
          <div className={style.content}>
            <div
              className={style.cropper}
              onClick={(e) => e.stopPropagation()}
              style={type === 'avatar' ? { width: 460 } : {}}
            >
              <Cropper
                viewMode={2}
                src={src}
                style={{ height: 300, width: '100%' }}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                // Cropper.js options
                aspectRatio={aspectRatio}
                preview=".preview-img"
              />
            </div>
            {preview && (
              <div className={style.preview}>
                <h3> 预览 </h3>
                <div className="preview-img preview-circle" style={{ width: 160, height: 160 }} />
                <div className="preview-img" style={{ width: 160, height: 160 }} />
              </div>
            )}
          </div>
          <div className={style.action}>
            <label
              htmlFor="UPLOAD_CORP"
              className={`${style.label} ant-btn pointer`}
              style={type === 'avatar' ? { margin: '0 0 70px 0' } : {}}
            >
              重新上传
            </label>
            <input
              type="file"
              ref={inputRef}
              name="upload-logo"
              accept="image/jpeg,image/jpg,image/png, image/heic"
              className={style.base_upload}
              id="UPLOAD_CORP"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
          </div>
        </div>
      </DragModal>
    </>
  );
};

UploadImageWithCrop.defaultProps = { preview: false };

export default UploadImageWithCrop;
