/**
 * Created by wuxiaoran on 2019/1/28.
 */
import React, { useState, useRef, useEffect } from 'react';
import { message } from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './index.scss';
import { http } from '@/services/http';
import request from 'umi-request';

interface IUploadParams {
  imageURL: string;
  type: string;
}
interface IProps {
  preview: boolean;
  type: string;
  aspectRatio:number;
  close: () => void;
  success: (params: IUploadParams) => void;
}
function UploadImageWithCrop(props: IProps) {
  const {
    type, close, preview, aspectRatio, success,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const [src, setSrc] = useState<string | ArrayBuffer | null>();
  const [file, setFile] = useState();
  const inputRef = useRef<HTMLDivElement>(null);
  let cropperRef:HTMLDivElement;
  useEffect(() => {
    const id = `upload-with-crop__${type}`;
    const input = document.getElementById(id) as HTMLElement;
    input.click();
  }, []);

  const handleFileChange = (e: any) => {
    /* eslint-disable prefer-const */
    let fileData = e.target.files[0];
    /* eslint-disable prefer-const */
    if (fileData) {
      if (fileData.type === 'image/heic') {
        message.warn('请选择jpeg, jpg, png格式图片');
        return false;
      }
      const fileReader = new FileReader();

      fileReader.onload = (ev) => {
        const dataURL = ev?.target?.result;
        setSrc(dataURL);
        setFile(fileData);
      };

      fileReader.readAsDataURL(fileData);
    } else {
      // close();
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
        style: {
          marginTop: '20vh',
        },
      });
      if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value(callback, types, quality) {
            let canvas = this;
            setTimeout(() => {
              let binStr = atob(canvas.toDataURL(types, quality).split(',')[1]);
              let len = binStr.length;
              let arr = new Uint8Array(len);

              for (let i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
              }

              callback(new Blob([arr], { type: types || 'image/png' }));
            });
          },
        });
      }
      // 登录状态下不会出现这行文字，点击页面右上角一键登录
      // TODO: 这里可以尝试修改上传图片的尺寸
      cropperRef.getCroppedCanvas().toBlob(async (blob) => {
        // 提示开始上传
        setSubmitting(true);
        // 上传图片
        const urlValues: CommonData = {
          avatar: 'base/file/prepare',
          logoUrl: 'organization/logo',
          pictureUrl: 'organization/picture',
        };
        const params = {
          // filename,
          businessType: 0,
        };
        const data = await http.get(`${urlValues[type]}?data=${JSON.stringify(params)}`);
        console.log(4443432222222, blob);
        const {
          accessId, encodePolicy, host, key, signature,
        } = data;
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
                style: {
                  marginTop: '20vh',
                },
              });
              success({ imageURL: `${host}/${key}`, type });
            })
            .catch((err) => {
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
    <div>
      <div className="crop__content">
        <div
          className="crop__cropper"
          style={type === 'avatar' ? { width: 460 } : {}}
        >
          <Cropper
            viewMode={2}
            src={src}
            style={{ height: 500, width: '100%' }}
            ref={(cropper: any) => { cropperRef = cropper; }}
            // Cropper.js options
            aspectRatio={aspectRatio}
            preview=".crop__preview-img"
          />
        </div>
        {preview && (
          <div
            className="crop__preview"
          >
            <h3> 预览 </h3>
            <div
              className="crop__preview-img crop__preview-circle"
              style={{ width: 160, height: 160 }}
            />
            <div
              className="crop__preview-img"
              style={{ width: 160, height: 160 }}
            />
          </div>
        )}
      </div>
      <div className="upload--action">
        {/* <div
          // htmlFor={`upload-with-crop__${type}`}
          className="upload__label pointer"
          style={type === 'avatar' ? { margin: '0 0 70px 0' } : {}}
        >
          重新上传
        </div> */}
        <label
          htmlFor={`upload-with-crop__${type}`}
          className="upload__label pointer"
          style={type === 'avatar' ? { margin: '0 0 70px 0', lineHeight: '27px' } : {}}
        >
          重新上传
          <input
            type="file"
            ref={inputRef}
            name="upload-logo"
            accept="image/jpeg,image/jpg,image/png, image/heic"
            className="base-upload-input"
            id={`upload-with-crop__${type}`}
            onChange={(e) => {
              e.persist();
              handleFileChange(e);
            }}
          />
        </label>

        <div className="upload__btns">
          <div
            className="upload--quit"
            onClick={close}
          >
            退出
          </div>
          <div
            className="upload--confirm"
            onClick={handleSubmit}
          >
            确定
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImageWithCrop;
/*
*
* <img
              style={{ width: '100%' }}
              src={this.state.cropResult}
              alt="cropped"
            />
*
* */
