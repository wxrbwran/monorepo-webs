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
  readonly?: boolean;
  fileId?: string;
}
const CreateFile: FC<IProps> = (props) => {
  const { children, type, projectSid, fetchFileList, initData, readonly, fileId } = props;
  console.log('initData', initData);
  const [showModal, setshowModal] = useState(false);
  const [fileName, setfileName] = useState('');

  const [richTextCont, setRichTextCont] = useState(''); // 只用于更新值，并不是实时最新值
  const richTextContRef = useRef(''); // 实时的最新值

  useEffect(() => {
    if (initData) {
      richTextContRef.current = initData.content.ops;
      setRichTextCont(initData.content.ops);
      setfileName(initData.name);
    }

  }, [initData]);

  const handleShow = (e) => {
    e.stopPropagation();
    setshowModal(true);
  };
  const handleChangeRemind = (value: any, _text: string) => {
    richTextContRef.current = value;
  };
  //上传
  const handleSubmit = (rawUrl: string) => {

    if (fileId) {

      api.detail.patchProjectFileList({
        address: rawUrl,
        name: fileName,
        projectSid,
        type,
        content: {
          ops: richTextContRef.current,
        },
        fileId,
      }).then(() => {
        setshowModal(false);
        message.success('文件编辑成功');
        fetchFileList();
        // 编辑写入到日志
        window.$log.handleOperationLog({
          type: 1,
          copyWriting: `创建风险评估、风险对策 - ${fileName}`,
          businessType: window.$log.businessType.UPDATE_RISK_ASSESSMENT.code,
          newParams: {
            content: {
              name: fileName,
              fileCont: richTextContRef.current,
            },
          },
          oldParams: {
            content: {
              name: initData.name,
              fileCont: initData.content.ops,
            },
          },
        });
        // 编辑写入到日志
      })
        .catch((err) => {
          message.error(err);
        });
    } else {

      api.detail.addProjectFile({
        address: rawUrl,
        name: fileName,
        projectSid,
        type,
        content: {
          ops: richTextContRef.current,
        },
      }).then(() => {
        setshowModal(false);
        message.success('文件上传成功');
        fetchFileList();
        // 上传写入到日志
        window.$log.handleOperationLog({
          type: 0,
          copyWriting: `创建风险评估、风险对策 - ${fileName}`,
        });
        // 上传写入到日志
      })
        .catch((err) => {
          message.error(err);
        });
    }
  };

  const handleSave = () => {
    const formatHtmlTxt = richTextContRef.current;
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

  console.log('================ <RichText richTextCont', richTextCont);
  return (
    <span>
      <span onClick={handleShow}>{children}</span>
      <DragModal
        visible={showModal}
        title='风险评估/风险对策'
        width={1000}
        height={738}
        wrapClassName="ant-modal-wrap-center"
        onCancel={() => setshowModal(false)}
        maskClosable
        footer={null}
      >
        <div className="relative overflow-hidden" style={readonly ? { height: 680 } : { height: 738 }}>
          <div className="mb-20">
            <Input placeholder="请输入文件名" onChange={(e) => setfileName(e.target.value)} value={fileName} />
          </div>
          {
            readonly == true ?
              <div className="border-solid border border-neutral-200">
                <RichText
                  handleChange={handleChangeRemind}
                  readonly={readonly}
                  value={richTextCont}
                  style={{ height: '600px' }}
                />
              </div>
              : <RichText
                handleChange={handleChangeRemind}
                readonly={readonly}
                value={richTextCont}
                style={{ height: '600px' }}
              />
          }
          {
            readonly != true && <div className="absolute bottom-0 text-center w-full">
              <Button type="primary" onClick={handleSave}>保存</Button>
            </div>
          }

        </div>

      </DragModal>
    </span>
  );
};

export default CreateFile;
