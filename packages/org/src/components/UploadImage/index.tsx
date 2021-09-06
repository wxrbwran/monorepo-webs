import React, { useState, FC } from 'react';
import { Upload } from 'antd';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import 'antd/es/slider/style';

interface IUpload {
  callback?: (files: Array<File>) => void;
}

const UploadImage: FC<IUpload> = (props) => {
  const { callback } = props;
  const [fileList, setFileList] = useState<UploadFile<any>>([]);

  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
    if (callback) {
      callback(info.fileList);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    (imgWindow as Window).document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotate grid>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ 上传图片'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImage;
