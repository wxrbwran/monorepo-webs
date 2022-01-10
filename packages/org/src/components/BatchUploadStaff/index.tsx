import React, { FC, useState } from 'react';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { message, Upload, Tag, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import request from 'umi-request';
import * as api from '@/services/api';
import templateOrg from '@/assets/file/template_org.xlsx';
import templateDoctor from '@/assets/file/template_doctor.xlsx';

import './index.scss';

const { Dragger } = Upload;

interface IProps {
  info?: Department;
}

const BatchUploadStaff: FC<IProps> = (props) => {
  const { children } = props;
  const [show, setShow] = useState<boolean>(false);
  // const orgBase = useSelector((state: IState) => state.org.currentOrg.orgBase);

  const modalProps: Store = {
    okText: '添加',
    cancelText: '退出',
    footer: null,
    onOk: () => {},
    onCancel: () => setShow(!show),
  };

  const handleSubmit = async (file: File, type: number) => {
    console.log('upload file', file);
    // const filename = file.name;
    message.info({
      content: '正在上传文件',
    });
    // 登录状态下不会出现这行文字，点击页面右上角一键登录
    // TODO: 这里可以尝试修改上传图片的尺寸
    // 提示开始上传
    // 上传文件
    const data = await window.$api.file.filePrepare({ businessType: 200 });
    console.log(4443432222222, data);
    const { accessId, encodePolicy, host, key, signature } = data;
    try {
      const formData = new FormData();
      formData.set('name', file.name);
      formData.set('key', key);
      formData.set('policy', encodePolicy);
      formData.set('OSSAccessKeyId', accessId);
      formData.set('success_action_status', '200');
      formData.set('callback', '');
      formData.set('signature', signature);
      formData.set('file', file);
      await request.post(host, {
        data: formData,
      });
      await api.file.adminBatch({ type, url: key });
      message.success({
        content: '上传成功',
      });
      setShow(false);
    } catch (err: any) {
      console.log(err);
      message.error('上传失败');
    }
    // 提示上传完毕
  };
  const opts = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} 文件上传成功`);
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} 文件上传失败`);
    //   }
    // },
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        {...modalProps}
        width={520}
        visible={show}
        maskClosable
        centered
        title="批量上传"
        destroyOnClose
      >
        <div className="batch-upload-staff flex flex-row justify-center">
          <div className="mr-20">
            <Tag color="#108ee9" className="mb-5">
              机构
            </Tag>
            <Dragger
              {...opts}
              beforeUpload={(file) => {
                handleSubmit(file, 1);
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="">点击或者拖拽上传</p>
            </Dragger>
            <div className="mt-10 text-center">
              <Button>
                <a href={templateOrg} target="_blank" download="机构模板.xlsx" rel="noreferrer">
                  下载模板
                </a>
              </Button>
            </div>
          </div>
          <div>
            <Tag color="#108ee9" className="mb-5">
              医生
            </Tag>
            <Dragger
              {...opts}
              beforeUpload={(file) => {
                handleSubmit(file, 2);
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="">点击或者拖拽上传</p>
            </Dragger>
            <div className="mt-10 text-center">
              <Button>
                <a href={templateDoctor} target="_blank" download="医生模板.xlsx" rel="noreferrer">
                  下载模板
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DragModal>
    </>
  );
};

export default BatchUploadStaff;
