import React, { FC, useState, useRef, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import request from 'umi-request';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { beforeEl, alfterEl } from 'xzl-web-shared/dist/utils/consts';
import RichText from '@/components/RichText';
import * as api from '@/services/api';

interface IProps {
  projectSid: string;
  type: string;
  fetchFileList: () => void;
  initData?: any;
}
const CreateFile: FC<IProps> = (props) => {
  const { children, type, projectSid, fetchFileList, initData } = props;
  console.log('initData', initData);
  const [showModal, setshowModal] = useState(false);
  const [fileName, setfileName] = useState('');




  const richTextCont = useRef('');

  useEffect(() => {
    if (initData) {
      richTextCont.current = initData;
      setfileName(initData.name);
    }

  }, [initData]);


  const pureText = useRef('');
  const handleShow = (e) => {
    e.stopPropagation();
    setshowModal(true);
  };
  const handleChangeRemind = (value: any, text: string) => {
    console.log('valueeeeee', value);
    console.log('textttt', text);
    richTextCont.current = value;
    pureText.current = text;
  };
  //上传
  const handleSubmit = (rawUrl: string) => {
    api.detail.addProjectFile({
      address: rawUrl,
      name: fileName,
      projectSid,
      type,
    }).then(() => {
      if (showModal) {
        setTimeout(() => {
          // setLoading(false);
          message.success('文件上传成功');
          fetchFileList();
          setshowModal(false);
        }, 5000);
      }
    })
      .catch((err) => {
        message.error(err);
      });
  };
  const handleSave = () => {
    const formatHtmlTxt = richTextCont.current;
    const aFileParts: string[] = [`${beforeEl}${formatHtmlTxt}${alfterEl}`];
    console.log('aFileParts', aFileParts);
    const oMyBlob = new Blob(aFileParts, { type: 'text/html' });
    api.base
      .filePrepare({ businessType: 300 })
      .then((res) => {
        const { accessId, encodePolicy, host, key, signature } = res;
        const formData = new FormData();
        formData.set('name', `${fileName}.html`);
        formData.set('key', `${key}${fileName}.html`);
        formData.set('policy', encodePolicy);
        formData.set('OSSAccessKeyId', accessId);
        formData.set('success_action_status', '200');
        formData.set('callback', '');
        formData.set('signature', signature);
        formData.set('file', oMyBlob);
        console.log('host', host);
        request
          .post(host, {
            data: formData,
          })
          .then(() => {
            handleSubmit(`${host}/${key}${fileName}.html`);
          })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <span>
      <span onClick={handleShow}>{children}</span>
      <DragModal
        visible={showModal}
        title='风险评估/风险对策'
        width={1000}
        wrapClassName="ant-modal-wrap-center"
        onCancel={() => setshowModal(false)}
        maskClosable
        footer={null}
      >
        <div className="relative" style={{ height: 738 }}>
          <div className="mb-20">
            <Input placeholder="请输入文件名" onChange={(e) => setfileName(e.target.value)} value={fileName} />
          </div>
          <RichText
            handleChange={handleChangeRemind}
            value={richTextCont?.current?.content?.text?.ops} style={{ height: '600px' }}
          />
          <div className="absolute bottom-0 text-center w-full">
            <Button type="primary" onClick={handleSave}>保存</Button>
          </div>
        </div>

      </DragModal>
    </span>
  );
};

export default CreateFile;
