import React, { useEffect } from 'react';
import { Button, Input, message } from 'antd';
import request from 'umi-request';
import { LeftOutlined } from '@ant-design/icons';
import { history, useSelector, useDispatch } from 'umi';
import * as api from '@/services/api';
import { beforeEl, alfterEl } from '../const';
import RichText from '../components/rich_text';
import UploadCover from '../components/upload_cover';
import './index.scss';

const { TextArea } = Input;
function ArticleCreate() {
  const dispatch = useDispatch();
  const richText = useSelector((state: IState) => state.education.richText);
  // const [rickText, setRichText] = useState('');
  // const [title, setTitle] = useState('');

  let rickText = ''; // 富文本内容
  let title = richText?.content?.filename;  // 文章标题
  let cover = richText?.content?.cover; // 文章封面
  let description = ''; // IM使用的正文描述

  useEffect(() => {
    // 修改反显
    // if(!isEmpty(richText)){
    //   title = richText.content.filename
    //   cover = richText.content.cover
    // }
  }, []);

  const handleChange = (value: any, text: string) => {
    rickText = value;
    description = text;
  };

  const changTitle = (e: { target: { value: string } }) => {
    title = e.target.value;
  };

  const goBack = () => {
    history.goBack();
    dispatch({
      type: 'education/saveArticleContent',
      payload: {},
    });
  };

  const handleSubmit = (address: string) => {
    console.log('address', address);
    const { addPublicize, patchPublicize } = api.education;
    const imgReg: any = /https.*?(?:")/gi;
    const url: string[] = rickText.match(imgReg)?.map(item => item.replace('"', ''));
    const params: any = {
      content: {
        address,
        cover,
        filename: title,
        description: description.replace(/[/\n]/g, ''),
        text: {
          ops: rickText,
          url,
        },
      },
    };
    if (richText?.id) {
      params.id = richText.id;
    } else {
      // params.fromSid = window.$storage.getItem('orgSid');
      params.ownershipSid = window.$storage.getItem('orgSid');
      params.operatorWcId = window.$storage.getItem('wcId');
      params.operatorSid = window.$storage.getItem('sid');
      params.type = 'ARTICLE';
    }
    const education = richText?.id ? patchPublicize(params) : addPublicize(params);
    education.then(() => {
      setTimeout(() => {
        message.success(`${richText.id ? '修改' : '创建'}成功`);
        goBack();
      }, 200);
    })
      .catch((err: string) => {
        console.log('err', err);
      });
  };

  const uploadOss = () => {
    if (!title || !cover || !rickText) {
      message.error('请完善文章信息!');
      return;
    }
    const videoCover = 'poster=https://xzl-user-avatar.oss-cn-hangzhou.aliyuncs.com/dev/0/f8460268-aebc-4b92-a78a-375dae0a94db视频@2x.png';
    const formatHtmlTxt = rickText.replace(/iframe/g, 'video').replace(/class="ql-video"/g, videoCover);
    const aFileParts: string[] = [`${beforeEl}${formatHtmlTxt}${alfterEl}`];
    const oMyBlob = new Blob(aFileParts, { type: 'text/html' });
    api.file.filePrepare({ businessType: 300 }).then(res => {
      const {
        accessId, encodePolicy, host, key, signature,
      } = res;
      const formData = new FormData();
      formData.set('name', `${title}.html`);
      formData.set('key', `${key}${title}.html`);
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
          handleSubmit(`${host}/${key}${title}.html`);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }).catch(err => {
      console.log(err);
    });
  };

  const handleChangeCover = (url: string) => {
    cover = url;
  };

  return (
    <div>
      <div className='flex justify-between  center'>
        <LeftOutlined style={{ marginBottom: 36 }} onClick={goBack} />
        <Button type='primary' onClick={uploadOss}>保存</Button>
      </div>
      <div className='main'>
        <div className='flex justify-between  items-end mb-20'>
          <UploadCover handleChangeCover={handleChangeCover} />
          <TextArea
            placeholder="请输入标题(最多100字)"
            rows={4}
            onBlur={changTitle}
            defaultValue={richText?.content?.filename}
            maxLength={100}
          />
        </div>
        <RichText
          handleChange={handleChange}
          value={richText?.content?.text?.ops}
        />
      </div>
    </div>
  );
}

export default ArticleCreate;
