import React, {
  FC, useState, useRef, useEffect,
} from 'react';
import {
  message, Input, Button,
} from 'antd';
import { useSelector } from 'umi';
import request from 'umi-request';
import { getFromDoctorInfo } from '@/utils/utils';
import * as api from '@/services/api';
import picture from '@/assets/img/im/bar_pic.png';
import filePic from '@/assets/img/im/bar_file.png';
import barRemind from '@/assets/img/im/bar_remind.png';
import DoctorRemind from '@/components/DoctorRemind';
import md5 from './md5';
import NetcallBtn from '../NetcallBtn';
import './index.scss';

const ChatEditor: FC = () => {
  const [msgToSent, setMsg] = useState('');
  const [toWcIds, setToWcIds] = useState<string[]>([]);
  // const fromWcId = useSelector((state: IState) => state.auth.wcl[0]?.wcId);
  // 发送者的wcId
  const [fromWcId, setFromWcId] = useState('');
  // 接收人的wcId和sId
  const patientWcId = window.$storage.getItem('patientWcId');
  const patientSid = window.$storage.getItem('patientSid');
  // 当前会话id
  const currSessionId = useSelector((state: IState) => state.im.currSessionId);
  // 所有会话组
  const sessions = useSelector((state: IState) => state.im.sessions);

  const imgToSent:any = useRef<HTMLInputElement>();
  const fileToSent:any = useRef<HTMLInputElement>();
  const textarea: any = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (currSessionId && sessions.length > 0) {
      // 过滤出当前会话组成员
      const currSession:IPerson[] = sessions.filter(
        (item:IPerson) => `p2p-${item.sessionId}` === currSessionId,
      );
      const doctorWcId = getFromDoctorInfo(currSession[0])[0]?.wcId;
      setFromWcId(doctorWcId);
      window.$storage.setItem('fromWcId', doctorWcId);
      // 从会话组中去除自己
      const removeOwnAfter = currSession[0].members.filter(
        (item: { wcId: string | undefined }) => item.wcId !== doctorWcId,
      );
      // 得到要发送给的成员的wcId
      const sendWcIds = removeOwnAfter.map((item: { wcId: any }) => item.wcId);
      setToWcIds(sendWcIds);
    }
  }, [currSessionId]);

  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    // console.log(e.target.value);
    setMsg(e.target.value);
  };

  const sendMsg = (msgTypes: number, content: string) => {
    const params = {
      operatorWcId: fromWcId,
      // toWcIds,
      msgTypes: [msgTypes],
      content,
      associateWcId: patientWcId,
      associateSId: patientSid,
      sessionId: currSessionId?.split('p2p-')[1],
    };
    console.log(toWcIds);
    api.im
      .sendMsg(params)
      .then(() => {
        console.log('发送成功----');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const uploadFile = (
    files: { name: string; size: any },
    host: string,
    key: string,
    type: number,
  ) => {
    // type参数: 2->图片 4->视频 5->文件
    // msgType: 1->图片; 3->视频; 6->文件
    let msgTypes = 6;
    if (type === 2) {
      msgTypes = 1;
    } else if (type === 4) {
      msgTypes = 3;
    }
    // 图片类型传参
    if (type === 2) {
      const images = new Image();
      const imgSrc = `${host}/${key}${files.name}`;
      images.src = imgSrc;
      images.onload = () => {
        const imgContent = JSON.stringify({
          name: files.name.split('.')[0],
          md5: md5(files.name),
          url: `${host}/${key}${files.name}`,
          ext: files.name.split('.')[1],
          w: images.width,
          h: images.height,
          size: files.size,
        });
        sendMsg(msgTypes, imgContent);
      };
    } else {
      // 文件类型传参
      const fileContent = JSON.stringify({
        name: files.name,
        md5: md5(files.name),
        url: `${host}/${key}${files.name}`,
        ext: files.name.split('.')[1],
        size: files.size,
      });
      // 视频文件传参
      const videoContent = JSON.stringify({
        md5: md5(files.name),
        url: `${host}/${key}${files.name}`,
        ext: 'mp4',
        size: files.size,
      });
      sendMsg(msgTypes, type === 4 ? videoContent : fileContent);
    }
  };

  const sendFileMsgs = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // fileType: 2->图片 4->视频 5->文件
      let fileType = 5;
      if (file.type.indexOf('video') > -1) {
        fileType = 4;
      } else if (file.type.indexOf('image') > -1) {
        fileType = 2;
      }
      api.im
        .filePrepare({ businessType: fileType })
        .then((res) => {
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
          formData.set('x-oss-content-type', file.type);
          request
            .post(host, {
              data: formData,
            })
            .then(() => {
              uploadFile(file, host, key, fileType);
            })
            .catch((err) => {
              console.log('err', err);
            });
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  };

  const sendTextMsg = (e: { keyCode: number; ctrlKey: any; preventDefault: () => void }) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      setMsg(`${msgToSent}\n`);
      return;
    }
    if (/^\s*$/.test(msgToSent)) {
      message.info('请不要发送空消息');
      return;
    }
    if (msgToSent.length > 800) {
      message.info('请不要超过800个字!');
      return;
    }
    e.preventDefault();
    const params = {
      operatorWcId: fromWcId,
      // toWcIds,
      msgTypes: [0],
      content: JSON.stringify({
        msg: msgToSent.trim(),
      }),
      associateWcId: patientWcId,
      associateSId: patientSid,
      sessionId: currSessionId?.split('p2p-')[1],
    };
    console.log('5432', params);
    api.im
      .sendMsg(params)
      .then(() => {
        console.log('发送成功----');
      })
      .catch((err) => {
        sessionStorage.setItem('doCalling', '本窗口发起拨打');
        console.log('err', err);
      });
    setMsg('');
  };
  const handleUploadImg = () => {
    // console.log(imgToSent.current);
    imgToSent.current.click();
  };
  return (
    <div className="m-chat-editor mChatEditor">
      <div className="m-chat-action">
        <div className="m-chat-file flex" style={{ minWidth: 282 }}>
          <div className="u-editor-icon">
            <img className="pointer" onClick={handleUploadImg} src={picture} alt="" />
            <span>(图片)</span>
            <input
              type="file"
              ref={imgToSent}
              onChange={(e) => sendFileMsgs(e)}
              title="请选择图片"
            />
          </div>
          <div className="u-editor-icon mr-0">
            <img className="pointer" src={filePic} alt="" />
            <span>(文件)</span>
            <input
              type="file"
              ref={fileToSent}
              onChange={(e) => sendFileMsgs(e)}
              title="请选择文件"
            />
          </div>
          <DoctorRemind>
            <div className="u-editor-icon mr-0">
              <img className="pointer" src={barRemind} alt="" />
              <span>(医生提醒及建议)</span>
            </div>
          </DoctorRemind>
        </div>
        {
          currSessionId === `p2p-${window.$storage.getItem('toSessionId')}` && (
            <div className="m-chat-file">
              <NetcallBtn />
            </div>
          )
        }
      </div>
      <div className="m-chat-editor-main">
        <div className="u-editor-input">
          <Input.TextArea
            ref={textarea}
            value={msgToSent}
            onChange={handleInputChange}
            onPressEnter={sendTextMsg}
          />
        </div>
        <div className="u-editor-icons">
          <Button type="primary" className="u-editor-send" onClick={sendTextMsg}>
            发 送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatEditor;
