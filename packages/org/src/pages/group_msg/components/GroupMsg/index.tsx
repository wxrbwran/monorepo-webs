import React, { FC, useState, ChangeEvent } from 'react';
import { Input } from 'antd';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import UploadImage from '@/components/UploadImage';

const { TextArea } = Input;

const GroupMsg: FC = (props) => {
  const { children } = props;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<string>('');
  const [fileList, setFileList] = useState([]);
  const handleChangeVal = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const sendGroupMsg = () => {
    console.log(fileList);
  };
  const handleFileList = (files) => {
    setFileList(files);
  };
  return (
    <>
      <div style={{ display: 'inline' }} onClick={() => setShow(!show)}>
        {children}
      </div>
      <DragModal
        visible={show}
        title="群发消息"
        width={770}
        onCancel={() => setShow(false)}
        maskClosable
        okText="发送"
        onOk={sendGroupMsg}
      >
        <div style={{ marginBottom: 20 }}>
          <TextArea
            autoSize={{ minRows: 4 }}
            value={value}
            onChange={handleChangeVal}
            placeholder="请输入群发消息"
          />
        </div>
        <UploadImage callback={handleFileList} />
      </DragModal>
    </>
  );
};

export default GroupMsg;
