import React, { useState, useEffect } from 'react';
import request from 'umi-request';
import ReactQuill from 'react-quill';
import * as api from '@/services/api';
import 'react-quill/dist/quill.snow.css';
import './index.scss';

interface IProps {
  handleChange: (content: any, text: string) => void;
  value: []
}
function RichText({ handleChange, value }: IProps) {
  // const [value, setValue] = useState('');
  const [quillRef, setQuillRef] = useState<any>();
  useEffect(() => {
    if (quillRef){
      // 修改反显
      const quillEditor = quillRef.getEditor();
      quillRef.setEditorContents(quillEditor, value);
    }
  }, [quillRef]);

  const toolbarContainer = [
    // [{ font: [] }],
    // [{ size: [] }],
    [{ size: [false, 'large', 'huge'] }],
    // [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
      { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
  ];
  const onEditorChange = (_val: any, _delta: any, _source: any, editor: any) => {
    console.log('content', editor.getHTML());
    handleChange(editor.getHTML(), editor.getText());
  };
  const uploadFile = (file: any) => new Promise((resolve, reject) => {
    api.file
      .filePrepare({ businessType: 2 })
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
            const imgSrc = `${host}/${key}${file.name}`;
            resolve(imgSrc);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err: any) => {
        reject(err);
      });
  });
  const imageHandler = () => {
    const quillEditor = quillRef.getEditor();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('quill-image', file);
      const res = await uploadFile(file);
      const range = quillEditor.getSelection();
      // this part the image is inserted
      // by 'image' option below, you just have to put src(link) of img here.
      quillEditor.insertEmbed(range.index, 'image', res);
    };
  };

  return (
    <>
      <ReactQuill
        ref={(ref) => setQuillRef(ref)}
        theme="snow"
        onChange={onEditorChange}
        // modules={Editor.modules}
        // formats={Editor.formats}
        modules={{
          toolbar: {
            container: toolbarContainer,
            handlers: {
              image: imageHandler,
            },
          },
        }}
      />
    </>
  );
}

export default RichText;

RichText.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
      { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video', 'color'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
RichText.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'color',
];
